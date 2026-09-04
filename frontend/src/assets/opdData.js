import doc1 from "./doc_1.png"
import doc2 from "./doc_2.png"
import doc3 from "./doc_3.png"
import doc4 from "./doc_4.png"
import doc5 from "./doc_5.png"
import doc6 from "./doc_6.png"
import doc7 from "./doc_7.png"
import doc8 from "./doc_8.png"
import doc9 from "./doc_9.png"

import doc10 from "./doc_10.png"
import doc11 from "./doc_11.png"
import doc12 from "./doc_12.png"
import doc13 from "./doc_13.png"
import doc14 from "./doc_14.png"
import doc15 from "./doc_15.png"
import doc16 from "./doc_16.png"
import doc17 from "./doc_17.png"
import doc18 from "./doc_18.png"
import doc19 from "./doc_19.png"
import doc20 from "./doc_20.png"






export const  days =[
  "All Days",
  "Sunday",
  "Monday",   
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export const specialists = [
   {
    specialist: "Pediatrics",
    icon: "🧒",
  },
  {
    specialist: "Orthopedics",
    icon: "🦴",
  },
  {
    specialist: "Cardiology",
    icon: "❤️",
  },
  {
    specialist: "Neurology",
    icon: "🧠",
  },
  {
    specialist: "Oncology",
    icon: "🎗️",
  },
  {
    specialist: "Radiology",
    icon: "🩻",
  },
  {
    specialist: "Physical Therapy",
    icon: "🏃",
  },
  {
    specialist: "Dermatology",
    icon: "🧴",
  },
  {
    specialist: "ENT",
    icon: "👂",
  },
  {
  specialist: "Sexology",
  icon: "🩺",
},
];


export const doctorsData = [
  {
    _id: "doctor001",
    name: "Dr. Ahmed Rahman",
    image: doc1,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Pediatrics)",
    specialization: "Pediatrics",
    department: "Pediatrics",
    schedules: [
      { day: "Sunday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Tuesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Thursday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 201",
    experience: 12,
    isActive: true,
  },

  {
    _id: "doctor002",
    name: "Dr. Nusrat Jahan",
    image: doc2,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Pediatrics)",
    specialization: "Pediatrics",
    department: "Pediatrics",
    schedules: [
      { day: "Sunday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Tuesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Thursday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 302",
    experience: 8,
    isActive: true,
  },

  {
    _id: "doctor003",
    name: "Dr. Farhan Kabir",
    image: doc3,
    designation: "Consultant",
    qualification: "MBBS, MD (Pediatrics)",
    specialization: "Pediatrics",
    department: "Pediatrics",
    schedules: [
      { day: "Monday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Wednesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Friday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 305",
    experience: 10,
    isActive: true,
  },

  {
    _id: "doctor004",
    name: "Dr. Samia Ahmed",
    image: doc4,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Pediatrics)",
    specialization: "Pediatrics",
    department: "Pediatrics",
    schedules: [
      { day: "Sunday", startTime: "10:00 AM", endTime: "01:00 PM" },
      { day: "Tuesday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Thursday", startTime: "09:00 AM", endTime: "12:00 PM" },
    ],
    chamber: "Room 210",
    experience: 14,
    isActive: true,
  },

  {
    _id: "doctor005",
    name: "Dr. Tanvir Hasan",
    image: doc5,
    designation: "Consultant",
    qualification: "MBBS, MS (Orthopedics)",
    specialization: "Orthopedics",
    department: "Orthopedics",
    schedules: [
      { day: "Sunday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Wednesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Friday", startTime: "04:00 PM", endTime: "07:00 PM" },
    ],
    chamber: "Room 401",
    experience: 9,
    isActive: true,
  },

  {
    _id: "doctor006",
    name: "Dr. Sadia Karim",
    image: doc6,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Dermatology)",
    specialization: "Dermatology",
    department: "Dermatology",
    schedules: [
      { day: "Monday", startTime: "10:00 AM", endTime: "01:00 PM" },
      { day: "Wednesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Saturday", startTime: "09:00 AM", endTime: "12:00 PM" },
    ],
    chamber: "Room 205",
    experience: 7,
    isActive: true,
  },

  {
    _id: "doctor007",
    name: "Dr. Imran Hossain",
    image: doc7,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Orthopedics)",
    specialization: "Orthopedics",
    department: "Orthopedics",
    schedules: [
      { day: "Sunday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Tuesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Friday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 402",
    experience: 15,
    isActive: true,
  },

  {
    _id: "doctor008",
    name: "Dr. Rafia Sultana",
    image: doc8,
    designation: "Consultant",
    qualification: "MBBS, DCH, FCPS (Orthopedics)",
    specialization: "Orthopedics",
    department: "Orthopedics",
    schedules: [
      { day: "Monday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Thursday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Saturday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 108",
    experience: 11,
    isActive: true,
  },

  {
    _id: "doctor009",
    name: "Dr. Mahmudul Hasan",
    image: doc9,
    designation: "Consultant",
    qualification: "MBBS, FCPS (ENT)",
    specialization: "ENT",
    department: "ENT",
    schedules: [
      { day: "Sunday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Tuesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Thursday", startTime: "04:00 PM", endTime: "07:00 PM" },
    ],
    chamber: "Room 207",
    experience: 8,
    isActive: true,
  },

  {
    _id: "doctor010",
    name: "Dr. Tahmina Akter",
    image: doc10,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Cardiology)",
    specialization: "Cardiology",
    department: "Cardiology",
    schedules: [
      { day: "Monday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Wednesday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Saturday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 109",
    experience: 13,
    isActive: true,
  },

  {
    _id: "doctor011",
    name: "Dr. Arif Chowdhury",
    image: doc11,
    designation: "Consultant",
    qualification: "MBBS, MD (Cardiology)",
    specialization: "Cardiology",
    department: "Cardiology",
    schedules: [
      { day: "Sunday", startTime: "10:00 AM", endTime: "01:00 PM" },
      { day: "Tuesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Thursday", startTime: "03:00 PM", endTime: "06:00 PM" },
    ],
    chamber: "Room 310",
    experience: 9,
    isActive: true,
  },

  {
    _id: "doctor012",
    name: "Dr. Mehedi Hasan",
    image:doc12,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Radiology)",
    specialization: "Radiology",
    department: "Radiology",
    schedules: [
      { day: "Monday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Wednesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Friday", startTime: "03:00 PM", endTime: "06:00 PM" },
    ],
    chamber: "Room 405",
    experience: 10,
    isActive: true,
  },

  {
    _id: "doctor013",
    name: "Dr. Fariha Rahman",
    image:doc13,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Nephrology)",
    specialization: "Neurology",
    department: "Nephrology",
    schedules: [
      { day: "Sunday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Wednesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Saturday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 308",
    experience: 7,
    isActive: true,
  },

  {
    _id: "doctor014",
    name: "Dr. Kamrul Islam",
    image:doc14,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Neurology)",
    specialization: "Neurology",
    department: "Neurology",
    schedules: [
      { day: "Monday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Thursday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Friday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 312",
    experience: 16,
    isActive: true,
  },

  {
    _id: "doctor015",
    name: "Dr. Jannatul Ferdous",
    image:doc15,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Oncology)",
    specialization: "Oncology",
    department: "Oncology ",
    schedules: [
      { day: "Sunday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Tuesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Saturday", startTime: "03:00 PM", endTime: "06:00 PM" },
    ],
    chamber: "Room 215",
    experience: 8,
    isActive: true,
  },

  {
    _id: "doctor016",
    name: "Dr. Saiful Islam",
    image: doc16,
    designation: "Consultant",
    qualification: "MBBS, MS (ENT)",
    specialization: "ENT",
    department: "ENT",
    schedules: [
      { day: "Monday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Wednesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Friday", startTime: "04:00 PM", endTime: "07:00 PM" },
    ],
    chamber: "Room 410",
    experience: 12,
    isActive: true,
  },

  {
    _id: "doctor017",
    name: "Dr. Mahrin Tasnim",
    image: doc17,
    designation: "Consultant",
    qualification: "MBBS, FCPS (ENT)",
    specialization: "ENT",
    department: "ENT",
    schedules: [
      { day: "Sunday", startTime: "10:00 AM", endTime: "01:00 PM" },
      { day: "Tuesday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Thursday", startTime: "09:00 AM", endTime: "12:00 PM" },
    ],
    chamber: "Room 216",
    experience: 9,
    isActive: true,
  },

  {
    _id: "doctor018",
    name: "Dr. Rakibul Hasan",
    image: doc18,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Dermatology)",
    specialization: " Dermatology",
    department: "Dermatology",
    schedules: [
      { day: "Monday", startTime: "10:00 AM", endTime: "01:00 PM" },
      { day: "Wednesday", startTime: "04:00 PM", endTime: "07:00 PM" },
      { day: "Saturday", startTime: "09:00 AM", endTime: "12:00 PM" },
    ],
    chamber: "Room 502",
    experience: 11,
    isActive: true,
  },

  {
    _id: "doctor019",
    name: "Dr. Sharmeen Yasmin",
    image: doc19,
    designation: "Senior Consultant",
    qualification: "MBBS, FCPS (Physical Therapy)",
    specialization: "Physical Therapy",
    department: "Physical Therapy",
    schedules: [
      { day: "Sunday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Thursday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Saturday", startTime: "10:00 AM", endTime: "01:00 PM" },
    ],
    chamber: "Room 218",
    experience: 14,
    isActive: true,
  },

  {
    _id: "doctor020",
    name: "Dr. Omar Faruk",
    image:doc20,
    designation: "Consultant",
    qualification: "MBBS, FCPS (Radiology)",
    specialization: "Radiology",
    department: "Radiology",
    schedules: [
      { day: "Tuesday", startTime: "09:00 AM", endTime: "12:00 PM" },
      { day: "Wednesday", startTime: "03:00 PM", endTime: "06:00 PM" },
      { day: "Friday", startTime: "09:00 AM", endTime: "12:00 PM" },
    ],
    chamber: "Room 305",
    experience: 10,
    isActive: true,
  },
];