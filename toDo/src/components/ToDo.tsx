import { IToDO, toDoState } from 'atoms';
import { MouseEvent } from 'react';
import { useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDO) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
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
