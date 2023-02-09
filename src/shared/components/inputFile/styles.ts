import styled from 'styled-components';
import { Colors } from 'styles/global';

interface ImgProps {
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

export const Img = styled.img<ImgProps>`
  width: ${props => (props.isMobile ? '100%' : '600px')};
  height: 300px;
  object-fit: cover;
  margin-top: 20px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
`;
