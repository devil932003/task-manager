import React from "react";
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-slate-100/85 px-4 md:px-6 py-4 sticky z-20 top-0 backdrop-blur-xl border-b border-white'>
      <div className='flex gap-4 items-center'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-slate-700 block md:hidden'
        >
          <MdMenu />
        </button>

        <div>
          <p className='text-xs font-bold uppercase tracking-[0.24em] text-blue-700'>
            Workspace
          </p>
          <h2 className='text-xl font-black text-slate-950'>
            Welcome, {user?.name?.split(" ")[0] || "User"}
          </h2>
        </div>

        <div className='hidden lg:flex w-64 2xl:w-[400px] items-center py-2.5 px-4 gap-2 rounded-2xl bg-white border border-slate-200 shadow-sm'>
          <MdOutlineSearch className='text-slate-400 text-xl' />
          <input
            type='text'
            placeholder='Search tasks, users...'
            className='flex-1 outline-none bg-transparent placeholder:text-slate-400 text-slate-800'
          />
        </div>
      </div>

      <div className='flex gap-3 items-center'>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
