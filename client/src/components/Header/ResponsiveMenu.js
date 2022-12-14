import { Menu, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import useActivePage from "../../hooks/useActivePage";
import useLoggedIn from "../../hooks/useLoggedIn";

const ResponsiveMenu = ({ setIsLoginModalOpen, setIsSignupModalOpen }) => {
  const { activePage } = useActivePage();
  const { isLoggedIn, logout, user } = useLoggedIn();

  return (
    <Menu as="div" className="relative flex items-center justify-end ">
      <Menu.Button>
        <MenuIcon className="h-6 w-6" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute -right-4 z-[3000] mt-10 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:right-0 sm:w-80">
          <div className="flex flex-col px-3 py-2">
            <Menu.Item>
              <Link
                to="/"
                className={`
              my-1 w-full border-l-[3px] pl-3 transition
            ${
              activePage === "home" || !activePage
                ? "border-primary-500"
                : "border-transparent"
            }`}
              >
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/jobs"
                className={`
                my-1 w-full border-l-[3px] pl-3 transition
              ${
                activePage === "jobs"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Find Shops
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/post-job"
                className={`
                my-1 w-full border-l-[3px] pl-3 transition
              ${
                activePage === "post-job"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Post Shops
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                to="/shops"
                className={`
                my-1 w-full border-l-[3px] pl-3 transition
              ${
                activePage === "shops"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Find Jobs
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/post-shops"
                className={`
                my-1 w-full border-l-[3px] pl-3 transition
              ${
                activePage === "post-shop"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Post Jobs
              </Link>
            </Menu.Item>
          </div>
          <div className="flex flex-col px-6 py-2">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <Link to="/profile" className="flex items-center gap-1 py-2">
                  <UserIcon className="h-6 w-6 text-primary-500" />
                  <span className="text-gray-900">{user?.name}</span>
                </Link>

                <div className="ml-8">
                  <Menu.Item
                    as="button"
                    className="rounded-xl border border-primary-500 py-1 px-4 text-sm font-semibold text-primary-500 transition hover:border-primary-600 hover:text-primary-600"
                    onClick={logout}
                  >
                    Sign out
                  </Menu.Item>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Menu.Item
                  as="button"
                  className="rounded-xl bg-primary-500 py-1 px-4 text-sm font-semibold text-white transition hover:bg-primary-600"
                  onClick={() => {
                    setIsLoginModalOpen(true);
                  }}
                >
                  Sign in
                </Menu.Item>
                <Menu.Item
                  as="button"
                  className="ml-4 rounded-xl border border-primary-500 py-1 px-4 text-sm font-semibold text-primary-500 transition hover:border-primary-600 hover:text-primary-600"
                  onClick={() => {
                    setIsSignupModalOpen(true);
                  }}
                >
                  Sign up
                </Menu.Item>
              </div>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ResponsiveMenu;
