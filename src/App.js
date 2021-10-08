import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";

import Layout from './components/Layout';

import "react-datepicker/dist/react-datepicker.css";

const initialTodo = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  priority: 0,
  dueDate: new Date(),
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }))
  }

  componentDidMount() {
    console.log('component did mount');
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, todoForm, priorities } = this.state;

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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {priorities[todo.priority]} - {(new Date(todo.dueDate)).toLocaleDateString()}
              <br />
              {todo.description}
              <br />
              <button onClick={() => this.handleRemoveTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default App;
