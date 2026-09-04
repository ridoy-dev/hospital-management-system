import mongoose from "mongoose";
import bcrypt from "bcrypt";
/* =========================================================
   DOCTOR SCHEDULE SCHEMA
========================================================= */

const scheduleSchema = new mongoose.Schema(
  {
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

    startTime: {
      type: String,
      required: true,
      trim: true,
    },

    endTime: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);


/* =========================================================
   DOCTOR SCHEMA
========================================================= */

const doctorSchema = new mongoose.Schema(
  {
    /* =========================
       LOGIN INFORMATION
    ========================= */

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },


    /* =========================
       BASIC INFORMATION
    ========================= */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },


    /* =========================
       PROFESSIONAL INFORMATION
    ========================= */

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },


    /* =========================
       OPD SCHEDULE
    ========================= */

    schedules: {
      type: [scheduleSchema],
      default: [],
    },


    /* =========================
       CHAMBER & EXPERIENCE
    ========================= */

    chamber: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },


    /* =========================
       DOCTOR STATUS
    ========================= */

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

doctorSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    10
  );

  next();
});
/* =========================================================
   DOCTOR MODEL
========================================================= */

const Doctor =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);

export default Doctor;