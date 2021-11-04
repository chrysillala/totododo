import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoContainer from './components/TodoContainer';
import TodoList from './components/TodoList';


const AppTitle = styled.h1`
  font-size: 3rem;
  color: white;
  text-align: center;
`

const ListWrapper = styled.div`
  background-color: white;
  padding: 18px;
  overflow-y: scroll;
`

const FormWrapper = styled.div`
  padding: 18px;
`
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      sortBy: 'dueDate',
      isLoading: false,
      priorities: ['Low', 'Medium', 'High'],
      todos: [],
    };
  };

  // because we are using arrow fn here
  // so no need to bind the function
  // resulting in cleaner code

  handleRemoveTodo = (todoId) => {
    const newTodos = {
      ...this.state,
      todos: this.state.todos.filter(({ id }) => id !== todoId)
    };

    this.setState(newTodos)

    localStorage.setItem('todos', JSON.stringify(newTodos.todos));
  }

  handleCompleteTodo = (todoId) => {
    const newTodos = {
      ...this.state,
      todos: this.state.todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = true;
          return todo;
        }
        return todo;
      })
    };

    this.setState(newTodos);

    localStorage.setItem('todos', JSON.stringify(newTodos.todos));
  }

  handleSubmitTodo = (newTodo) => {
    const newTodos = [...this.state.todos, newTodo];
    this.setState({
      todos: newTodos
    });
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  handleSearch = (searchQuery) => {
    this.setState(prevState => ({
      ...prevState,
      searchQuery
    }))
  }

  componentDidMount() {
    const LocalStorageTodos = JSON.parse(localStorage.getItem('todos')) || [];

    this.setState({ todos: LocalStorageTodos });
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, priorities, searchQuery, sortBy } = this.state;

    const completedTodos = todos.filter(({ isCompleted }) => isCompleted !== false);

    const filteredTodos = todos.filter(todo => {
      return !todo.isCompleted && (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).sort((a, b) =>
      // sort order ascending
      sortBy === 'dueDate'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : a.priority - b.priority
    );

    return (
      <Layout>
        <TodoContainer>
          <FormWrapper>
            <AppTitle>Todo-list</AppTitle>
            <TodoForm
              priorities={priorities}
              onSubmitTodo={newTodo => this.handleSubmitTodo(newTodo)}
            />
          </FormWrapper>
          <ListWrapper>
            <div>
              <select name="sort" id="sort-by" onChange={event => this.setState({ sortBy: event.target.value })}>
                <option disabled>Sort By:</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
              <input
                type="text"
                name="searchQuery"
                onChange={(event) => this.handleSearch(event.target.value)}
                value={searchQuery}
              />
            </div>
            <TodoList
              todos={filteredTodos}
              priorities={priorities}
              onHandleCompleteTodo={(todoId) => this.handleCompleteTodo(todoId)}
              onHandleRemoveTodo={(todoId) => this.handleRemoveTodo(todoId)}
            />
            <p>Archive Task</p>
            <TodoList
              todos={completedTodos}
              priorities={priorities}
              onHandleCompleteTodo={(todoId) => this.handleCompleteTodo(todoId)}
              onHandleRemoveTodo={(todoId) => this.handleRemoveTodo(todoId)}
            />
          </ListWrapper>
        </TodoContainer>
      </Layout>
    );
  }
}

export default App;
