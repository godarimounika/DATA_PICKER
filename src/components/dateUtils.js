export const getHighlightedDates = (startDate, endDate, recurrenceType, interval) => {
    const start = new Date(startDate);
    const today = new Date();
    const highlightedDates = [];
    
    let currentDate = new Date(start);
    
    while (currentDate <= today) {
      let isHighlighted = true;
  
      // Highlight logic based on recurrence type
      if (recurrenceType === 'daily') {
        currentDate.setDate(currentDate.getDate() + parseInt(interval));
      } else if (recurrenceType === 'weekly') {
        currentDate.setDate(currentDate.getDate() + 7 * parseInt(interval));
      } else if (recurrenceType === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + parseInt(interval));
      } else if (recurrenceType === 'yearly') {
        currentDate.setFullYear(currentDate.getFullYear() + parseInt(interval));
      }
  
      highlightedDates.push({
        date: currentDate.toLocaleDateString(),
        isHighlighted,
      });
    }
  
    return highlightedDates;
  };
  