import PostJobForm from '../components/PostJob/PostJobForm';

const PostJob = () => {
	return (
		<main className='mx-auto flex-1 px-6 py-12 sm:px-20 md:max-w-3xl md:px-8'>
			<h1 className='text-center text-2xl font-medium text-gray-900'>
				Upload Your Shop
			</h1>

			<PostJobForm />
		</main>
	);
};

export default PostJob;
