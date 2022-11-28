import dayjs from 'dayjs';

const chats = [
  {
    _id: 1,
    users: [
      {
        _id: 1,
        name: 'John Doe',
      },
      {
        _id: 2,
        name: 'Jane Doe',
      },
    ],
    messages: [
      {
        _id: 1,
        text: 'Hello',
        createdAt: dayjs().subtract(4, 'hours').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 2,
        text: 'Hi',
        createdAt: dayjs().subtract(3, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 3,
        text: 'How are you? How are you? How are you? How are you?',
        createdAt: dayjs().subtract(2, 'hours').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 4,
        text: 'How are you? How are you? How are you? How are you?',
        createdAt: dayjs().subtract(2, 'hours').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 5,
        text: 'I am fine',
        createdAt: dayjs().subtract(1, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 6,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 7,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 8,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
      {
        _id: 9,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 1,
          name: 'John Doe',
        },
      },
    ],
  },
  {
    _id: 2,
    users: [
      {
        _id: 3,
        name: 'John Doe',
      },
      {
        _id: 2,
        name: 'Jane Doe',
      },
    ],
    messages: [
      {
        _id: 1,
        text: 'Hello',
        createdAt: dayjs().subtract(4, 'hours').toDate(),
        sender: {
          _id: 3,
          name: 'John Doe',
        },
      },
      {
        _id: 2,
        text: 'Hi',
        createdAt: dayjs().subtract(3, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 3,
        text: 'How are you?',
        createdAt: dayjs().subtract(2, 'hours').toDate(),
        sender: {
          _id: 3,
          name: 'John Doe',
        },
      },
      {
        _id: 4,
        text: 'I am fine',
        createdAt: dayjs().subtract(1, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 5,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 3,
          name: 'John Doe',
        },
      },
    ],
  },
  {
    _id: 3,
    users: [
      {
        _id: 4,
        name: 'John Doe',
      },
      {
        _id: 2,
        name: 'Jane Doe',
      },
    ],
    messages: [
      {
        _id: 1,
        text: 'Hello',
        createdAt: dayjs().subtract(4, 'hours').toDate(),
        sender: {
          _id: 4,
          name: 'John Doe',
        },
      },
      {
        _id: 2,
        text: 'Hi',
        createdAt: dayjs().subtract(3, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 3,
        text: 'How are you?',
        createdAt: dayjs().subtract(2, 'hours').toDate(),
        sender: {
          _id: 4,
          name: 'John Doe',
        },
      },
      {
        _id: 4,
        text: 'I am fine',
        createdAt: dayjs().subtract(1, 'hours').toDate(),
        sender: {
          _id: 2,
          name: 'Jane Doe',
        },
      },
      {
        _id: 5,
        text: 'What about you?',
        createdAt: dayjs().subtract(30, 'minutes').toDate(),
        sender: {
          _id: 4,
          name: 'John Doe',
        },
      },
    ],
  },
];

export default chats;
