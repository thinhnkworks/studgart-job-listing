import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense, useState, useEffect } from "react";
import clsx from "clsx";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const encryptedData = localStorage.getItem("userData");

    if (!encryptedData) {
      // Redirect to login if no user data is found
      navigate("/login");
    } else {
      const decryptedData = JSON.parse(encryptedData);
      setUserData(decryptedData);
    }
  }, [navigate]);

  // Wait until userData is loaded to render the layout
  if (!userData) {
    return null; // or a loading spinner, depending on your preference
  }

  return (
    <div className="w-full min-h-screen bg-custom">
      <Header
        showSideBar={showSidebar}
        setShowSideBar={setShowSidebar}
        userData={userData} // Pass userData to Header
      />
      <Sidebar showSidebar={showSidebar} />

      {/* Dims background when SideBar active */}
      <div
        onClick={() => setShowSidebar(!showSidebar)}
        className={clsx(
          "fixed lg:hidden w-screen h-screen top-9 left-0 z-40 duration-200 bg-gray-500/80",
          {
            invisible: !showSidebar,
            visible: showSidebar,
          }
        )}
      ></div>

      {/* Displays other views */}
      <div className="ml-0 lg:ml-[270px] transition-all">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
