import img from 'assets/401-ErrorUnauthorized-rafiki.png';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { ImgUnauthorized } from './styles';

interface PropTypes {
  accessUser: EnumRoleUser[];
}

const ProtectedLayout: React.FC<PropTypes> = ({ accessUser, children }) => {
  const { role } = useAuthContext();

  // const roleFound = useMemo(() => accessUser.find(item => item === role), []);
  const roleFound = accessUser.find(item => item === role);

  if (roleFound || role === EnumRoleUser.SUPER) {
    return <>{children}</>;
  }

  return <ImgUnauthorized src={img} alt="unauthorized" />;
};

export default ProtectedLayout;
