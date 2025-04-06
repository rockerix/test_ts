import React from "react";
import '../../styles/header.css';
import atmSign from '../../assets/atm_sign.png';
import grafi from '../../assets/graffiti.png';

const HeaderComponent=()=>{
    return (
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <header className="header">
          <img src={atmSign} alt="ATM Sign" className="header-image" />
          <img src={grafi} alt="Overlay" className="overlay-image" />
        </header>
        </div>
      );
    };

export default HeaderComponent;