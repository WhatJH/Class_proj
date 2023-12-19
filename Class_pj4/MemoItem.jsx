import React, { useState } from 'react';
import './MemoItem.css';

const MemoItem = ({ memo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMemoTitle, setNewMemoTitle] = useState(memo.title || '');
  const [newMemoText, setNewMemoText] = useState(memo.text || '');
  const [lastUpdated, setLastUpdated] = useState(memo.date || '');

  const UpdateClick = () => {
    setIsEditing(true);
  };

  const CancelClick = () => {
    setIsEditing(false);
  };
  
  
  const SaveClick = () => {
    if (!newMemoText.trim() && !newMemoTitle.trim()) {
      setIsEditing(false);
      return;
    }

    onUpdate(memo.id, newMemoTitle, newMemoText);
    setIsEditing(false);
    setLastUpdated(new Date().toLocaleString()); // 현재 시간으로 업데이트
  };

  const TitleChange = (e) => {
    setNewMemoTitle(e.target.value);
  };

  const TextChange = (e) => {
    setNewMemoText(e.target.value);
  };

  return (
    <div className={`memo-item ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newMemoTitle}
            onChange={TitleChange}
            placeholder="제목을 입력하세요..."
          />
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
          <h1>{memo.title}</h1>
        </div>
      )}
      <div>
        {isEditing ? (
          <textarea
            value={newMemoText}
            onChange={TextChange}
            placeholder="내용을 입력하세요..."
          />
        ) : (
          <p>{memo.text}</p>
        )}
      </div>
      {isEditing ? (
        <div>
          <button onClick={SaveClick}>저장</button>
          <button onClick={CancelClick}>취소</button>
        </div>
      ) : (
        <div>
          <p className="last-updated">마지막 저장시간: {lastUpdated}</p>
          <button onClick={() => onDelete(memo.id)}>삭제</button>
          <button onClick={UpdateClick}>수정</button>
        </div>
      )}
    </div>
  );
};

export default MemoItem;
