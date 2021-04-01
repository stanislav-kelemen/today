import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';

import style from './LoaderButton.module.scss';

const LoaderButton = ({
  isLoading,
  className,
  disabled,
  children,
}) => (
  <button
    disabled={disabled || isLoading}
    className={`${style.LoaderButton} ${style.blackButton} ${className}`}
    type="submit"
  >
    {isLoading && <BsArrowRepeat className={style.spinning} />}
    {children}
  </button>
);

export default LoaderButton;
