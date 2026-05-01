import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className }) => {
  return (
    <div className='w-full h-12 md:h-14 px-3 md:px-5 rounded-2xl bg-white flex items-center justify-between border border-slate-200 shadow-sm'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full ", className)} />
        <p className='text-sm md:text-base font-bold text-slate-700'>{label}</p>
      </div>

      <button className='hidden md:block'>
        <IoMdAdd className='text-lg text-slate-500' />
      </button>
    </div>
  );
};

export default TaskTitle;
