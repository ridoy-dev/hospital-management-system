import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
           Welcome to ABC Medical Institute, where advanced medical innovation meets compassionate healthcare. Established with a commitment to human well-being, we strive to deliver top-tier, patient-centric medical care tailored to every individual's unique needs.
          </p>
          <p>
          Our institute is equipped with state-of-the-art diagnostic tools, cutting-edge surgical units, and a dedicated team of world-class physicians, nurses, and specialists across various medical disciplines—from Cardiology and Neurology to Pediatrics and Orthopedics.   
        </p>
          <p>
            At ABC Medical Institute, we believe that healing goes beyond treatment. We focus on creating a supportive, transparent, and comfortable environment for our patients and their families, ensuring seamless healthcare management from consultation to recovery.
          </p>
         
        </div>
      </div>
    </>
  );
};

export default Biography;