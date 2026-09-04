import mongoose from "mongoose";
import validator from "validator";
const appointmentSchema = new mongoose.Schema(
  {
    /* =========================
       PATIENT INFORMATION
    ========================= */

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: {
      type: String,
      required: [true,"patient name must be required"],
      trim: true,
    },

    email: {
      type: String,
      required: true,
      validate: [ validator.isEmail,"Email must be valid"],     
       lowercase: true,
      trim: true,

    },

    phone: {
      type: String,
      required: [true,"phone number must be required"],
      trim: true,
      minlength: [11, "Phone number must be at least 11 digits"],
       maxlength: [11, "Phone number cannot exceed 15 digits"],    },

    gender: {
      type: String,
      required:  [true,"gender must be required"],
      enum: ["Male", "Female", "Other"],
    },


    /* =========================
       DOCTOR INFORMATION
    ========================= */

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },


    /* =========================
       APPOINTMENT INFORMATION
    ========================= */

    day: {
      type: String,
      required: true,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },

    appointmentTime: {
      type: String,
      required: true,
      trim: true,
    },

    chamber: {
      type: String,
      required: true,
      trim: true,
    },


    /* =========================
       VISIT INFORMATION
    ========================= */

    reasonForVisit: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },


    /* =========================
       APPOINTMENT STATUS
    ========================= */

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },

  {
    timestamps: true,
  }
);


/* =========================
   APPOINTMENT MODEL
========================= */

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;