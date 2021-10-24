export default function Home({ ticketCount, increaseTicketCount, decreaseTicketCount, time, handleOn, handleOff, handlePause, setPage, handleReset }) {
  const openTabGroupOne = () => {
    chrome.runtime.sendMessage("openTabGroupOne");
  }
  const openTabGroupTwo = () => {
    chrome.runtime.sendMessage("openTabGroupTwo");
  }
  const openTabGroupThree = () => {
    chrome.runtime.sendMessage("openTabGroupThree");
  }

  return (
    <div className="container">
      <div>

        <h1 className="title">Ticketer</h1>
        <div className="card">
          <div>
            <div className="elapsedTime">
              <h3>Time spent:</h3>
              <h2>{time ? time : 0}</h2>
              <h3>{time !== 1 ? "minutes" : "minute"}</h3>
            </div>
          </div>
          <div className="buttonGroup">
            <button onClick={handleOn}>
              On
            </button>
            <button onClick={handleOff}>
              Off
            </button>
            <button onClick={handlePause}>
              Pause
            </button>
            <button onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="flex-center cardTitle">Tickets completed</h3>
          <div className="buttonGroup">
            <div>
              <button className="square" onClick={decreaseTicketCount}>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span>Ticket count: <strong>{ticketCount}</strong> </span>
              <button className="square" onClick={increaseTicketCount}>
                <svg xmlns="http://www.w3.org/2000/svg" className="svg" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
        <div className="flex-center">
          <h3 className="cardTitle">Quick tabs</h3>
        </div>
          <p className="flex-center info">Open three frequently used resources at once. Change them in Settings.</p>
          <div className="buttonGroup">
            <div>
              <button onClick={openTabGroupOne}>
                Group 1
              </button>
              <button onClick={openTabGroupTwo}>
                Group 2
              </button>
              <button onClick={openTabGroupThree}>
                Group 3
              </button>
            </div>
          </div>
        </div>
        </div>
      <div>
        <a onClick={() => setPage('settings')}>Settings</a>
      </div>
    </div>
  )
}