import React, { useContext, useState,useEffect } from "react";
import { days, specialists } from "../assets/opdData";
import { Context } from "../Context/AppContext";
import { ChevronRight } from "lucide-react";
import { useLocation,useSearchParams ,useNavigate } from 'react-router-dom'; 
import "./OPDSchedule.css";

const OpdSchedule = () => {
  const { doctors } = useContext(Context);

  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate()


  useEffect(() => {
  const department = searchParams.get("department");

  if (department) {
    setSelectedSpecialist(department);
  } else {
    setSelectedSpecialist(null);
  }
}, [searchParams]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Department + Day filter
  const filteredDoctors = doctors.filter((doctor) => {
    const specialistMatch =
      selectedSpecialist === null ||
      doctor.department === selectedSpecialist;

    const dayMatch =
      selectedDay === "All Days" ||
      doctor.schedules.some(
        (schedule) => schedule.day === selectedDay
      );

    return specialistMatch && dayMatch;
  });

  return (
    <main className="opd-schedule-page">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="opd-schedule-header">
        <div className="opd-schedule-header-inner">

          <span className="opd-schedule-header-badge">
            OPD SCHEDULE
          </span>

          <h1 className="opd-schedule-header-title">
            Find a Doctor & Check OPD Schedule
          </h1>

          <p className="opd-schedule-header-description">
            Browse our doctors by department and day to
            find the right specialist and available OPD time.
          </p>

       <div>  
       <button className="explore-doctors-btn" onClick={() => navigate("/doctors")}>
       Explore Doctors
       <ChevronRight size={18} />  

      </button>

      </div>

        </div>

       
      </section>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <section className="opd-schedule-container">

        <div className="opd-schedule-layout">

          {/* =========================
              DEPARTMENT SIDEBAR
          ========================== */}

          <aside className="opd-schedule-department-sidebar">

            <div className="opd-schedule-sidebar-header">

              <h2 className="opd-schedule-sidebar-title">
                Departments
              </h2>

              <span className="opd-schedule-sidebar-count">
                {specialists.length}
              </span>

            </div>


            <div className="opd-schedule-department-list">

              {/* All Departments */}

              <button
                type="button"
                className={`opd-schedule-department-item ${
                  selectedSpecialist === null
                    ? "opd-schedule-department-item-active"
                    : ""
                }`}
                onClick={() => setSelectedSpecialist(null)}
              >

                <span className="opd-schedule-department-left">

                  <span className="opd-schedule-department-icon">
                    🏥
                  </span>

                  <span>
                    All Departments
                  </span>

                </span>

                <ChevronRight size={18} />

              </button>


              {/* Departments */}

              {specialists.map((special) => (

                <button
                  type="button"
                  key={special.specialist}
                  className={`opd-schedule-department-item ${
                    selectedSpecialist === special.specialist
                      ? "opd-schedule-department-item-active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSpecialist(
                      special.specialist
                    )
                  }
                >

                  <span className="opd-schedule-department-left">

                    <span className="opd-schedule-department-icon">
                      {special.icon}
                    </span>

                    <span>
                      {special.specialist}
                    </span>

                  </span>

                  <ChevronRight size={18} />

                </button>

              ))}

            </div>

          </aside>


          {/* =========================
              RIGHT CONTENT
          ========================== */}

          <div className="opd-schedule-content">

            {/* =========================
                DAY FILTER
            ========================== */}

            <section className="opd-schedule-day-filter">

              <div className="opd-schedule-filter-heading">

                <h2>
                  Available Days
                </h2>

                <p>
                  Select a day to view available doctors.
                </p>

              </div>


              <div className="opd-schedule-day-list">

                {days.map((day) => (

                  <button
                    type="button"
                    key={day}
                    className={`opd-schedule-day-button ${
                      selectedDay === day
                        ? "opd-schedule-day-button-active"
                        : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>

                ))}

              </div>

            </section>


            {/* =========================
                RESULT HEADER
            ========================== */}

            <div className="opd-schedule-result-header">

              <div className="opd-schedule-result-info">

                <h2>
                  {selectedSpecialist || "All Departments"}
                </h2>

                <p>
                  {selectedDay === "All Days"
                    ? "Showing doctors for all available days"
                    : `Showing doctors available on ${selectedDay}`}
                </p>

              </div>


              <div className="opd-schedule-doctor-count">

                <strong>
                  {filteredDoctors.length}
                </strong>

                <span>
                  {filteredDoctors.length === 1
                    ? "Doctor"
                    : "Doctors"}
                </span>

              </div>

            </div>


            {/* =========================
                EMPTY STATE
            ========================== */}

            {filteredDoctors.length === 0 ? (

              <div className="opd-schedule-empty-state">

                <div className="opd-schedule-empty-icon">
                  🩺
                </div>

                <h3>
                  No doctors found
                </h3>

                <p>
                  No doctor is currently available for
                  the selected department and day.
                </p>

              </div>

            ) : (

              /* =========================
                 TABLE
              ========================== */

              <div className="opd-schedule-table-wrapper">

                <table className="opd-schedule-table">

                  <thead>
                    <tr>

                      <th>Doctor</th>

                      <th>Qualification</th>

                      <th>Day</th>

                      <th>Time</th>

                      <th>Chamber</th>

                      <th>Status</th>

                      <th>Action</th>

                    </tr>
                  </thead>


                  <tbody>

                    {filteredDoctors.map((doctor) => {

                      /*
                        All Days হলে সব schedule দেখাবে।
                        নির্দিষ্ট day হলে শুধু সেই day's schedule দেখাবে।
                      */

                      const doctorSchedules =
                        selectedDay === "All Days"
                          ? doctor.schedules
                          : doctor.schedules.filter(
                              (schedule) =>
                                schedule.day === selectedDay
                            );

                      return (

                        <tr key={doctor._id}>

                          {/* Doctor */}

                          <td>

                            <div className="opd-schedule-doctor-info">

                              <img
                                className="opd-schedule-doctor-image"
                                src={doctor.image}
                                alt={doctor.name}
                              />

                              <div className="opd-schedule-doctor-details">

                                <h3>
                                  {doctor.name}
                                </h3>

                                <span>
                                  {doctor.specialization}
                                </span>

                                <small>
                                  {doctor.designation}
                                </small>

                              </div>

                            </div>

                          </td>


                          {/* Qualification */}

                          <td>

                            <span className="opd-schedule-qualification">
                              {doctor.qualification}
                            </span>

                          </td>


                          {/* Days */}

                          <td>

                            <div className="opd-schedule-list">

                              {doctorSchedules.map(
                                (schedule, index) => (

                                  <div
                                    className="opd-schedule-item"
                                    key={
                                      schedule._id || index
                                    }
                                  >
                                    {schedule.day}
                                  </div>

                                )
                              )}

                            </div>

                          </td>


                          {/* Time */}

                          <td>

                            <div className="opd-schedule-list">

                              {doctorSchedules.map(
                                (schedule, index) => (

                                  <div
                                    className="opd-schedule-item"
                                    key={
                                      schedule._id
                                        ? `${schedule._id}-time`
                                        : `${index}-time`
                                    }
                                  >
                                    {schedule.startTime}
                                    {" - "}
                                    {schedule.endTime}
                                  </div>

                                )
                              )}

                            </div>

                          </td>


                          {/* Chamber */}

                          <td>

                            <span className="opd-schedule-chamber">
                              {doctor.chamber}
                            </span>

                          </td>


                          {/* Status */}

                          <td>

                            <span
                              className={`opd-schedule-status ${
                                doctor.isActive
                                  ? "opd-schedule-status-active"
                                  : "opd-schedule-status-inactive"
                              }`}
                            >

                              <span className="opd-schedule-status-dot"></span>

                              {doctor.isActive
                                ? "Active"
                                : "Inactive"}

                            </span>

                          </td>


                          {/* Action */}

                          <td>

                            <button
                              type="button"
                              className="opd-schedule-appointment-button"
                                onClick={() => navigate(`/doctors/${doctor._id}`)}                             >
                              Book Appointment
                            </button>

                          </td>

                        </tr>

                      );
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
};

export default OpdSchedule;