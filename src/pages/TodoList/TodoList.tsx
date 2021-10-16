import React, {useEffect, useState} from 'react';
import AppTitle from '../../components/AppTitle/AppTitle';
import { useSelector, useDispatch } from 'react-redux';
import { Todos } from '../../store/reducers/todoReducer';
import TodoListItem from './TodoListItem';

import styles from './TodoList.module.css';

const TodoList:React.FunctionComponent = () => {
  const [uncompletedData, setUncompletedData] = useState<Todos[]>([]);
  const [completedData, setCompletedData] = useState<Todos[]>([]);
  const dispatch = useDispatch();

  let datas:Todos[] = [];
  datas = useSelector((state)=>state) as Todos[];

  useEffect(()=>{
    let currentData:Todos[] = [];
    const dataInStorage = window.sessionStorage.getItem('todos');

    if (
      datas.length === 0 
      && dataInStorage 
      && JSON.parse(dataInStorage).length !== 0
      ) {
      currentData = JSON.parse(dataInStorage);
      dispatch({ type: 'SET_TODOS', payload: dataInStorage });
    } else currentData = datas;

    if (currentData.length !== 0) {
      const uncompletedDatas = currentData.filter((item)=>item.completed === false);
      const completedDatas = currentData.filter((item)=>item.completed === true);
      setUncompletedData(uncompletedDatas);
      setCompletedData(completedDatas);
    } else {
      setUncompletedData([]);
      setCompletedData([]);
    }
  }, [datas]);
  
  return (
    <>
      <AppTitle content={'todo'}/>
      <div className={styles.todoBlock}>
        {uncompletedData.length > 0
          ? (
              uncompletedData.map((todo, index)=>(
                <TodoListItem data={todo} index={index} key={todo.id}/>
              ))
            )
          : <div className={styles.noTasks}>No unfinished tasks</div>
        } 
      </div>
      {
        completedData.length > 0
         ? <AppTitle content={'comleted'}/>
         : null
      }
      {completedData.length > 0
        ? (
            <div className={styles.todoBlock}>
              {
                completedData.map((todo, index)=>(
                  <TodoListItem data={todo} index={index} key={todo.id}/>
                ))
              }
            </div>
          )
        : null
      } 
    </>
  )
}

export default TodoList;