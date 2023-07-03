import { useState, useEffect } from 'react';

export default function Reminder() {
  const [reminders, setReminders] = useState(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      return JSON.parse(storedReminders);
    } else {
      return [];
    }
  });

  const [inputList, setInputList] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [editId, setEditId] = useState(null);
  const [optionDisplay, setOptionsDisplay] = useState({
    id: null,
    display: null,
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const createReminderHtml = () => {
    return reminders.map((reminder) => {
      const showOptions =
        reminder.id === optionDisplay.id && optionDisplay.display === true ? (
          <>
            <button onClick={() => removeReminder(reminder.id)}>Remove</button>
            <button onClick={() => editReminder(reminder.id)}>Edit</button>
          </>
        ) : null;

      return (
        <li key={reminder.id} onClick={() => onClickReminder(reminder.id)}>
          {reminder.title} {showOptions}
          <input type="datetime-local" value={reminder.dateTime} /> 
        </li>
      );
    });
  };

  const addReminder = () => {
    if (editId) {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === editId) {
          return {
            ...reminder,
            title: inputList,
            dateTime: `${date}T${time}`,
          };
        }
        return reminder;
      });
      setReminders(updatedReminders);
      setInputList('');
      setDate('');
      setTime('');
      setEditId(null);
    } else {
      const reminder = {
        id: reminders.length + 1,
        title: inputList,
        dateTime: `${date}T${time}`,
      };
      setReminders([...reminders, reminder]);
      setInputList('');
      setDate('');
      setTime('');
    }
  };

  const handleReminderInput = (event) => {
    setInputList(event.target.value);
  };

  const handleDateInput = (event) => {
    setDate(event.target.value);
  };

  const handleTimeInput = (event) => {
    setTime(event.target.value);
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
        <input value={inputList} onChange={handleReminderInput} />
        <input type="date" value={date} onChange={handleDateInput} />
        <input type="time" value={time} onChange={handleTimeInput} />
      </div>
    </>
  );
}
