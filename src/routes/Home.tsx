import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToDosState, addToDo, deleteToDo } from "../store/store";

export default function Home() {
  const [text, setText] = useState("");
  const todos = useSelector((state: ToDosState) => state.toDos);
  const dispatch = useDispatch();
  console.log(todos);

  const onChange = (e: any) => {
    setText(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addToDo(text));
    setText("");
  };
  const onDelete = (id: number) => {
    dispatch(deleteToDo(id));
  };
  return (
    <div>
      <h1>toDos</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => onDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
