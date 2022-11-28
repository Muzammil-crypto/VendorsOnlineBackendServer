import { Link } from 'react-router-dom';
import InstagramIcon from '../../assets/icons/InstagramIcon';
import LinkedInIcon from '../../assets/icons/LinkedInIcon';
import TwitterIcon from '../../assets/icons/TwitterIcon';
import logoGreen from '../../assets/images/logo-green.png';

const Footer = () => {
	return (
		<footer className='bg-primary-500/10'>
			<section className='grid grid-cols-1 gap-6 py-10 px-4 text-center sm:grid-cols-2 sm:gap-10 sm:px-20 sm:text-left md:px-32 lg:grid-cols-3 lg:px-40'>
				<div className='space-y-2'>
					<Link
						to='/'
						className='text-center font-logo text-4xl text-primary-500 md:text-5xl'
					>
						{/* Gigwaiting */}
						<img src={logoGreen} alt='Gigwaiting' className='mx-auto w-56' />
					</Link>
					{/* <h6 className="text-base font-medium md:text-lg">Follow Us</h6> */}
					{/* <div className="flex justify-center gap-4 text-gray-500 sm:justify-start">
            <button className="transform hover:text-primary-600">
              <InstagramIcon className="h-6 w-6 " />
            </button>
            <button className="transform hover:text-primary-600">
              <TwitterIcon className="h-5 w-5" />
            </button>
            <button className="transform hover:text-primary-600">
              <LinkedInIcon className="h-4 w-4" />
            </button>
          </div> */}
				</div>
				<div>
					<nav className='flex justify-center'>
						<ul className='text-base font-bold text-gray-800 md:text-lg'>
							<li>
								<Link to='/' className='mt-1 pb-0.5 transition'>
									Home
								</Link>
							</li>
							<li>
								<Link to='/jobs' className='mt-1 pb-0.5 transition'>
									Find Shops
								</Link>
							</li>
							<li>
								<Link to='/post-job' className='mt-1 pb-0.5 transition'>
									Post Shops
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div>
					<h6 className='text-base font-medium md:text-lg'>Support</h6>
					<p className='text-sm text-gray-800 md:text-base'>
						Email: gigwaiting@gmail.com
					</p>
				</div>
			</section>
			<div className='bg-primary-500 p-4 text-center text-xs text-white md:text-sm'>
				COPYRIGHT © 2020 GIGWAITING. ALL RIGHTS RESERVED.
			</div>
		</footer>
	);
};

export default Footer;
