export default function TimerButtons({ setTime }) {

  const handleOn = () => {
    chrome.runtime.sendMessage({
      id: "timer",
      payload: "timerOn"
    }, function() {
      window.close()
    })
  }
  const handleOff = () => {
    chrome.runtime.sendMessage({
      id: "timer",
      payload: "timerOff"
    }, function() {
      window.close();
    })
    setTime(0)
  }
  const handlePause = () => {
    chrome.runtime.sendMessage({
      id: "timer",
      payload: "timerPause"
    }, function() {
      window.close()
    })
  }
  const handleReset = () => {
    chrome.runtime.sendMessage({
      id: "timer",
      payload: "timerReset"
    }, function() {
      window.close()
    })
    setTime(0)
  }

  return (
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
  )
}