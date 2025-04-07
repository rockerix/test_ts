import React, { useState,useEffect  } from 'react';
import moment from 'moment';
import '../../styles/containers.css';
import sprite from '../../assets/creditcard_sprite.png';
import sprite1 from '../../assets/creditcard_sprite_1.png';
import sprite2 from '../../assets/creditcard_sprite_2.png';
import sprite3 from '../../assets/creditcard_sprite_3.png';
import sprite4 from '../../assets/creditcard_sprite_4.png';
import sprite5 from '../../assets/creditcard_sprite_5.png';
import sprite6 from '../../assets/creditcard_sprite_6.png';
import { useNavigate } from 'react-router-dom';
import {checkBalance,getBalanceDetail} from '../../services/accountService';

const BalanceComponent = () => {

    const [activeImage, setActiveImage] = useState(null);
    const [balance,setBalance] = useState(0);
    const [balanceDetail,setBalanceDetail] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      const bancoSesion = sessionStorage.getItem('banco');
      setActiveImage(parseInt(bancoSesion, 10)); 

      async function getBalance(){
        try{
          const res = await checkBalance(sessionStorage.getItem('i'));
          setBalance(res.balance);
        }catch (e){
          alert('Connection Error');
        }
      }
      getBalance();


      async function getBalanceDetailById(){
        try{
          const res = await getBalanceDetail(sessionStorage.getItem('i'));
          console.log(res);
          setBalanceDetail(res.balanceDetail);
        }catch (e){
          alert('Connection Error');
        }
      }
      getBalanceDetailById();

    }, []);
  

    const handleRedirect = (route) => {
      navigate(route);
    };

    const printReceipt = () =>{
      alert('Receipt Printed!');
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
          <p>Actual Balance: ${balance}</p>
          <div>
          <h3>Here shows your last 5 movements, you can print more detail</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {balanceDetail.map((item, index) => {
                  const formattedDate = moment(item.fecha).format('DD/MM/YYYY');
                return(
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td>{formattedDate}</td>
                  </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
          <div className="buttons-container">
            <div className="buttons-left">
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button" onClick={() => handleRedirect('/main')}>&gt;</button><span>-Back Main</span></div>
            </div>
            <div className="buttons-right">
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>Print-</span><button className="button" onClick={() => printReceipt()}>&lt;</button></div>
            </div>
        </div>
      </div>
  </div>

  );
};

export default BalanceComponent;
