import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragableCard from "./DragabbleCard";
import { ITodo, toDoState } from "atoms";
import { useSetRecoilState } from "recoil";

const Warpper = styled.div`
  border-radius: 0.5rem;
  padding-top: 1rem;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 25vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const DropArea = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 2rem;
`;

const Form = styled.form`
  width: 100%;
  input {
    box-sizing: border-box;
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IFrom {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IFrom>();
  const onValid = ({ toDo }: IFrom) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Warpper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`할 일을 ${boardId}에 추가합니다.`}
        />
      </Form>

      <Droppable droppableId={boardId}>
        {(provied, snapshot) => (
          <DropArea
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provied.innerRef}
            {...provied.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provied.placeholder}
          </DropArea>
        )}
      </Droppable>
    </Warpper>
  );
}

export default Board;
