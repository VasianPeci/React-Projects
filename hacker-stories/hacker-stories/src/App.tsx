import * as React from 'react';
import axios from 'axios';
import styles from './App.module.css';

type Story = { 
  objectID: string; 
  url: string; 
  title: string; 
  author: string; 
  num_comments: number; 
  points: number;
};

type Stories = Story[];

type ItemProps = { 
  item: Story; 
  onRemoveItem: (item: Story) => void; 
};

type ListProps = { 
  list: Stories; 
  onRemoveItem: (item: Story) => void; 
};

type StoriesState = { 
  data: Stories; 
  isLoading: boolean; 
  isError: boolean; 
};

type StoriesFetchInitAction = { 
  type: 'STORIES_FETCH_INIT'; 
} 

type StoriesFetchSuccessAction = { 
  type: 'STORIES_FETCH_SUCCESS'; 
  payload: Stories; 
} 

type StoriesFetchFailureAction = { 
  type: 'STORIES_FETCH_FAILURE'; 
}

type StoriesRemoveAction = { 
  type: 'REMOVE_STORY'; 
  payload: Story; 
} 

type StoriesAction = 
StoriesFetchInitAction 
| StoriesFetchSuccessAction 
| StoriesFetchFailureAction 
| StoriesRemoveAction;

type SearchFormProps = { 
  searchTerm: string; 
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
};

type InputWithLabelProps = { 
  id: string; 
  value: string; 
  type?: string; 
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  isFocused?: boolean; 
  children: React.ReactNode; 
}; 

const App = () => {

  const storiesReducer = (state: StoriesState, action: StoriesAction) => { 
    switch (action.type) { 
      case 'STORIES_FETCH_INIT': 
        return { 
          ...state, 
          isLoading: true, 
          isError: false, 
        }; 
      case 'STORIES_FETCH_SUCCESS': 
        return { 
          ...state, 
          isLoading: false, 
          isError: false, 
          data: action.payload, 
        }; 
      case 'STORIES_FETCH_FAILURE': 
        return { 
          ...state, 
          isLoading: false, 
          isError: true, 
        }; 
      case 'REMOVE_STORY': 
        return { 
          ...state, 
          data: state.data.filter( 
            (story) => action.payload.objectID !== story.objectID 
          ), 
        }; 
      default: 
        throw new Error(); 
    } 
  };

  const useStorageState = (key: string, initialValue: string): [string, (newValue: string) => void] => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialValue);
    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  };

  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='; 
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {data: [], isLoading: false, isError: false});
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = React.useCallback(async () => {
    if (!searchTerm) return;

    try {
      dispatchStories({ type: 'STORIES_FETCH_INIT' });

      const result = await axios.get(url);
      dispatchStories({ 
        type: 'STORIES_FETCH_SUCCESS', 
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({
        type: 'STORIES_FETCH_FAILURE'
      });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  return (
  <div className={styles.container}>
    <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
    
    <SearchForm onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit} searchTerm={searchTerm}></SearchForm>
    {stories.isError && <p>Error</p>}
    {stories.isLoading ? (<p>Loading...</p>) : (<List list={stories.data} onRemoveItem={handleRemoveStory} />)} 
  </div>
)};

const List: React.FC<ListProps> = ({ list, onRemoveItem }) => ( 
  <ul> 
    {list.map((item) => ( 
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} /> 
    ))} 
  </ul>
 ); 
 
const Item: React.FC<ItemProps> = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  }

  return (
  <li className={styles.item}> 
    <span style={{width: '40%'}}> 
      <a href={item.url}>{item.title}</a> 
    </span> 
    <span style={{width: '30%'}}>{item.author}</span> 
    <span style={{width: '10%'}}>{item.num_comments}</span> 
    <span style={{width: '10%'}}>{item.points}</span>
    <span style={{width: '10%'}}>
      <button type='button' onClick={handleRemoveItem} className={`${styles.button} ${styles.buttonSmall}`}>
      </button>
    </span>
  </li>
 )};

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

export default App;