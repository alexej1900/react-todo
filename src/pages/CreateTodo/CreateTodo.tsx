import React, {useEffect, useState} from 'react';
import AppTitle from '../../components/AppTitle/AppTitle';
import styles from './CreateTodo.module.css';
import { useDispatch } from 'react-redux';
import { Todos } from '../../store/reducers/todoReducer';

const CreateTodo:React.FunctionComponent = ()=> {
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
    
  useEffect(()=>{
    let resArr:Todos[] = [];
    const dataInStorage = window.sessionStorage.getItem('todos');

    if (!dataInStorage) {
      setLoad(true);
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((json) => {
          resArr = json.slice(0, 10);
          dispatch({ type: 'ADD_10_TODOS', payload: JSON.stringify(resArr)});
          setLoad(false);
        })
    }
  }, [])
  

  const handleClick = () => {
    dispatch({ type: 'ADD_TODO', payload: value });
    setValue('');
  }
  return (
    <>
      <AppTitle content={'add item'}/>
      <div className={styles.addBlock}>
        <input 
          type='text'
          className={styles.input}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button 
          className={styles.addButton}
          onClick={handleClick}
        >
          ADD
        </button>
      </div>
      {
        load
         ? <div className={styles.load}>Loading data ...</div>
         : null
      }
    </>
  )
}

export default CreateTodo;