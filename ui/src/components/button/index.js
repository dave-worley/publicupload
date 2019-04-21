import React from 'react';
import './style.css';
export default ({
  children,
  action,
  className
}) => {
  return (
    <button className={ `button ${className}` } onClick={ action }>
      { children }
    </button>
  );
}
