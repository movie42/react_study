import { toDoState } from 'atoms';
import { useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDO';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <div>
      <h1>오늘의 할 일</h1>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
