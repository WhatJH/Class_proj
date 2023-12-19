import React,{useState} from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css"

function TodoList({todo, onUpdate, onDelete}) {
  const [search, setSearch] = useState("");
  function onChangeSearch(e){
    setSearch(e.target.value);
  }
  function getSearchResult(){
    return (search === ""
    ? todo
    : todo.filter((item)=>item.content.includes(search)))
  }
  return (
    <div className="TodoList">
      <h3>Todo List</h3>
      <input
        value={search}
        className="searchbar"
        placeholder="검색어를 입력하세요"
        onChange={onChangeSearch}
      />
      <div>
        {getSearchResult().map((item)=>(
          <TodoItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          >
          </TodoItem>)
        )}
      </div>
    </div>
  )
};
export default TodoList;

