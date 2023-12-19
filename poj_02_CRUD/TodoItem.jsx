import React from "react";
import "./TodoItem.css"

function TodoItem({id, isDone, content, createdDate, onUpdate, onDelete}) {
  function onChangeCheckbox(){
    onUpdate(id);
  }
  function onClickDelete(){
    onDelete(id);
  }
  return (
    <div className="TodoItem">
      <input
        className="checkbox_col"
        checked={isDone}
        type="checkbox"
        onChange={onChangeCheckbox}
      />
      <div className="title_col">{content}</div>
      <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
      <button className="btn_col" onClick={onClickDelete}>삭제</button>
    </div>
  )
};
export default TodoItem;

