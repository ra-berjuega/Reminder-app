import { useState, useEffect } from 'react';

export default function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [inputList, setInputList] = useState('');
  const [editId, setEditId] = useState(null);
  const [optionDisplay, setOptionsDisplay] = useState({ id: null, display: null });

  useState(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
      return storedReminders 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const createReminderHtml = () => {
    return reminders.map((reminder) => {
      const showOptions=
        reminder.id === optionDisplay.id && optionDisplay.display === true ? (
         <>           
          <button onClick={() => removeReminder(reminder.id)}>Remove</button>
          <button onClick={() => editReminder(reminder.id)}>Edit</button>
</>

        ) : null;

      return (
        <li key={reminder.id} onClick={() => onClickReminder(reminder.id)}>
          {reminder.title} {showOptions}
        </li>
      );
    });
  };

  const addReminder = () => {
    if (editId) {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === editId) {
          return { ...reminder, title: inputList };
        }
        return reminder;
      });
      setReminders(updatedReminders);
      setInputList('');
      setEditId(null);
    } else {
      const reminder = {
        id: reminders.length + 1,
        title: inputList
      };
      setReminders([...reminders, reminder]);
      setInputList('');
    }
  };

  const handleReminderInput = (event) => {
    setInputList(event.target.value);
  };

  const removeReminder = (id) => {
    const deleteReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(deleteReminders);
  };

  const editReminder = (id) => {
    const reminderToEdit = reminders.find((reminder) => reminder.id === id);
    if (reminderToEdit) {
      setInputList(reminderToEdit.title);
      setEditId(reminderToEdit.id);
    }
  };

  const onClickReminder = (id) => {
    setOptionsDisplay({ id: id, display: optionDisplay.display !== true });
  };

  return (
    <>
      <div>
        <ul>{createReminderHtml()}</ul>
        <button onClick={addReminder}>{editId ? 'Update' : 'Add'}</button>
        <input value={inputList} onChange={handleReminderInput}></input>
      </div>
    </>
  );
}
