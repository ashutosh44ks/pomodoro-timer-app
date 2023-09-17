import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { ReactComponent as Logo } from "../assets/pomo.svg";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.photoURL);
      } else {
        console.log("user is logged out");
        setUser(null);
        navigate("/auth");
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <header className="flex justify-between items-center">
      <h3>
        P<Logo className="logo" />
        modoro App
      </h3>
      {user && (
        <button onClick={handleLogout} className="flex items-center gap-2">
          <img
            src={user.photoURL}
            alt={user.displayName}
            title={user.displayName}
          />
          <span>Logout</span>
        </button>
      )}
    </header>
  );
};

export default Header;
