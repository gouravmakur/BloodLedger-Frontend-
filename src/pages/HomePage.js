import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const [data, setData] = useState([]);
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-inventory");
      if (response.data?.success) {
        setData(response.data.inventory);
      }
    } catch (err) {
      console.error("Error fetching blood records:", err);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, [user?.role]); // Re-fetch if role changes

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]); // Prevent infinite redirect

  return (
    <Layout>
      {error && <div className="alert alert-danger">{error}</div>}
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
        <>
          <h4
            className="ms-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-regular fa-square-plus text-success py-4"></i>
            &nbsp;Add To Inventory
          </h4>

          <div className="container m-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donor Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((record) => (
                    <tr
                      className={
                        record.inventoryType.toLowerCase() === "in"
                          ? "table-success"
                          : "table-danger"
                      }
                      key={record._id}
                    >
                      <td>{record.bloodGroup || "N/A"}</td>
                      <td>{record.inventoryType.toUpperCase()}</td>
                      <td>{record.quantity ? `${record.quantity} ml` : "N/A"}</td>
                      <td>{record.email || "N/A"}</td>
                      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No blood records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Modal />
        </>
      )}
    </Layout>
  );
};

export default HomePage;