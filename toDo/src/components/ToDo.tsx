import { IToDO, toDoState } from 'atoms';
import { MouseEvent } from 'react';
import { useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDO) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((preValue) => {
      const targetIndex = preValue.findIndex((toDo) => toDo.id === id);
      const newValue = { text, id, category: name as any };
      return [
        ...preValue.slice(0, targetIndex),
        newValue,
        ...preValue.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          🗂
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          ✍🏽
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          ✅
        </button>
      )}
    </li>
  );
}

export default ToDo;
