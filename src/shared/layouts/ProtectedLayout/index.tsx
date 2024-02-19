import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import img from 'assets/401-ErrorUnauthorized-rafiki.png';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { HeaderUnauth, ImgUnauthorized, WrapperUnauth } from './styles';

interface PropTypes {
  children: ReactNode;
  accessUser: EnumRoleUser[];
}

export const ProtectedLayout = ({ accessUser, children }: PropTypes) => {
  const navigate = useNavigate();
  const { role } = useAuthContext();

  const roleFound = accessUser.find(item => item === role);

  if (roleFound || role === EnumRoleUser.SUPER) {
    return <>{children}</>;
  }

  return (
    <WrapperUnauth>
      <HeaderUnauth>
        <Typography color="white">Não autorizado</Typography>
        <Button
          onClick={() => navigate(RoutesEnum.LOGIN)}
          color="info"
          variant="outlined"
          startIcon={<ArrowBack />}
        >
          Voltar
        </Button>
      </HeaderUnauth>

      <ImgUnauthorized src={img} alt="unauthorized" />
    </WrapperUnauth>
  );
};
