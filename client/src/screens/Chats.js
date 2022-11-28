import ChatSidebar from '../components/Chats/ChatSidebar';
import ChatWindow from '../components/Chats/ChatWindow';

const Chats = () => {
  return (
    <main className="mx-auto flex w-full flex-1 flex-col px-4 py-8 sm:px-10 md:max-w-3xl md:px-0 lg:max-w-5xl xl:max-w-6xl">
      <div className="grid w-full flex-1 grid-cols-12 ">
        <div className="hidden md:col-span-3 md:block">
          <ChatSidebar />
        </div>
        <div className="col-span-12 md:col-span-9">
          <ChatWindow />
        </div>
      </div>
    </main>
  );
};

export default Chats;
