import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import img from 'assets/401-ErrorUnauthorized-rafiki.png';
import { useNavigate } from 'react-router-dom';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { ImgUnauthorized, HeaderUnauth, Title } from './styles';

interface PropTypes {
  accessUser: EnumRoleUser[];
}

const ProtectedLayout: React.FC<PropTypes> = ({ accessUser, children }) => {
  const navigate = useNavigate();
  const { role } = useAuthContext();

  // const roleFound = useMemo(() => accessUser.find(item => item === role), []);
  const roleFound = accessUser.find(item => item === role);

  if (roleFound || role === EnumRoleUser.SUPER) {
    return <>{children}</>;
  }

  return (
    <>
      <HeaderUnauth>
        <Title>Não autorizado</Title>
        <Button
          onClick={() => navigate(-1)}
          color="info"
          variant="outlined"
          startIcon={<ArrowBack />}
        >
          Voltar
        </Button>
      </HeaderUnauth>
      <ImgUnauthorized src={img} alt="unauthorized" />;
    </>
  );
};

export default ProtectedLayout;
