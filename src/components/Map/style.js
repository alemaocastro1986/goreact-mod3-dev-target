import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  div.action {
    margin: 10px;
    display: flex;
    flex-direction: row;

    button {
      max-height: 35px;
      margin: 5px;
    }
  }
`;
