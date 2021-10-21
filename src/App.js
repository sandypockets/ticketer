import './main.css';
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Settings from "./components/Settings";

function App() {
  const [time, setTime] = useState()
  const [page, setPage] = useState('home')
  const [ticketCount, setTicketCount] = useState()

  useEffect(() => {
    chrome.storage.local.get(['minutes'], function(result) {
      console.log("storage.local.minutes: ", result)
      setTime(result.minutes)
    })
    chrome.storage.local.get(['tickets'], function(result) {
      console.log("storage.local.tickets: ", result)
      if (result.tickets) {
        setTicketCount(result.tickets)
      } else {
        setTicketCount(0)
        chrome.storage.local.set({ tickets: 0 })
      }
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
  function pauseAlarm() {
    chrome.action.setBadgeText({ text: '!' });
    chrome.alarms.clearAll();
    window.close();
  }

  const handleOn = () => {
    setAlarm()
  }
  const handleOff = () => {
    clearAlarm()
  }
  const handlePause = () => {
    pauseAlarm()
  }
  const handleReset = () => {
    clearAlarm()
    setAlarm()
  }

  const increaseTicketCount = () => {
    chrome.storage.local.set({ tickets: ticketCount + 1 });
    setTicketCount(ticketCount + 1);
  }

  const decreaseTicketCount = () => {
    chrome.storage.local.set({ tickets: ticketCount - 1 });
    setTicketCount(ticketCount - 1);
  }

  return (
    <div className="app">
      {page === 'home' && <Home ticketCount={ticketCount} increaseTicketCount={increaseTicketCount} decreaseTicketCount={decreaseTicketCount} time={time} handlePause={handlePause} handleOff={handleOff} handleOn={handleOn} setPage={setPage} handleReset={handleReset} />}
      {page === 'settings' && <Settings setPage={setPage} />}
    </div>
  );
}

export default App;
