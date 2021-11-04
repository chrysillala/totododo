import styled from 'styled-components';

export const TodoItemWrapper = styled.li`
  border: 1px solid var(--secondary);
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
`;

export const TodoInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
`;

export const TodoIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 13px;
`;

export const TodoItemContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 11px 14px;
  border-left: 1px solid var(--secondary);
`;

export const TodoTitle = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: var(--black);
  margin: 4px 0;
`;

export const TodoDate = styled.span`
  font-size: 10px;
  color: var(--light-gray);
  margin-right: 20px;
`

export const TodoPriorityPill = styled.span`
  background-color: var(--secondary);
  padding: 3px 15px;
  color: var(--white);
  font-size: 8px;
  border-radius: 16px;
  display: flex;
  align-items: center;
`;

export const TodoDescriptionWrapper = styled.div`
  font-size: 12px;
  color: var(--gray);
  padding: 13px;
  border-top: 1px solid var(--secondary);
  display: flex;
  justify-content: space-between;
`;

export const TodoDropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  padding: 10px;
  border: 1px solid var(--light-gray);
  border-radius: 6px;
  display: flex;
  flex-flow: column wrap;
  z-index: 9;
`;