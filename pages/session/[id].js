import socketIOClient from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import { useRouter } from 'next/router'
import ModalCreateUser from './modal-create-user';

const ENDPOINT = 'http://127.0.0.1:3001';
const socket = socketIOClient(ENDPOINT, {
  extraHeaders: {
    'Access-Control-Allow-Origin': '*'
  }
});

export default function Session() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState({usersList: null});
  const [thisUser, setThisUser] = useState('');
  const [thisMsg, setThisMsg] = useState('');
  const [messages, setMessages] = useState({listTheseMessages: []});
  
  useEffect(() => {
    let userName = localStorage.getItem('name');
    if(userName == undefined)
    {
      setShowModal(true);
    }
    else if (!router.isReady) return;
  
    let sessionID = JSON.stringify(router.query);
    setThisUser(userName);
    socket.emit('addUser', {session_id: sessionID, user_name: userName});

    socket.on('users', data => {
      setUsers({ usersList: JSON.parse(data) })
    });

    socket.on('getMessage', msg => {
      if(msg)
      {
        let listMessages = messages.listTheseMessages;
        listMessages.push(msg);
        setMessages({ listTheseMessages: listMessages });
      }
    });
  }, [router.isReady]);

  const sendMessage = () => {
    if(thisUser && thisMsg)
    {
      socket.emit('message', `${thisUser}: ${thisMsg}`);
    }
  }

  return (
    <div>
      <ModalCreateUser
        onClose={() => setShowModal(false)}
        show={showModal}
      ></ModalCreateUser>

      <div>
        <h5 className=''>Participants: {users.usersList?.length}</h5>
        <table className='table'>
          <tbody>
            {users.usersList?.map(user => {
              return (<tr key={user.id}>
                <td>{user.userName}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h5 className=''>Chat</h5>
        <div>
          {messages.listTheseMessages?.map((msg, index) => { return (<div className="d-flex justify-content-center" key={index}> {msg} <small style={{ marginLeft: "18px", color: "blue", marginTop: "5px" }}> </small> </div>) })}
        </div>
        <div>
          <Input onChange={(event) => setThisMsg(event.target.value)}></Input>
          <Button onClick={() => {sendMessage()}}>Enter!</Button>
        </div>

      </div>

    </div >
  );
}