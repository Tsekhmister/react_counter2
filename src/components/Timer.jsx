import React, { useEffect, useReducer } from "react";
import './Timer.css';

const countReducer = (state, { type }) => {
  if (type === "START") {
    return {
      ...state,
      isCounting: true,
    };
  }

  if (type === "STOP") {
    return {
      ...state,
      isCounting: false,
    };
  }

  if (type === "RESET") {
    return {
      count: 0,
      isCounting: false,
    };
  }

  if (type === "TICK") {
    return {
      ...state,
      count: state.count + 1,
    };
  }

  return state;
};

const setDefaultValue = () => {
  const userCount = localStorage.getItem('count');
  return userCount ? +userCount : 0;
};

export const Timer = () => {
  const [{ count, isCounting }, dispatch] = useReducer(countReducer, {
    count: setDefaultValue(),
    isCounting: false,
  });

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  useEffect(() => {
    let timerId = null;

    if (isCounting) {
      timerId = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 500);
    }

    return () => {
      timerId && clearInterval(timerId);
      timerId = null;
    };
  }, [isCounting]);

  return (
    <div className="timer">
      <h3>{count}</h3>
      {!isCounting ? (
        <button className="timer__button" type="button" onClick={() => dispatch({ type: 'START'})}>Start</button>
      ) : (
        <button className="timer__button" type="button" onClick={() => dispatch({ type: 'STOP'})}>Stop</button>
      )}
      <button className="timer__button final" type="button" onClick={() => dispatch({ type: 'RESET'})}>Reset</button>
    </div>
  );
};
