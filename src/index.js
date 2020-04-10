import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';


async function getUsername() {
  const userName = await localStorage.getItem("userName");
  return userName;
}

async function setUsername(value) {
  await localStorage.setItem("userName", value);
  return true;
}

if (!global.server) {
  global.server = io("http://brainmemory.herokuapp.com");
}

global.userId = Math.floor(Math.random() * 999999);
global.userName = "user" + Math.floor(Math.random() * 999999);
global.server.emit("addRanking", { score: 0, userId: global.userId, userName: global.userName });
getUsername().then(result => {
  console.log(result);
  if (!result) {
    setUsername(global.userName);
  }
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
