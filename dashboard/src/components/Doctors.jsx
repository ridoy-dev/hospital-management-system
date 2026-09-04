import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import "./Doctors.css";

const Doctors = () => {
  const { isAuthenticated } = useContext(Context);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // =========================
  // DOCTORS
  // =========================

  const [doctors, setDoctors] = useState([]);

  // =========================
  // EDIT DOCTOR
  // =========================

  const [editingDoctor, setEditingDoctor] = useState(null);

  // =========================
  // FORM DATA
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    qualification: "",
    specialization: "",
    department: "",
    chamber: "",
    experience: "",
    isActive: true,
    schedules: [],
  });

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(false);

  // =========================================================
  // GET ALL DOCTORS
  // =========================================================

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
       backendUrl+ "/api/doctor/get-all",
        {
          withCredentials: true,
        }
      );

      setDoctors(data.doctors);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load doctors!"
      );
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // =========================================================
  // DELETE DOCTOR
  // =========================================================

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
       backendUrl+ `/api/doctor/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      // Remove doctor from UI
      setDoctors((previousDoctors) =>
        previousDoctors.filter(
          (doctor) => doctor._id !== id
        )
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete doctor!"
      );
    }
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);

    setFormData({
      name: doctor.name || "",
      email: doctor.email || "",
      designation: doctor.designation || "",
      qualification: doctor.qualification || "",
      specialization:
        doctor.specialization || "",
      department: doctor.department || "",
      chamber: doctor.chamber || "",
      experience: doctor.experience ?? "",
      isActive:
        doctor.isActive !== undefined
          ? doctor.isActive
          : true,
      schedules: doctor.schedules || [],
    });
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // STATUS CHANGE
  // =========================================================

  const handleStatusChange = () => {
    setFormData((previous) => ({
      ...previous,
      isActive: !previous.isActive,
    }));
  };

  // =========================================================
  // SCHEDULE CHANGE
  // =========================================================

  const handleScheduleChange = (
    index,
    field,
    value
  ) => {
    const updatedSchedules = [
      ...formData.schedules,
    ];

    updatedSchedules[index][field] = value;

    setFormData((previous) => ({
      ...previous,
      schedules: updatedSchedules,
    }));
  };

  // =========================================================
  // ADD SCHEDULE
  // =========================================================

  const addSchedule = () => {
    setFormData((previous) => ({
      ...previous,
      schedules: [
        ...previous.schedules,
        {
          day: "",
          startTime: "",
          endTime: "",
        },
      ],
    }));
  };

  // =========================================================
  // REMOVE SCHEDULE
  // =========================================================

  const removeSchedule = (index) => {
    setFormData((previous) => ({
      ...previous,
      schedules: previous.schedules.filter(
        (_, scheduleIndex) =>
          scheduleIndex !== index
      ),
    }));
  };

  // =========================================================
  // UPDATE DOCTOR
  // =========================================================

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();

    if (!editingDoctor) return;

    try {
      setLoading(true);

      const { data } = await axios.put(
      backendUrl+  `/api/doctor/${editingDoctor._id}`,
        {
          name: formData.name,
          email: formData.email,
          designation: formData.designation,
          qualification: formData.qualification,
          specialization:
            formData.specialization,
          department: formData.department,
          schedules: JSON.stringify(
            formData.schedules
          ),
          chamber: formData.chamber,
          experience: formData.experience,
          isActive: formData.isActive,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);

      // Update doctor inside list
      setDoctors((previousDoctors) =>
        previousDoctors.map((doctor) =>
          doctor._id === editingDoctor._id
            ? data.doctor
            : doctor
        )
      );

      // Close modal
      setEditingDoctor(null);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update doctor!"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  const closeEditModal = () => {
    setEditingDoctor(null);
  };

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="ridoy-doctors-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="ridoy-doctors-header">

        <div>
          <span className="ridoy-doctors-badge">
            DOCTOR MANAGEMENT
          </span>

          <h1>
            Doctors
          </h1>

          <p>
            Manage registered doctors,
            professional information and OPD
            schedules.
          </p>
        </div>

        <div className="ridoy-doctors-count">
          <strong>
            {doctors.length}
          </strong>

          <span>
            Registered Doctors
          </span>
        </div>

      </div>


      {/* =====================================================
          DOCTOR LIST
      ===================================================== */}

      <div className="ridoy-doctors-grid">

        {doctors.length > 0 ? (

          doctors.map((doctor) => (

            <article
              className="ridoy-doctor-card"
              key={doctor._id}
            >

              {/* IMAGE */}

              <div className="ridoy-doctor-card-top">

                <div className="ridoy-doctor-image">

                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                    />
                  ) : (
                    <div className="ridoy-doctor-no-image">
                      DR
                    </div>
                  )}

                </div>


                {/* STATUS */}

                <span
                  className={`ridoy-doctor-status ${
                    doctor.isActive
                      ? "ridoy-doctor-status-active"
                      : "ridoy-doctor-status-inactive"
                  }`}
                >
                  <span></span>

                  {doctor.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>


              {/* NAME */}

              <div className="ridoy-doctor-main-info">

                <h2>
                  {doctor.name}
                </h2>

                <p className="ridoy-doctor-designation">
                  {doctor.designation}
                </p>

                <span className="ridoy-doctor-specialization">
                  {doctor.specialization}
                </span>

              </div>


              {/* DETAILS */}

              <div className="ridoy-doctor-details">

                <div className="ridoy-doctor-detail-row">
                  <span>Email</span>
                  <strong>
                    {doctor.email}
                  </strong>
                </div>

                <div className="ridoy-doctor-detail-row">
                  <span>Qualification</span>
                  <strong>
                    {doctor.qualification}
                  </strong>
                </div>

                <div className="ridoy-doctor-detail-row">
                  <span>Department</span>
                  <strong>
                    {doctor.department}
                  </strong>
                </div>

                <div className="ridoy-doctor-detail-row">
                  <span>Chamber</span>
                  <strong>
                    {doctor.chamber}
                  </strong>
                </div>

                <div className="ridoy-doctor-detail-row">
                  <span>Experience</span>
                  <strong>
                    {doctor.experience} Years
                  </strong>
                </div>

              </div>


              {/* SCHEDULE */}

              <div className="ridoy-doctor-schedule">

                <div className="ridoy-doctor-schedule-title">
                  OPD Schedule
                </div>

                {doctor.schedules &&
                doctor.schedules.length > 0 ? (

                  doctor.schedules.map(
                    (schedule, index) => (

                      <div
                        className="ridoy-doctor-schedule-item"
                        key={`${doctor._id}-schedule-${index}`}
                      >

                        <span>
                          {schedule.day}
                        </span>

                        <strong>
                          {schedule.startTime}
                          {" - "}
                          {schedule.endTime}
                        </strong>

                      </div>

                    )
                  )

                ) : (
                  <p className="ridoy-doctor-no-schedule">
                    No schedule available
                  </p>
                )}

              </div>


              {/* ACTION BUTTONS */}

              <div className="ridoy-doctor-actions">

                <button
                  type="button"
                  className="ridoy-doctor-edit-btn"
                  onClick={() =>
                    handleEditDoctor(doctor)
                  }
                >
                  Edit Doctor
                </button>

                <button
                  type="button"
                  className="ridoy-doctor-delete-btn"
                  onClick={() =>
                    handleDeleteDoctor(
                      doctor._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </article>

          ))

        ) : (

          <div className="ridoy-doctors-empty">
            <div>
              +
            </div>

            <h2>
              No Registered Doctors
            </h2>

            <p>
              There are currently no doctors
              registered in the system.
            </p>
          </div>

        )}

      </div>


      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editingDoctor && (

        <div
          className="ridoy-doctor-modal-overlay"
          onMouseDown={closeEditModal}
        >

          <div
            className="ridoy-doctor-edit-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="ridoy-doctor-modal-header">

              <div>
                <span>
                  DOCTOR MANAGEMENT
                </span>

                <h2>
                  Edit Doctor
                </h2>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="ridoy-doctor-modal-close"
              >
                ×
              </button>

            </div>


            {/* EDIT FORM */}

            <form
              onSubmit={handleUpdateDoctor}
              className="ridoy-doctor-edit-form"
            >

              <div className="ridoy-doctor-edit-grid">

                {/* NAME */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* EMAIL */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* DESIGNATION */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Designation
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={
                      formData.designation
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* QUALIFICATION */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Qualification
                  </label>

                  <input
                    type="text"
                    name="qualification"
                    value={
                      formData.qualification
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* SPECIALIZATION */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Specialization
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={
                      formData.specialization
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* DEPARTMENT */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={
                      formData.department
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* CHAMBER */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Chamber
                  </label>

                  <input
                    type="text"
                    name="chamber"
                    value={formData.chamber}
                    onChange={
                      handleInputChange
                    }
                  />
                </div>


                {/* EXPERIENCE */}

                <div className="ridoy-doctor-edit-field">
                  <label>
                    Experience
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="experience"
                    value={
                      formData.experience
                    }
                    onChange={
                      handleInputChange
                    }
                  />
                </div>

              </div>


              {/* STATUS */}

              <div className="ridoy-doctor-edit-status">

                <div>
                  <strong>
                    Doctor Status
                  </strong>

                  <small>
                    Control doctor availability.
                  </small>
                </div>

                <button
                  type="button"
                  className={`ridoy-doctor-toggle ${
                    formData.isActive
                      ? "ridoy-doctor-toggle-active"
                      : "ridoy-doctor-toggle-inactive"
                  }`}
                  onClick={
                    handleStatusChange
                  }
                >
                  <span></span>

                  {formData.isActive
                    ? "Active"
                    : "Inactive"}
                </button>

              </div>


              {/* SCHEDULE */}

              <div className="ridoy-doctor-edit-schedule">

                <div className="ridoy-doctor-edit-schedule-header">

                  <div>
                    <h3>
                      OPD Schedule
                    </h3>

                    <p>
                      Update doctor's
                      availability.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addSchedule}
                    className="ridoy-doctor-add-schedule"
                  >
                    + Add Schedule
                  </button>

                </div>


                {formData.schedules.map(
                  (schedule, index) => (

                    <div
                      className="ridoy-doctor-edit-schedule-row"
                      key={`edit-schedule-${index}`}
                    >

                      <select
                        value={schedule.day}
                        onChange={(e) =>
                          handleScheduleChange(
                            index,
                            "day",
                            e.target.value
                          )
                        }
                      >
                        <option value="">
                          Select Day
                        </option>

                        <option value="Sunday">
                          Sunday
                        </option>

                        <option value="Monday">
                          Monday
                        </option>

                        <option value="Tuesday">
                          Tuesday
                        </option>

                        <option value="Wednesday">
                          Wednesday
                        </option>

                        <option value="Thursday">
                          Thursday
                        </option>

                        <option value="Friday">
                          Friday
                        </option>

                        <option value="Saturday">
                          Saturday
                        </option>

                      </select>


                      <input
                        type="time"
                        value={
                          schedule.startTime
                        }
                        onChange={(e) =>
                          handleScheduleChange(
                            index,
                            "startTime",
                            e.target.value
                          )
                        }
                      />


                      <input
                        type="time"
                        value={
                          schedule.endTime
                        }
                        onChange={(e) =>
                          handleScheduleChange(
                            index,
                            "endTime",
                            e.target.value
                          )
                        }
                      />


                      <button
                        type="button"
                        className="ridoy-doctor-remove-schedule"
                        onClick={() =>
                          removeSchedule(index)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  )
                )}

              </div>


              {/* MODAL ACTIONS */}

              <div className="ridoy-doctor-modal-actions">

                <button
                  type="button"
                  className="ridoy-doctor-modal-cancel"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ridoy-doctor-modal-save"
                  disabled={loading}
                >
                  {loading
                    ? "Updating..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
};

export default Doctors;