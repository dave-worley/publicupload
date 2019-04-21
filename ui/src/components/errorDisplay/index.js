import React from 'react';
import './style.css';

export default ({
  children
}) => {
  return (
    <div className='error'>
      <div className='content'>
        { children }
      </div>
    </div>
  );
};
