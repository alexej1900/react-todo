import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  NavLink 
} from 'react-router-dom';
import CreateTodo from './pages/CreateTodo/CreateTodo';
import TodoList from './pages/TodoList/TodoList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.mainLayout}>
        <Router>
          <nav className={styles.navigation}>
            <NavLink 
              exact 
              to="/" 
              className={styles.navLink} 
              activeClassName={styles.navLinkActive}
            >
              Create TODO Form
            </NavLink>
            <NavLink 
              exact 
              to="/todos" 
              className={styles.navLink} 
              activeClassName={styles.navLinkActive}
            >
              TODOS 
            </NavLink>
          </nav>
          <h1 className={styles.mainTitle}>TODO</h1>
          <Route
            render={({ location }) => (
              <Switch location={location}>
                <Route exact path="/">
                  <CreateTodo />
                </Route>
                <Route path="/todos">
                  <TodoList />
                </Route>
              </Switch>
            )}
          />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
