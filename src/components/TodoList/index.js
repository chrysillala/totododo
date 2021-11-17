import { AnimatePresence } from 'framer-motion';

import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const StyledTodoList = styled.ul`
  list-style-type: none;
  padding: 16px 0;
  margin: 0;
`

const TodoList = ({ todos, priorities, onHandleCompleteTodo, onHandleRemoveTodo }) => {
  const EmptyTodo = <div>No Todo</div>;

  const TodoListContent = (
    <StyledTodoList>
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <TodoListItem
            key={todo.todoId}
            todo={todo}
            priorities={priorities}
            onHandleCompleteTodo={onHandleCompleteTodo}
            onHandleRemoveTodo={onHandleRemoveTodo}
          />
        ))}
      </AnimatePresence>
    </StyledTodoList>
  )

  return todos.length ? TodoListContent : EmptyTodo;
};

export default TodoList;