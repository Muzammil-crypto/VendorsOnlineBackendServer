const CircleSkeleton = ({ size = 'md' }) => {
  let sizeClasses = '';

  if (size === 'sm') {
    sizeClasses = 'w-10 h-10';
  } else if (size === 'md') {
    sizeClasses = 'w-12 h-12';
  } else if (size === 'lg') {
    sizeClasses = 'w-14 h-14';
  } else if (size === 'xl') {
    sizeClasses = 'w-16 h-16';
  }

  return (
    <div className="animate-pulse">
      <div className={`${sizeClasses} rounded-full bg-slate-200`}></div>
    </div>
  );
};

export default CircleSkeleton;
