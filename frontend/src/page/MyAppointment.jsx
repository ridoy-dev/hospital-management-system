import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Context } from "../Context/AppContext";
import "./MyAppointment.css"

const MyAppointment = () => {

  const { backendUrl } =
    useContext(Context);


  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const [editingAppointment, setEditingAppointment] =
    useState(null);


  const [editForm, setEditForm] =
    useState({
      day: "",
      appointmentTime: "",
      reasonForVisit: "",
    });


  /* =========================================================
     GET MY APPOINTMENTS
  ========================================================= */

  const getMyAppointments = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/appointment/my`,
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

    getMyAppointments();

  }, []);


  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this appointment?"
      );

    if (!confirmed) return;


    try {

      const { data } = await axios.delete(
        `${backendUrl}/api/appointment/my/delete/${id}`,
        {
          withCredentials: true,
        }
      );


      alert(data.message);

      getMyAppointments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to delete appointment!"
      );
    }
  };


  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const handleEdit = (appointment) => {

    if (appointment.status !== "Pending") {
      return;
    }


    setEditingAppointment(
      appointment
    );


    setEditForm({
      day: appointment.day,
      appointmentTime:
        appointment.appointmentTime,
      reasonForVisit:
        appointment.reasonForVisit,
    });
  };


  /* =========================================================
     UPDATE INPUT
  ========================================================= */

  const handleEditChange = (e) => {

    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.put(
        `${backendUrl}/api/appointment/my/update/${editingAppointment._id}`,
        editForm,
        {
          withCredentials: true,
        }
      );


      alert(data.message);

      setEditingAppointment(null);

      getMyAppointments();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to update appointment!"
      );
    }
  };


  if (loading) {

    return (
      <main className="patient-my-appointments-loading">
        Loading your appointments...
      </main>
    );
  }


  return (
    <main className="patient-my-appointments-page">

      {/* HEADER */}

      <section className="patient-my-appointments-header">

        <span className="patient-my-appointments-badge">
          MY APPOINTMENTS
        </span>

        <h1>
          Your Appointments
        </h1>

        <p>
          Manage and track your appointment
          requests.
        </p>

      </section>


      {/* CONTENT */}

      <section className="patient-my-appointments-container">

        {appointments.length === 0 ? (

          <div className="patient-my-appointments-empty">

            <h2>
              No appointments yet
            </h2>

            <p>
              You have not booked any
              appointments.
            </p>

          </div>

        ) : (

          <div className="patient-my-appointments-list">

            {appointments.map(
              (appointment) => {

                const isPending =
                  appointment.status ===
                  "Pending";

                return (

                  <article
                    key={appointment._id}
                    className="patient-my-appointment-card"
                  >

                    {/* TOP */}

                    <div className="patient-my-appointment-top">

                      <div>

                        <span className="patient-my-appointment-label">
                          DOCTOR
                        </span>

                        <h2>
                          {appointment.doctorName}
                        </h2>

                        <p>
                          {appointment.specialization}
                        </p>

                      </div>


                      <span
                        className={`patient-my-appointment-status patient-my-appointment-status-${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>

                    </div>


                    {/* DETAILS */}

                    <div className="patient-my-appointment-details">

                      <div>
                        <span>
                          Department
                        </span>

                        <strong>
                          {appointment.department}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Day
                        </span>

                        <strong>
                          {appointment.day}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Time
                        </span>

                        <strong>
                          {appointment.appointmentTime}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Chamber
                        </span>

                        <strong>
                          {appointment.chamber}
                        </strong>
                      </div>

                    </div>


                    {/* REASON */}

                    <div className="patient-my-appointment-reason">

                      <span>
                        Reason for Visit
                      </span>

                      <p>
                        {appointment.reasonForVisit}
                      </p>

                    </div>


                    {/* ACTIONS */}

                    {isPending ? (

                      <div className="patient-my-appointment-actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              appointment
                            )
                          }
                          className="patient-my-appointment-edit-btn"
                        >
                          Update
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              appointment._id
                            )
                          }
                          className="patient-my-appointment-delete-btn"
                        >
                          Delete
                        </button>

                      </div>

                    ) : (

                      <div className="patient-my-appointment-locked">

                        🔒 Appointment locked

                        <span>
                          Admin has already
                          processed this appointment.
                        </span>

                      </div>

                    )}

                  </article>

                );
              }
            )}

          </div>

        )}

      </section>


      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editingAppointment && (

        <div className="patient-my-appointment-modal-overlay">

          <div className="patient-my-appointment-modal">

            <div className="patient-my-appointment-modal-header">

              <div>

                <span>
                  UPDATE APPOINTMENT
                </span>

                <h2>
                  Change Appointment
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingAppointment(null)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleUpdate}
              className="patient-my-appointment-edit-form"
            >

              <label>
                Day

                <input
                  name="day"
                  value={editForm.day}
                  onChange={handleEditChange}
                  required
                />

              </label>


              <label>
                Appointment Time

                <input
                  name="appointmentTime"
                  value={
                    editForm.appointmentTime
                  }
                  onChange={handleEditChange}
                  required
                />

              </label>


              <label>
                Reason

                <textarea
                  name="reasonForVisit"
                  value={
                    editForm.reasonForVisit
                  }
                  onChange={handleEditChange}
                  maxLength={500}
                  required
                />

              </label>


              <button
                type="submit"
                className="patient-my-appointment-save-btn"
              >
                Save Changes
              </button>

            </form>

          </div>

        </div>

      )}

    </main>
  );
};

export default MyAppointment;