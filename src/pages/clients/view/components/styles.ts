import styled from 'styled-components';

interface FormProps {
  smDown?: boolean;
}

export const Form = styled.form<FormProps>`
  width: 100%;
  height: ${props => (props.smDown ? '100vh' : 'auto')};
  display: contents;
`;

export const stylesIcon: React.CSSProperties = {
  cursor: 'pointer',
};
