import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useMutation, QueryClient } from 'react-query';
import { JobAPI, ChatAPI } from '../../../api';

const AssignConfirm = ({ isOpen, onClose, job, assignTo, chatId }) => {
  const queryClient = new QueryClient();

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

        sendReferenceMessage({
          id: chatId,
          text: `${assignTo.name} has been assigned to this job.`,
          job: newJob._id,
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
            chat.messages = [...chat.messages, newMessage];
          }

          return [...old];
        });

        onClose();
      },
    }
  );

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
        static
      >
        <div className="flex min-h-screen items-end justify-center text-center sm:items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="flex w-full max-w-xs transform flex-col items-center overflow-hidden rounded-lg bg-white px-6 py-6 text-left align-middle shadow-xl transition-all">
              <h2 className="text-lg font-medium">Assign Job</h2>

              <p className=" mt-6 text-center text-sm text-gray-800">
                Are you sure you want to assign this job to{' '}
                <span className="font-medium text-gray-900">
                  {assignTo?.name}
                </span>
                ?
              </p>

              <div className="mt-6 flex gap-4">
                <button
                  className="rounded-lg border border-primary-500 py-0.5 px-4 font-semibold text-primary-500 transition hover:border-primary-600 hover:text-primary-600"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="rounded-lg bg-primary-500 py-0.5 px-4 font-semibold text-white transition hover:bg-primary-600"
                  onClick={() => {
                    assignJob();
                  }}
                >
                  Assign
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AssignConfirm;
