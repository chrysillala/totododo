import styled from 'styled-components';

const StyledLayout = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #393e6f;
`

const Layout = ({ children }) => (
  <StyledLayout>{children}</StyledLayout>
);

export default Layout;