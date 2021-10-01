import React from 'react';
import './App.css';
import Layout from './components/Layout';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      priorities: ['Low', 'Medium', 'High'],
      initialTodo: {
        title: '',
        description: '',
        isCompleted: false,
        priority: 0,
        dueDate: ''
      },
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
      title: this.state.todoTitle,
      description: this.state.todoDescription,
    }];
    this.setState({
      value: '',
      todos: newTodos
    });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    console.log('component did mount');
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, todoTitle, todoDescription } = this.state;

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="todoTitle" onChange={this.handleInputChange} value={todoTitle} placeholder="Enter task title" />

          <textarea type="text" name="todoDescription" onChange={this.handleInputChange} value={todoDescription} />

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
