import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { images } from 'assets';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { HeaderUnauth, ImgUnauthorized, WrapperUnauth } from './styles';
import { ProtectedLayoutProps } from './types';

export const ProtectedLayout = ({ accessUser, children }: ProtectedLayoutProps) => {
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

      <ImgUnauthorized src={images.errorUnauthorized} alt="unauthorized" />
    </WrapperUnauth>
  );
};
