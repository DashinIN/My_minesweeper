import s from './Input.module.scss';

function Input({
  count, increment, setCount, text,
}) {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>{text}</div>
      <div className={s.input}>
        <div className={s.control} onClick={() => setCount((prevState) => (prevState >= 1 + increment ? prevState -= increment : prevState))}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {' '}
            <path fillRule="evenodd" clipRule="evenodd" d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z" fill="#374151" />
            {' '}
          </svg>
        </div>

        <div className={s.counter}>{count}</div>

        <div className={s.control} onClick={() => setCount((prevState) => prevState += increment)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
            {' '}
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            {' '}
          </svg>
        </div>
      </div>
    </div>

  );
}
export default Input;
