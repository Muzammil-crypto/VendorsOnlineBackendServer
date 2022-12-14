import PostShopForm from "../components/PostJob/PostShopForm";

const PostShop = () => {
  return (
    <main className="mx-auto flex-1 px-6 py-12 sm:px-20 md:max-w-3xl md:px-8">
      <h1 className="text-center text-2xl font-medium text-gray-900">
        Upload Your Jobs
      </h1>

      <PostShopForm />
    </main>
  );
};

export default PostShop;
