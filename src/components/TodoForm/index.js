import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import "react-datepicker/dist/react-datepicker.css";

import { TodoFormWrapper, FormTitleInput, FormPrioritySelect, FormDueDatePicker, FormDescriptionTextarea, FormButtonWrapper, FormSubmitButton, FormCancelButton, FormErrorMessages, FormErrorMessage } from './TodoForm.styled';

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
      <TodoFormWrapper onSubmit={event => this.handleSubmit(event)}>
        <FormTitleInput type="text" name="title" onChange={event => this.handleInputChange(event)} value={todoForm.title} placeholder="Enter task title" />

        <FormPrioritySelect name="priority" onChange={event => this.handleInputChange(event)} value={todoForm.priority}>
          {priorities.map((priority, index) => (
            <option key={priority} value={index}>{priority}</option>
          ))}
        </FormPrioritySelect>

        <FormDueDatePicker
          selected={todoForm.dueDate}
          minDate={(new Date())}
          onChange={(date) => this.handleDateChange(date)}
        />

        <FormDescriptionTextarea type="text" name="description" onChange={event => this.handleInputChange(event)} value={todoForm.description} placeholder="Enter task description" />

        <FormErrorMessages>
          {errorMessage.titleError &&
            <FormErrorMessage>{errorMessage.titleError}</FormErrorMessage>}
          {errorMessage.descriptionError &&
            <FormErrorMessage>{errorMessage.descriptionError}</FormErrorMessage>}
        </FormErrorMessages>

        <FormButtonWrapper>
          <FormSubmitButton type="submit" value="Submit" />
          <FormCancelButton type="button" value="Cancel" onClick={() => this.setState({ ...this.state, todoForm: initialTodo })} />
        </FormButtonWrapper>
      </TodoFormWrapper>
    )
  }
};

export default TodoForm;