import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import GameScreen from './Screens/App/GameScreen';
import './App.css';



const LoginScreen = () => {

  const [randomUserName, setRandomUsername] = useState();
  const [bestScore, setBestScore] = useState(0);
  const [stepGame, setStepGame] = useState(false);

  const getUserData = async () => {
    const data = await Axios.get(global.apiUrl + "/user/" + global.userId);
    if (data) {
      await localStorage.setItem("bestScore", data.data.score.toString())
      await localStorage.setItem("username", data.data.userName.toString())
      return data.data;
    }
    await localStorage.setItem("bestScore", bestScore);
    await localStorage.setItem("username", global.randomUserName)
    return false;
  }

  const getOfflineUserData = async () => {
    const userName = await localStorage.getItem("username");
    return userName;
  }

  const Play = () => {
    if (randomUserName) {
      Axios.post(global.apiUrl + "/addRanking", { score: bestScore, userId: global.userId, userName: randomUserName }).then(result => {
        setStepGame(true);
      })
    }
    else {
      alert("Kullanıcı adı giriniz");
    }
  }

  const changeUsername = async (value) => {
    var userArray = {
      userName: value,
      id: global.userId,
    }
    await localStorage.setItem("username", value);
    await Axios.post(global.apiUrl + "/changeUsername", userArray);
    return true;
  }


  useEffect(() => {
    getUserData()
      .then(res => {
        if (res) {
          setRandomUsername(res.userName);
          setBestScore(res.score);
        }
      })
      .catch(error => {
        getOfflineUserData().then(res => {
          setRandomUsername(res);
        })
      })
    return () => {

    }
  }, [])
  return (
    <div className="gameContainer">
      {
        stepGame
          ?
          <GameScreen></GameScreen>
          :
          <div className="game">
            <div className="login-box">
              <div className="logo-title">BrainMemory</div>
              <div className="logo"></div>

            </div>
            <div className="login-box">
              <div className="bestScore">En iyi skorun : {bestScore}</div>
              <input type="text" onBlur={changeUsername} value={randomUserName} onChange={(e) => setRandomUsername(e.target.value)} className="randomusername" placeholder="Kullanıcı adı" />
              <div className="login-bottom-cont">
                <input onClick={Play} type="button" className="button"></input>
              </div>
            </div>
            Samet Özkan
          </div>
      }
    </div>
  )
}

export default LoginScreen;