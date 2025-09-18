import styles from './Button.module.css';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
};

export function Button({ children }: ButtonProps) {
  return <button className={styles.button}>{children}</button>;
}