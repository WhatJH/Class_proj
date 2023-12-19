import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import './CustomModal.css';

const customStyles = {
  content: {
    width: '500px',
    height: '400px',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Modal.setAppElement('#root');

const CustomModal = ({ modalIsOpen, setModalIsOpen }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [tempDate, setTempDate] = useState(null); 

  useEffect(() => {
    const dateString = date?.toISOString().split('T')[0];
    setSelectedEvents(events[dateString] || []);
  }, [date, events]);

  const showEvent = (value) => {
    setDate(value);
  };

  const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString || !dateString.match(regEx)) return false;
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
  };

  const addEvent = () => {
    const eventDate = prompt("날짜를 입력하세요. (예: 20xx-12-31)");
    if (!isValidDate(eventDate)) {
      alert("유효한 날짜를 입력하세요. (예: 20xx-12-31)");
      return;
    }
    const event = prompt("일정을 입력하세요.");
    if (eventDate && event) {
      const selectedDate = new Date(`${eventDate}T00:00:00`); // 시간 정보 추가
      setEvents({
        ...events,
        [selectedDate.toISOString().split('T')[0]]: [
          ...(events[selectedDate.toISOString().split('T')[0]] || []),
          event,
        ],
      });
    }
  };


  const deleteEvent = (eventDate, index) => {
    if (!events[eventDate]) {
      return;
    }
    const updatedEvents = { ...events };
    updatedEvents[eventDate].splice(index, 1);
    if (updatedEvents[eventDate].length === 0) {
      delete updatedEvents[eventDate];
    }
    setEvents(updatedEvents);
    setSelectedEvents(updatedEvents[eventDate] || []);
  };

  const editEvent = (eventDate, index) => {
    const newDate = prompt(
      "수정할 날짜를 입력하세요.",
      tempDate || eventDate
    );
    if (!isValidDate(newDate)) {
      alert("유효한 날짜를 입력하세요. (예: 20xx-12-31)");
      return;
    }
    const newDateISO = new Date(newDate + 'T00:00:00').toISOString().split('T')[0]; // 날짜 형식 변환
    if (newDateISO !== tempDate && events[tempDate]) {
      setEvents({
        ...events,
        [newDateISO]: events[tempDate],
      });
      delete events[tempDate];
    }
    const newEvent = prompt(
      "수정할 일정을 입력하세요.",
      events[eventDate][index]
    );
    const updatedEvents = { ...events };
    updatedEvents[newDateISO] = [
      ...(updatedEvents[newDateISO] || []),
      newEvent,
    ];
    updatedEvents[eventDate].splice(index, 1);
    if (updatedEvents[eventDate].length === 0) {
      delete updatedEvents[eventDate];
    }
    setEvents(updatedEvents);
    setTempDate(null);
  };

  const handleEditClick = (eventDate, index) => {
    setTempDate(eventDate);
    editEvent(eventDate, index);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setModalIsOpen(false);
        setTempDate(null); 
      }}
      style={customStyles}
    >
      <div className="calendar-container">
        <Calendar
          onChange={showEvent}
          value={date}
          onClickDay={showEvent}
          nextLabel="month>>"
          nextAriaLabel="Go to next month"
          next2Label="year>>"
          next2AriaLabel="Go to next year"
          prevLabel="<<month"
          prevAriaLabel="Go to prev month"
          prev2Label="<<year"
          prev2AriaLabel="Go to prev year"
        />
      </div>

      <button onClick={addEvent}>일정 추가</button>

      {selectedEvents &&
        selectedEvents.map((event, index) => (
          <div key={index}>
            <p>{event}</p>
            <button
              onClick={() =>
                handleEditClick(date?.toISOString().split('T')[0], index)
              }
            >
              수정
            </button>
            <button
              onClick={() =>
                deleteEvent(date?.toISOString().split('T')[0], index)
              }
            >
              삭제
            </button>
          </div>
        ))}

      <button onClick={() => setModalIsOpen(false)}>Close</button>
    </Modal>
  );
};

export default CustomModal;
