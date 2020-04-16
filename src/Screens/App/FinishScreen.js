import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';



const FinishScreen = ({ gameLevel, resetGame }) => {

    const [userBestScore, setUserBestScore] = useState();
    useEffect(() => {
        getUserScore().then(res => {
            console.log("KAYITLI SKOR : " + res)
            if (gameLevel > Number.parseInt(res)) {
                axios.post(global.apiUrl + "/addRanking", { score: gameLevel, userId: global.userId }).then(result => {
                    console.log(result);
                })
                setUserScore(gameLevel.toString()).then(result => {
                    if (result) {
                        axios.post(global.apiUrl + "/addRanking", { score: gameLevel, userId: global.userId }).then(result => {
                            console.log(result);
                        })
                        setUserBestScore(gameLevel);
                    }
                })

            }
            else {
                setUserBestScore(res);
            }
        })

    }, [])


    const setUserScore = async (value) => {
        await localStorage.setItem("bestScore", value);
        return true;
    }

    const getUserScore = async () => {
        const userScore = await localStorage.getItem("bestScore");
        if (userScore) {
            return userScore;
        }
        return userScore;
    }


    return (
        <div className="gameContainer">
            <div className="game">
                <div className="login-box">
                    <div className="logo-title">OYUN BİTTİ</div>

                </div>
                <div className="login-box">
                    <div className="bestScore">SKORUN : {gameLevel}</div>
                    <div className="bestScore">EN İYİ : {userBestScore}</div>
                    <div className="login-bottom-cont">
                        <input onClick={() => resetGame()} type="button" className="replay"></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinishScreen;