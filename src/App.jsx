import Cookies from "js-cookie";
import ModuleRoutes from "./Routes";
import Header from "./components/Header";

export default function App() {
  const user = Cookies.get("user");

  return (
    <>
      <section className="h-screen w-screen flex-col flex kanit">
        {user !== undefined && <Header />}
        <ModuleRoutes />
      </section>
    </>
  );
}
