import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButon from './PauseButon';
import PlayButon from './PlayButon';
import SettingButon from './SettingButon';
import SettingsContext from './SettingContext';
const red = '#FA7070';
const green = '#C6EBC5'
function Timer() {
  const settingInfo = useContext(SettingsContext);
  const [mode,setMode]=useState("work");
  const [isPaused, setIsPaused] = useState(true);
  const [secondLeft, setSecondLeft] = useState(0);
    const secondLeftRef = useRef(secondLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function initTime(){
      setSecondLeft(settingInfo.workMinutes * 60)
    }
    
    function tick(){
      secondLeftRef.current--;
      setSecondLeft(secondLeftRef.current);
    }
    useEffect(()=> {
      initTime();
      function switchMode(){
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSecond = ((nextMode === 'work' ? settingInfo.workMinutes: settingInfo.breakMinutes)*60);
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondLeft(nextSecond);
        secondLeftRef.current = nextSecond
      }
      const interval = setInterval(()=>{
        if (isPausedRef.current) {
          return;
        }
        if (secondLeftRef.current === 0){
          return switchMode();
        }
        tick();
      }, 1000);
      return ()=> clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingInfo]);
  const totalSeconds = mode === 'work' ? settingInfo.workMinutes *60 : settingInfo.breakMinutes * 60; 
  var percentage = Math.round(secondLeft / totalSeconds * 100);
  var minutes = Math.floor(secondLeft / 60);
  var seconds = secondLeft % 60;
  if(seconds < 10) seconds = '0' + seconds;
  return (
    <div>
        <CircularProgressbar value={percentage} text={minutes+':'+seconds} 
        styles={buildStyles({
            rotation: 0.25, 
            strokeLinecap: 'butt', 
            textColor:'#fff',
            pathColor: mode === 'work' ? red : green,
            trailColor: 'rgba(255,255,255,3)'

        })}/>
        <div style={{marginTop : '20px'}}>
          {isPaused ? 
          <PlayButon onClick={()=>{setIsPaused(false);isPausedRef.current = false}} /> : 
          <PauseButon onClick={()=>{setIsPaused(true);isPausedRef.current = true}} />}
        </div>
        <div style={{marginTop: '20px'}}>
            <SettingButon onClick={()=>settingInfo.setShowSetting(true)}  />
        </div>
    </div>
  )
}

export default Timer;