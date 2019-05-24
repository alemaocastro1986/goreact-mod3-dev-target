import styled from 'styled-components';

export const DeveloperItem = styled.li`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    div.info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      align-items: flex-start;

      span {
        font-weight: normal;
        color: #6b6b47;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  div.action {
    button {
      border: 0 none;
      background: #fff;
      i {
        color: #ff3300;
      }
    }
  }
`;
