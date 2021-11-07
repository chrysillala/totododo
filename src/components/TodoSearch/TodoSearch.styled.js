import styled from 'styled-components';

export const TodoSearchWrapper = styled.div`
  padding: 13px 30px;
  margin: 20px 0;
  background: var(--form-background);
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
  grid-gap: 16px;
`;

export const TodoSortSelect = styled.select`
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
`;

export const TodoSearchInput = styled.input`
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
`;
