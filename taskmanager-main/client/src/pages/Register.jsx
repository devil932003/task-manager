import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdChecklist, MdGroups, MdVerifiedUser } from "react-icons/md";
import { toast } from "sonner";
import Button from "../components/Button";
import Textbox from "../components/Textbox";
import { useRegisterUserMutation } from "../redux/slices/apiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      if (res?.isAdmin) {
        dispatch(setCredentials(res));
        navigate("/dashboard");
      } else {
        toast.success(res?.message || "Account created successfully");
        navigate("/log-in");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || error.error || "Unable to create account"
      );
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-6xl min-h-[680px] grid lg:grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-[2rem] bg-white shadow-2xl'>
        <section className='relative flex flex-col justify-between overflow-hidden bg-slate-900 p-8 md:p-12'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.6),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(20,184,166,0.35),transparent_25%),radial-gradient(circle_at_60%_95%,rgba(249,115,22,0.28),transparent_28%)]' />
          <div className='relative z-10'>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100'>
              <MdChecklist className='text-lg' />
              Task Manager
            </div>

            <div className='mt-16 max-w-xl'>
              <p className='text-sm font-semibold uppercase tracking-[0.28em] text-teal-200'>
                Start organized
              </p>
              <h1 className='mt-5 text-5xl font-black leading-tight md:text-6xl'>
                Modern Task Manager
              </h1>
              <p className='mt-6 max-w-lg text-base leading-7 text-slate-200'>
                Create your workspace, invite your team, and manage every task
                from planning to completion.
              </p>
            </div>
          </div>

          <div className='relative z-10 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur'>
              <MdVerifiedUser className='text-3xl text-blue-200' />
              <p className='mt-4 text-2xl font-bold'>Admin ready</p>
              <p className='mt-2 text-sm text-slate-200'>
                The first account can set up users, tasks, and workspace data.
              </p>
            </div>
            <div className='rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur'>
              <MdGroups className='text-3xl text-teal-200' />
              <p className='mt-4 text-2xl font-bold'>Team focused</p>
              <p className='mt-2 text-sm text-slate-200'>
                Assign people, track status, and keep priorities visible.
              </p>
            </div>
          </div>
        </section>

        <section className='flex flex-col justify-center bg-slate-50 px-6 py-10 text-slate-900 md:px-12'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl'
          >
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.22em] text-blue-700'>
                Create workspace
              </p>
              <h2 className='mt-3 text-3xl font-black text-slate-950'>
                Create account
              </h2>
              <p className='mt-2 text-sm text-slate-500'>
                First account becomes the admin.
              </p>
            </div>

            <div className='mt-8 flex flex-col gap-y-4'>
              <Textbox
                placeholder='Full name'
                type='text'
                name='name'
                label='Full Name'
                className='w-full rounded-xl'
                register={register("name", {
                  required: "Full name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder='Title'
                type='text'
                name='title'
                label='Title'
                className='w-full rounded-xl'
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder='Role'
                type='text'
                name='role'
                label='Role'
                className='w-full rounded-xl'
                register={register("role", {
                  required: "Role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-xl'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-xl'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <Button
                type='submit'
                label={isLoading ? "Creating..." : "Create Account"}
                className='w-full h-11 rounded-xl bg-blue-700 font-semibold text-white hover:bg-blue-800'
              />
            </div>

            <p className='mt-6 text-center text-sm text-slate-600'>
              Already have an account?{" "}
              <Link className='font-semibold text-blue-700 hover:underline' to='/log-in'>
                Sign in
              </Link>
            </p>
          </form>

          <p className='mt-8 text-center text-sm font-medium text-slate-500'>
            Made by Devansh Mishra
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
