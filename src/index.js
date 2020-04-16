import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


var test = localStorage.getItem("bestScore");

async function getUserId() {
  const userId = await localStorage.getItem("userId");
  return userId;
}

async function setUserId() {
  localStorage.setItem("userId", Math.floor(Math.random() * 9999999999))
  return true;
}
global.apiUrl = "http://brainmemory.herokuapp.com";

getUserId().then(result => {
  if (result) {
    global.userId = result;
  }
  else {
    setUserId();
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
