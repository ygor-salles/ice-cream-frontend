import { Delete, Edit, HideImage, Image as MuiImage } from '@mui/icons-material';
import { Checkbox, Typography } from '@mui/material';
import styled from 'styled-components';
import { Colors } from 'styles/global';

interface RowProps {
  alignCenter?: boolean;
  gap?: number;
}

interface TextProps {
  bold?: boolean;
  mgTop?: boolean;
  color?: string;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: ${props => props.gap && `${props.gap}px`};
`;

export const SCheckbox = styled(Checkbox)`
  padding: 0;
  color: ${Colors.RED} !important;
  cursor: auto !important;
`;

export const ContainerItem = styled.div`
  padding: 15px 10px;
  width: 100%;
  border-bottom: 1.9px solid ${Colors.GRAY_LIGHT};
`;

export const Text = styled(Typography).withConfig({
  shouldForwardProp: props => !['bold', 'mgTop', 'color'].includes(props),
})<TextProps>`
  font-weight: ${props => (props.bold ? '600' : '400')};
  margin-top: ${props => props.mgTop && '10px'};
  color: ${props => props.color && props.color};
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const SImage = styled(MuiImage)`
  cursor: pointer;
  color: ${Colors.BLUE};
`;

export const SHideImage = styled(HideImage)`
  color: ${Colors.BLUE};
`;

export const SEdit = styled(Edit)`
  cursor: pointer;
`;

export const SDelete = styled(Delete)`
  cursor: pointer;
`;
