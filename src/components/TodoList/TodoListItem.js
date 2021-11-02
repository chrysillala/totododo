import React from 'react'

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTodoOpen: false,
      isDropdownOpen: false,
    };
  };

  render() {
    const { todo, priorities, onHandleCompleteTodo, onHandleRemoveTodo } = this.props;
    const { isTodoOpen } = this.state;

    return (
      <li>
        <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          onClick={() => this.setState({ isTodoOpen: !isTodoOpen })}>
          {todo.title}
        </p>
        <span>{(new Date(todo.dueDate)).toLocaleDateString()} </span>
        <span>{priorities[todo.priority]}</span>
        {isTodoOpen &&
          <div>{todo.description}</div>
        }
        <br />
        <div>
          {!todo.isCompleted &&
            <button onClick={() => onHandleCompleteTodo(todo.id)}>Complete</button>
          }
          <button onClick={() => onHandleRemoveTodo(todo.id)}>Delete</button>
        </div>
      </li>
    )
  }
}

export default TodoListItem;