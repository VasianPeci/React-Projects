import * as React from 'react';
import styles from './App.module.css';
import { InputWithLabel } from './App';

type SearchFormProps = { 
  searchTerm: string; 
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
};

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit
}) => {
  return (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
      <InputWithLabel id="search" value={searchTerm} onInputChange={onSearchInput}>
        Search:
      </InputWithLabel>
      <button type='submit' disabled={!searchTerm} className={`${styles.button} ${styles.buttonLarge}`}>Submit</button>
    </form>);
};

export {SearchForm};