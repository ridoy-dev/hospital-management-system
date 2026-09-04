import React, { useContext, useState,useEffect} from "react";
import { Context } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import "./Doctors.css"
const AllDoctors = () => {
  const { doctors } = useContext(Context);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [sort, setSort] = useState("default");
const navigate = useNavigate();
  // =========================
  // GET UNIQUE DEPARTMENTS
  // =========================

  const departments = [
    "All Departments",
    ...new Set(
      doctors
        ?.map((doctor) => doctor.department)
        .filter(Boolean)
    ),
  ];

  // =========================
  // SEARCH + FILTER
  // =========================

 let filteredDoctors =
  doctors?.filter((doctor) => {
    const searchText = search
      .toLowerCase()
      .replace(/[.\s]/g, "");

    const doctorName = doctor.name
      ?.toLowerCase()
      .replace(/[.\s]/g, "");

    const searchMatch = doctorName.includes(searchText);

    const departmentMatch =
      department === "All Departments" ||
      doctor.department === department;

    return searchMatch && departmentMatch;
  }) || [];
  // =========================
  // SORT
  // =========================

  if (sort === "a-z") {
    filteredDoctors = [...filteredDoctors].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "z-a") {
    filteredDoctors = [...filteredDoctors].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const {
  currentItems,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  goToPage,
} = usePagination(filteredDoctors, 6);

useEffect(() => {
  document.getElementById("doctor-list")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, [currentPage]);

  return (
    <div className="doctors-page"  id="doctor-list">

      {/* =========================
          HERO
      ========================= */}

      <section className="doctors-hero">

        <div className="hero-content">

          <p className="breadcrumb">
            Home <span>›</span> Doctors
          </p>

          <h1>All Doctors</h1>

          <p>
            Meet our highly skilled and compassionate doctors
            <br />
            who are dedicated to your well-being.
          </p>

        </div>

      </section>


      {/* =========================
          SEARCH / FILTER / SORT
      ========================= */}

      <section className="doctor-controls">

        {/* SEARCH */}

        <div className="control-box">

          <span className="control-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search doctors by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* DEPARTMENT */}

        <div className="control-box">

          <span className="control-icon">
            🏥
          </span>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >

            {departments.map((dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            ))}

          </select>

        </div>


        {/* SORT */}

        <div className="control-box">

          <span className="control-icon">
            ↕
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >

            <option value="default">
              Sort by: Default
            </option>

            <option value="a-z">
              Name (A - Z)
            </option>

            <option value="z-a">
              Name (Z - A)
            </option>

          </select>

        </div>

      </section>


      {/* =========================
          DOCTOR CARDS
      ========================= */}

      <section className="doctor-container" >

        {currentItems.length > 0 ? (

          currentItems.map((doctor) => (

            <div
              className="doctor-card"
              key={doctor._id}
            >

              {/* IMAGE */}

              <div className="doctor-image">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                />

              </div>


              {/* NAME */}

              <h2>
                {doctor.name}
              </h2>


              {/* DESIGNATION */}

              <p className="designation">
                {doctor.designation}
              </p>


              {/* SPECIALIZATION */}

              <p className="specialization">
                {doctor.specialization}
              </p>


              {/* DEPARTMENT */}

              <div className="department">

                <span>🏥</span>

                {doctor.department}

              </div>


              {/* QUALIFICATION */}

              <p className="qualification">
                {doctor.qualification}
              </p>


              {/* EXPERIENCE */}

              <p className="experience">
                <strong>
                  {doctor.experience}+
                </strong>{" "}
                Years Experience
              </p>


              {/* CHAMBER */}

              <p className="chamber">
                📍 {doctor.chamber}
              </p>


              {/* STATUS */}

              <div
                className={
                  doctor.isActive
                    ? "status active"
                    : "status inactive"
                }
              >

                <span></span>

                {doctor.isActive
                  ? "Available"
                  : "Unavailable"}

              </div>


              {/* BUTTON */}

              <button className="profile-btn" onClick={() => navigate(`/doctors/${doctor._id}`)}>
                View Profile
              </button>

            </div>

          ))

        ) : (

          <div className="no-doctors">

            <h2>
              No Doctors Found
            </h2>

            <p>
              Try another doctor name or department.
            </p>

          </div>

        )}

      </section>

     <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       nextPage={nextPage}
       prevPage={prevPage}
       goToPage={goToPage}
      />

    </div>
  );
};

export default AllDoctors;