import React, { useState, useEffect, } from 'react';
import FinishScreen from './FinishScreen';
import '../../App.css';
//Oyunun seçtiği sayılar
var gameRandomSelectedBox = [];
//Kullanıcının seçtiği sayılar
var userSelectedBox = [];
//Level 10dan sonra kutuların yerlerlerini değiştirmek için gerekli array.
var randomGameBoxs = [];
// randomBoxCount
var randomBoxCount = 0;

var randomBoxInterval;

var gameLevel = 1;




const GameScreen = () => {
    //Oyun ayarları
    const [boxs, setBoxs] = useState([
        0, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27,
        28, 29,
    ])

    const [stepFinish, setStepFinish] = useState(false);

    const [gameSelectedBox, setGameSelectedBox] = useState();
    const [gameStatus, setGameStatus] = useState(false);
    const [currentTime, setCurrentTime] = useState(2000);
    const [randomCreateBoxs, setRandomCreateBox] = useState(false);
    const [selectIndex, setSelectIndex] = useState(0);

    useEffect(() => {
        startGame();
        return () => {

        }
    }, [])



    //Oyunu başlatır
    const startGame = () => {
        //Oyunu başlat
        setGameStatus(true);
        //randomBoxInterval : Rastgele levele göre sayı seçer
        randomBoxInterval = setInterval(() => {
            var newSelectedBox = Math.floor(Math.random() * 30);
            if (gameRandomSelectedBox.length === gameLevel) {
                setGameSelectedBox();
                clearInterval(randomBoxInterval);
                setGameStatus(false);
            }
            //Ard arda aynı sayı gelmemesi için gerekli kod
            else if (newSelectedBox === gameRandomSelectedBox[gameRandomSelectedBox.length - 1]) {
                newSelectedBox = newSelectedBox + 1;
            }
            else {
                //Level 11 den az seviyedeyse 10 tane sayı eklemeye kadar burası çalışırç
                gameRandomSelectedBox.push(newSelectedBox);
                setGameSelectedBox(newSelectedBox);
            }




            console.log("Seçilen kutular " + gameRandomSelectedBox);
        }, currentTime);
    }

    //Oyunu seviyesini arttırır
    const nexLevel = () => {

        console.log("BURDASIN!!!!");

        if (gameLevel >= 11) {
            setRandomCreateBox(true);

            while (randomBoxCount < 30) {
                const newSelectedBox = Math.floor(Math.random() * 30);
                const controlBox = randomGameBoxs.findIndex(item => item === newSelectedBox)
                console.log("Var mı ?" + controlBox)
                if (controlBox < 0) {
                    randomGameBoxs.push(newSelectedBox);
                    randomBoxCount++;
                    if (randomBoxCount === 30) {
                        setBoxs(randomGameBoxs)
                        setRandomCreateBox(false);

                    }
                }
            }
        }
        if (!currentTime <= 500) {
            setCurrentTime(currentTime - 100);
        }
        gameLevel++;
        setSelectIndex(0);
        console.log("ŞUANKİ LEVELİN ARTTI! " + gameLevel)
        setGameStatus(false);
        setGameSelectedBox();
        setRandomCreateBox(false);
        gameRandomSelectedBox = [];
        userSelectedBox = [];
        randomBoxCount = 0;
        randomGameBoxs = [];
        return true;
    }

    //Oyunu sıfırlar
    const resetGame = () => {
        gameLevel = 1;
        randomGameBoxs = [];
        randomBoxCount = 0;
        gameRandomSelectedBox = [];
        userSelectedBox = [];
        setGameStatus(true);
        setSelectIndex(0);
        setRandomCreateBox(false);
        startGame();
        setStepFinish(false);
        return true;
    }

    //Kullacının seçtiği kutular
    const userBoxSelect = (boxNumber) => {
        console.log(selectIndex);

        console.log("Seçilen : " + boxNumber + "===" + "Oyunun seçtiği : " + gameRandomSelectedBox[selectIndex])


        //Kullanıcı doğru kutuları seçiyorlarsa bu kısım çalışır.
        //Kullanıcının seçtiği kutular trueSelected'e aktarılır
        if (boxNumber === gameRandomSelectedBox[selectIndex]) {
            console.log("Doğru seçilen kutu : " + boxNumber)
            userSelectedBox.push(boxNumber);
            setSelectIndex(selectIndex + 1);
            if (gameRandomSelectedBox.length == userSelectedBox.length) {
                console.log("YENİ SEVİYEYE GEÇTİN!")
                nexLevel();
                startGame();
            }
        }
        else {
            console.log("Kaybettin...");
            setStepFinish(true);
        }

        console.log(userSelectedBox + " : " + gameRandomSelectedBox)
    }

    const renderBoxs = boxs.map(boxNumber => {
        return (
            <div
                className={boxNumber === gameSelectedBox ? "int-button activeBox"
                    : userSelectedBox.findIndex(item => item === boxNumber) > -1 ? "int-button userSelectBox" : "int-button"}
                onClick={() => gameStatus ? null : userBoxSelect(boxNumber)}
            >
                <div className={boxNumber === gameSelectedBox ? "activeBoxText"
                    : userSelectedBox.findIndex(item => item === boxNumber) > -1 ? "activeBoxText" : ""}>
                    {boxNumber}
                </div>

            </div>
        )
    })

    return (
        <>
            {
                stepFinish
                    ?
                    <FinishScreen gameLevel={gameLevel} resetGame={resetGame}></FinishScreen>
                    :
                    <div className="game">
                        <div className="game-top">
                            <div className="gameLevel">Level {gameLevel}</div>
                            <div className="gameStatus">{randomCreateBoxs ? "Kutuların yerleri değişiyor..." : gameStatus ? "Kutuları seçiyoruz...." : "Gösterilen kutuları sırayla seçin."}</div>
                        </div>

                        <div className="gameBoxs">
                            {renderBoxs}
                        </div>
                    </div>
            }
        </>
    )
};
export default GameScreen;
