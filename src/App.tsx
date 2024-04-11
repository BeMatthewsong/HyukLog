import { useEffect, useState } from "react";
import Router from "./components/Router";
import { app, db } from "./firebasApp";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";

function App() {
  const auth = getAuth(app);
  // auth를 체크하기 전에 로더를 띄워주기 위한 용도
  const [init, setInit] = useState(false);
  // auth의 currentUser가 있는지 따짐
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  );
}

export default App;
