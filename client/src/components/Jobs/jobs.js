import dayjs from 'dayjs';

const jobs = [
  {
    id: 1,
    title: 'Plumbing Services',
    price: 100,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
    company: 'Plumbing Inc.',
    location: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos illum delectus, quidem, ut corporis itaque rerum ab impedit hic dicta dolorum perspiciatis officiis provident. Aliquid illo quo itaque dolores?',
    createdAt: dayjs().subtract(4, 'hours').toDate(),
    poster: {
      id: 1,
      name: 'John Doe',
      createdAt: dayjs().subtract(4, 'months').toDate(),
    },
  },
  {
    id: 2,
    title: 'Plumbing Services',
    price: 100,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
    company: 'Plumbing Inc.',
    location: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos illum delectus, quidem, ut corporis itaque rerum ab impedit hic dicta dolorum perspiciatis officiis provident. Aliquid illo quo itaque dolores?',
    createdAt: dayjs().subtract(4, 'hours').toDate(),
    poster: {
      id: 1,
      name: 'John Doe',
      createdAt: dayjs().subtract(4, 'months').toDate(),
    },
  },
  {
    id: 3,
    title: 'Plumbing Services',
    price: 100,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
    company: 'Plumbing Inc.',
    location: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos illum delectus, quidem, ut corporis itaque rerum ab impedit hic dicta dolorum perspiciatis officiis provident. Aliquid illo quo itaque dolores?',
    createdAt: dayjs().subtract(4, 'hours').toDate(),
    poster: {
      id: 1,
      name: 'John Doe',
      createdAt: dayjs().subtract(4, 'months').toDate(),
    },
  },
  {
    id: 4,
    title: 'Plumbing Services',
    price: 100,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
    company: 'Plumbing Inc.',
    location: 'New York, NY',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos illum delectus, quidem, ut corporis itaque rerum ab impedit hic dicta dolorum perspiciatis officiis provident. Aliquid illo quo itaque dolores?',
    createdAt: dayjs().subtract(4, 'hours').toDate(),
    poster: {
      id: 1,
      name: 'John Doe',
      createdAt: dayjs().subtract(4, 'months').toDate(),
    },
  },
  {
    id: 5,
    title: 'Plumbing Services',
    price: 100,
    reviews: [
      {
        id: 1,
        rating: 5,
      },
    ],
    company: 'Plumbing Inc.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos illum delectus, quidem, ut corporis itaque rerum ab impedit hic dicta dolorum perspiciatis officiis provident. Aliquid illo quo itaque dolores?',
    location: 'New York, NY',
    createdAt: dayjs().subtract(4, 'hours').toDate(),
    poster: {
      id: 1,
      name: 'John Doe',
      createdAt: dayjs().subtract(4, 'months').toDate(),
    },
  },
];

export default jobs;
