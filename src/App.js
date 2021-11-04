import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoContainer from './components/TodoContainer';
import TodoList from './components/TodoList';

import { AppTitle, ListWrapper, FormWrapper } from './App.styled'

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
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.filter(({ id }) => id !== todoId),
    }));
  }

  handleCompleteTodo = (todoId) => {
    this.setState(prevState => ({
      ...prevState,
      todos: this.state.todos.map(todo => {
        if (todo.id === todoId) {
          todo.isCompleted = true;
          return todo;
        }
        return todo;
      })

    }));
  }

  handleSearch = (searchQuery) => {
    this.setState(prevState => ({
      ...prevState,
      searchQuery
    }))
  }

  componentDidMount() {
    console.log('component did mount');
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
              onSubmitTodo={newTodo => this.setState({ todos: [...todos, newTodo] })}
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
