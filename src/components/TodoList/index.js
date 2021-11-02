import TodoListItem from './TodoListItem';

const TodoList = ({ todos, priorities, onHandleCompleteTodo, onHandleRemoveTodo }) => {
  return todos.length
    ? (<ul>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          priorities={priorities}
          onHandleCompleteTodo={onHandleCompleteTodo}
          onHandleRemoveTodo={onHandleRemoveTodo}
        />
      ))}
    </ul>)
    : (<p>no todo</p>)
};

export default TodoList;