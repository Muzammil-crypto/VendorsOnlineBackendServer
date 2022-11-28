import { forwardRef } from 'react';
import dayjs from 'dayjs';
import ReferenceMessage from './ReferenceMessage';
import badWordsFilter from '../../utils/badWordsFilter';

const Message = forwardRef(({ message, self, other }, ref) => {
  if (message.type === 'reference') {
    return (
      <ReferenceMessage message={message} ref={ref} self={self} other={other} />
    );
  }

  return (
    <div
      ref={ref}
      className={`flex w-full ${self ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex flex-col ${self ? 'items-end' : 'items-start'}`}>
        <div
          className={`my-0.5 max-w-[14rem] rounded-lg px-2 py-1 sm:max-w-xs md:max-w-sm ${
            self
              ? 'rounded-tr-none bg-primary-500 font-medium text-white'
              : 'rounded-tl-none bg-gray-200'
          }`}
        >
          <p className="text-sm sm:text-base">
            {badWordsFilter.clean(message.text)}
          </p>
        </div>
        <span className="text-xxs text-gray-700">
          {dayjs(message.createdAt).format('h:mm a')}
        </span>
      </div>
    </div>
  );
});

export default Message;
