import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./AddNewDoctor.css";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
       const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // =========================
  // BASIC INFORMATION
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // PROFESSIONAL INFORMATION
  // =========================

  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");

  // =========================
  // OTHER INFORMATION
  // =========================

  const [chamber, setChamber] = useState("");
  const [experience, setExperience] = useState("");

  // =========================
  // DOCTOR STATUS
  // =========================

  const [isActive, setIsActive] = useState(true);

  // =========================
  // IMAGE
  // =========================

  const [doctorImage, setDoctorImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =========================
  // SCHEDULE
  // =========================

  const [schedules, setSchedules] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
    },
  ]);

  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // CONVERT 24 HOUR TIME → 12 HOUR AM/PM
  // =====================================================

  const convertTo12Hour = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    let hour = Number(hours);

    const period = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }

    return `${String(hour).padStart(2, "0")}:${minutes} ${period}`;
  };

  // =====================================================
  // IMAGE HANDLER
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Only PNG, JPEG and WEBP images are allowed!"
      );

      e.target.value = "";
      return;
    }

    setDoctorImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // =====================================================
  // SCHEDULE CHANGE
  // =====================================================

  const handleScheduleChange = (
    index,
    field,
    value
  ) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule, scheduleIndex) =>
        scheduleIndex === index
          ? {
              ...schedule,
              [field]: value,
            }
          : schedule
      )
    );
  };

  // =====================================================
  // ADD SCHEDULE
  // =====================================================

  const addSchedule = () => {
    setSchedules((prevSchedules) => [
      ...prevSchedules,
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  // =====================================================
  // REMOVE SCHEDULE
  // =====================================================

  const removeSchedule = (index) => {
    if (schedules.length === 1) {
      toast.warning(
        "At least one schedule is required!"
      );

      return;
    }

    setSchedules((prevSchedules) =>
      prevSchedules.filter(
        (_, scheduleIndex) =>
          scheduleIndex !== index
      )
    );
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();

    // =========================
    // IMAGE VALIDATION
    // =========================

    if (!doctorImage) {
      toast.error("Doctor image is required!");
      return;
    }

    // =========================
    // SCHEDULE VALIDATION
    // =========================

    const invalidSchedule = schedules.some(
      (schedule) =>
        !schedule.day ||
        !schedule.startTime ||
        !schedule.endTime
    );

    if (invalidSchedule) {
      toast.error(
        "Please complete all OPD schedule fields!"
      );
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // CONVERT SCHEDULE TIME
      //
      // 20:00 → 08:00 PM
      // 04:00 → 04:00 AM
      // =====================================================

      const formattedSchedules = schedules.map(
        (schedule) => ({
          day: schedule.day,

          startTime: convertTo12Hour(
            schedule.startTime
          ),

          endTime: convertTo12Hour(
            schedule.endTime
          ),
        })
      );

      // =========================
      // CREATE FORMDATA
      // =========================

      const formData = new FormData();

      formData.append(
        "docAvatar",
        doctorImage
      );

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      formData.append(
        "designation",
        designation
      );

      formData.append(
        "qualification",
        qualification
      );

      formData.append(
        "specialization",
        specialization
      );

      formData.append(
        "department",
        department
      );

      // IMPORTANT:
      // DB-তে AM/PM format যাবে
      formData.append(
        "schedules",
        JSON.stringify(formattedSchedules)
      );

      formData.append(
        "chamber",
        chamber
      );

      formData.append(
        "experience",
        experience
      );

      formData.append(
        "isActive",
        isActive
      );

      // =========================
      // API REQUEST
      // =========================

      const response = await axios.post(
      backendUrl+ "/api/doctor/addnew",
        formData,
        {
          withCredentials: true,
        }
      );

      // =========================
      // SUCCESS
      // =========================

      toast.success(response.data.message);

      // =========================
      // RESET FORM
      // =========================

      setName("");
      setEmail("");
      setPassword("");

      setDesignation("");
      setQualification("");
      setSpecialization("");
      setDepartment("");

      setChamber("");
      setExperience("");

      setIsActive(true);

      setDoctorImage(null);
      setImagePreview("");

      setSchedules([
        {
          day: "",
          startTime: "",
          endTime: "",
        },
      ]);

      // =========================
      // GO TO DOCTOR LIST
      // =========================

      navigateTo("/doctors");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add doctor!"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // AUTH CHECK
  // =====================================================

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="ridoy-doctor-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="ridoy-doctor-header">
        <div>
          <span className="ridoy-doctor-header-badge">
            DOCTOR MANAGEMENT
          </span>

          <h1>
            Add New Doctor
          </h1>

          <p>
            Register a new doctor and configure
            their professional information and OPD
            schedule.
          </p>
        </div>
      </div>

      {/* =========================
          FORM
      ========================= */}

      <form
        className="ridoy-doctor-form"
        onSubmit={handleAddNewDoctor}
      >

        {/* =========================
            PROFILE SECTION
        ========================= */}

        <section className="ridoy-doctor-card">

          <div className="ridoy-doctor-section-title">

            <div className="ridoy-doctor-section-icon">
              01
            </div>

            <div>
              <h2>
                Doctor Profile
              </h2>

              <p>
                Upload the doctor's profile image
                and enter basic information.
              </p>
            </div>

          </div>

          <div className="ridoy-doctor-profile-grid">

            {/* IMAGE */}

            <div className="ridoy-doctor-image-area">

              <div className="ridoy-doctor-image-preview">

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Doctor Preview"
                  />
                ) : (
                  <div className="ridoy-doctor-image-placeholder">
                    <span>+</span>

                    <small>
                      Doctor Photo
                    </small>
                  </div>
                )}

              </div>

              <label
                htmlFor="ridoy-doctor-image"
                className="ridoy-doctor-upload-button"
              >
                Choose Image
              </label>

              <input
                id="ridoy-doctor-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                hidden
              />

              <small className="ridoy-doctor-image-note">
                PNG, JPG or WEBP
              </small>

            </div>

            {/* BASIC INFO */}

            <div className="ridoy-doctor-input-grid">

              <div className="ridoy-doctor-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              <div className="ridoy-doctor-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              <div className="ridoy-doctor-field ridoy-doctor-full-field">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            PROFESSIONAL INFORMATION
        ========================= */}

        <section className="ridoy-doctor-card">

          <div className="ridoy-doctor-section-title">

            <div className="ridoy-doctor-section-icon">
              02
            </div>

            <div>
              <h2>
                Professional Information
              </h2>

              <p>
                Add the doctor's medical and
                professional credentials.
              </p>
            </div>

          </div>

          <div className="ridoy-doctor-input-grid">

            <div className="ridoy-doctor-field">

              <label>
                Designation
              </label>

              <input
                type="text"
                placeholder="Senior Consultant"
                value={designation}
                onChange={(e) =>
                  setDesignation(e.target.value)
                }
              />

            </div>

            <div className="ridoy-doctor-field">

              <label>
                Qualification
              </label>

              <input
                type="text"
                placeholder="MBBS, FCPS"
                value={qualification}
                onChange={(e) =>
                  setQualification(e.target.value)
                }
              />

            </div>

            <div className="ridoy-doctor-field">

              <label>
                Specialization
              </label>

              <input
                type="text"
                placeholder="Cardiology"
                value={specialization}
                onChange={(e) =>
                  setSpecialization(e.target.value)
                }
              />

            </div>

            <div className="ridoy-doctor-field">

              <label>
                Department
              </label>

              <input
                type="text"
                placeholder="Cardiology Department"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
              />

            </div>

            <div className="ridoy-doctor-field">

              <label>
                Chamber
              </label>

              <input
                type="text"
                placeholder="Room 302"
                value={chamber}
                onChange={(e) =>
                  setChamber(e.target.value)
                }
              />

            </div>

            <div className="ridoy-doctor-field">

              <label>
                Experience
              </label>

              <div className="ridoy-doctor-number-wrapper">

                <input
                  type="number"
                  min="0"
                  placeholder="10"
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                />

                <span>
                  Years
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            OPD SCHEDULE
        ========================= */}

        <section className="ridoy-doctor-card">

          <div className="ridoy-doctor-section-title">

            <div className="ridoy-doctor-section-icon">
              03
            </div>

            <div>
              <h2>
                OPD Schedule
              </h2>

              <p>
                Configure when the doctor is
                available for consultation.
              </p>
            </div>

          </div>

          <div className="ridoy-schedule-list">

            {schedules.map(
              (schedule, index) => (

                <div
                  className="ridoy-schedule-row"
                  key={index}
                >

                  <div className="ridoy-schedule-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  {/* DAY */}

                  <div className="ridoy-doctor-field">

                    <label>
                      Day
                    </label>

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

                  </div>

                  {/* START TIME */}

                  <div className="ridoy-doctor-field">

                    <label>
                      Start Time
                    </label>

                    <input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          "startTime",
                          e.target.value
                        )
                      }
                    />

                  </div>

                  {/* END TIME */}

                  <div className="ridoy-doctor-field">

                    <label>
                      End Time
                    </label>

                    <input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) =>
                        handleScheduleChange(
                          index,
                          "endTime",
                          e.target.value
                        )
                      }
                    />

                  </div>

                  {/* REMOVE */}

                  <button
                    type="button"
                    className="ridoy-schedule-remove"
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

          {/* ADD SCHEDULE */}

          <button
            type="button"
            className="ridoy-schedule-add"
            onClick={addSchedule}
          >
            <span>+</span>
            Add Another Schedule
          </button>

        </section>

        {/* =========================
            STATUS
        ========================= */}

        <section className="ridoy-doctor-status-card">

          <div>

            <h3>
              Doctor Status
            </h3>

            <p>
              Inactive doctors will not be
              available for active OPD services.
            </p>

          </div>

          <button
            type="button"
            className={`ridoy-status-switch ${
              isActive
                ? "ridoy-status-active"
                : "ridoy-status-inactive"
            }`}
            onClick={() =>
              setIsActive(!isActive)
            }
          >

            <span className="ridoy-status-circle"></span>

            {isActive
              ? "Active"
              : "Inactive"}

          </button>

        </section>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="ridoy-doctor-actions">

          <button
            type="button"
            className="ridoy-doctor-cancel"
            onClick={() =>
              navigateTo("/doctors")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="ridoy-doctor-submit"
            disabled={loading}
          >
            {loading
              ? "Registering Doctor..."
              : "Register Doctor"}
          </button>

        </div>

      </form>

    </section>
  );
};

export default AddNewDoctor;