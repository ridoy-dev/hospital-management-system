import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import "./Dashboard.css"
import { Navigate } from "react-router-dom";
import { Context } from "../main";

const Dashboard = () => {

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL;

  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

    const { isAuthenticated } = useContext(Context);

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

  /* =========================================================
     GET ALL
  ========================================================= */

  const getAppointments = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/appointment/admin/all`,
        {
          withCredentials: true,
        }
      );

      setAppointments(
        data.appointments || []
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to load appointments!"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    getAppointments();

  }, []);


  /* =========================================================
     STATUS UPDATE
  ========================================================= */

  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      const { data } = await axios.put(
        `${backendUrl}/api/appointment/admin/status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );


      alert(data.message);

      getAppointments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to update status!"
      );
    }
  };


  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this appointment?"
      );

    if (!confirmed) return;


    try {

      const { data } = await axios.delete(
        `${backendUrl}/api/appointment/admin/delete/${id}`,
        {
          withCredentials: true,
        }
      );


      alert(data.message);

      getAppointments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to delete appointment!"
      );
    }
  };


  if (loading) {

    return (
      <main className="admin-appointment-management-loading">
        Loading appointments...
      </main>
    );
  }


  return (
    <main className="admin-appointment-management-page">

      {/* HEADER */}

      <section className="admin-appointment-management-header">

        <div>

          <span className="admin-appointment-management-badge">
            ADMIN PANEL
          </span>

          <h1>
            Appointment Management
          </h1>

          <p>
            Review, manage and process patient
            appointments.
          </p>

        </div>


        <div className="admin-appointment-management-count">

          <span>
            Total
          </span>

          <strong>
            {appointments.length}
          </strong>

        </div>

      </section>


      {/* APPOINTMENTS */}

      <section className="admin-appointment-management-container">

        {appointments.length === 0 ? (

          <div className="admin-appointment-management-empty">

            <h2>
              No appointments found
            </h2>

            <p>
              There are currently no patient
              appointments.
            </p>

          </div>

        ) : (

          <div className="admin-appointment-management-list">

            {appointments.map(
              (appointment) => (

                <article
                  key={appointment._id}
                  className="admin-appointment-management-card"
                >

                  {/* PATIENT */}

                  <div className="admin-appointment-patient">

                    <div className="admin-appointment-patient-avatar">

                      {appointment.patientName
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </div>


                    <div>

                      <span>
                        PATIENT
                      </span>

                      <h2>
                        {appointment.patientName}
                      </h2>

                      <p>
                        {appointment.email}
                      </p>

                      <small>
                        {appointment.phone}
                      </small>

                    </div>

                  </div>


                  {/* DOCTOR */}

                  <div className="admin-appointment-doctor">

                    <span>
                      DOCTOR
                    </span>

                    <h3>
                      {appointment.doctorName}
                    </h3>

                    <p>
                      {appointment.specialization}
                    </p>

                    <small>
                      {appointment.department}
                    </small>

                  </div>


                  {/* SCHEDULE */}

                  <div className="admin-appointment-schedule">

                    <div>

                      <span>
                        DAY
                      </span>

                      <strong>
                        {appointment.day}
                      </strong>

                    </div>


                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        {appointment.appointmentTime}
                      </strong>

                    </div>


                    <div>

                      <span>
                        CHAMBER
                      </span>

                      <strong>
                        {appointment.chamber}
                      </strong>

                    </div>

                  </div>


                  {/* REASON */}

                  <div className="admin-appointment-reason">

                    <span>
                      REASON FOR VISIT
                    </span>

                    <p>
                      {appointment.reasonForVisit}
                    </p>

                  </div>


                  {/* MANAGEMENT */}

                  <div className="admin-appointment-management-actions">

                    <div className="admin-appointment-status-control">

                      <label>
                        Status
                      </label>

                      <select
                        value={
                          appointment.status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            appointment._id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Confirmed">
                          Confirmed
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>


                    <button
                      type="button"
                      className="admin-appointment-delete-btn"
                      onClick={() =>
                        handleDelete(
                          appointment._id
                        )
                      }
                    >
                      Delete Appointment
                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </main>
  );
};

export default Dashboard;