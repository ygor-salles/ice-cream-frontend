import styled from 'styled-components';

interface IButtonIcon {
  isButtonAdd?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonIcon = styled.button<IButtonIcon>`
  width: 48px;
  height: 48px;
  border: none;
  cursor: pointer;
  background-color: ${props => (props.isButtonAdd ? '#33cc95' : '#E52E4D')};
  border-radius: 100%;

  margin-left: ${props => (props.isButtonAdd ? '20px' : '0')};
  margin-right: ${props => (props.isButtonAdd ? '0' : '20px')};

  svg {
    font-size: 2rem;
  }
`;
