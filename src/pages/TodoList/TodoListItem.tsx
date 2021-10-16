

import { Todos } from '../../store/reducers/todoReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoList.module.css';


const TodoListItem:React.FunctionComponent<{data: Todos, index: number}> = ({data, index}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const handleCompletedClick = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: data.title });
  }

  const handleEditClick = () => {
    setValue(data.title);
    setEdit(true);
  }

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_TODO', payload: data.title });
  }

  const handleSaveClick = () => {
    dispatch({ type: 'SAVE_TODO', payload: value, index: data.id });
    setEdit(false);
  }
  return (
    <div className={styles.listItem}>
      <div className={styles.listItemNumber}>
        {index + 1}
      </div>
      {
        edit 
          ? (<input 
              type='text'
              className={styles.editInput}
              value={value}
              onChange={(event) => setValue(event.target.value)}
          />)
          : (
            <div className={styles.listItemContent}>
              {data.title}
            </div>
          )
      }

      <button 
        className={styles.editButton}
        onClick={edit ? handleSaveClick : handleEditClick}
      >
        {
          edit ? 'Save' : 'Edit'
        }
      </button>

      <button 
        className={styles.addButton}
        onClick={handleCompletedClick}
      >
        {data.completed ? 'Unfinished' : 'Comleted'}
      </button>
      
      <button 
        className={styles.delButton}
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </div>
  )
}

export default TodoListItem;