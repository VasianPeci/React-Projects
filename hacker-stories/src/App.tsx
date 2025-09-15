import * as React from 'react';
import axios from 'axios';
import { List } from './List';
import { InputWithLabel } from './InputWithLabel';
import { SearchForm } from './SearchForm';
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

const App = () => {

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

export default App;
export { storiesReducer, SearchForm, InputWithLabel, List }; 