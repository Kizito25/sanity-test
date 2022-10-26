import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./container";
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
