import React from 'react';
import Button from '@material-ui/core/Button';
import { BsArrowRepeat } from 'react-icons/bs';

import style from './LoaderButton.module.scss';

const LoaderButton = ({
  isLoading,
  className,
  variant,
  color,
  disabled,
  children,
  ...props
}) => (
  <Button
    variant={variant}
    color={color}
    disabled={disabled || isLoading}
    className={`${style.blackButton} ${className}`}
    type="submit"
    {...props}
  >
    {isLoading && <BsArrowRepeat className={style.spinning} />}
    {children}
  </Button>
);

export default LoaderButton;
