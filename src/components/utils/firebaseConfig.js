import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBTFyulCVeg7MgIJPUxaNFsUEmSuLvCmvU",
  authDomain: "pomodoro-timer-app-3bf03.firebaseapp.com",
  projectId: "pomodoro-timer-app-3bf03",
  storageBucket: "pomodoro-timer-app-3bf03.appspot.com",
  messagingSenderId: "148381583054",
  appId: "1:148381583054:web:e31e8009ca6f46b81c329f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;