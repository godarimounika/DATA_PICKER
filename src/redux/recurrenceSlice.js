
import { createSlice } from '@reduxjs/toolkit';  // Ensure this import is present

// Define initial state here
const initialState = {
  startDate: '2024-09-13',
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  daysOfWeek: [],
  nthDay: null,
  selectedDates: [new Date().toISOString().split('T')[0]], // Default to today's date
};

// Create the recurrence slice
const recurrenceSlice = createSlice({
  name: 'recurrence',
  initialState,  // Make sure this is passed correctly
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setRecurrenceType: (state, action) => {
      state.recurrenceType = action.payload;
    },
    setInterval: (state, action) => {
      state.interval = action.payload;
    },
    setDaysOfWeek: (state, action) => {
      state.daysOfWeek = action.payload;
    },
    setNthDay: (state, action) => {
      state.nthDay = action.payload;
    },
    addSelectedDate: (state, action) => {
      if (!state.selectedDates.includes(action.payload)) {
        state.selectedDates.push(action.payload); // Add selected date
      }
    },
    removeSelectedDate: (state, action) => {
      state.selectedDates = state.selectedDates.filter(date => date !== action.payload); // Remove date
    },
  },
});

// Export the actions
export const {
  setStartDate,
  setEndDate,
  setRecurrenceType,
  setInterval,
  setDaysOfWeek,
  setNthDay,
  addSelectedDate,
  removeSelectedDate,
} = recurrenceSlice.actions;

// Selector for highlighted dates
export const selectHighlightedDates = (state) => {
  const { startDate, recurrenceType, interval, selectedDates } = state.recurrence;

  const today = new Date();
  const highlightedDates = new Set(selectedDates);

  // Convert start date to Date object
  const start = new Date(startDate);
  
  // Check for recurrence based on the type
  if (recurrenceType === 'daily') {
    for (let date = new Date(start); date <= today; date.setDate(date.getDate() + interval)) {
      highlightedDates.add(date.toISOString().split('T')[0]);
    }
  } else if (recurrenceType === 'weekly') {
    for (let date = new Date(start); date <= today; date.setDate(date.getDate() + 7 * interval)) {
      highlightedDates.add(date.toISOString().split('T')[0]);
    }
  } else if (recurrenceType === 'monthly') {
    for (let date = new Date(start); date <= today; date.setMonth(date.getMonth() + interval)) {
      highlightedDates.add(date.toISOString().split('T')[0]);
    }
  } else if (recurrenceType === 'yearly') {
    for (let date = new Date(start); date <= today; date.setFullYear(date.getFullYear() + interval)) {
      highlightedDates.add(date.toISOString().split('T')[0]);
    }
  }

  return Array.from(highlightedDates);
};

// Export the reducer
export default recurrenceSlice.reducer;
