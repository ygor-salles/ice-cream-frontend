import NumberFormat from 'react-number-format';
import styled, { css } from 'styled-components';

interface IButtonIcon {
  isButtonAdd?: boolean;
}

interface ILabel {
  isError?: boolean;
  isDarkTheme?: boolean;
}

interface IStyledNumberFormat {
  isError?: boolean;
  isDarkTheme?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label<ILabel>`
  ${({ isError, isDarkTheme }) =>
    isDarkTheme
      ? css`
          color: ${() => (isError ? '#d32f2f' : '#fff')};
        `
      : css`
          color: ${() => (isError ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)')};
        `}
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  padding: 0;
  position: relative;
  display: block;
`;

export const StyledNumberFormat = styled(NumberFormat).withConfig({
  shouldForwardProp: prop => !['isError', 'isDarkTheme'].includes(prop),
})<IStyledNumberFormat>`
  width: 100%;
  height: 30px;

  border: none;
  ${({ isError, isDarkTheme }) =>
    isDarkTheme
      ? css`
          border-top: ${() => (isError ? 'solid 1px #d32f2f' : 'solid 1px #fff')};
          border-bottom: ${() => (isError ? 'solid 1px #d32f2f' : 'solid 1px #fff')};
          color: #fff;
        `
      : css`
          border-top: ${() => (isError ? 'solid 1px #d32f2f' : 'solid 1px rgba(0, 0, 0, 0.6)')};
          border-bottom: ${() => (isError ? 'solid 1px #d32f2f' : 'solid 1px rgba(0, 0, 0, 0.6)')};
        `}
  text-align: center;
  background-color: transparent;

  :focus {
    outline: 0;
  }

  :disabled {
    background-color: transparent;
    color: #000;
    font-size: larger;
    font-weight: 500;
  }
`;

export const ButtonIcon = styled.button<IButtonIcon>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: ${props => (props.isButtonAdd ? '#33cc95' : '#E52E4D')};
  border-radius: 4px;
`;

export const TextError = styled.p`
  color: #d32f2f;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
`;
