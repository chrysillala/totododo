import React from 'react';

import { supabase } from './lib/supabase/client';

import { UserPanel } from './components/Account';
import Layout from './components/Layout';
import TodoForm from './components/TodoForm';
import TodoSearch from './components/TodoSearch';
import TodoContainer from './components/TodoContainer';
import TodoList from './components/TodoList';

import Login from './pages/Login';

import { AppTitle, ListWrapper, FormWrapper, TodoListContainer, TodoEmptyWrapper, TodoEmptyInfoWrapper, TodoEmptyTitle } from './App.styled';
import emptyImage from './assets/images/empty.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      sortBy: 'dueDate',
      isLoading: false,
      priorities: ['Low', 'Medium', 'High'],
      todos: [],
      session: null
    };
  };

  // because we are using arrow fn here
  // so no need to bind the function
  // resulting in cleaner code

  handleRemoveTodo = async (todoId) => {
    await supabase
      .from('todos')
      .delete()
      .eq("id", todoId);

    this.setState({
      ...this.state,
      todos: this.state.todos.filter(({ id }) => id !== todoId),
    })
  }

  handleCompleteTodo = async (todo) => {
    const { data: todoData, error } = await supabase
      .from('todos')
      .update({ isCompleted: !todo.isCompleted })
      .eq("id", todo.id)
      .single();

    if (error) {
      console.log('error', error)
    } else {
      this.setState({
        ...this.state,
        todos: this.state.todos.map(todo => {
          if (todo.id === todoData.id) {
            todo.isCompleted = todoData.isCompleted;
            return todo;
          }
          return todo;
        })
      })
    }
  }

  handleSubmitTodo = async (newTodo) => {
    await supabase
      .from('todos')
      .insert([newTodo])
      .single();

    this.setState({
      ...this.state,
      todos: [...this.state.todos, newTodo]
    })
  }

  handleSearch = (searchQuery) => {
    this.setState({
      ...this.state,
      searchQuery
    })
  }

  handleSortChange = (value) => {
    this.setState({
      ...this.state,
      sortBy: value
    })
  }

  fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from('todos')
      .select()

    if (error) {
      console.log('error', error)
    } else {
      this.setState({ todos })
    }
  };

  componentDidMount() {
    console.log('component did mount');

    this.setState({ session: supabase.auth.session() });
    supabase.auth.onAuthStateChange((_event, session) => {
      this.setState({ session });
      this.fetchTodos();
    })
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, priorities, searchQuery, sortBy, session } = this.state;

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

    const EmptyTodos = (
      <TodoListContainer>
        <TodoEmptyWrapper>
          <TodoEmptyInfoWrapper>
            <img src={emptyImage} alt={'no todos at all'} />
            <TodoEmptyTitle>No todos at all</TodoEmptyTitle>
          </TodoEmptyInfoWrapper>
        </TodoEmptyWrapper>
      </TodoListContainer>
    )

    const TodoApp = (
      <Layout>
        <TodoContainer>
          <FormWrapper>
            <AppTitle>Todo-list</AppTitle>
            <TodoForm
              priorities={priorities}
              session={session}
              onSubmitTodo={newTodo => this.handleSubmitTodo(newTodo)}
            />
            <UserPanel />
          </FormWrapper>
          <ListWrapper>
            <TodoSearch
              searchQuery={searchQuery}
              onHandleSearch={this.handleSearch}
              onHandleSortChange={this.handleSortChange}
            />
            {todos.length
              ? <TodoListContainer>
                <TodoList
                  todos={filteredTodos}
                  priorities={priorities}
                  onHandleCompleteTodo={(todo) => this.handleCompleteTodo(todo)}
                  onHandleRemoveTodo={(todoId) => this.handleRemoveTodo(todoId)}
                />
                <p>Archive Task</p>
                <TodoList
                  todos={completedTodos}
                  priorities={priorities}
                  onHandleCompleteTodo={(todo) => this.handleCompleteTodo(todo)}
                  onHandleRemoveTodo={(todoId) => this.handleRemoveTodo(todoId)}
                />
              </TodoListContainer>
              : EmptyTodos
            }
          </ListWrapper>
        </TodoContainer>
      </Layout>
    )

    return (
      <>
        {!session ? <Login /> : TodoApp}
      </>
    );
  }
}

export default App;
