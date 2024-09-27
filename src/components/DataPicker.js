
import React from 'react';
import { connect } from 'react-redux';
import RecurrenceForm from './RecurrenceForm';
import '../App.css';

// import Calendar from './Calendar';
import Calendar from "../components/Calender"
import {
  setStartDate,
  setEndDate,
} from '../redux/recurrenceSlice';
import "./DataPicker.css"

const DatePicker = ({ startDate, endDate, dispatch }) => {
  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value));
  };

  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <div className="date-picker">
      <div className="date-range">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />

        <label>End Date (optional):</label>
        <input type="date" value={endDate || ''} onChange={handleEndDateChange} />
      </div>
      <RecurrenceForm />
      <Calendar />
    </div>
  );
};

const mapStateToProps = (state) => ({
  startDate: state.recurrence.startDate,
  endDate: state.recurrence.endDate,
});

export default connect(mapStateToProps)(DatePicker);
