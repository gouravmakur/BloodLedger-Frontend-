import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-loader-spinner";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Renamed for clarity

  const getDonors = async () => {
    try {
      const response = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (response.data?.success) {
        setData(response.data.inventory);
      }
    } catch (error) {
      console.error("Error fetching donor records:", error);
      // Show user-friendly error message (e.g., toast notification)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      setLoading(true);
      getDonors();
    }
  }, [user]); // Added user dependency

  return (
    <Layout>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
          />
        </div>
      ) : (
        <div className="container mt-4 border-primary">
          <table className="table">
            <thead>
              <tr className="table-active">
                <th scope="col">Blood Group</th>
                <th scope="col">Donated To</th>
                <th scope="col">Quantity</th>
                <th scope="col">Email</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup || "N/A"}</td>
                    <td>{record.organisation?.email || "Unknown"}</td>
                    <td>{record.quantity ? `${record.quantity} ml` : "N/A"}</td>
                    <td>{record.email || "N/A"}</td>
                    <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No donation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default Donation;