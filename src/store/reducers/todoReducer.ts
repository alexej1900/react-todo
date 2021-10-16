import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  SAVE_TODO,
  SET_TODOS,
  ADD_10_TODOS,
} from '../actionTypes';

export interface Todos {
  userId?:number;
  title: string;
  completed: boolean;
  id: number;
};

const initialState:Todos[] = [];

export const todoReducer = (
  state = initialState, 
  action: { type: any; payload: string; index?: number; }
  ) => {
  switch (action.type) {
    case ADD_TODO:
      let id = 0;
      if (state.length !== 0) {
        id = state[state.length-1].id+1;
      }
      const newTodo = { title: action.payload, completed: false, id: id}
      state.push(newTodo);
      window.sessionStorage.setItem('todos', JSON.stringify(state));
      return state;

    case TOGGLE_TODO:
      const toggleState = state.map((todo, index) =>
        action.payload === todo.title
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      window.sessionStorage.setItem('todos', JSON.stringify(toggleState));
      return toggleState;
    
    case DELETE_TODO:
      const newState = state.filter((todo, index) =>
        action.payload !== todo.title
      );
      window.sessionStorage.setItem('todos', JSON.stringify(newState));
      return newState;

    case SAVE_TODO:
      const savedState = state.map((todo) =>
        action.index === todo.id
          ? { ...todo, title: action.payload }
          : todo
      );
      window.sessionStorage.setItem('todos', JSON.stringify(savedState));
      return savedState;

    case SET_TODOS:
      return JSON.parse(action.payload);

    case ADD_10_TODOS:
      window.sessionStorage.setItem('todos', action.payload);
      return JSON.parse(action.payload);

    default:
      return state
  }
};
