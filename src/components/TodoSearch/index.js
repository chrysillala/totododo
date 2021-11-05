const TodoSearch = ({ searchQuery, onHandleSearch, onHandleSortChange }) => {
  return (
    <div>
      <select name="sort" id="sort-by" onChange={event => onHandleSortChange(event.target.value)}>
        <option disabled>Sort By:</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
      <input
        type="text"
        name="searchQuery"
        onChange={(event) => onHandleSearch(event.target.value)}
        value={searchQuery}
      />
    </div>
  )
}

export default TodoSearch;
