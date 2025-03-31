import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container p-4">
        <div className="text-center my-4">
          <h1 className="fw-bold">Welcome, <span className="text-success">{user?.name}</span></h1>
          <h4 className="text-muted">Admin's Dashboard</h4>
        </div>

        <div className="row mt-5">
          {/* Card 1 - Manage Blood Inventory */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="fw-bold text-danger">Manage Blood Inventory</h5>
              <p className="text-muted">
                Track and monitor available blood units. Ensure an optimal supply for emergencies.
              </p>
            </div>
          </div>

          {/* Card 2 - Donor Management */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="fw-bold text-danger">Donor Management</h5>
              <p className="text-muted">
                View and manage donor details, past donations, and eligibility criteria.
              </p>
            </div>
          </div>

          {/* Card 3 - Hospital Requests */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="fw-bold text-danger">Hospital Requests</h5>
              <p className="text-muted">
                Approve and process blood requests from hospitals in a timely manner.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-4 p-4 bg-light rounded shadow-sm">
          <h4 className="fw-bold">Admin Responsibilities</h4>
          <ul className="list-unstyled">
            <li>✔ Ensure an adequate blood supply at all times.</li>
            <li>✔ Maintain donor records and contact information.</li>
            <li>✔ Process hospital requests efficiently.</li>
            <li>✔ Oversee system performance and security.</li>
            <li>✔ Generate reports for better decision-making.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;