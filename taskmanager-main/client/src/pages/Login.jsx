import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdChecklist, MdLockOutline, MdTrendingUp } from "react-icons/md";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/slices/apiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Login failed");
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-6xl min-h-[620px] grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[2rem] bg-white shadow-2xl'>
        <section className='relative flex flex-col justify-between overflow-hidden bg-blue-700 p-8 md:p-12'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.34),transparent_24%),radial-gradient(circle_at_70%_90%,rgba(249,115,22,0.24),transparent_26%)]' />
          <div className='relative z-10'>
            <div className='inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50'>
              <MdChecklist className='text-lg' />
              Task Manager
            </div>

            <div className='mt-16 max-w-xl'>
              <p className='text-sm font-semibold uppercase tracking-[0.28em] text-blue-100'>
                Team productivity suite
              </p>
              <h1 className='mt-5 text-5xl font-black leading-tight md:text-6xl'>
                Modern Task Manager
              </h1>
              <p className='mt-6 max-w-lg text-base leading-7 text-blue-50'>
                Plan work, assign tasks, monitor progress, and keep your team
                moving from one focused dashboard.
              </p>
            </div>
          </div>

          <div className='relative z-10 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur'>
              <MdTrendingUp className='text-3xl text-teal-200' />
              <p className='mt-4 text-2xl font-bold'>Fast tracking</p>
              <p className='mt-2 text-sm text-blue-50'>
                Follow task priority, status, and team ownership at a glance.
              </p>
            </div>
            <div className='rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur'>
              <MdLockOutline className='text-3xl text-orange-200' />
              <p className='mt-4 text-2xl font-bold'>Secure access</p>
              <p className='mt-2 text-sm text-blue-50'>
                Role based login keeps admin and user workflows separate.
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
                Welcome back
              </p>
              <h2 className='mt-3 text-3xl font-black text-slate-950'>
                Sign in to continue
              </h2>
              <p className='mt-2 text-sm text-slate-500'>
                Access your projects, tasks, and team dashboard.
              </p>
            </div>

            <div className='mt-8 flex flex-col gap-y-5'>
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

              <button
                type='button'
                className='w-fit text-sm font-medium text-slate-500 hover:text-blue-700 hover:underline'
              >
                Forgot Password?
              </button>

              <Button
                type='submit'
                label={isLoading ? "Signing in..." : "Sign In"}
                className='w-full h-11 rounded-xl bg-blue-700 font-semibold text-white hover:bg-blue-800'
              />
            </div>

            <p className='mt-6 text-center text-sm text-slate-600'>
              Need an account?{" "}
              <Link className='font-semibold text-blue-700 hover:underline' to='/register'>
                Register
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

export default Login;
