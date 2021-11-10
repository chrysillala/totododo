import styled from 'styled-components';

export const AppTitle = styled.h1`
  font-size: 3rem;
  color: white;
  text-align: center;
`

export const ListWrapper = styled.div`
  background-color: white;
  overflow-y: scroll;
`

export const FormWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 18px;
`

export const TodoListContainer = styled.div`
  padding: 0 16px;
`

export const TodoEmptyWrapper = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  min-height: 500px;
`

export const TodoEmptyInfoWrapper = styled.div`
  width: 70%;
`

export const TodoEmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: var(--gray);
  text-align: center;
`