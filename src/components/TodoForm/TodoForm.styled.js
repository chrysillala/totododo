import styled from 'styled-components';
import DatePicker from "react-datepicker";

export const TodoFormWrapper = styled.form`
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "priority duedate"
    "desc desc"
    "errors errors"
    "buttons buttons"
`;

export const FormTitleInput = styled.input`
  grid-area: title;
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
`;

export const FormPrioritySelect = styled.select`
  grid-area: priority;
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
`;

export const FormDueDatePicker = styled(DatePicker)`
  grid-area: duedate;
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
`;

export const FormDescriptionTextarea = styled.textarea`
  grid-area: desc;
  background: var(--white);
  padding: 10px 16px;
  border-radius: 8px;
  height: 80px;
`;

export const FormButtonWrapper = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: space-evenly;
`;

export const FormSubmitButton = styled.input`
  color: var(--white);
  background: var(--primary);
  border-radius: 50px;
  padding: 13px 44px;
`;

export const FormCancelButton = styled.input`
  color: var(--white);
  background: var(--secondary);
  border-radius: 50px;
  padding: 13px 44px;
`;

export const FormErrorMessages = styled.div`
  grid-area: errors;
`

export const FormErrorMessage = styled.p`
  color: red;
`;