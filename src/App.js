import React from 'react';
import './App.css';
import Layout from './components/Layout';

const initialTodo = {
  title: '',
  description: '',
  isCompleted: false,
  priority: 0,
  dueDate: ''
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      priorities: ['Low', 'Medium', 'High'],
      todoForm: initialTodo,
      todos: [
        {
          id: 1,
          title: 'hello 1',
          description: 'Lorem ipsum dolor sit amet.',
          isCompleted: false,
          priority: 0,
          dueDate: Date.now()
        },
        {
          id: 2,
          title: 'hello 2',
          description: 'Lorem ipsum dolor sit amet.',
          isCompleted: true,
          priority: 2,
          dueDate: Date.now()
        },
      ],
    };
  };

  // because we are using arrow fn here
  // so no need to bind the function
  // resulting in cleaner code
  handleSubmit = (event) => {
    event.preventDefault();
    const newTodos = [...this.state.todos, {
      title: this.state.todoForm.title,
      description: this.state.todoForm.description,
    }];
    this.setState({
      todoForm: initialTodo,
      todos: newTodos
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      todoForm: {
        ...prevState.todoForm,
        [name]: value
      }
    }));
  }

  componentDidMount() {
    console.log('component did mount');
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, todoForm } = this.state;

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" onChange={this.handleInputChange} value={todoForm.title} placeholder="Enter task title" />

          <textarea type="text" name="description" onChange={this.handleInputChange} value={todoForm.description} placeholder="Enter task description" />

          <input type="submit" value="Submit" />
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.title}
              <br />
              {todo.description}
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default App;
