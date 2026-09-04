import express from "express";

import {
  getDoctorForAppointment,
  postAppointment,
  getMyAppointments,
  updateMyAppointment,
  deleteMyAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controller/appointmentController.js";

import {
  isPatientAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();


/* =========================================================
   PATIENT
========================================================= */

// Doctor information + schedule
router.get(
  "/doctor/:doctorId",
  isPatientAuthenticated,
  getDoctorForAppointment
);


// Book appointment
router.post(
  "/post",
  isPatientAuthenticated,
  postAppointment
);


// My appointments
router.get(
  "/my",
  isPatientAuthenticated,
  getMyAppointments
);


// Update my pending appointment
router.put(
  "/my/update/:id",
  isPatientAuthenticated,
  updateMyAppointment
);


// Delete my pending appointment
router.delete(
  "/my/delete/:id",
  isPatientAuthenticated,
  deleteMyAppointment
);


/* =========================================================
   ADMIN
========================================================= */

// All appointments
router.get(
  "/admin/all",
  isAdminAuthenticated,
  getAllAppointments
);


// Update status
router.put(
  "/admin/status/:id",
  isAdminAuthenticated,
  updateAppointmentStatus
);


// Delete appointment
router.delete(
  "/admin/delete/:id",
  isAdminAuthenticated,
  deleteAppointment
);


export default router;