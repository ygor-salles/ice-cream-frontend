import { Close as MuiClose } from '@mui/icons-material';
import styled from 'styled-components';
import { Colors, mediaQuery } from 'styles/global';

export const Close = styled(MuiClose)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: ${Colors.WHITE};

  cursor: pointer;
`;

export const ImgDialog = styled.img`
  width: 600px;
  height: 450px;

  ${mediaQuery.mobile} {
    width: auto;
    height: auto;
    object-fit: cover;
  }
`;
