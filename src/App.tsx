import { useState } from "react";
import Router from "./components/Router";
import { app } from "./firebasApp";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  console.log(auth);

  return (
    <>
      <Router isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
