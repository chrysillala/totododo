import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(100px, 40%) minmax(300px, 60%);
  background-color: #083358;
  border-radius: 20px;
  overflow: hidden;
  height: 700px;
  width: 960px;
`

const TodoContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default TodoContainer;