import { useEffect } from "react";
import Login from "./pages/Login/Login";
import { fetchUserData, userActions } from "./store/user";
import Dashboad from "./pages/Dashboard/Dashboad";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

function App() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      console.log(hash);
      const token = hash.substring(1).split("&")[0].split("=")[1];
      console.log(token);
      if (token) {
        const cookies = new Cookies();
        cookies.set("token", token, { path: "/" });
        dispatch(fetchUserData());
        dispatch(userActions.setUser({ token }));
      }
    }
    document.title = "Spotify";
  }, [dispatch]);

  return <>{token ? <Dashboad /> : <Login />}</>;
}

export default App;
