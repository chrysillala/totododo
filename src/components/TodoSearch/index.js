import { TodoSearchWrapper, TodoSortSelect, TodoSortOption, TodoSearchInput } from './TodoSearch.styled';

const TodoSearch = ({ searchQuery, onHandleSearch, onHandleSortChange }) => {
  return (
    <TodoSearchWrapper>
      <TodoSortSelect name="sort" id="sort-by" onChange={event => onHandleSortChange(event.target.value)}>
        <TodoSortOption disabled>Sort By:</TodoSortOption>
        <TodoSortOption value="dueDate">Due Date</TodoSortOption>
        <TodoSortOption value="priority">Priority</TodoSortOption>
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
