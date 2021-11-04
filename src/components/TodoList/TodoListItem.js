import React from 'react';

import { BsCheckCircleFill, BsCircle, BsXLg } from 'react-icons/bs';
import { GoKebabHorizontal } from 'react-icons/go';

import { TodoItemWrapper, TodoInfoWrapper, TodoIcon, TodoItemContent, TodoTitle, TodoDate, TodoPriorityPill, TodoDropdown, TodoDescriptionWrapper } from './TodoListItem.styled';
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
    const { isTodoOpen, isDropdownOpen } = this.state;

    return (
      <TodoItemWrapper>
        <TodoInfoWrapper>
          <TodoIcon onClick={() => onHandleCompleteTodo(todo.id)}>{todo.isCompleted ? <BsCheckCircleFill /> : <BsCircle />}</TodoIcon>
          <TodoItemContent>
            <TodoTitle>{todo.title}</TodoTitle>
            <TodoDate>{(new Date(todo.dueDate)).toLocaleDateString()}</TodoDate>{' '}
            <TodoPriorityPill>{priorities[todo.priority]}</TodoPriorityPill>
          </TodoItemContent>
          <TodoIcon>
            <GoKebabHorizontal onClick={() => this.setState({ isDropdownOpen: !isDropdownOpen })} />
          </TodoIcon>
          {isDropdownOpen &&
            <TodoDropdown>
              <button
                onClick={() => this.setState({ isTodoOpen: !isTodoOpen, isDropdownOpen: false })}>
                Detail
              </button>
              <button
                onClick={() => onHandleRemoveTodo(todo.id)}>
                Delete
              </button>
            </TodoDropdown>
          }
        </TodoInfoWrapper>
        {isTodoOpen &&
          <TodoDescriptionWrapper>
            <p>{todo.description}</p>
            <TodoIcon>
              <BsXLg onClick={() => this.setState({ isTodoOpen: !isTodoOpen })} />
            </TodoIcon>
          </TodoDescriptionWrapper>
        }
      </TodoItemWrapper>
    )
  }
}

export default TodoListItem;