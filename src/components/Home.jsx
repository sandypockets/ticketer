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
        <div>
          <h1>Productivity Title</h1>
          <h3>Elapsed time</h3>
          <h2>{time ? time : 0} minutes</h2>
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
        <div>
          <h3>Tickets completed</h3>
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
        <div>
          <button onClick={openTabGroupOne}>
            Open link group 1
          </button>
          <button onClick={openTabGroupTwo}>
            Open link group 2
          </button>
        </div>
      </div>
      <div>
        <a onClick={() => setPage('settings')}>Settings</a>
      </div>
    </div>
  )
}