import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import socketIo from 'socket.io-client'
import './Chat.css'
import sendLogo from '../../images/send.png'
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../images/closeIcon.png'

const ENDPOINT = "https://rd-whatsapp-clone.herokuapp.com/";
let socket;

const Chat = () => {

    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);

    const send = ()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit("message",{message, id});
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {  
        socket = socketIo(ENDPOINT, {transports:['websocket']});
        socket.on("connect", ()=>{
            alert("Connected!");
            setId(socket.id);
        })
        socket.emit("joined",{user})
        socket.on("welcome",(data)=>{
            setMessages([...messages,data]);
        })
        socket.on("userJoined",(data)=>{
            setMessages([...messages,data]);
        })
        socket.on("leave",(data)=>{
            setMessages([...messages,data]);
        })
        return ()=>{
            socket.emit("disconnect");
            socket.off();
        }
    }, []);
    
    useEffect(() => {
      socket.on("sendMessage",(data)=>{
        setMessages([...messages,data]);
      })
      return ()=>{
          socket.off();
      }
    }, [messages]);
    

  return (
      <div className='chatPage'>
          <div className="chatContainer">
              <div className="chatHeader">
                <h2>WhatsApp-Clone</h2>
                <a href="/"><img src={closeIcon} alt="closeIcon" /></a>
              </div>
              <ReactScrollToBottom className="chatBox">
                {messages.map((item,i)=> <Message message={item.message} user={item.id===id?'':item.user} classs={item.id === id?'right':'left'} key={i} />)}
              </ReactScrollToBottom>
              <div className="inputBox">
                <input onKeyPress={(event)=>event.key === 'Enter' ? send() : null} type="text" name="chatInput" id="chatInput" />
                <button onClick={send} className='sendBtn'><img src={sendLogo} alt='send' /></button>
              </div>
          </div>
      </div>
  );
};

export default Chat;
