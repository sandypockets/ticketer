const openTabGroupOne = () => {
  chrome.runtime.sendMessage("openTabGroupOne");
}
const openTabGroupTwo = () => {
  chrome.runtime.sendMessage("openTabGroupTwo");
}

export default function Home({ ticketCount, increaseTicketCount, decreaseTicketCount, time, handleOn, handleOff, handlePause, setPage, handleReset }) {
  return (
    <div className="container">
      <div>

        <h1 className="title">Productivity Title</h1>
        <div className="card">
          <div>
            <div className="elapsedTime">
              <h3>Elapsed time</h3>
              <h2>{time ? time : 0} minutes</h2>
            </div>
          </div>
          <div>
            <button onClick={handleOn}>
              Turn on
            </button>
            <button onClick={handleOff}>
              Turn off
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
          <h3 className="flex-center">Tickets completed</h3>
          <div className="buttonGroup">
            <div>
              <button onClick={decreaseTicketCount}>
                -
              </button>
              <span>Ticket count: {ticketCount} </span>
              <button onClick={increaseTicketCount}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className="card">
        <div className="flex-center">
          <h3 className="quickTabs">Quick tabs</h3>
        </div>
          <p className="flex-center">Open three frequently used resources at once. Change them in Settings.</p>
          <div className="buttonGroup">
            <div>
              <button onClick={openTabGroupOne}>
                Group 1
              </button>
              <button onClick={openTabGroupTwo}>
                Group 2
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