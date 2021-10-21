import './main.css';
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Settings from "./components/Settings";

function App() {
  const [url, setUrl] = useState('')
  const [time, setTime] = useState()
  const [page, setPage] = useState('home')

  useEffect(() => {
    chrome.storage.local.get(['minutes'], function(result) {
      console.log("RESULT", result)
      setTime(result.minutes)
    })
  }, [])

  function setAlarm() {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
    chrome.storage.local.set({ minutes: time });
    window.close();
  }

  function clearAlarm() {
    setTime(0)
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
    chrome.storage.local.set({ minutes: 0 });
    window.close();
  }

  function pause() {
    chrome.action.setBadgeText({ text: '!' });
    chrome.alarms.clearAll();
    window.close();
  }


  // chrome.alarms.onAlarm.addListener(function() {
  //   setTime(time + 1);
  //   chrome.storage.local.set({ minutes: time + 1 });
  // })

  const handleOn = () => {
    setAlarm()
  }

  const handleOff = () => {
    clearAlarm()
  }
  const handlePause = () => {
    pause()
  }

  const handleReset = () => {
    clearAlarm()
    setAlarm()
  }

  return (
    <div className="app">
      {page === 'home' && <Home time={time} url={url} handlePause={handlePause} handleOff={handleOff} handleOn={handleOn} setPage={setPage} handleReset={handleReset} />}
      {page === 'settings' && <Settings setPage={setPage} />}
    </div>
  );
}

export default App;
