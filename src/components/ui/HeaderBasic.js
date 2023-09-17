import { ReactComponent as Logo } from "../assets/pomo.svg";

const Header = () => {
  return (
    <header className="px-12 py-4 mx-4">
      <h3 className="justify-center">
        The P<Logo className="logo" />
        modoro Technique
      </h3>
    </header>
  );
};

export default Header;
