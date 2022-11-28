const TextSkeleton = ({ size = 'md', className }) => {
  let sizeClasses = '';

  if (size === 'sm') {
    sizeClasses = 'h-2';
  } else if (size === 'md') {
    sizeClasses = 'h-2';
  } else if (size === 'lg') {
    sizeClasses = 'h-4';
  }

  return (
    <div className={`animate-pulse py-1 ${className}`}>
      <div className={`${sizeClasses} w-full rounded bg-slate-200`}></div>
    </div>
  );
};

export default TextSkeleton;
