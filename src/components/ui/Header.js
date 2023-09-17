import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { ReactComponent as Logo } from "../assets/pomo.svg";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
    <header className="flex justify-between items-center px-16 py-4">
      <h3>
        <Logo className="logo" />
        Pomodoro
      </h3>
      {user && (
        <div className="flex items-center gap-2">
          <img src={user.photoURL} alt={user.displayName} />
          <span>{user.displayName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
