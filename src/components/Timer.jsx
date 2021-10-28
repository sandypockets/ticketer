import TimerButtons from "./TimerButtons";
import { useEffect, useState } from "react";

export default function Timer() {

  const [time, setTime] = useState()

  useEffect(() => {
    chrome.storage.local.get(['minutes'], function(result) {
      setTime(result.minutes)
    })
  }, [])

  return (
    <div className="card card-padding-increase">
      <h3 className="flex-center cardTitle">Timer</h3>
      <p className="flex-center info">Keep track of time spent.</p>
      <div>
        <div className="elapsedTime">
          <h2>{time ? time : 0}{time !== 1 ? " minutes" : " minute"}</h2>
        </div>
      </div>
      <TimerButtons setTime={setTime} />
    </div>
  )
}