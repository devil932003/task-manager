import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import { useGetDashboardStatsQuery } from "../redux/slices/apiSlice";
import Loading from "../components/Loader";

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-slate-500 text-left text-sm uppercase tracking-wide'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className='border-b border-slate-100 text-slate-600 hover:bg-slate-50'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base font-semibold text-slate-900'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-3 md:px-5 pt-5 pb-5 shadow-sm rounded-3xl border border-slate-200'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-slate-500 text-left text-sm uppercase tracking-wide'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-slate-100 text-slate-600 hover:bg-slate-50'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-3 md:px-6 py-5 shadow-sm rounded-3xl border border-slate-200'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Dashboard = () => {
  const { data: summary, isLoading, isError } = useGetDashboardStatsQuery();
  const totals = summary?.tasks || {};

  if (isLoading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <p className='py-10 text-red-600'>Unable to load dashboard data.</p>;
  }

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-36 bg-white p-5 shadow-sm rounded-3xl flex items-center justify-between border border-slate-200 hover:-translate-y-1 transition-transform'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-sm font-bold uppercase tracking-wide text-slate-500'>{label}</p>
          <span className='text-3xl font-black text-slate-950'>{count}</span>
          <span className='text-sm text-slate-400'>Current workspace</span>
        </div>

        <div
          className={clsx(
            "w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className='h-full space-y-8'>
      <div className='rounded-[2rem] bg-slate-950 p-6 md:p-8 text-white overflow-hidden relative'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.45),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.28),transparent_24%)]' />
        <div className='relative z-10'>
          <p className='text-sm font-bold uppercase tracking-[0.25em] text-blue-200'>
            Live overview
          </p>
          <h1 className='mt-3 text-3xl md:text-5xl font-black'>
            Modern Task Manager
          </h1>
          <p className='mt-3 max-w-2xl text-slate-200'>
            Track priorities, workload, and team momentum from one clean dashboard.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200'>
        <h4 className='text-xl text-slate-800 font-black'>
          Chart by Priority
        </h4>
        <Chart data={summary?.graphData || []} />
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10'>
        {/* /left */}

        <TaskTable tasks={summary?.last10Task || []} />

        {/* /right */}

        <UserTable users={summary?.users || []} />
      </div>
    </div>
  );
};

export default Dashboard;
