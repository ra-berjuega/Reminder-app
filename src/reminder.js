import { useState } from 'react';

export default function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [inputList, setInputList] = useState('');

  const createReminderHtml = () => {
    return reminders.map((reminder) => {
      return (
        <li key={reminder.id}>
          {reminder.title} {''}
          <button onClick={() => removeReminder(reminder.id)}>Remove</button>
        </li>
      );
    });
  };

  const addReminder = () => {
    const reminder = {
      id: reminders.length + 1,
      title: inputList
    };
    setReminders([...reminders, reminder]);
    setInputList(''); 
  };

  const handleReminderInput = (event) => {
    setInputList(event.target.value);
  };

  const removeReminder = (id) => {
    const deleteReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(deleteReminders);
  };

  return (
    <>
      <div>
        <ul>{createReminderHtml()}</ul>
        <button onClick={addReminder}>Add</button>
        <input value={inputList} onChange={handleReminderInput}></input>
      </div>
    </>
  );
}
