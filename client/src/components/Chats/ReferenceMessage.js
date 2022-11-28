import { forwardRef } from 'react';
import dayjs from 'dayjs';
import { BriefcaseIcon } from '@heroicons/react/outline';
import Rating from '../Utils/Rating';
import { useMutation, useQueryClient } from 'react-query';
import { JobAPI, ChatAPI } from '../../api';
import useLoggedIn from '../../hooks/useLoggedIn';
import Review from './Review';

const ReferenceMessage = forwardRef(({ message, self, other }, ref) => {
  const queryClient = useQueryClient();
  const { user } = useLoggedIn();

  const { mutate: cancelJob } = useMutation(
    () => JobAPI.cancelJob(message.job._id),
    {
      onSuccess: (newJob) => {
        queryClient.setQueryData('jobs', (old) => {
          if (!old) return [newJob];

          const jobCheck = old.find((job) => job._id === newJob._id);

          if (jobCheck) {
            return old.map((job) => (job._id === newJob._id ? newJob : job));
          }

          return [...old, newJob];
        });

        queryClient.setQueryData('ownActiveJobs', (old) => {
          if (!old) return [newJob];

          return [...old, newJob];
        });

        sendReferenceMessage(
          {
            id: message.chat,
            text: `${newJob.title} job has been canceled.`,
            job: newJob._id,
            referenceType: 'negative',
            receiverId: other._id,
          },
          {
            onSuccess: (newMessage) => {
              queryClient.setQueryData('chats', (old) => {
                if (!old) {
                  return [
                    {
                      _id: newMessage.chat,
                      messages: [newMessage],
                    },
                  ];
                }

                const chat = old.find((chat) => chat._id === newMessage.chat);

                if (chat) {
                  chat.lastMessage = newMessage;
                }

                return [...old];
              });

              queryClient.setQueriesData(['chat', newMessage.chat], (chat) => {
                if (!chat) {
                  return {
                    _id: newMessage.chat,
                    users: [newMessage.sender, user],
                    messages: [newMessage],
                  };
                }

                const messageCheck = chat.messages.find(
                  (m) => m._id === message._id
                );

                if (messageCheck) {
                  messageCheck.job.status = 'canceled';
                }

                chat.messages = chat.messages.concat(newMessage);

                return chat;
              });
            },
          }
        );
      },
    }
  );

  const { mutate: completeJob } = useMutation(
    () => JobAPI.completeJob(message.job._id),
    {
      onSuccess: (newJob) => {
        queryClient.setQueryData('jobs', (old) => {
          if (!old) return [newJob];

          const jobCheck = old.find((job) => job._id === newJob._id);

          if (jobCheck) {
            return old.map((job) => (job._id === newJob._id ? newJob : job));
          }

          return [...old, newJob];
        });

        sendReferenceMessage(
          {
            id: message.chat,
            text: `${newJob.title} job has been completed.`,
            job: newJob._id,
            referenceType: 'positive',
            receiverId: other._id,
          },
          {
            onSuccess: (newMessage) => {
              queryClient.setQueryData('chats', (old) => {
                if (!old) {
                  return [
                    {
                      _id: newMessage.chat,
                      messages: [newMessage],
                    },
                  ];
                }

                const chat = old.find((chat) => chat._id === newMessage.chat);

                if (chat) {
                  chat.lastMessage = newMessage;
                }

                return [...old];
              });

              queryClient.setQueriesData(['chat', newMessage.chat], (chat) => {
                if (!chat) {
                  return {
                    _id: newMessage.chat,
                    users: [newMessage.sender, user],
                    messages: [newMessage],
                  };
                }

                const messageCheck = chat.messages.find(
                  (m) => m._id === message._id
                );

                if (messageCheck) {
                  messageCheck.job.status = 'completed';
                }

                chat.messages = chat.messages.concat(newMessage);

                return chat;
              });
            },
          }
        );
      },
    }
  );

  const { mutate: sendReferenceMessage } = useMutation(
    ChatAPI.addReferenceMessage
  );

  return (
    <div
      ref={ref}
      className={`my-1 flex w-full ${self ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex flex-col ${self ? 'items-end' : 'items-start'}`}>
        <div
          className={`flex items-center justify-center gap-3 rounded-lg py-4 px-4 sm:gap-5 sm:px-8 ${
            message.referenceType === 'negative'
              ? 'bg-red-400/30 text-red-800/80'
              : message.referenceType === 'positive'
              ? 'bg-green-400/25 text-green-800/80'
              : 'bg-blue-400/30 text-blue-800/80'
          }`}
        >
          <div className="hidden self-start xs:block">
            <BriefcaseIcon className="h-8 w-8 xs:h-12 xs:w-12" />
          </div>
          <div
            className={`flex flex-col ${
              self ? 'justify-end' : 'justify-start'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            {self && message.job.status === 'assigned' && (
              <div className="mt-2 flex justify-end gap-2">
                <button
                  className="rounded-lg border border-blue-500 py-0.5 px-4 text-sm font-semibold text-blue-500 transition hover:border-blue-600 hover:text-blue-600"
                  onClick={() => {
                    cancelJob();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-blue-500 py-0.5 px-4 text-sm font-semibold text-white transition hover:bg-blue-600"
                  onClick={() => {
                    completeJob();
                  }}
                >
                  Complete
                </button>
              </div>
            )}
            {(message.job.status === 'completed' ||
              message.job.status === 'closed') &&
              message.referenceType === 'positive' && (
                <Review
                  initialValue={message.job.reviews?.find((review) => {
                    return review.reviewedBy === user._id;
                  })}
                  chatId={message.chat}
                  message={message}
                />
              )}
          </div>
        </div>
        <span className="mt-1 text-xxs text-gray-700">
          {dayjs(message.createdAt).format('h:mm a')}
        </span>
      </div>
    </div>
  );
});

export default ReferenceMessage;
