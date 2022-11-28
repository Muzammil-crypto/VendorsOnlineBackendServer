// import { useState } from 'react';
// import AssignConfirm from './AssignConfirm';
import currencyFormatter from '../../../utils/currencyFormatter';
import { useMutation, useQueryClient } from 'react-query';
import { JobAPI, ChatAPI } from '../../../api';
import useLoggedIn from '../../../hooks/useLoggedIn';

const AssignJobCard = ({ job, assignTo, chatId, onClose }) => {
  // const [showConfirm, setShowConfirm] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useLoggedIn();

  const { mutate: assignJob } = useMutation(
    () => JobAPI.assignJob(job._id, assignTo._id),
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
          return old?.filter((job) => job._id !== newJob._id);
        });

        sendReferenceMessage({
          id: chatId,
          text: `${assignTo.name} has been assigned to ${newJob.title} job.`,
          job: newJob._id,
          receiverId: assignTo._id,
        });
      },
    }
  );

  const { mutate: sendReferenceMessage } = useMutation(
    ChatAPI.addReferenceMessage,
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

          chat.messages = chat.messages.concat(newMessage);

          return chat;
        });

        onClose();
      },
    }
  );

  return (
    <div className="mx-2 flex min-w-[8rem] max-w-sm flex-col items-center py-2 pl-4 first:pl-0">
      <h3 className="text-center text-gray-900">{job?.title}</h3>
      <span className="text-sm text-gray-700">
        {currencyFormatter(job?.budget)}
      </span>
      <div className="mt-auto">
        <button
          className="mt-1 rounded-md bg-primary-500 py-0.5 px-2 text-sm font-medium text-white"
          onClick={() => {
            assignJob();
          }}
        >
          Assign
        </button>
      </div>

      {/* <AssignConfirm
        job={job}
        assignTo={assignTo}
        chatId={chatId}
        isOpen={showConfirm}
        // onClose={() => {
        //   setShowConfirm(false);
        //   onClose();
        // }}
      /> */}
    </div>
  );
};

export default AssignJobCard;
