import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import {
  useDeleteUserMutation,
  useGetTeamListQuery,
  useUpdateUserStatusMutation,
} from "../redux/slices/apiSlice";
import Loading from "../components/Loader";
import { toast } from "sonner";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const { data: users = [], isLoading, isError } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const userActionHandler = async () => {
    try {
      const res = await updateUserStatus({
        id: selected._id,
        isActive: !selected.isActive,
      }).unwrap();
      toast.success(res?.message || "User status updated");
      setOpenAction(false);
    } catch (error) {
      toast.error(error?.data?.message || "Unable to update user status");
    }
  };
  const deleteHandler = async () => {
    try {
      const res = await deleteUser(selected).unwrap();
      toast.success(res?.message || "User deleted");
      setOpenDialog(false);
    } catch (error) {
      toast.error(error?.data?.message || "Unable to delete user");
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (user) => {
    setSelected(user);
    setOpenAction(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-slate-500 text-left text-sm uppercase tracking-wide'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-slate-100 text-slate-600 hover:bg-slate-50'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user.emal.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td>
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6 space-y-5'>
        <div className='flex items-center justify-between rounded-[2rem] bg-white p-5 shadow-sm border border-slate-200'>
          <Title title='  Team Members' />
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-700 text-white rounded-2xl 2xl:py-3 font-semibold hover:bg-blue-800'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-3 md:px-5 py-5 shadow-sm rounded-3xl border border-slate-200'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan='6' className='py-10'>
                      <Loading />
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan='6' className='py-4 text-red-600'>
                      Unable to load team members.
                    </td>
                  </tr>
                ) : users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
