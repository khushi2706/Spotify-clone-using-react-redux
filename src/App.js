import { useEffect } from "react";
import Login from "./pages/Login/Login";
import { userActions } from "./store/user";
import Dashboad from "./pages/Dashboard/Dashboad";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        console.log(token);
        dispatch(userActions.setUser({ token }));
      }
    }
    document.title = "Spotify";
  }, [dispatch]);

  return <>{user?.token ? <Dashboad /> : <Login />}</>;
}

export default App;
