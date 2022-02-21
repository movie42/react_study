import { useForm } from 'react-hook-form';

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  console.log(formState.errors);
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="이메일을 입력하세요"
        />
        <input
          {...register('first_name', { required: true })}
          type="text"
          placeholder="이름을 입력하세요."
        />
        <input
          {...register('last_name', { required: true })}
          type="text"
          placeholder="성을 입력하세요"
        />
        <input
          {...register('user_name', { required: true, minLength: 10 })}
          type="text"
          placeholder="사용하실 이름을 입력하세요."
        />
        <input
          {...register('password', { required: true, minLength: 5 })}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <input
          {...register('password_confirm', {
            required: '비밀번호는 반드시 입력해야합니다.',
            minLength: { value: 5, message: '비밀번호가 너무 짧아요' },
          })}
          type="password"
          placeholder="앞에 입력한 비밀번호와 똑같은 비밀번호를 입력해주세요."
        />
        <button>추가하기</button>
      </form>
    </div>
  );
}

export default ToDoList;
