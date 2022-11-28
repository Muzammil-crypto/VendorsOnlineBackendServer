import Rating from '../Utils/Rating';
import currencyFormatter from '../../utils/currencyFormatter';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`relative w-full cursor-pointer border border-b-4 border-gray-200 ${
        job.status === 'active' || job.status === 'cancelled'
          ? 'border-b-primary-500'
          : 'border-b-blue-500'
      }  shadow`}
      onClick={() => navigate(`/jobs/${job._id}`)}
    >
      {/* image section */}
      <div className="relative bg-slate-200 py-24">
        {job.images.length > 0 ? (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={job.images[0]}
            alt={job.title + ' image'}
          />
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center text-2xl text-slate-400">
            No Image
          </p>
        )}
      </div>

      {/* info section */}
      <div className="px-6 py-3">
        <h4 className="font-medium text-gray-900">{job.title}</h4>
        <div className="flex flex-wrap items-center gap-x-2 font-medium text-gray-800">
          <span>{currencyFormatter(job.budget)}</span>
          <div className="flex items-center gap-0.5 text-sm">
            Reviews <Rating reviews={job.createdBy?.reviews || []} />
          </div>
        </div>
        <h5 className="text-xs text-gray-600">{job.company}</h5>
      </div>

      {/* time */}
      <div className="absolute top-0 left-0 bg-black/40 px-2 text-xs text-white">
        {dayjs(job.createdAt).fromNow()}
      </div>
    </div>
  );
};

export default JobCard;
