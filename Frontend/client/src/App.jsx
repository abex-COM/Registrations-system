import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import UserList from "./Pages/UserList";
import AdminPage from "./Pages/AdminPage";
import SignInpage from "./Pages/SignInpage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignInpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
