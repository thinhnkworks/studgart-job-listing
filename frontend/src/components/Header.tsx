import React from "react";
import { FiSidebar } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"; // Điều chỉnh đường dẫn này nếu cần
import { roleOptions } from "./menuData"; // Import dữ liệu từ file menuData

interface HeaderProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
  userData: {
    name: string;
    role: string;
  };
}

export default function Header({ showSideBar, setShowSideBar, userData }: HeaderProps) {
  const menuItems = roleOptions[userData.role] || [];

  return (
    <div className="sticky w-full left-0 top-0 z-30">
      <div className="flex flex-row px-0 py-2.5 ml-0  bg-header justify-between items-center shadow-md">
        {/* Show side bar button */}
        <button
          className="flex w-8 h-8 lg:hidden rounded-md bg-white hover:bg-[#F1F6F9] hover:shadow-md justify-center items-center transition-all"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <span className="text-xl">
            <FiSidebar />
          </span>
        </button>
        <div className="flex flex-1 justify-center items-center relative ">
          <div>
          <DropdownMenu>
              <DropdownMenuTrigger className="bg-white px-4 py-2 rounded-lg shadow-md">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.action}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white px-4 py-2 rounded-lg shadow-md">
                Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.action}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="flex flex-1 justify-end items-center relative right-4">
          <div className="flex items-center gap-5">
          

            {/* Mini profile */}
            <div className="flex flex-row gap-3">
              <div className="flex flex-col text-white text-end">
                <h2 className="text-md font-bold">{userData.name}</h2>
                <span className="text-[14px] font-normal">{userData.role}</span>
              </div>

              <button
                className="bg-white rounded-full focus:ring-4 focus:ring-gray-300"
                type="button"
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src="/images/react.svg" // Đảm bảo đường dẫn hình ảnh đúng
                  alt="avatar.png"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
