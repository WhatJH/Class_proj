import React, { useState, useRef } from "react";
import "./Memos.css";


function Memos({ onCreate }) {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  function onChangeContent(e) {
    setContent(e.target.value);
  }

  async function onSubmit() {
    if (!content.trim()) {
      inputRef.current.focus();
      return;
    }

    await onCreate(content, () => {
      alert("메모 생성 성공!");
    });

    setContent("");
    inputRef.current.focus();
  }

  return (
    <div className="Memos">
      <h1>새로운 메모 작성하기</h1>
      <div className="editor_wrapper">
        <input
          value={content}
          onChange={onChangeContent}
          ref={inputRef}
          placeholder="내용을 입력해주세요..."
        />
        <button onClick={onSubmit} className="cnrk-button">추가</button>
      </div>
    </div>
  );
}

export default Memos;