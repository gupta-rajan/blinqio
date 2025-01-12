import bcrypt from 'bcryptjs';

const users = [
  {
    name: "Admin User",
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10), // Hash the password
    isAdmin: true, // Admin user
  },
  {
    name: "Sky Gupta",
    email: 'sky@email.com',
    password: bcrypt.hashSync('123456', 10), // Hash the password
    isAdmin: false, // Regular user
  },
  {
    name: "Air Gupta",
    email: 'air@email.com',
    password: bcrypt.hashSync('123456', 10), // Hash the password
    isAdmin: false, // Regular user
  },
];

export default users;