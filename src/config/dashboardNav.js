import {
  FaTachometerAlt,
  FaShoppingBag,
  FaBookmark,
  FaUserCircle,
  FaBook,
  FaPlusCircle,
  FaMoneyBillWave,
  FaUsersCog,
  FaExchangeAlt,
} from "react-icons/fa";

export const dashboardNav = {
  user: [
    { name: "Overview", href: "/dashboard/user", icon: FaTachometerAlt },
    { name: "Purchased Ebooks", href: "/dashboard/user/purchased", icon: FaShoppingBag },
    { name: "Bookmarks", href: "/dashboard/user/bookmarks", icon: FaBookmark },
    { name: "Profile", href: "/dashboard/user/profile", icon: FaUserCircle },
  ],
  writer: [
    { name: "Manage Ebooks", href: "/dashboard/writer", icon: FaBook },
    { name: "Add Ebook", href: "/dashboard/writer/add", icon: FaPlusCircle },
    { name: "Sales History", href: "/dashboard/writer/sales", icon: FaMoneyBillWave },
    { name: "Bookmarks", href: "/dashboard/writer/bookmarks", icon: FaBookmark },
    { name: "Profile", href: "/dashboard/writer/profile", icon: FaUserCircle },
  ],
  admin: [
    { name: "Overview", href: "/dashboard/admin", icon: FaTachometerAlt },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: FaUsersCog },
    { name: "Manage Ebooks", href: "/dashboard/admin/ebooks", icon: FaBook },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: FaExchangeAlt },
    { name: "Profile", href: "/dashboard/admin/profile", icon: FaUserCircle },
  ],
};

export const roleLabels = {
  user: "Reader",
  writer: "Writer",
  admin: "Admin",
};
