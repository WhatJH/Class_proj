import React, { useState, useEffect } from 'react';
import MemoItem from './MemoItem';
import Memos from './Memos';
import Header from './Header';
import { BrowserRouter as Router } from "react-router-dom";
import CustomModal from './CustomModal';
import './App.css';


function App() {
  const [memos, setMemos] = useState([]);
  const [loginUser, setLoginUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [modalContent, setModalContent] = useState(''); 

  useEffect(() => {
    const storedMemos = localStorage.getItem(`memos_${loginUser}`);
    if (storedMemos) {
      setMemos(JSON.parse(storedMemos));
    }
  }, [loginUser]);

  useEffect(() => {
    localStorage.setItem(`memos_${loginUser}`, JSON.stringify(memos));
  }, [memos, loginUser]);

  const handleCreate = (newContent) => {
    const currentTime = new Date().toLocaleString();
    setMemos([...memos, { id: Date.now(), text: newContent, date: currentTime }]);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      setMemos(memos.filter((item) => item.id !== id));
    }
  };

  const handleUpdate = (id, newText) => {
    setMemos(
      memos.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  };

  const handleOpenCalendar = () => {
    setModalIsOpen(true);
  };

  const filteredMemos = memos.filter((memo) =>
    memo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogin = (userId) => {
    setLoginUser(userId);
  };

  return (
    <Router>
      <div className="app-container">
        <Header onOpenCalendar={handleOpenCalendar} onLogin={handleLogin} /> 
        <CustomModal 
          modalIsOpen={modalIsOpen} 
          setModalIsOpen={setModalIsOpen}
          setDate={setDate} 
          date={date}
          modalContent={modalContent} 
          setModalContent={setModalContent}
        />

        <input
          type="text"
          placeholder="작성한 메모 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Memos onCreate={handleCreate} />
        {filteredMemos.map((memo) => (
          <div key={memo.id}>
            <MemoItem
              memo={memo}
              onDelete={() => handleDelete(memo.id)}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
    </Router>
  );
}

export default App;
