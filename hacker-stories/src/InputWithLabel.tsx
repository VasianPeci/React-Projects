import * as React from 'react';
import styles from './App.module.css';

type InputWithLabelProps = { 
  id: string; 
  value: string; 
  type?: string; 
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  isFocused?: boolean; 
  children: React.ReactNode; 
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({id, value, onInputChange, type='text', isFocused, children}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  React.useEffect(() => {
    if(isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className={styles.label}>{children}</label>
      &nbsp;
      <input className={styles.input} ref={inputRef} value={value} type={type} id={id} onChange={onInputChange}/>
    </>
  );
};

export {InputWithLabel};