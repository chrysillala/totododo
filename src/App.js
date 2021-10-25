import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";

import Layout from './components/Layout';
import TodoList from './components/TodoList';

import "react-datepicker/dist/react-datepicker.css";

const initialTodo = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  priority: 1,
  dueDate: new Date(),
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      sortBy: 'dueDate',
      isLoading: false,
      priorities: ['Low', 'Medium', 'High'],
      todoForm: initialTodo,
      todos: [],
    };
  };

  // because we are using arrow fn here
  // so no need to bind the function
  // resulting in cleaner code
  handleSubmit = (event) => {
    event.preventDefault();

    const newTodos = [...this.state.todos, {
      id: uuidv4(),
      title: this.state.todoForm.title,
      description: this.state.todoForm.description,
      priority: this.state.todoForm.priority,
      dueDate: this.state.todoForm.dueDate,
    }];

    this.setState({
      todoForm: initialTodo,
      todos: newTodos
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value;

    switch (value) {
      case 'checkbox':
        value = target.checked;
        break;
      default:
        value = target.value
        break;
    }

    this.setState(prevState => ({
      todoForm: {
        ...prevState.todoForm,
        [name]: value
      }
    }));
  }

  handleDateChange = (date) => {
    this.setState(prevState => ({
      todoForm: {
        ...prevState.todoForm,
        dueDate: new Date(date)
      }
    }));
  }

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
    const { todos, todoForm, priorities, searchQuery, sortBy } = this.state;

    const filteredTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase());
    }).sort((a, b) =>
      // sort order ascending
      sortBy === 'dueDate'
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : a.priority - b.priority
    );

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" onChange={this.handleInputChange} value={todoForm.title} placeholder="Enter task title" />

          <select name="priority" onChange={this.handleInputChange} value={todoForm.priority}>
            {priorities.map((priority, index) => (
              <option key={priority} value={index}>{priority}</option>
            ))}
          </select>

          <DatePicker
            selected={todoForm.dueDate}
            minDate={(new Date())}
            onChange={(date) => this.handleDateChange(date)}
          />

          <textarea type="text" name="description" onChange={this.handleInputChange} value={todoForm.description} placeholder="Enter task description" />

          <input type="submit" value="Submit" />
        </form>
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
      </Layout>
    );
  }
}

export default App;
