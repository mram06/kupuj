import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
