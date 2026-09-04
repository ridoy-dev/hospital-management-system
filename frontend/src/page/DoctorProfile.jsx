import React, { useContext,useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { Context } from "../Context/AppContext";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const { doctors } = useContext(Context);
  const { pathname } = useLocation();

  const navigate = useNavigate();


    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  // URL থেকে doctor ID নিয়ে doctor খুঁজে বের করছি
  const doctor = doctors?.find(
    (doctor) => doctor._id === doctorId
  );
  

  // Doctor পাওয়া না গেলে
  if (!doctor) {
    return (
      <div className="dprofile-not-found">
        <h2>Doctor Not Found</h2>

        <p>
          The doctor you are looking for does not exist.
        </p>

        <button
          className="dprofile-back-btn"
          onClick={() => navigate("/doctors")}
        >
          Back to Doctors
        </button>
      </div>
    );
  }

  
  return (
    <div className="dprofile-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="dprofile-hero">

        <div className="dprofile-hero-inner">

          <p className="dprofile-breadcrumb">
            Home
            <span>›</span>
            Doctors
            <span>›</span>
            {doctor.name}
          </p>

          <h1>Doctor Profile</h1>

          <p className="dprofile-hero-description">
            Get to know your doctor and their
            professional experience.
          </p>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dprofile-container">


        {/* =========================
            DOCTOR MAIN CARD
        ========================= */}

        <section className="dprofile-main-card">

          {/* IMAGE */}

          <div className="dprofile-image-wrapper">

            <img
              src={doctor.image}
              alt={doctor.name}
              className="dprofile-image"
            />

          </div>


          {/* INFORMATION */}

          <div className="dprofile-info">

            {/* STATUS */}

            <div className="dprofile-status">

              <span
                className={
                  doctor.isActive
                    ? "dprofile-status-dot dprofile-active"
                    : "dprofile-status-dot dprofile-inactive"
                }
              ></span>

              {doctor.isActive
                ? "Available"
                : "Currently Unavailable"}

            </div>


            {/* NAME */}

            <h2 className="dprofile-name">
              {doctor.name}
            </h2>


            {/* DESIGNATION */}

            <p className="dprofile-designation">
              {doctor.designation}
            </p>


            {/* SPECIALIZATION */}

            <p className="dprofile-specialization">
              {doctor.specialization}
            </p>


            {/* DETAILS */}

            <div className="dprofile-details">

              <div className="dprofile-detail-item">
                <span>Qualification</span>

                <strong>
                  {doctor.qualification}
                </strong>
              </div>


              <div className="dprofile-detail-item">
                <span>Department</span>

                <strong>
                  {doctor.department}
                </strong>
              </div>


              <div className="dprofile-detail-item">
                <span>Experience</span>

                <strong>
                  {doctor.experience}+ Years
                </strong>
              </div>


              <div className="dprofile-detail-item">
                <span>Chamber</span>

                <strong>
                  {doctor.chamber}
                </strong>
              </div>

            </div>


            {/* APPOINTMENT */}

            <button
              className="dprofile-primary-btn"
              onClick={() =>
                navigate(
                  `/appointment/${doctor._id}`
                )
              }
            >
              Book Appointment
            </button>

          </div>

        </section>


        {/* =========================
            ABOUT
        ========================= */}

        <section className="dprofile-section">

          <h2 className="dprofile-section-title">
            About Doctor
          </h2>

          <p className="dprofile-about-text">
            {doctor.name} is a highly experienced{" "}
            {doctor.specialization} specialist working
            as a {doctor.designation}. With{" "}
            {doctor.experience}+ years of experience,
            the doctor is committed to providing
            quality healthcare and personalized
            treatment to every patient.
          </p>

        </section>


        {/* =========================
            PROFESSIONAL INFORMATION
        ========================= */}

        <section className="dprofile-section">

          <h2 className="dprofile-section-title">
            Professional Information
          </h2>

          <div className="dprofile-professional-grid">

            <div className="dprofile-professional-item">
              <span>Qualification</span>

              <strong>
                {doctor.qualification}
              </strong>
            </div>


            <div className="dprofile-professional-item">
              <span>Specialization</span>

              <strong>
                {doctor.specialization}
              </strong>
            </div>


            <div className="dprofile-professional-item">
              <span>Department</span>

              <strong>
                {doctor.department}
              </strong>
            </div>


            <div className="dprofile-professional-item">
              <span>Designation</span>

              <strong>
                {doctor.designation}
              </strong>
            </div>


            <div className="dprofile-professional-item">
              <span>Experience</span>

              <strong>
                {doctor.experience}+ Years
              </strong>
            </div>


            <div className="dprofile-professional-item">
              <span>Chamber</span>

              <strong>
                {doctor.chamber}
              </strong>
            </div>

          </div>

        </section>


        {/* =========================
            OPD SCHEDULE
        ========================= */}

        <section className="dprofile-section">

          <div className="dprofile-schedule-heading">

            <h2 className="dprofile-section-title">
              OPD Schedule
            </h2>

            <p>
              Doctor's available visiting hours
            </p>

          </div>


          <div className="dprofile-schedule-table">

            {/* HEADER */}

            <div className="dprofile-schedule-header">

              <span>Day</span>

              <span>Start Time</span>

              <span>End Time</span>

            </div>


            {/* DATA */}

            {doctor.schedules?.length > 0 ? (

              doctor.schedules.map(
                (schedule, index) => (

                  <div
                    className="dprofile-schedule-row"
                    key={index}
                  >

                    <strong>
                      {schedule.day}
                    </strong>

                    <span>
                      {schedule.startTime}
                    </span>

                    <span>
                      {schedule.endTime}
                    </span>

                  </div>

                )
              )

            ) : (

              <div className="dprofile-no-schedule">
                No OPD schedule available.
              </div>

            )}

          </div>

        </section>


        {/* =========================
            APPOINTMENT CTA
        ========================= */}

        <section className="dprofile-appointment">

          <div className="dprofile-appointment-content">

            <h2>
              Need an Appointment?
            </h2>

            <p>
              Book an appointment with{" "}
              {doctor.name} today.
            </p>

          </div>


          <button
            className="dprofile-appointment-btn"
            onClick={() =>
              navigate(
                `/appointment/${doctor._id}`
              )
            }
          >
            Book Appointment
          </button>

        </section>

      </main>

    </div>
  );
};

export default DoctorProfile;