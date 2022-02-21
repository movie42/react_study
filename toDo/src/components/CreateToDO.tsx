import { categoryState, toDoState } from "atoms";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((prev) => [{ id: Date.now(), text: toDo, category }, ...prev]);

    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "할 일을 반드시 하나는 입력해야합니다.",
        })}
        type="text"
        placeholder="할 일을 적어주세요."
      />
      <button>추가하기</button>
    </form>
  );
}

export default CreateToDo;
