import Logo from "../../assets/logo.png";
import { Header, Image } from "./styles";

export function HeaderComponent() {
  return (
    <Header>
      <Image src={Logo} alt="Logo" />
      <h1>Link</h1>
    </Header>
  );
}
