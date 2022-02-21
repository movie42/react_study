import { Categories, IToDO, toDoState } from "atoms";
import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";

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
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          🗂
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ✍🏽
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          ✅
        </button>
      )}
    </li>
  );
}

export default ToDo;
