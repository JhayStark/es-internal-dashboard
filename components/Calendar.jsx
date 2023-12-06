import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

function CalendarDay({
  date,
  isCurrentMonth,
  isSelectedDate,
  isPresentDay,
  givenDate,
  selectDateFunction,
  isCompletedDate,
}) {
  return (
    <button
      type='button'
      className={`p-2 text-center cursor-pointer ${
        isCurrentMonth ? 'text-black' : 'text-gray-300'
      } ${
        isPresentDay
          ? 'bg-[#00A100] text-white'
          : isCompletedDate && 'bg-blue-400 text-white'
      } ${isSelectedDate && 'bg-blue-400 text-white'}`}
      onClick={() => selectDateFunction(givenDate)}
    >
      {date}
    </button>
  );
}

function Calendar({
  setSelectedDate,
  published = [],
  selectedMonth = moment(),
  setSelectedMonth,
}) {
  const completedDateFormat = 'DD-MM-YYYY';
  const [closeCalendar, setCloseCalendar] = useState(false);
  const [completedDate, setCompletedDate] = useState([]);
  const dateFormat = 'YYYY-MM-DD';
  const [selectedDates, setSelectedDates] = useState([]);

  const weekdays = moment.weekdaysShort();

  const startOfMonth = selectedMonth.clone().startOf('month');
  const endOfMonth = selectedMonth.clone().endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const calendar = [];

  const currentDate = startDate.clone();

  useEffect(() => {
    setCompletedDate(published);
  }, [published]);

  function isPresentDay(date) {
    const today = new Date();
    // eslint-disable-next-line dot-notation
    const passedDays = new Date(date['_d']);

    return (
      passedDays.getFullYear() === today.getFullYear() &&
      passedDays.getMonth() === today.getMonth() &&
      passedDays.getDate() === today.getDate()
    );
  }

  const handleMonthChange = e => {
    setSelectedMonth(moment(e.target.value, 'YYYY-MM'));
    setSelectedDate(startOfMonth);
  };

  const handleDateClick = useCallback(date => {
    const momentDate = moment(date);
    setSelectedMonth(momentDate, 'YYYY-MM');
    setSelectedDate(date);
    setSelectedDates([date]); // Update selectedDates to contain only the clicked date
  }, []);

  // const handlePreviousYear = () => {
  //   const previousYear = selectedMonth.clone().subtract(1, 'year');
  //   setSelectedMonth(previousYear);
  // };

  // const handleNextYear = () => {
  //   const nextYear = selectedMonth.clone().add(1, 'year');
  //   setSelectedMonth(nextYear);
  // };

  while (currentDate.isBefore(endDate)) {
    const isCurrentMonth = currentDate.isSame(selectedMonth, 'month');
    const isSelectedDate = selectedDates.includes(
      currentDate.format(dateFormat)
    );
    const isCompletedDate = completedDate.includes(
      currentDate.format(completedDateFormat)
    );

    calendar.push(
      <CalendarDay
        key={currentDate.format(dateFormat)}
        date={currentDate.format('D')}
        isCurrentMonth={isCurrentMonth}
        isSelectedDate={isSelectedDate}
        isPresentDay={isPresentDay(currentDate)}
        givenDate={currentDate.format(dateFormat)}
        selectDateFunction={handleDateClick}
        isCompletedDate={isCompletedDate}
        currentDate={currentDate}
      />
    );

    currentDate.add(1, 'days');
  }

  return (
    <div className='relative p-4 mx-auto '>
      <button
        type='button'
        className='absolute px-10 py-3 text-white bg-primary -top-6 right-10 xl:right-16 rounded-xl '
        onClick={() => handleDateClick(moment())}
      >
        Today
      </button>
      <div className='flex flex-row items-center justify-between mb-4'>
        <select
          className='px-4 py-2 text-lg font-medium bg-inherit focus:outline-none'
          value={selectedMonth.format('YYYY-MM')}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) =>
            moment(selectedMonth).set('month', i).format('YYYY-MM')
          ).map(month => (
            <option key={month} value={month}>
              {moment(month, 'YYYY-MM').format('MMMM , YYYY')}
            </option>
          ))}
        </select>
      </div>
      {/* <button type="button" onClick={handlePreviousYear}>
        Previous Year
      </button>
      <button type="button" onClick={handleNextYear}>
        Next Year
      </button> */}

      <div
        className={` grid-cols-7 gap-2 transition-all ${
          closeCalendar ? 'hidden' : 'grid'
        }`}
      >
        {weekdays.map(day => (
          <div key={day} className='p-2 font-bold text-center'>
            {day}
          </div>
        ))}
        {calendar}
      </div>
    </div>
  );
}

export default Calendar;
