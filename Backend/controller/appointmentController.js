import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

import Appointment from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import Doctor from "../models/doctorsSchema.js";


/* =========================================================
   GET DOCTOR FOR APPOINTMENT

   Patient doctor details page থেকে appointment page-এ আসবে
   URL:
   /api/v1/appointment/doctor/:doctorId
========================================================= */

export const getDoctorForAppointment = catchAsyncErrors(
  async (req, res, next) => {

    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return next(
        new ErrorHandler("Doctor not found!", 404)
      );
    }

    res.status(200).json({
      success: true,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        department: doctor.department,
        specialization: doctor.specialization,
        chamber: doctor.chamber,
        schedules: doctor.schedules || [],
      },
    });
  }
);


/* =========================================================
   CREATE APPOINTMENT

   Patient doctor-এর schedule থেকে day/time select করবে
========================================================= */

export const postAppointment = catchAsyncErrors(
  async (req, res, next) => {

    const {
      doctorId,
      day,
      appointmentTime,
      reasonForVisit,
    } = req.body;


    /* =========================
       REQUIRED FIELDS
    ========================= */

    if (
      !doctorId ||
      !day ||
      !appointmentTime ||
      !reasonForVisit
    ) {
      return next(
        new ErrorHandler(
          "Please fill all required appointment fields!",
          400
        )
      );
    }


    /* =========================
       FIND PATIENT
    ========================= */

    const patient = await User.findById(req.user._id);

    if (!patient) {
      return next(
        new ErrorHandler("Patient not found!", 404)
      );
    }


    /* =========================
       CHECK PATIENT ROLE
    ========================= */

    if (patient.role !== "Patient") {
      return next(
        new ErrorHandler(
          "Only patients can book appointments!",
          403
        )
      );
    }


    /* =========================
       FIND DOCTOR
    ========================= */

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return next(
        new ErrorHandler("Doctor not found!", 404)
      );
    }


    /* =========================
       CHECK DOCTOR SCHEDULE
    ========================= */

    const selectedSchedule = doctor.schedules?.find(
      (schedule) => schedule.day === day
    );

    if (!selectedSchedule) {
      return next(
        new ErrorHandler(
          `Doctor is not available on ${day}!`,
          400
        )
      );
    }


    /* =========================
       CHECK DUPLICATE SLOT

       একই doctor + same day + same time
       Pending/Confirmed appointment থাকলে
       অন্য patient নিতে পারবে না
    ========================= */

    const existingAppointment =
      await Appointment.findOne({
        doctorId,
        day,
        appointmentTime,
        status: {
          $in: ["Pending", "Confirmed"],
        },
      });

    if (existingAppointment) {
      return next(
        new ErrorHandler(
          "This appointment slot is already booked!",
          409
        )
      );
    }


    /* =========================
       CREATE APPOINTMENT
    ========================= */

    const appointment = await Appointment.create({

      /* Patient */

      patientId: patient._id,

      patientName:
        `${patient.firstName} ${patient.lastName}`,

      email: patient.email,

      phone: patient.phone,

      gender: patient.gender,


      /* Doctor */

      doctorId: doctor._id,

      doctorName: doctor.name,

      department: doctor.department,

      specialization: doctor.specialization,


      /* Appointment */

      day,

      appointmentTime,

      chamber: doctor.chamber,

      reasonForVisit,


      /* Status */

      status: "Pending",
    });


    /* =========================
       RESPONSE
    ========================= */

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment,
    });
  }
);


/* =========================================================
   GET MY APPOINTMENTS

   Patient শুধুমাত্র নিজের appointment দেখতে পারবে
========================================================= */

export const getMyAppointments = catchAsyncErrors(
  async (req, res, next) => {

    const appointments =
      await Appointment.find({
        patientId: req.user._id,
      })
        .populate(
          "doctorId",
          "name department specialization chamber schedules"
        )
        .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  }
);


/* =========================================================
   UPDATE MY APPOINTMENT

   শুধু Pending appointment update করা যাবে
========================================================= */

export const updateMyAppointment = catchAsyncErrors(
  async (req, res, next) => {

    const { id } = req.params;

    const {
      day,
      appointmentTime,
      reasonForVisit,
    } = req.body;


    /* =========================
       FIND APPOINTMENT
    ========================= */

    const appointment =
      await Appointment.findById(id);

    if (!appointment) {
      return next(
        new ErrorHandler(
          "Appointment not found!",
          404
        )
      );
    }


    /* =========================
       CHECK OWNER
    ========================= */

    if (
      appointment.patientId.toString() !==
      req.user._id.toString()
    ) {
      return next(
        new ErrorHandler(
          "You are not allowed to update this appointment!",
          403
        )
      );
    }


    /* =========================
       ONLY PENDING
    ========================= */

    if (appointment.status !== "Pending") {
      return next(
        new ErrorHandler(
          "Only pending appointments can be updated!",
          400
        )
      );
    }


    /* =========================
       REQUIRED
    ========================= */

    if (
      !day ||
      !appointmentTime ||
      !reasonForVisit
    ) {
      return next(
        new ErrorHandler(
          "Please provide all appointment details!",
          400
        )
      );
    }


    /* =========================
       FIND DOCTOR
    ========================= */

    const doctor =
      await Doctor.findById(
        appointment.doctorId
      );

    if (!doctor) {
      return next(
        new ErrorHandler(
          "Doctor not found!",
          404
        )
      );
    }


    /* =========================
       CHECK SCHEDULE
    ========================= */

    const selectedSchedule =
      doctor.schedules?.find(
        (schedule) =>
          schedule.day === day
      );

    if (!selectedSchedule) {
      return next(
        new ErrorHandler(
          `Doctor is not available on ${day}!`,
          400
        )
      );
    }


    /* =========================
       CHECK SLOT
    ========================= */

    const existingAppointment =
      await Appointment.findOne({
        _id: { $ne: id },

        doctorId: appointment.doctorId,

        day,

        appointmentTime,

        status: {
          $in: ["Pending", "Confirmed"],
        },
      });

    if (existingAppointment) {
      return next(
        new ErrorHandler(
          "This appointment slot is already booked!",
          409
        )
      );
    }


    /* =========================
       UPDATE
    ========================= */

    appointment.day = day;

    appointment.appointmentTime =
      appointmentTime;

    appointment.chamber =
      doctor.chamber;

    appointment.reasonForVisit =
      reasonForVisit;


    await appointment.save();


    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully!",
      appointment,
    });
  }
);


/* =========================================================
   DELETE MY APPOINTMENT

   Patient:
   Pending → Delete allowed
   Others → Delete not allowed
========================================================= */

export const deleteMyAppointment =
  catchAsyncErrors(
    async (req, res, next) => {

      const { id } = req.params;


      const appointment =
        await Appointment.findById(id);

      if (!appointment) {
        return next(
          new ErrorHandler(
            "Appointment not found!",
            404
          )
        );
      }


      /* =========================
         OWNER CHECK
      ========================= */

      if (
        appointment.patientId.toString() !==
        req.user._id.toString()
      ) {
        return next(
          new ErrorHandler(
            "You are not allowed to delete this appointment!",
            403
          )
        );
      }


      /* =========================
         ONLY PENDING
      ========================= */

      if (appointment.status !== "Pending") {
        return next(
          new ErrorHandler(
            "Only pending appointments can be deleted!",
            400
          )
        );
      }


      await appointment.deleteOne();


      res.status(200).json({
        success: true,
        message:
          "Appointment deleted successfully!",
      });
    }
  );


/* =========================================================
   ADMIN GET ALL APPOINTMENTS
========================================================= */

export const getAllAppointments =
  catchAsyncErrors(
    async (req, res, next) => {

      const appointments =
        await Appointment.find()

          .populate(
            "patientId",
            "firstName lastName email phone gender"
          )

          .populate(
            "doctorId",
            "name department specialization chamber"
          )

          .sort({ createdAt: -1 });


      res.status(200).json({
        success: true,
        count: appointments.length,
        appointments,
      });
    }
  );


/* =========================================================
   ADMIN UPDATE STATUS

   Admin:
   Pending
   Confirmed
   Completed
   Cancelled
========================================================= */

export const updateAppointmentStatus =
  catchAsyncErrors(
    async (req, res, next) => {

      const { id } = req.params;

      const { status } = req.body;


      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ];


      if (!status) {
        return next(
          new ErrorHandler(
            "Appointment status is required!",
            400
          )
        );
      }


      if (!allowedStatuses.includes(status)) {
        return next(
          new ErrorHandler(
            "Invalid appointment status!",
            400
          )
        );
      }


      const appointment =
        await Appointment.findById(id);

      if (!appointment) {
        return next(
          new ErrorHandler(
            "Appointment not found!",
            404
          )
        );
      }


      appointment.status = status;

      await appointment.save();


      res.status(200).json({
        success: true,
        message:
          "Appointment status updated successfully!",
        appointment,
      });
    }
  );


/* =========================================================
   ADMIN DELETE APPOINTMENT
========================================================= */

export const deleteAppointment =
  catchAsyncErrors(
    async (req, res, next) => {

      const { id } = req.params;


      const appointment =
        await Appointment.findById(id);

      if (!appointment) {
        return next(
          new ErrorHandler(
            "Appointment not found!",
            404
          )
        );
      }


      await appointment.deleteOne();


      res.status(200).json({
        success: true,
        message:
          "Appointment deleted successfully!",
      });
    }
  );