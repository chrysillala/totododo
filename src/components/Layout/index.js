import styled from 'styled-components';

const StyledLayout = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
`

const Layout = ({ children }) => (
  <StyledLayout>{children}</StyledLayout>
);

export default Layout;