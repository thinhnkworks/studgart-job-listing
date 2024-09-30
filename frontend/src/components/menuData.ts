// menuData.ts
export interface MenuItem {
  label: string;
  action?: () => void; // Nếu có các hành động khác
  href?: string; // Thêm thuộc tính href
  dropdownItems?: MenuItem[]; // Mảng cho các mục con trong dropdown
}

export const roleOptions: Record<string, MenuItem[]> = {
  admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Settings", href: "/admin/settings" },
    // ... các mục khác
  ],
  user: [
    { label: "Profile", href: "/user/profile" },
    { label: "Orders", href: "/user/orders" },
    // ... các mục khác
  ],
  // Thêm vai trò khác nếu cần
};
