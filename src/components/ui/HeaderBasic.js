import { ReactComponent as Logo } from "../assets/pomo.svg";

const Header = () => {
  return (
    <header>
      <h3>
        The P<Logo className="logo" />
        modoro Technique
      </h3>
    </header>
  );
};

export default Header;
