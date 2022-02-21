import { useForm } from 'react-hook-form';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

interface IForm {
  toDo: string;
}

interface IToDO {
  id: number;
  text: string;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

const toDoState = atom<IToDO[]>({
  key: 'toDo',
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    console.log('add to do', toDo);
    setToDos((prev) => [
      { id: Date.now(), text: toDo, category: 'TO_DO' },
      ...prev,
    ]);

    setValue('toDo', '');
  };

  return (
    <div>
      <h1>오늘의 할 일</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', {
            required: '할 일을 반드시 하나는 입력해야합니다.',
          })}
          type="text"
          placeholder="할 일을 적어주세요."
        />
        <button>추가하기</button>
      </form>

      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
