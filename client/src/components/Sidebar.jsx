import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full flex gap-3 px-4 py-3 rounded-2xl items-center text-slate-300 text-base font-semibold transition-all hover:bg-white/10 hover:text-white",
          path === el.link.split("/")[0]
            ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
            : ""
        )}
      >
        <span className='text-xl'>{el.icon}</span>
        <span>{el.label}</span>
      </Link>
    );
  };
  return (
    <div className='w-full h-full flex flex-col gap-6 p-5 text-white'>
      <h1 className='flex gap-3 items-center'>
        <p className='bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-900/40'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <div>
          <span className='text-2xl font-black text-white'>Task Manager</span>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
            Modern Suite
          </p>
        </div>
      </h1>

      <div className='flex-1 flex flex-col gap-y-3 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className='rounded-3xl border border-white/10 bg-white/5 p-4'>
        <p className='text-sm font-semibold text-slate-300'>Made by</p>
        <p className='text-base font-black text-white'>Devansh Mishra</p>
        <button className='mt-4 w-full flex gap-2 p-2 items-center text-lg text-slate-300 hover:text-white'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
