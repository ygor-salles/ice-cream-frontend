import img from 'assets/401-ErrorUnauthorized-rafiki.png';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { ImgUnauthorized } from './styles';

interface PropTypes {
  accessUser: EnumRoleUser;
}

const ProtectedLayout: React.FC<PropTypes> = ({ accessUser, children }) => {
  const { role } = useAuthContext();

  if (role === accessUser || role === EnumRoleUser.SUPER) {
    return <>{children}</>;
  }
  return <ImgUnauthorized src={img} alt="unauthorized" />;
};

export default ProtectedLayout;
