import { useForm } from 'react-hook-form';

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input
          {...register('email')}
          type="email"
          placeholder="이메일을 입력하세요"
        />
        <input
          {...register('first_name')}
          type="text"
          placeholder="이름을 입력하세요."
        />
        <input
          {...register('last_name')}
          type="text"
          placeholder="성을 입력하세요"
        />
        <input
          {...register('user_name')}
          type="text"
          placeholder="사용하실 이름을 입력하세요."
        />
        <input
          {...register('password')}
          type="text"
          placeholder="비밀번호를 입력하세요."
        />
        <input
          {...register('password_confirm')}
          type="text"
          placeholder="앞에 입력한 비밀번호와 똑같은 비밀번호를 입력해주세요."
        />
        <button>추가하기</button>
      </form>
    </div>
  );
}

export default ToDoList;
