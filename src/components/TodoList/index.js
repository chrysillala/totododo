const TodoList = ({ todos, priorities, onHandleCompleteTodo, onHandleRemoveTodo }) => (
  <ul>
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
  </ul>
);

export default TodoList;