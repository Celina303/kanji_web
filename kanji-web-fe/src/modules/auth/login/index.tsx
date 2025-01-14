import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { toast } from 'react-toastify';
import { authService } from '../../../services';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../lib/reducer/userSlice';
import cookiesStore from '../../../plugins/cookiesStore';
import { RootState } from '../../../lib/store';
import { Navigate, useNavigate } from 'react-router-dom';
import DEFINE_ROUTERS from '../../../constants/routers-mapper';
import Link from 'antd/es/typography/Link';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async () => {
    if (!(form.email && form.password)) {
      toast.error('Please enter email and password');
      return;
    }
    try {
      setLoading(true);
      const rs = await authService.login({
        email: form.email,
        password: form.password,
      });
   
      cookiesStore.set('access_token', rs.data.accessToken);
      dispatch(setUser(rs.data));
      console.log(cookiesStore.get('access_token'));
      navigate(DEFINE_ROUTERS.home);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(DEFINE_ROUTERS.auth.register);
  };

  return (
    <>
      <div className="flex h-full w-full justify-center items-center">
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    {/* <!-- Left column container--> */}
                    <div
                      className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                      style={{
                        background:
                          'linear-gradient(to right, #156eab, #00aaff, #59c8ff, #c2ebff)',
                      }}
                    >
                      <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                          We are more than just a website to learn kanji
                        </h4>
                        <p className="text-sm">
                          Welcome to the Kanji Learning Website! Our platform is
                          dedicated to helping learners master Kanji, the
                          intricate characters used in the Japanese writing
                          system. With a user-friendly interface, interactive
                          lessons, and a variety of resources, we aim to make
                          your Kanji learning journey enjoyable and effective.
                          Explore our extensive database of Kanji characters,
                          complete with meanings, readings, and example
                          sentences. Engage in quizzes and practice exercises to
                          reinforce your knowledge, and track your progress as
                          you advance through different levels. Whether you are
                          a beginner or looking to refresh your skills, our
                          website provides the tools and support you need to
                          succeed in mastering Kanji. Join us today and take
                          your first step towards fluency in Japanese!
                        </p>
                      </div>
                    </div>
                    <div className="px-4 md:px-0 lg:w-6/12 bg-gray-800">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <img
                            className="mx-auto w-32"
                            src="https://flowbite.com/docs/images/logo.svg"
                            alt="logo"
                          />
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-white">
                            We are Kanji Web
                          </h4>
                        </div>

                        <form>
                          <p className="mb-4 text-white">Please login to your account</p>
                          {/* <!--Username input--> */}
                          <Input
                            type="text"
                            placeholder="Email"
                            className="mb-4"
                            value={form.email}
                            onChange={(e) => {
                              setForm((pre) => ({
                                ...pre,
                                email: e.target.value,
                              }));
                            }}
                          ></Input>
                          <Input.Password
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                            value={form.password}
                            onChange={(e) => {
                              setForm((pre) => ({
                                ...pre,
                                password: e.target.value,
                              }));
                            }}
                          ></Input.Password>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              style={{
                                background:
                                  'linear-gradient(to right, #c2ebff, #00aaff, #59c8ff, #c2ebff)',
                              }}
                              onClick={() => onHandleSubmit()}
                            >
                              Log in
                            </button>
                            <div className="flex justify-end">
                              <Link href={DEFINE_ROUTERS.auth.forgotPassword} >Forgot your password?</Link>
                            </div>
                          </div>
                          {/* <!--Register button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2 text-white">Don't have an account?</p>
                            <button
                              type="button"
                              onClick={handleRegister}
                              className="text-white inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
