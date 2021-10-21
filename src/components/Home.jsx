export default function Home({ time, handleOn, handleOff, handlePause, setPage, handleReset }) {
  return (
    <>
      <h1>Elapsed time</h1>
      <h2>{time ? time : 0} minutes</h2>
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
      <div>
        <a onClick={() => setPage('settings')}>Settings</a>
      </div>
    </>
  )
}