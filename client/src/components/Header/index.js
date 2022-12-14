import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";
import useActivePage from "../../hooks/useActivePage";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import useLoggedIn from "../../hooks/useLoggedIn";
import ChatButton from "./ChatButton";
import ResponsiveMenu from "./ResponsiveMenu";
import logoGreen from "../../assets/images/logo-green.png";

const Header = () => {
  const { isLoggedIn, logout, user } = useLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { activePage } = useActivePage();

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-primary-600 bg-white py-3 px-8 shadow-md shadow-primary-300/10 md:px-12 lg:px-20">
      <div className="grid w-full grid-cols-3 lg:grid-cols-3">
        <nav className="hidden items-center lg:flex">
          <ul className="flex gap-10 text-sm lg:gap-16">
            <li>
              <Link
                to="/"
                className={`
                mt-1 border-b-[3px] pb-0.5 transition
              ${
                activePage === "home" || !activePage
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className={`
                mt-1 border-b-[3px] pb-0.5 transition
              ${
                activePage === "jobs"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Find Shops
              </Link>
            </li>
            <li>
              <Link
                to="/post-job"
                className={`
                mt-1 border-b-[3px] pb-0.5 transition
              ${
                activePage === "post-job"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Post Shop
              </Link>
            </li>

            <li>
              <Link
                to="/shops"
                className={`
                mt-1 border-b-[3px] pb-0.5 transition
              ${
                activePage === "/shops"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/post-shop"
                className={`
                mt-1 border-b-[3px] pb-0.5 transition
              ${
                activePage === "post-shop"
                  ? "border-primary-500"
                  : "border-transparent"
              }`}
              >
                Post Jobs
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:hidden"></div>

        <Link
          to="/"
          className="text-left font-logo text-4xl text-primary-500 sm:text-4xl md:text-5xl lg:text-center"
        >
          <img src={logoGreen} alt="Gigwaiting" className="mx-auto w-56" />
        </Link>
        <div className="hidden items-center justify-end text-sm lg:flex">
          {isLoggedIn ? (
            <>
              <ChatButton />
              <Link to="/profile" className="flex items-center gap-1">
                <UserIcon className="h-6 w-6 text-primary-500" />
                <span className="text-gray-900">{user?.name}</span>
              </Link>
              <div className="ml-8">
                <button
                  className="rounded-xl border border-primary-500 py-1.5 px-6 font-semibold text-primary-500 transition hover:border-primary-600 hover:text-primary-600"
                  onClick={logout}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="rounded-xl bg-primary-500 py-1.5 px-8 font-semibold text-white transition hover:bg-primary-600"
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
              >
                Sign in
              </button>
              <button
                className="ml-4 rounded-xl border border-primary-500 py-1.5 px-8 font-semibold text-primary-500 transition hover:border-primary-600 hover:text-primary-600"
                onClick={() => {
                  setIsSignupModalOpen(true);
                }}
              >
                Sign up
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-end lg:hidden">
          {isLoggedIn && <ChatButton />}
          <ResponsiveMenu
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignupModalOpen={setIsSignupModalOpen}
          />
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        setIsOpen={setIsLoginModalOpen}
        openSignUp={() => {
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        setIsOpen={setIsSignupModalOpen}
        openLogin={() => {
          setIsLoginModalOpen(true);
        }}
      />
    </header>
  );
};

export default Header;
