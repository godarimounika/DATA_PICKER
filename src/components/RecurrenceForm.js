
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setRecurrenceType,
  setInterval,
  setDaysOfWeek,
  setNthDay,
} from '../redux/recurrenceSlice';
import '../App.css';

const RecurrenceForm = ({
  recurrenceType,
  interval,
  daysOfWeek,
  nthDay,
  dispatch,
}) => {
  const [selectedDays, setSelectedDays] = useState([]);

  // Days of the week options
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleDaySelection = (day) => {
    let updatedDays = [...selectedDays];
    if (updatedDays.includes(day)) {
      updatedDays = updatedDays.filter(d => d !== day);
    } else {
      updatedDays.push(day);
    }
    setSelectedDays(updatedDays);
    dispatch(setDaysOfWeek(updatedDays));
  };

  return (
    <div className="recurrence-form">
      <label>Recurrence Type:</label>
      <select
        value={recurrenceType}
        onChange={(e) => dispatch(setRecurrenceType(e.target.value))}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label>Every:</label>
      <input
        type="number"
        value={interval}
        min="1"
        onChange={(e) => dispatch(setInterval(parseInt(e.target.value)))}
      />

      {recurrenceType === 'weekly' && (
        <div>
          <label>Select Days of the Week:</label>
          <div className="days-of-week">
            {weekDays.map((day, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`day-${index}`}
                  checked={selectedDays.includes(index)}
                  onChange={() => handleDaySelection(index)}
                />
                <label htmlFor={`day-${index}`}>{day}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <div>
          <label>Choose Nth Day:</label>
          <input
            type="number"
            value={nthDay || ''}
            min="1"
            max="31"
            onChange={(e) => dispatch(setNthDay(parseInt(e.target.value)))}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recurrenceType: state.recurrence.recurrenceType,
  interval: state.recurrence.interval,
  daysOfWeek: state.recurrence.daysOfWeek,
  nthDay: state.recurrence.nthDay,
});

export default connect(mapStateToProps)(RecurrenceForm);
