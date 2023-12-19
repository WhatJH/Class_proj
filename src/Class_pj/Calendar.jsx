import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 모달 엘리먼트 설정

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태
  const [eventInput, setEventInput] = useState(''); // 모달 창에서 입력한 일정

  
  const onDateChange = (date) => {
    setDate(date);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더하고, 항상 두 자릿수를 유지하기 위해 slice 사용
    const day = ('0' + date.getDate()).slice(-2); // 일자가 한 자릿수일 경우 두 자릿수를 유지하기 위해 slice 사용
    setSelectedDate(`${year}-${month}-${day}`);
  };
  
  

  const addEvent = () => {
    if (!selectedDate) {
        alert("날짜를 먼저 선택해주세요.");
        return;
    }
    
    setEvents({ ...events, [selectedDate]: eventInput });
    setEventInput('');
    setIsModalOpen(false); // 일정 추가 후 모달 창 숨기기
  };
  

  return (
    <div>
      <h2>Calendar Page</h2>
      <Calendar value={date} onChange={onDateChange} />
      {selectedDate && (
        <>
          <h3>선택한 날짜: {selectedDate}</h3>
          <button onClick={() => setIsModalOpen(true)}>일정 추가</button> {/* 모달 창 보이기 */}
          {events[selectedDate] && <p>일정: {events[selectedDate]}</p>}
        </>
      )}

      {/* 모달 창 */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>일정 추가</h2>
        <input
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          placeholder="일정을 입력하세요."
        />
        <button onClick={addEvent}>추가</button>
        <button onClick={() => setIsModalOpen(false)}>취소</button>
      </Modal>
    </div>
  );
};

export default CalendarPage;
