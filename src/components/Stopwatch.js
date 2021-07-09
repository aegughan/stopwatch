import React, { useRef, useState } from "react";

function Stopwatch() {
  const intialTimeState = {hours: 0, minutes: 0, seconds: 0, milliseconds: 0};
  const [timeObj, setTimeObj] = useState(intialTimeState);
  const timeInterval = useRef();

  const [lapList, setLapList] = useState([]);
  const [isReset, setReset] = useState(true);
  const [isPause, setPause] = useState(false);
  const [isLap, setLap] = useState(false);
  
  const startTime = () => {
    timeInterval.current = setInterval(() => {
      setTimeObj(prevState => {
        let {hours, minutes, seconds, milliseconds} = prevState;
        milliseconds += 1;
        if (milliseconds !== 0 && milliseconds % 100 === 0) {
          milliseconds = 0;
          seconds +=1;
        }
        if (seconds !== 0 && seconds % 60 === 0) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes !==0 && minutes % 60 === 0) {
          minutes = 0;
          hours += 1;
        }
        return{hours, minutes, seconds, milliseconds}
      })
    }, 10);
  }

  const onStart = () => {
    setTimeObj(intialTimeState);
    startTime();
    setReset(false);
    setLap(false);
    setPause(false);
  }

  const onReset = () => {
    setTimeObj(intialTimeState);
    clearInterval(timeInterval.current);
    setReset(true);
    setLapList([]);
  }

  const addLap = () => {
    let {hours, minutes, seconds, milliseconds} = timeObj;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    milliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
    const lapTime = `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;
    lapList.unshift(lapTime)
    setLapList(lapList)
  }

  return (
    <div className="container">
      <h1 className="text-center">Stopwatch</h1>
      <div className="stopwatch">
        <div className="time_div">
          <h4 className="text-center">Hours</h4>
          <div className="time">{timeObj.hours < 10 ? `0${timeObj.hours}` : timeObj.hours}</div>
        </div>
        <span className="mt40">:</span>
        <div className="time_div">
          <h4 className="text-center">Minutes</h4>
          <div className="time">{timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes}</div>
        </div>
        <span className="mt40">:</span>
        <div className="time_div">
          <h4 className="text-center">Seconds</h4>
          <div className="time">{timeObj.seconds < 10 ? `0${timeObj.seconds}` : timeObj.seconds}</div>
        </div>
        <span className="mt40">.</span>
        <div className="time_div">
          <h4 className="text-center">Milliseconds</h4>
          <div className="time">{timeObj.milliseconds < 10 ? `0${timeObj.milliseconds}` : timeObj.milliseconds}</div>
        </div>
      </div>

      <div className="stopwatch btn_div">
        {
          isReset 
          ? <button className="btn" onClick={() => {onStart()}}>Start</button> 
          : (
            <>
             { 
             !isPause
             ? <button className="btn mr15 btn_secondary" onClick={() => {clearInterval(timeInterval.current); setPause(true);setLap(true);}}>Pause</button> 
             : <button className="btn mr15 btn_secondary" onClick={() => {startTime();setPause(false);setLap(false);}}>Resume</button> 
             }
             {
              !isLap
              ? <button className="btn" onClick={() => {addLap()}}>Lap</button>
              : <button className="btn" onClick={() => {onReset(); setLap(false);}}>Reset</button>

             }
            </>
          ) 
        }
      </div>
      <div className="text-center mt15">
        {
          lapList.length ? <h3>Laps</h3> : <></>
        }
        <div className="laps">
            {
            lapList.map((lapTime, index) => {
                const sNo = (lapList.length - index) < 10 ? `0${lapList.length - index}` : (lapList.length - index);
                return (
                    <div className="lap" key={`${lapTime}_${index + 1}`}><span>{sNo}</span>&nbsp;&nbsp; - &nbsp;&nbsp;{lapTime}</div>
                )
            })
            }
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
