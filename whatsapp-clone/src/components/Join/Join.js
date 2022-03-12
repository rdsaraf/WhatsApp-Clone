import React, { useState } from 'react';
import './Join.css';
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

let user;

const Join = () => {

    const [name, setName] = useState("");

    const sendUser = ()=>{
        user = document.getElementById('joinInput').value;
        document.getElementById('joinInput').value = "";
    }

  return (
      <div className='joinPage'>
          <div className="joinContainer">
              <img src={logo} alt='Logo' />
              <h1>WhatsApp-Clone</h1>
              <input onChange={(e)=>setName(e.target.value)} type="text" name="joinInput" id="joinInput" placeholder='Enter Your Name'/>
              <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinBtn'>Login In</button></Link>
          </div>
      </div>
  );
};

export default Join;
export {user}