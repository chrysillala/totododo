import React from 'react';
import styled from 'styled-components';

const TodoItemWrapper = styled.li`
  border: 1px solid var(--secondary);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;

  > div {
    display: flex;
    align-items: center;
  }
`;

const TodoCheckbox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 13px;
`;

const TodoItemContent = styled.div`
  display: flex;
`

const TodoTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--black);
  margin: 0 0 4px 0;
`;

const TodoDate = styled.span`
  font-size: 10px;
  color: var(--light-gray);
`

const TodoPriorityPill = styled.span`
  background-color: var(--secondary);
  padding: 3px 15px;
  color: var(--white);
  font-size: 8px;
  border-radius: 16px;
`;

const TodoDescription = styled.div`
  font-size: 12px;
  color: var(--gray);
  padding: 13px;
  border-top: 1px solid var(--secondary);
`;

const TodoDropdown = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  padding: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 6px;
  display: flex;
  flex-flow: column wrap;
`;
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
        <div>
          <TodoCheckbox onClick={() => onHandleCompleteTodo(todo.id)}>{todo.isCompleted ? "v" : "x"}</TodoCheckbox>
          <TodoItemContent>
            <div>
              <TodoTitle>{todo.title}</TodoTitle>
              <TodoDate>{(new Date(todo.dueDate)).toLocaleDateString()}</TodoDate>{' '}
              <TodoPriorityPill>{priorities[todo.priority]}</TodoPriorityPill>
            </div>
            <button onClick={() => this.setState({ isDropdownOpen: !isDropdownOpen })}>...</button>
          </TodoItemContent>
          {isDropdownOpen &&
            <TodoDropdown>
              {!todo.isCompleted &&
                <button onClick={() => this.setState({ isTodoOpen: !isTodoOpen })}>Detail</button>}
              <button onClick={() => onHandleRemoveTodo(todo.id)}>Delete</button>
            </TodoDropdown>
          }
        </div>
        {isTodoOpen &&
          <TodoDescription>
            <p>{todo.description}</p>
            <button onClick={() => this.setState({ isTodoOpen: !isTodoOpen })}>X</button>
          </TodoDescription>
        }
      </TodoItemWrapper>
    )
  }
}

export default TodoListItem;