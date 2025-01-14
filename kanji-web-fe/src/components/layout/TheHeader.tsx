import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { Avatar, Button, Divider, Popover } from 'antd';
import {
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { setUser } from '../../lib/reducer/userSlice';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import DEFINE_ROUTERS, {
  DEFINE_LIST_ROUTES_USER,
} from '../../constants/routers-mapper';
import isChildUrl from '../../utils/functions/check-active-router';

export default function TheHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(
      setUser({
        id: '',
        userName: null,
        fullName: null,
        gender: null,
        birthDay: null,
        phoneNumber: null,
        email: '',
        role: 'USER',
        createdAt: '',
        updatedAt: '',
      }),
    );
    navigate(DEFINE_ROUTERS.auth.login);
  };

  const contentPopover = useMemo((): React.ReactNode => {
    return (
      <>
        <div className="flex flex-col justify-start items-center min-w-[160px]">
          <Button
            variant="text"
            color="default"
            className="text-md text-gray-800 w-full flex justify-start font-medium border-none"
            onClick={() => navigate(DEFINE_ROUTERS.changePassword)}
          >
            <EditOutlined /> Change password
          </Button>
          <Divider variant="solid" className="my-2" />
          <Button
            variant="text"
            color="default"
            className="text-md text-gray-800 w-full flex justify-start font-medium border-none"
            onClick={() => navigate(DEFINE_ROUTERS.profile)}
          >
            <ProfileOutlined /> Profile
          </Button>
          <Divider variant="solid" className="my-2" />
          <Button
            variant="text"
            color="default"
            className="text-md text-gray-800 w-full flex justify-start font-medium border-none"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            Logout
          </Button>
        </div>
      </>
    );
  }, []);

  return (
    <header>
      <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href={DEFINE_ROUTERS.home} className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Kanji Web
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <Popover content={contentPopover} trigger="click">
              <a className="hover:cursor-pointer text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800">
                <Avatar
                  className="me-3"
                  style={{ backgroundColor: '#00aaff' }}
                  icon={<UserOutlined />}
                />
                {user.userName ?? user.email}
              </a>
            </Popover>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                >
                  {' '}
                </path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {Object.values(DEFINE_LIST_ROUTES_USER).map((item) => {
                if (item?.subRoutes.length > 0) {
                  return (
                    <Popover
                      key={item.name}
                      content={
                        <div className="flex flex-col justify-start items-center min-w-[80px]">
                          {item?.subRoutes.map((subRoute) => (
                            <Button
                              key={subRoute.name}
                              variant="text"
                              color={`${
                                isChildUrl(subRoute.route, location.pathname)
                                  ? 'primary'
                                  : 'default'
                              }`}
                              className="text-md text-gray-800 w-full flex justify-center font-medium border-none"
                            >
                              <Link to={subRoute.route}>{subRoute.name}</Link>
                            </Button>
                          ))}
                        </div>
                      }
                      forceRender
                      trigger="click"
                    >
                      <li key={item.name}>
                        <Link
                          to={item.route}
                          className={`block py-2 px-4 mx-8 text-base font-medium text-gray-500 border-b border-gray-100 hover:bg-gray-50  ${
                            item.subRoutes.some((route) =>
                              isChildUrl(route.route, location.pathname),
                            )
                              ? '!text-white font-bold'
                              : ''
                          } lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:hover:text-white  hover:text-white lg:hover:bg-transparent`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    </Popover>
                  );
                }
                return (
                  <li key={item.name}>
                    <Link
                      to={item.route}
                      className={`block py-2 px-4 mx-8 text-base font-medium text-gray-500 border-b border-gray-100 hover:bg-gray-50 ${
                        item.route === location.pathname
                          ? '!text-white font-bold'
                          : ''
                      } lg:border-0 lg:hover:text-primary-700 lg:p-0 lg:hover:text-white  hover:text-white lg:hover:bg-transparent`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
