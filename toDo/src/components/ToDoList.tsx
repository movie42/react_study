import { categoryState, toDoSelector, toDoState } from "atoms";
import { FormEvent } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDO";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>오늘의 할 일</h1>
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">DONE!</option>
      </select>
      <CreateToDo />
      <ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
