import React, { useContext } from 'react'
import ReactSlider from 'react-slider';
import BackButon from './components/BackButon';
import SettingsContext from './components/SettingContext';
import './slider.css';
function Setting() {
  const settingInfo = useContext(SettingsContext);
  return (
    <div style={{textAlign: 'left'}}>
        <label >Work : {settingInfo.workMinutes}:00</label>
        <ReactSlider 
        className='slider'
        thumbClassName='thumb'
        trackClassName='track'
        min={1}
        value={settingInfo.workMinuites}
        onChange={newValue => settingInfo.setWorkMinutes(newValue)}
        max={120}
        />
        <label >Break : {settingInfo.breakMinutes}:00</label>
        <ReactSlider 
        className='slider green'
        thumbClassName='thumb'
        trackClassName='track'
        min={1}
        value={settingInfo.breakMinuites}
        onChange={newValue => settingInfo.setBreakMinutes(newValue)}
        max={120}
        />
        <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButon onClick={()=> settingInfo.setShowSetting(false)} />
        </div>
    </div>
  )
}

export default Setting;