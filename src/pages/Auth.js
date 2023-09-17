import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/utils/firebaseConfig";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import Header from "../components/ui/HeaderBasic";

const SignUp = () => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  useEffect(() => {
    if (sessionStorage.getItem("signInWithRedirect") === "true") {
      sessionStorage.setItem("signInWithRedirect", "false");
      getRedirectResult(auth)
        .then((result) => {
          // Signed in
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // const user = result.user;
          navigate("/pomodoro");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  }, []);
  function googleLogin() {
    sessionStorage.setItem("signInWithRedirect", "true");
    signInWithRedirect(auth, provider);
  }

  if (sessionStorage.getItem("signInWithRedirect") === "true") {
    return (
      <div className="auth-page">
        <Header />
        <main className="p-16 flex-row gap-4">
          <div className="loader" />
          <div className="redirect">Redirecting...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <Header />
      <main className="p-16">
        <h1>25 Minutes to Success!</h1>
        <h4>Clock in for Efficiency.</h4>
        <button
          onClick={() => {
            googleLogin();
          }}
          className="mt-6"
        >
          Get Started
        </button>
      </main>
    </div>
  );
};

export default SignUp;
