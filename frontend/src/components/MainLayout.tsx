import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense, useState, useEffect } from "react";
import clsx from "clsx";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [userData, setUserData] = useState<{ name: string; role: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

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

  // Determine if sidebar should be shown
  // Show sidebar on specific routes like /jobs, /about, etc.
  const shouldShowSidebar = location.pathname === "/about" || location.pathname.startsWith("/jobs");

  return (
    <div className="w-full min-h-screen bg-custom">
      <Header
        showSideBar={showSidebar}
        setShowSideBar={setShowSidebar}
        userData={userData} // Pass userData to Header
      />

      {/* Only render Sidebar when on specified pages like About or Jobs */}
      {shouldShowSidebar && <Sidebar showSidebar={showSidebar} />}

      {/* Dims background when SideBar is active */}
      <div
        onClick={() => setShowSidebar(false)} // Close sidebar on background click
        className={clsx(
          "fixed lg:hidden w-screen h-screen top-9 left-0 z-40 duration-200 bg-gray-500/80",
          {
            invisible: !showSidebar,
            visible: showSidebar,
          }
        )}
      ></div>

      {/* Displays other views, adjusts layout based on sidebar visibility */}
      <div className={clsx("transition-all", { "ml-0": !shouldShowSidebar, "ml-[270px]": showSidebar })}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
