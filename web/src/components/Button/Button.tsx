import styles from './Button.module.css';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({ children, onClick, disabled }: ButtonProps) {
  return <button disabled={disabled} onClick={onClick} className={styles.button}>{children}</button>;
}