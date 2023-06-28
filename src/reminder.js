import { useState } from 'react';

export default function Reminder() {
    const [reminders, setReminder] = useState([]);
    const [inputList, setInputList] = useState('');
    const createReminderHtml = () =>  {
        return reminders.map((reminder) => {
            return (
                <li key={reminder.id}>
                    {reminder}
                    <button onClick={() => removeReminder(reminder.id)}>Remove</button>
                </li>
            );
        });
    };
    const addReminder = () => {
        setReminder([...reminders, inputList]);
    };
    const handleReminderInput = (event) => {
        setInputList(event.target.value);
    };
    const removeReminder = (id) => {
        const deleteReminders = reminders.filter((reminder) => reminder.id !== id);
        setReminder(deleteReminders);
    };
    return (
        <>
            <div>
                <ul>{createReminderHtml()}</ul>
                <button onClick={addReminder}>Add</button>
                <input onChange={handleReminderInput}></input>
            </div>
        </>
    );
}