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
import {checkBalance,withdrawMoney} from '../../services/accountService';

const WithdrawComponent = () => {
    const [activeImage, setActiveImage] = useState(null);
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState(0);
  

    const navigate = useNavigate();
  
    useEffect(() => {
      const bancoSesion = sessionStorage.getItem('banco');
      setActiveImage(parseInt(bancoSesion, 10));  
      document.getElementById(`amountNumber`).focus();

      async function getBalance(){
        try{
          const res = await checkBalance(sessionStorage.getItem('i'));
          setBalance(res.balance);
        }catch (e){
          alert('Connection Error');
        }
      }
      getBalance();

    }, []);



  const handleWithdraw = async() => {

    if(amount!==NaN && amount>0){
        if (parseFloat(amount) > balance) {
          alert('insufficient funds');
          setAmount('');
        } else {

          try{
            const res = await withdrawMoney(sessionStorage.getItem('i'),amount);
            setBalance(parseFloat(balance) - parseFloat(amount));
            alert(`You have withdrawn $${amount}, Your remaining balance is $${parseFloat(balance) - parseFloat(amount)}`);
            navigate('main');
          }catch(err){
            alert('Connection Error');
          }
        }

      }else{
        alert("Enter an amount");
      }
  };

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
          <p>Amount to withdraw</p>
          <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$"
              id='amountNumber'
            />
          <p>Current balance: ${balance}</p>
          <div className="buttons-container">
            <div className="buttons-left">
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button"></button><span></span></div>
                <div className="button-container"><button className="button" onClick={() => handleRedirect('/main')}>&gt;</button><span>-Back Main</span></div>
            </div>
            <div className="buttons-right">
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><button className="button"></button></div>
                <div className="button-container"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Withdraw-</span><button className="button" onClick={() => handleWithdraw()}>&lt;</button></div>
            </div>
        </div>
      </div>
  </div>
  );
};

export default WithdrawComponent;
