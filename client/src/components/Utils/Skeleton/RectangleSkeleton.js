const RectangleSkeleton = ({ className, style }) => {
  return (
    <div className={`${className} animate-pulse`} style={style}>
      <div className="h-full w-full rounded bg-slate-200"></div>
    </div>
  );
};

export default RectangleSkeleton;
