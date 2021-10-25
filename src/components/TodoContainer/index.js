import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, 21rem);
`

const TodoContainer = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default TodoContainer;