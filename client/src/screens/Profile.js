import ProfileForm from '../components/Profile/ProfileForm';

const Profile = () => {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 py-12 px-4">
      <h1 className="text-center text-2xl font-medium text-gray-900">
        Profile
      </h1>

      <ProfileForm />
    </main>
  );
};

export default Profile;
