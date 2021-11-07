import React from 'react';

import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoSearch from './components/TodoSearch';
import TodoContainer from './components/TodoContainer';
import TodoList from './components/TodoList';

import { AppTitle, ListWrapper, FormWrapper, TodoListContainer } from './App.styled'

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

  handleSortChange = (value) => {
    this.setState({ sortBy: value })
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
            <TodoSearch
              searchQuery={searchQuery}
              onHandleSearch={this.handleSearch}
              onHandleSortChange={this.handleSortChange}
            />
            <TodoListContainer>
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
            </TodoListContainer>
          </ListWrapper>
        </TodoContainer>
      </Layout>
    );
  }
}

export default App;
