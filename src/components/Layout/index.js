import styled from 'styled-components';

const StyledLayout = styled.main`
  max-width: 750px;
  margin 0 auto;
`

const Layout = ({ children }) => (
  <StyledLayout>{children}</StyledLayout>
);

export default Layout;