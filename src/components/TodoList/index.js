import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const StyledTodoList = styled.ul`
  list-style-type: none;
  padding: 16px 0 0 0;
  margin: 0;
`

const TodoList = ({ todos, priorities, onHandleCompleteTodo, onHandleRemoveTodo }) => {
  const EmptyTodo = <div>No Todo</div>;

  const TodoListContent = (
    <StyledTodoList>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          priorities={priorities}
          onHandleCompleteTodo={onHandleCompleteTodo}
          onHandleRemoveTodo={onHandleRemoveTodo}
        />
      ))}
    </StyledTodoList>
  )

  return todos.length ? TodoListContent : EmptyTodo;
};

export default TodoList;