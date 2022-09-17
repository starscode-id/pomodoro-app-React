import { useState } from 'react';
import './App.css';
import Setting from './Setting';
import Timer from './components/Timer';
import SettingsContext from './components/SettingContext';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [showSetting, setShowSetting] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  return (
    <div className="App">
      <SettingsContext.Provider value={{
         showSetting,
         setShowSetting,
         workMinutes,
         breakMinutes,
         setWorkMinutes,
         setBreakMinutes,
      }}>
      {showSetting ? <Setting /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
