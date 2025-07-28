import {
    LayoutDashboard,
    HousePlus,
    Users,
    OctagonAlert,
    DoorOpen,
    Megaphone,
    LogOut
} from "lucide-react";

export const menuItems = [
    { icon: <LayoutDashboard />, text: "Dashboard", url: "/admin/dashboard" },
    { icon: <HousePlus />, text: "Rooms", url: "/admin/rooms" },
    { icon: <Users />, text: "Tenants", url: "/admin/tenants" },
    { icon: <Megaphone />, text: "Notices", url: "/admin/notices" },
    { icon: <OctagonAlert />, text: "Complaints", url: "/admin/complaints" },
    { icon: <DoorOpen />, text: "Leave Notices", url: "/admin/leave-notices" },
    { icon: <LogOut />, text: "Logout", url: "/user/login" }
]