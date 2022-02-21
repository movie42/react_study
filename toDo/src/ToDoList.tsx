import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

function ToDoList() {
  const [toDo, setToDo] = useState('');
  const [toDoError, setToDoError] = useState('');
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      return setToDoError('길이가 10글자 이상이어야합니다.');
    } else {
      return setToDoError('');
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="할일 입력하기"
        />

        <button>추가하기</button>
        {toDoError !== '' ? toDoError : null}
      </form>
    </div>
  );
}

export default ToDoList;
