import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import "./BookAppointment.css"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Context } from "../Context/AppContext";


const BookAppointment = () => {
  const { backendUrl } = useContext(Context);
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [formData, setFormData] = useState({
    day: "",
    appointmentTime: "",
    reasonForVisit: "",
  });


  /* =====================================================
     GET DOCTOR
  ===================================================== */

  const getDoctor = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/appointment/doctor/${doctorId}`,
        {
          withCredentials: true,
        }
      );

      setDoctor(data.doctor);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to load doctor!"
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (doctorId) {
      getDoctor();
    }
  }, [doctorId]);


  /* =====================================================
     GENERATE 30 MINUTE SLOTS
  ===================================================== */

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];

    const convertToMinutes = (time) => {
      const [timeValue, period] = time.split(" ");

      let [hours, minutes] = timeValue
        .split(":")
        .map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      }

      if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };


    const formatTime = (totalMinutes) => {
      let hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const period = hours >= 12 ? "PM" : "AM";

      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }

      return `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    };


    const start = convertToMinutes(startTime);
    const end = convertToMinutes(endTime);


    for (
      let time = start;
      time < end;
      time += 30
    ) {
      slots.push(formatTime(time));
    }

    return slots;
  };


  /* =====================================================
     SELECTED DAY SCHEDULE
  ===================================================== */

  const selectedSchedule = doctor?.schedules?.find(
    (schedule) => schedule.day === formData.day
  );


  /* =====================================================
     AVAILABLE TIME SLOTS
  ===================================================== */

  const timeSlots = selectedSchedule
    ? generateTimeSlots(
        selectedSchedule.startTime,
        selectedSchedule.endTime
      )
    : [];


  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /* =====================================================
     DAY CHANGE
  ===================================================== */

  const handleDayChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      day: e.target.value,
      appointmentTime: "",
    }));
  };


  /* =====================================================
     SUBMIT APPOINTMENT
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBooking(true);

      const { data } = await axios.post(
        `${backendUrl}/api/appointment/post`,
        {
          doctorId,
          day: formData.day,
          appointmentTime: formData.appointmentTime,
          reasonForVisit: formData.reasonForVisit,
        },
        {
          withCredentials: true,
        }
      );

      alert(data.message);

      navigate("/my-appointments");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to book appointment!"
      );
    } finally {
      setBooking(false);
    }
  };


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="patient-booking-loading-page">
        <div className="patient-booking-loading-card">
          Loading doctor information...
        </div>
      </main>
    );
  }


  /* =====================================================
     DOCTOR NOT FOUND
  ===================================================== */

  if (!doctor) {
    return (
      <main className="patient-booking-error-page">
        <div className="patient-booking-error-card">
          Doctor information not available.
        </div>
      </main>
    );
  }


  /* =====================================================
     UI
  ===================================================== */

  return (
    <main className="patient-booking-page">

      {/* ================= HEADER ================= */}

      <section className="patient-booking-header">

        <span className="patient-booking-badge">
          APPOINTMENT
        </span>

        <h1>
          Book an Appointment
        </h1>

        <p>
          Select an available day and time
          for your appointment.
        </p>

      </section>


      {/* ================= CONTENT ================= */}

      <section className="patient-booking-container">


        {/* ================= DOCTOR CARD ================= */}

        <div className="patient-booking-doctor-card">

          <div className="patient-booking-doctor-avatar">
            {doctor.name?.charAt(0).toUpperCase()}
          </div>

          <div className="patient-booking-doctor-info">

            <span>
              Selected Doctor
            </span>

            <h2>
              {doctor.name}
            </h2>

            <p>
              {doctor.specialization}
            </p>

            <small>
              {doctor.department}
            </small>

          </div>

        </div>


        {/* ================= FORM ================= */}

        <form
          className="patient-booking-form"
          onSubmit={handleSubmit}
        >


          {/* DAY */}

          <div className="patient-booking-field">

            <label htmlFor="appointment-day">
              Available Day
            </label>

            <select
              id="appointment-day"
              name="day"
              value={formData.day}
              onChange={handleDayChange}
              required
            >

              <option value="">
                Select a day
              </option>

              {doctor.schedules?.map(
                (schedule) => (
                  <option
                    key={schedule.day}
                    value={schedule.day}
                  >
                    {schedule.day}
                  </option>
                )
              )}

            </select>

          </div>


          {/* TIME */}

          <div className="patient-booking-field">

            <label htmlFor="appointment-time">
              Available Time
            </label>

            <select
              id="appointment-time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              disabled={!selectedSchedule}
              required
            >

              <option value="">
                {selectedSchedule
                  ? "Select a time"
                  : "Select a day first"}
              </option>

              {timeSlots.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {time}
                </option>
              ))}

            </select>

            {selectedSchedule && (
              <small>
                Available from{" "}
                {selectedSchedule.startTime}
                {" - "}
                {selectedSchedule.endTime}
              </small>
            )}

          </div>


          {/* CHAMBER */}

          <div className="patient-booking-field">

            <label htmlFor="appointment-chamber">
              Chamber
            </label>

            <input
              id="appointment-chamber"
              type="text"
              value={
                doctor.chamber || "Not specified"
              }
              readOnly
            />

          </div>


          {/* REASON */}

          <div className="patient-booking-field">

            <label htmlFor="appointment-reason">
              Reason for Visit
            </label>

            <textarea
              id="appointment-reason"
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleChange}
              placeholder="Briefly describe the reason for your visit..."
              maxLength={500}
              required
            />

            <small>
              {formData.reasonForVisit.length}/500
            </small>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="patient-booking-submit-btn"
            disabled={
              booking ||
              !formData.day ||
              !formData.appointmentTime ||
              !formData.reasonForVisit.trim()
            }
          >

            {booking
              ? "Booking Appointment..."
              : "Confirm Appointment"}

          </button>

        </form>

      </section>

    </main>
  );
};


export default BookAppointment;