import React, { useEffect, useState } from 'react';
import Axios from 'axios';



const LoginScreen = () => {

    const [randomUserName, setRandomUsername] = useState();

    const getUserData = async () => {
        const data = await Axios.get(global.apiUrl + "/user/" + global.userId);
        if (data) {
            await localStorage.setItem("bestScore", data.data.score.toString())
            await localStorage.setItem("username", data.data.userName.toString())
            return data.data;
        }
        await localStorage.setItem("bestScore", "0");
        await localStorage.setItem("username", global.randomUserName)
        return false;
    }

    const getOfflineUserData = async () => {
        const userName = await localStorage.getItem("username");
        return userName;
    }

    const changeUsername = async (value) => {
        var userArray = {
            userName: value,
            id: global.userId,
        }
        await localStorage.setItem("username", value);
        await global.server.emit("changeUsername", userArray);
        return true;
    }


    useEffect(() => {
        getUserData()
            .then(res => {
                if (res) {
                    setRandomUsername(res.userName);
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
        <div className="game">
            <div className="login-box">
                <div className="logo-title">BrainMemory</div>
                <div className="logo"></div>

            </div>
            <div className="login-box">
                <input value={randomUserName} type="text" className="randomusername" placeholder="Kullanıcı adı"></input>
                <div className="login-bottom-cont">
                    <input type="button" className="button"></input>
                    <input type="button" className="button"></input>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;