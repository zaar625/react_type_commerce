import React from 'react';
import { useEffect, useState } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setMode } from 'redux/theme';
//테마모드
const Theme = () => {
  const [currMode, setCurrMode] = useState('light');
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode');
    if (themeClass === null) {
      localStorage.setItem('themeMode', 'light');
    }
  }, []);

  const Mode = (mode: string) => {
    if (mode === 'light') {
      setCurrMode('dark');
      localStorage.setItem('themeMode', 'dark');
      dispatch(setMode('dark'));
    } else {
      localStorage.setItem('themeMode', 'light');
      dispatch(setMode('light'));
      setCurrMode('light');
    }
  };
  return (
    <div onClick={() => Mode(currMode)}>
      {currMode === 'light' ? <BiSun /> : <BiMoon />}
    </div>
  );
};

export default React.memo(Theme);
