import { useState } from "react";

export default function Reminder() {
  const [ reminders, setReminder] = useState(["Clean code", "test"])
  const [ inputList, setInputList] = useState("")
  const createReminderHtml = () => {
    return reminders.map((reminder ) =>{
      return <li>{reminder}</li>   })
  }
  const addReminder = () =>{
    setReminder([...reminders, inputList])
  }
   const handleReminderInput = (event) =>{ 
    setInputList(event.target.value)
  }
  
  return (
      <>
          <ul>{createReminderHtml()}</ul>

          <button onClick={addReminder}>Add</button>

          <input onChange={handleReminderInput}></input>
      </>
  );
}
