import NumberFormat from 'react-number-format';
import styled from 'styled-components';

interface IButtonIcon {
  isButtonAdd?: boolean;
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

export const Label = styled.label`
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  padding: 0;
  position: relative;
  display: block;
`;

// export const InputField = styled.input`
//   width: 100%;
//   height: 30px;

//   border: none;
//   border-top: solid 1px rgba(0, 0, 0, 0.6);
//   border-bottom: solid 1px rgba(0, 0, 0, 0.6);
//   text-align: center;

//   :focus {
//     outline: 0;
//   }

//   :disabled {
//     background-color: transparent;
//     color: #000;
//     font-size: larger;
//     font-weight: 500;
//   }
// `;

export const StyledNumberFormat = styled(NumberFormat)`
  width: 100%;
  height: 30px;

  border: none;
  border-top: solid 1px rgba(0, 0, 0, 0.6);
  border-bottom: solid 1px rgba(0, 0, 0, 0.6);
  text-align: center;

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
