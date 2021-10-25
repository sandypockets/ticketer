import './main.css';
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Settings from "./components/Settings";

function App() {
  const [time, setTime] = useState()
  const [page, setPage] = useState('home')
  const [ticketCount, setTicketCount] = useState()
  const [state, setState] = useState({
    urlOne: '',
    urlTwo: '',
    urlThree: '',
    groupOneIsPinned: false,
    urlFour: '',
    urlFive: '',
    urlSix: '',
    groupTwoIsPinned: false,
    urlSeven: '',
    urlEight: '',
    urlNine: '',
    groupThreeIsPinned: false
  })

  useEffect(() => {
    chrome.storage.local.get(['minutes'], function(result) {
      setTime(result.minutes)
    })
    chrome.storage.local.get(['tickets'], function(result) {
      if (result.tickets) {
        setTicketCount(result.tickets)
      } else {
        setTicketCount(0)
        chrome.storage.local.set({ tickets: 0 })
      }
    })
  }, [])

  const handleOn = () => {
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
    chrome.storage.local.set({ minutes: time });
    window.close();
  }
  const handleOff = () => {
    setTime(0)
    chrome.action.setBadgeText({ text: '' });
    chrome.alarms.clearAll();
    chrome.storage.local.set({ minutes: 0 });
    window.close();
  }
  const handlePause = () => {
    chrome.action.setBadgeText({ text: '!' });
    chrome.alarms.clearAll();
    window.close();
  }
  const handleReset = () => {
    setTime(0)
    chrome.alarms.clearAll();
    chrome.storage.local.set({ minutes: 0 });
    chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1 });
    window.close();
  }
  const increaseTicketCount = () => {
    chrome.storage.local.set({ tickets: ticketCount + 1 });
    setTicketCount(ticketCount + 1);
  }
  const decreaseTicketCount = () => {
    if(ticketCount > 0) {
      chrome.storage.local.set({ tickets: ticketCount - 1 });
      setTicketCount(ticketCount - 1);
    }
  }

  return (
    <div className="app">
      {page === 'home' &&
        <Home
          state={state}
          setState={setState}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
          setTime={setTime}
          increaseTicketCount={increaseTicketCount}
          decreaseTicketCount={decreaseTicketCount}
          time={time}
          handlePause={handlePause}
          handleOff={handleOff}
          handleOn={handleOn}
          setPage={setPage}
          handleReset={handleReset}
        />
      }
      {page === 'settings' &&
        <Settings
          state={state}
          setState={setState}
          setPage={setPage}
        />
      }
    </div>
  );
}

export default App;
