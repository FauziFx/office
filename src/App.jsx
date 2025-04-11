import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes/routes";
import Layout from "@/layouts/Layout";
import renderRoutes from "@/routes/renderRoutes";
import { Login } from "@/pages/auth";
import Protected from "@/utils/Protected";
import NotFound from "@/pages/NotFound";

import Cookies from "js-cookie";

const App = () => {
  const token = Cookies.get("accessToken") ? true : false;
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
      <Route path="/login" element={<Protected />}>
        <Route path="" element={<Login />} />
      </Route>
      <Route element={<Protected isAuth={true} />}>
        <Route element={<Layout />}>{renderRoutes(routes)}</Route>
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
