import React, { useState,useEffect  } from 'react';
import '../../styles/containers.css';
import sprite from '../../assets/creditcard_sprite.png';
import sprite1 from '../../assets/creditcard_sprite_1.png';
import sprite2 from '../../assets/creditcard_sprite_2.png';
import sprite3 from '../../assets/creditcard_sprite_3.png';
import sprite4 from '../../assets/creditcard_sprite_4.png';
import sprite5 from '../../assets/creditcard_sprite_5.png';
import sprite6 from '../../assets/creditcard_sprite_6.png';
import { useNavigate } from 'react-router-dom';

const MainComponent = ({ onLogout }) => {
    const [activeImage, setActiveImage] = useState(null);
    const [completeName, setCompleteName] = useState('');

    const navigate = useNavigate();
  
    useEffect(() => {
      const bancoSesion = sessionStorage.getItem('banco');
      setActiveImage(parseInt(bancoSesion, 10)); 
      const name = sessionStorage.getItem('name');
      setCompleteName(name);
    }, []);

    const handleRedirect = (route) => {
      navigate(route);
    };

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
        <h2>Hi {completeName}!</h2>
          <h2>Please make a choice...</h2>

          <div className="buttons-container">
            <div className="buttons-left">
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button" onClick={() => handleRedirect('/withdraw')}>&gt;</button><span>-Withdraw</span></div>
                <div className="button-container"><button className="button" onClick={() => handleRedirect('/deposit')}>&gt;</button><span>-Deposit</span></div>
            </div>
            <div className="buttons-right">
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"  onClick={onLogout}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exit-</span><button className="button">&lt;</button></div>
                <div className="button-container" onClick={() => handleRedirect('/balance')}><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Balance-</span><button className="button">&lt;</button></div>
                <div className="button-container" onClick={() => handleRedirect('/change-pin')}><span>Re-Enter PIN-</span><button className="button">&lt;</button></div>
            </div>
        </div>
      </div>
  </div>
  );
};

export default MainComponent;
