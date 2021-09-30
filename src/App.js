import React from 'react';
import './App.css';
import Layout from './components/Layout';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      value: '',
      todos: [
        {
          id: 1,
          title: 'hello 1',
          description: 'Lorem ipsum dolor sit amet.',
          isCompleted: false,
          priority: 'low',
          createdAt: Date.now()
        },
        {
          id: 2,
          title: 'hello 2',
          description: 'Lorem ipsum dolor sit amet.',
          isCompleted: true,
          priority: 'low',
          createdAt: Date.now()
        },
      ]
    };
  };

  // because we are using arrow fn here
  // so no need to bind the function
  // resulting in cleaner code
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodos = [...this.state.todos, { title: this.state.value }];
    this.setState({
      value: '',
      todos: newTodos
    });
  };

  componentDidMount() {
    console.log('component did mount');
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos, value } = this.state;

    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={value} />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.title}
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

export default App;
