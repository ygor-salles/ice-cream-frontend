import { Close as MuiClose } from '@mui/icons-material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

interface IsMobile {
  isMobile: boolean;
}

export const ContentInputFile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    cursor: pointer;
  }

  input[type='file'] {
    display: none;
    text-decoration: none;
  }

  label {
    color: ${Colors.MAIN_PRIMARY_LIGHT};
    font-weight: bold;
    font-size: 18px;
  }
`;

export const ContentLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const Img = styled.img<IsMobile>`
  width: 100%;
  height: 300px;
  object-fit: cover;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
`;

export const TextError = styled.p`
  color: ${Colors.RED_ERROR};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
`;

export const ContentImage = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 20px;
`;

export const Close = styled(MuiClose).withConfig({
  shouldForwardProp: prop => !['isMobile'].includes(prop),
})<IsMobile>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: ${Colors.WHITE};

  cursor: pointer;
`;
