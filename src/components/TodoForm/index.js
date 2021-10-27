import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const initialTodo = {
  id: '',
  title: '',
  description: '',
  isCompleted: false,
  priority: 1,
  dueDate: new Date(),
};

const errorMessage = {
  titleError: '',
  descriptionError: '',
}

const StyledTodoForm = styled.form`
  display: grid;
`

class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoForm: initialTodo,
      errorMessage
    };
  };

  validate = () => {
    let titleError = '';
    let descriptionError = '';

    if (!this.state.todoForm.title) {
      titleError = 'Title cannot be blank';
    }

    if (this.state.todoForm.title.length > 100) {
      titleError = 'Maximum character for title is 100 characters';
    }

    if (this.state.todoForm.description.length > 255) {
      descriptionError = 'Maximum character for description is 255 characters'
    }

    if (titleError || descriptionError) {
      this.setState(prevState => ({
        errorMessage: {
          ...prevState.errorMessage,
          titleError,
          descriptionError
        }
      }));
      return false;
    }

    return true;
  }

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
  };

  handleDateChange = (date) => {
    this.setState(prevState => ({
      todoForm: {
        ...prevState.todoForm,
        dueDate: new Date(date)
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let isValid = this.validate();
    const newTodo = {
      id: uuidv4(),
      title: this.state.todoForm.title,
      description: this.state.todoForm.description,
      priority: this.state.todoForm.priority,
      dueDate: this.state.todoForm.dueDate,
      isCompleted: false
    };

    if (isValid) {
      // send the new todo to parent component, which is called lifting state up
      this.props.onSubmitTodo(newTodo);

      // clear form
      this.setState({
        todoForm: initialTodo
      });
    }

  };

  render() {
    const { priorities } = this.props;
    const { todoForm, errorMessage } = this.state;

    return (
      <StyledTodoForm onSubmit={event => this.handleSubmit(event)}>
        <div>
          <input type="text" name="title" onChange={event => this.handleInputChange(event)} value={todoForm.title} placeholder="Enter task title" />
          {errorMessage.titleError &&
            <p style={{ color: 'red' }}>{errorMessage.titleError}</p>}
        </div>

        <div>
          <select name="priority" onChange={event => this.handleInputChange(event)} value={todoForm.priority}>
            {priorities.map((priority, index) => (
              <option key={priority} value={index}>{priority}</option>
            ))}
          </select>

          <DatePicker
            selected={todoForm.dueDate}
            minDate={(new Date())}
            onChange={(date) => this.handleDateChange(date)}
          />
        </div>

        <div>
          <textarea type="text" name="description" onChange={event => this.handleInputChange(event)} value={todoForm.description} placeholder="Enter task description" />
          {errorMessage.descriptionError &&
            <p style={{ color: 'red' }}>{errorMessage.descriptionError}</p>}
        </div>

        <div>
          <input type="button" value="Cancel" onClick={() => this.setState({ ...this.state, todoForm: initialTodo })} />
          <input type="submit" value="Submit" />
        </div>
      </StyledTodoForm>
    )
  }
};

export default TodoForm;