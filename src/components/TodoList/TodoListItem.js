import React from 'react';

import { BsCheckCircleFill, BsCircle, BsXLg } from 'react-icons/bs';
import { GoKebabHorizontal } from 'react-icons/go';
import { AnimatePresence } from 'framer-motion';

import { TodoItemWrapper, TodoInfoWrapper, TodoIcon, TodoItemContent, TodoTitle, TodoDate, TodoPriorityPill, TodoDropdown, TodoDropdownButton, TodoDescriptionWrapper } from './TodoListItem.styled';
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
      <TodoItemWrapper
        positionTransition
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      >
        <TodoInfoWrapper>
          <TodoIcon onClick={() => onHandleCompleteTodo(todo)}>{todo.isCompleted ? <BsCheckCircleFill /> : <BsCircle />}</TodoIcon>
          <TodoItemContent>
            <TodoTitle>{todo.title}</TodoTitle>
            <TodoDate>{(new Date(todo.dueDate)).toLocaleDateString()}</TodoDate>{' '}
            <TodoPriorityPill priority={todo.priority}>{priorities[todo.priority]}</TodoPriorityPill>
          </TodoItemContent>
          <TodoIcon onClick={() => this.setState({ isDropdownOpen: !isDropdownOpen })}>
            <GoKebabHorizontal />
          </TodoIcon>
          {isDropdownOpen &&
            <TodoDropdown animate={{ y: 8 }}>
              <TodoDropdownButton
                onClick={() => this.setState({ isTodoOpen: !isTodoOpen, isDropdownOpen: false })}>
                Detail
              </TodoDropdownButton>
              <TodoDropdownButton
                onClick={() => onHandleRemoveTodo(todo.id)}>
                Delete
              </TodoDropdownButton>
            </TodoDropdown>
          }
        </TodoInfoWrapper>
        <AnimatePresence initial={false}>
          {isTodoOpen &&
            <TodoDescriptionWrapper
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { visibility: 'visible', opacity: 1, height: 'auto' },
                collapsed: { visibility: 'hidden', opacity: 0, height: 0 }
              }}>
              <p>{todo.description}</p>
              <TodoIcon small>
                <BsXLg onClick={() => this.setState({ isTodoOpen: !isTodoOpen })} />
              </TodoIcon>
            </TodoDescriptionWrapper>
          }
        </AnimatePresence>
      </TodoItemWrapper>
    )
  }
}

export default TodoListItem;