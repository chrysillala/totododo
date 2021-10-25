const TodoList = ({ todos, priorities, onHandleCompleteTodo, onHandleRemoveTodo }) => {
  return todos.length
    ? (<ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <p style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            {todo.title}
          </p>
          {priorities[todo.priority]} - {(new Date(todo.dueDate)).toLocaleDateString()}
          <br />
          {todo.description}
          <br />
          {!todo.isCompleted &&
            <button onClick={() => onHandleCompleteTodo(todo.id)}>Complete</button>
          }
          <button onClick={() => onHandleRemoveTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>)
    : (<p>no todo</p>)
};

export default TodoList;