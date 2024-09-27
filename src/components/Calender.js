
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addSelectedDate, removeSelectedDate } from '../redux/recurrenceSlice';
import { selectHighlightedDates } from '../redux/recurrenceSlice';
import '../App.css';


const Calendar = ({ selectedDates, highlightedDates, dispatch }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendar = (month) => {
    const startDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const calendarDays = [];

    // Fill empty days before the first of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    // Fill in the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = new Date(month.getFullYear(), month.getMonth(), day)
        .toISOString()
        .split('T')[0];
      calendarDays.push(dateStr);
    }

    return calendarDays;
  };

  const handleDateClick = (date) => {
    if (selectedDates.includes(date)) {
      dispatch(removeSelectedDate(date));
    } else {
      dispatch(addSelectedDate(date));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const calendarDays = generateCalendar(currentMonth);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>Prev</button>
        <span>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</span>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day-header">{day}</div>
        ))}

        {calendarDays.map((date, index) => (
          <div
            key={index}
            className={`calendar-date ${date && highlightedDates.includes(date) ? 'highlight' : ''}`}
            onClick={() => date && handleDateClick(date)}
          >
            {date ? new Date(date).getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDates: state.recurrence.selectedDates,
  highlightedDates: selectHighlightedDates(state), // Get highlighted dates from selector
});

export default connect(mapStateToProps)(Calendar);
