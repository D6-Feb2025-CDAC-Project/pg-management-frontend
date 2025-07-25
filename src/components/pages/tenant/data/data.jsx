import {
  LayoutDashboard,
  BanknoteArrowUp,
  Megaphone,
  DoorOpen,
  LogOut,
} from "lucide-react";
export const menuItems = [
  { icon: <LayoutDashboard />, text: "Dashboard", url: "/tenant/dashboard" },
  { icon: <BanknoteArrowUp />, text: "Payments", url: "/tenant/payment" },
  { icon: <Megaphone />, text: "Notices", url: "/tenant/notices" },
  { icon: <DoorOpen />, text: "Leave PG", url: "/tenant/leave-pg" },
  { icon: <LogOut />, text: "Logout", url: "/user/login" },
];
