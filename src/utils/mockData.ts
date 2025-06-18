import {User, Match} from './types';

// Mock Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma',
    age: 26,
    bio: 'Adventure seeker 🏔️ Dog mom 🐕 Coffee enthusiast ☕ Looking for someone to explore the city with!',
    photos: [
      'https://i.pravatar.cc/400?img=1',
      'https://i.pravatar.cc/400?img=2',
      'https://i.pravatar.cc/400?img=3',
    ],
    distance: 2,
    occupation: 'Graphic Designer',
    education: 'Art Institute',
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel'],
    verified: true,
  },
  {
    id: '2',
    name: 'Sophia',
    age: 24,
    bio: "Yoga instructor 🧘‍♀️ Plant parent 🌱 Foodie 🍜 Let's grab brunch and talk about life!",
    photos: [
      'https://i.pravatar.cc/400?img=5',
      'https://i.pravatar.cc/400?img=6',
    ],
    distance: 5,
    occupation: 'Yoga Instructor',
    interests: ['Yoga', 'Cooking', 'Plants', 'Meditation'],
    verified: false,
  },
  {
    id: '3',
    name: 'Olivia',
    age: 28,
    bio: 'Marketing manager by day, salsa dancer by night 💃 Wine lover 🍷 Looking for my dance partner!',
    photos: [
      'https://i.pravatar.cc/400?img=9',
      'https://i.pravatar.cc/400?img=10',
      'https://i.pravatar.cc/400?img=11',
    ],
    distance: 8,
    occupation: 'Marketing Manager',
    education: 'Business School',
    interests: ['Dancing', 'Wine', 'Marketing', 'Travel'],
    verified: true,
  },
  {
    id: '4',
    name: 'Ava',
    age: 25,
    bio: "Software engineer 👩‍💻 Board game enthusiast 🎲 Cat mom 🐱 Let's debug life together!",
    photos: [
      'https://i.pravatar.cc/400?img=16',
      'https://i.pravatar.cc/400?img=17',
    ],
    distance: 3,
    occupation: 'Software Engineer',
    education: 'Computer Science',
    interests: ['Programming', 'Gaming', 'Cats', 'Books'],
    verified: true,
  },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    user: {
      id: 'm1',
      name: 'Isabella',
      age: 27,
      bio: 'Artist and dreamer',
      photos: ['https://i.pravatar.cc/400?img=20'],
      distance: 4,
      interests: ['Art', 'Music'],
      verified: true,
    },
    matchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    lastMessage: {
      text: 'Hey! Thanks for the super like! 😊',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      fromMe: false,
    },
  },
  {
    id: '2',
    user: {
      id: 'm2',
      name: 'Mia',
      age: 23,
      bio: 'Photographer',
      photos: ['https://i.pravatar.cc/400?img=25'],
      distance: 6,
      interests: ['Photography', 'Travel'],
      verified: false,
    },
    matchedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastMessage: {
      text: 'Would love to grab coffee sometime!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      fromMe: true,
    },
  },
];
