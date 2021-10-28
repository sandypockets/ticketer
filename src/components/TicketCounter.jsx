import { useEffect, useState } from "react";

export default function TicketCounter() {
  const [ticketCount, setTicketCount] = useState()

  useEffect(() => {
    chrome.storage.local.get(['tickets'], function(result) {
      if (result.tickets) {
        setTicketCount(result.tickets)
      } else {
        setTicketCount(0)
        chrome.storage.local.set({ tickets: 0 })
      }
    })
  }, [])

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
    <div className="card card-padding-increase">
      <h3 className="flex-center cardTitle">Ticket Counter</h3>
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
  )
}