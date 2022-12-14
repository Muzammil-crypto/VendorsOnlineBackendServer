import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import BarLoader from "react-bar-loader";
import ProtectedRoute from "./ProtectedRoute";
import Shops from "../screens/shops";
import PostShop from "../screens/PostShop";

const Home = lazy(() => import("../screens/Home"));
const Profile = lazy(() => import("../screens/Profile"));
const PostJob = lazy(() => import("../screens/PostJob"));
const Job = lazy(() => import("../screens/Job"));
const Jobs = lazy(() => import("../screens/Jobs"));
const Chats = lazy(() => import("../screens/Chats"));
const PrivacyPolicy = lazy(() => import("../screens/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("../screens/TermsOfUse"));
const Disclaimer = lazy(() => import("../screens/Disclaimer"));

const Router = () => {
  return (
    <Suspense fallback={<BarLoader height={5} width={100} color="#00b754" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/post-shop" element={<PostShop />} />
        <Route path="/jobs/:id" element={<Job />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/shops" element={<Shops />} />

        <Route
          path="/chats"
          element={<ProtectedRoute component={<Chats />} />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
