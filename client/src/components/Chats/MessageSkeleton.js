import RectangleSkeleton from '../Utils/Skeleton/RectangleSkeleton';
import TextSkeleton from '../Utils/Skeleton/TextSkeleton';

const MessageSkeleton = ({ self }) => {
  // random size, if height is more than 1rem then width will be 24rem
  // height between 1rem and 2rem
  // width between 10rem and 20rem
  let height = Math.floor(Math.random() * 2 + 1);
  let width;
  if (height > 1) {
    width = 24;
  } else {
    width = Math.random() * 10 + 10;
  }

  return (
    <div
      className={` my-0.5 flex w-full ${
        self ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className={`flex flex-col ${self ? 'items-end' : 'items-start'}`}>
        <RectangleSkeleton
          style={{
            width: `${width}rem`,
            height: `${height}rem`,
          }}
        />
        <TextSkeleton size="sm" className="w-9" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
