import {User} from "../models/userSchema.js";

export const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

     const existingAdmin = await User.findOne({
     email: adminEmail,
     role: "Admin",
});

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

     await User.create({
      firstName: "Head",
      lastName: "Admin",
      email: adminEmail,
      password: adminPassword,
      role: "Admin",
      gender: "Male",
      dob: "2001-10-04",
      nic: "ADMIN001",
      phone: "01779543989",
    });


    console.log("Default Admin created successfully");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
  }
};