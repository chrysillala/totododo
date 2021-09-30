import React from 'react';
import './App.css';
import Layout from './components/Layout';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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

  componentDidMount() {
    console.log('component did mount');
  };

  componentWillUnmount() {
    console.log('component will unmount');
  };

  render() {
    const { todos } = this.state;

    return (
      <Layout>
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
