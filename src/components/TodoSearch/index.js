import { TodoSearchWrapper, TodoSortSelect, TodoSearchInput } from './TodoSearch.styled';

const TodoSearch = ({ searchQuery, onHandleSearch, onHandleSortChange }) => {
  return (
    <TodoSearchWrapper>
      <TodoSortSelect name="sort" id="sort-by" onChange={event => onHandleSortChange(event.target.value)}>
        <option disabled>Sort By:</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </TodoSortSelect>
      <TodoSearchInput
        type="text"
        name="searchQuery"
        onChange={(event) => onHandleSearch(event.target.value)}
        value={searchQuery}
      />
    </TodoSearchWrapper>
  )
}

export default TodoSearch;
