import * as React from 'react';
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

const List: React.FC<ListProps> = ({ list, onRemoveItem }) => ( 
  <ul> 
    {list.map((item: any) => ( 
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

export {List};