import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(100px, 40%) 1fr;
  background-color: #083358;
  border-radius: 20px;
  overflow: hidden;
  height: 700px;
`

const TodoContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default TodoContainer;