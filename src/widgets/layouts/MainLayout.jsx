import { Outlet } from "react-router";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { ToastContainer } from "@/shared/ui/Toast/ToastContainer";
import { ModalContainer } from "@/shared/ui/Modal";
import { useGoogleAuthToast } from "@/shared/hooks/useGoogleAuthToast";

export function MainLayout() {
  useGoogleAuthToast();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-auto pb-6">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <ModalContainer />
    </div>
  );
}

export default MainLayout;
