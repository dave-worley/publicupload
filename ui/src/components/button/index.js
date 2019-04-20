import React from 'react';
import './style.css';
export default ({
  children,
  action
}) => {
  return (
    <button className='button' onClick={ action }>
      { children }
    </button>
  );
}
