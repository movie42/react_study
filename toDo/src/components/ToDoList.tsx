import { toDoSelector, toDoState } from "atoms";
import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDO";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>오늘의 할 일</h1>
      <CreateToDo />
      <h2>ToDo</h2>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>Doing</h2>

      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>DONE</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
