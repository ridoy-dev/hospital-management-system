import express from "express";

import { addNewDoctor,updateDoctor,getAllDoctors,deleteDoctor } from "../controller/doctorsController.js"; 
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post("/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/get-all", getAllDoctors);


router.put(
  "/:id",
  isAdminAuthenticated,
  updateDoctor
);

router.delete(
  "/:id",
  isAdminAuthenticated,
  deleteDoctor
);


export default router;
