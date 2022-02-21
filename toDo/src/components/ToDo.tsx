import { IToDO } from 'atoms';

function ToDo({ text }: IToDO) {
  return (
    <li>
      <span>{text}</span>
      <button>🗂</button>
      <button>✍🏽</button>
      <button>✅</button>
    </li>
  );
}

export default ToDo;
