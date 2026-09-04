import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Doctor from "../models/doctorsSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import cloudinary from "cloudinary";


export const addNewDoctor = catchAsyncErrors(
  async (req, res, next) => {

    // =========================
    // CHECK IMAGE
    // =========================

    if (
      !req.files ||
      Object.keys(req.files).length === 0
    ) {
      return next(
        new ErrorHandler(
          "Doctor Image Required!",
          400
        )
      );
    }

    const { docAvatar } = req.files;

    // =========================
    // CHECK IMAGE FORMAT
    // =========================

    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(
        new ErrorHandler(
          "File Format Not Supported!",
          400
        )
      );
    }


    // =========================
    // GET FORM DATA
    // =========================

    const {
      name,
      email,
      password,
      designation,
      qualification,
      specialization,
      department,
      schedules,
      chamber,
      experience,
      isActive,
    } = req.body;


    // =========================
    // CHECK REQUIRED FIELDS
    // =========================

    if (
      !name ||
      !email ||
      !password ||
      !designation ||
      !qualification ||
      !specialization ||
      !department ||
      !chamber ||
      experience === undefined
    ) {
      return next(
        new ErrorHandler(
          "Please Fill Full Form!",
          400
        )
      );
    }


    // =========================
    // CHECK EMAIL
    // =========================

    const isRegistered = await Doctor.findOne({
      email,
    });

    if (isRegistered) {
      return next(
        new ErrorHandler(
          "Doctor With This Email Already Exists!",
          400
        )
      );
    }


    // =========================
    // UPLOAD IMAGE TO CLOUDINARY
    // =========================

    const cloudinaryResponse =
      await cloudinary.uploader.upload(
        docAvatar.tempFilePath
      );


    if (
      !cloudinaryResponse ||
      cloudinaryResponse.error
    ) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error ||
          "Unknown Cloudinary error"
      );

      return next(
        new ErrorHandler(
          "Failed To Upload Doctor Image To Cloudinary",
          500
        )
      );
    }


    // =========================
    // CREATE DOCTOR
    // =========================

    const doctor = await Doctor.create({
      name,

      email,

      password,

      image: cloudinaryResponse.secure_url,

      designation,

      qualification,

      specialization,

      department,

      schedules: schedules
        ? JSON.parse(schedules)
        : [],

      chamber,

      experience,

      isActive:
  isActive !== undefined
    ? isActive === "true"
    : true,
    });


    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({
      success: true,

      message: "New Doctor Registered Successfully",

      doctor,
    });
  }
);


export const getAllDoctors = catchAsyncErrors(
  async (req, res, next) => {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      doctors,
    });
  }
);


export const updateDoctor = catchAsyncErrors(
  async (req, res, next) => {

    const { id } = req.params;

    const {
      name,
      email,
      designation,
      qualification,
      specialization,
      department,
      schedules,
      chamber,
      experience,
      isActive,
    } = req.body;

    // Doctor খুঁজে বের করছি
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(
        new ErrorHandler(
          "Doctor Not Found!",
          404
        )
      );
    }

    // নতুন data update করছি
    doctor.name = name ?? doctor.name;
    doctor.email = email ?? doctor.email;
    doctor.designation =
      designation ?? doctor.designation;
    doctor.qualification =
      qualification ?? doctor.qualification;
    doctor.specialization =
      specialization ?? doctor.specialization;
    doctor.department =
      department ?? doctor.department;
    doctor.chamber =
      chamber ?? doctor.chamber;
    doctor.experience =
      experience ?? doctor.experience;
    doctor.isActive =
      isActive !== undefined
        ? isActive
        : doctor.isActive;

    // schedules update
    if (schedules) {
      doctor.schedules = JSON.parse(schedules);
    }

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      doctor,
    });
  }
);

export const deleteDoctor = catchAsyncErrors(
  async (req, res, next) => {

    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return next(
        new ErrorHandler(
          "Doctor Not Found!",
          404
        )
      );
    }

    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
    });
  }
);