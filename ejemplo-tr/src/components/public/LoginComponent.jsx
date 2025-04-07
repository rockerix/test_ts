import React, { useState,useEffect  } from 'react';
import '../../styles/containers.css';
import sprite from '../../assets/creditcard_sprite.png';
import sprite1 from '../../assets/creditcard_sprite_1.png';
import sprite2 from '../../assets/creditcard_sprite_2.png';
import sprite3 from '../../assets/creditcard_sprite_3.png';
import sprite4 from '../../assets/creditcard_sprite_4.png';
import sprite5 from '../../assets/creditcard_sprite_5.png';
import sprite6 from '../../assets/creditcard_sprite_6.png';
import {LoginService} from '../../services/authService';

const LoginComponent = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setActiveImage(0); 
  }, []);
  
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d{0,1}$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const enteredPin = pin.join('');

      if (enteredPin!=='' && enteredPin.length>3) {
      const userData = await LoginService(enteredPin);
      const [header,payload,stamp] = userData.token.split('.');
      const decodedPayload = JSON.parse(atob(base64UrlToBase64(payload)));
      
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('t', userData.token);
      sessionStorage.setItem('i', decodedPayload.idAccount);
      sessionStorage.setItem('banco', decodedPayload.bank);
      sessionStorage.setItem('name', decodedPayload.name);
      onLoginSuccess();
      }else{
        alert('Operation invalid, please enter your new PIN');
        clearPass();
      }

    }catch(err){
      alert('PIN invalid please try again');
      setPin(['', '', '', '']);
      document.getElementById(`pin-0`).focus();
    }

  };

  const base64UrlToBase64 = (base64Url) => {
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4;
      if (padding) {
          base64 += '='.repeat(4 - padding);
      }
      return base64;
  };

  const clearPass = () =>{
    setPin(['', '', '', '']);
    document.getElementById(`pin-0`).focus();
  }

  return (
       <div className="atm">
        
        <div className="contenedorTop">
        {activeImage === 0 && <img id="0" src={sprite} className="topImage" alt="" />}
        {activeImage === 1 && <img id="1" src={sprite1} className="topImage" alt="" />}
        {activeImage === 2 && <img id="2" src={sprite2} className="topImage" alt="" />}
        {activeImage === 3 && <img id="3" src={sprite3} className="topImage" alt="" />}
        {activeImage === 4 && <img id="4" src={sprite4} className="topImage" alt="" />}
        {activeImage === 5 && <img id="5" src={sprite5} className="topImage" alt="" />}
        {activeImage === 6 && <img id="6" src={sprite6} className="topImage" alt="" />}
      </div>
          <div className="screen">
              <p>Introduce your PIN</p>
              <form className="pin-form">
                <div className="pin-inputs">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="password"
                      id={`pin-${index}`}
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      maxLength="1"
                      autoFocus={index === 0}
                      inputMode="numeric"
                    />
                  ))}
                </div>
              </form>
              <div className="buttons-container">
                <div className="buttons-left">
                    <div className="button-container"><button className="button"></button><span></span></div>
                    <div className="button-container"><button className="button"></button><span></span></div>
                    <div className="button-container"><button className="button"></button><span></span></div>
                    <div className="button-container"><button className="button" onClick={clearPass}>&gt;</button><span>-Clean</span></div>
                </div>
                <div className="buttons-right">
                    <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                    <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                    <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                    <div className="button-container"><span>Login-</span><button className="button" onClick={handleSubmit}>&lt;</button></div>
                </div>
            </div>
          </div>
      </div>
  );
};

export default LoginComponent;
