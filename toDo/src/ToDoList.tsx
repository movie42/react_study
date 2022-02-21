import { useForm } from 'react-hook-form';

interface IForm {
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
  password_confirm: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (data.password !== data.password_confirm) {
      setError(
        'password_confirm',
        {
          message: '앞의 비밀번호와 같아야합니다.',
        },
        {
          shouldFocus: true,
        }
      );
    }
    // setError('extraError', { message: '서버가 요청을 거부하였습니다.' });
  };
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}>
        <input
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value:
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
              message: '이메일을 입력해야합니다.',
            },
          })}
          type="email"
          placeholder="이메일을 입력하세요"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('first_name', {
            required: '이름을 입력해주세요.',
            validate: {
              noJavascript: (value) =>
                value.includes('javascript')
                  ? '사용할수 없는 문자입니다.'
                  : true,
              noJava: (value) =>
                value.includes('java') ? '사용할수 없는 문자입니다.' : true,
            },
          })}
          type="text"
          placeholder="이름을 입력하세요."
        />
        <span>{errors?.first_name?.message}</span>
        <input
          {...register('last_name', { required: '성을 입력해주세요.' })}
          type="text"
          placeholder="성을 입력하세요"
        />
        <span>{errors?.last_name?.message}</span>
        <input
          {...register('user_name', {
            required: '사용자 이름이 필요합니다.',
            minLength: 4,
          })}
          type="text"
          placeholder="사용하실 이름을 입력하세요."
        />
        <span>{errors?.user_name?.message}</span>
        <input
          {...register('password', {
            required: '비밀번호는 반드시 입력해야합니다.',
            minLength: { value: 5, message: '비밀번호가 너무 짧아요' },
          })}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password_confirm', {
            required: '비밀번호는 반드시 입력해야합니다.',
            minLength: { value: 5, message: '비밀번호가 너무 짧아요' },
          })}
          type="password"
          placeholder="앞에 입력한 비밀번호와 똑같은 비밀번호를 입력해주세요."
        />
        <span>{errors?.password_confirm?.message}</span>
        <button>추가하기</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
