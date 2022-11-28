import { useNavigate } from 'react-router-dom';
import postJobImg from '../../assets/images/post-job.jpeg';
import findJobImg from '../../assets/images/find-job.jpeg';

const Action = () => {
	const navigate = useNavigate();

	return (
		<section className='mx-auto max-w-full px-4 py-12 sm:px-8 md:max-w-4xl lg:max-w-6xl lg:px-0'>
			<h2 className='text-center text-2xl font-semibold sm:text-3xl '>
				Whenever you're posting or finding GIGs,
				<br /> we can help you move forward.
			</h2>

			<div className='mt-12 flex flex-col items-center justify-center gap-14 md:flex-row lg:gap-20'>
				<div className='w-full max-w-md rounded-md border border-gray-300 bg-gray-100 py-4 px-4 text-center shadow-lg shadow-gray-300/30 sm:py-8 md:px-12'>
					<div className='h-48 w-full overflow-hidden rounded-lg bg-slate-200'>
						<img
							src={postJobImg}
							alt='Post a GIG'
							className='object- h-full w-full object-cover'
						/>
					</div>
					<button
						className='mt-5 rounded-lg bg-primary-500 py-1.5 px-6 text-lg font-semibold text-white transition hover:bg-primary-600 sm:mt-8 sm:px-8 md:text-xl'
						onClick={() => navigate('/post-job')}
					>
						Post a Shop
					</button>
				</div>
				<div className='w-full max-w-md rounded-md border border-gray-300 bg-gray-100 py-4 px-4 text-center shadow-lg shadow-gray-300/30 sm:py-8 md:px-12'>
					<div className='h-48 w-full bg-slate-200'>
						<img
							src={findJobImg}
							alt='Find a GIG'
							className='h-full w-full object-cover'
						/>
					</div>
					<button
						className='mt-5 rounded-lg bg-primary-500 py-1.5 px-6 text-lg font-semibold text-white transition hover:bg-primary-600 sm:mt-8 sm:px-8 md:text-xl'
						onClick={() => navigate('/jobs')}
					>
						Find a Shop
					</button>
				</div>
			</div>
		</section>
	);
};

export default Action;
