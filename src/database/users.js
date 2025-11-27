// users.js - Simple user database
export const users = [
  {
    id: 1,
    email: "admin@admin.se",
    password: "123",
    name: "Administrator",
    role: "admin"
  },
  {
    id: 2,
    email: "user1@test.se",
    password: "password1",
    name: "Test User 1",
    role: "user"
  },
  {
    id: 3,
    email: "user2@test.se",
    password: "password2",
    name: "Test User 2",
    role: "user"
  },
  {
    id: 4,
    email: "manager@company.se",
    password: "manager123",
    name: "Project Manager",
    role: "manager"
  }
];

// Helper function to find user by credentials
export const authenticateUser = (email, password) => {
  return users.find(user => 
    user.email === email && user.password === password
  );
};

// Helper function to get all users (for display)
export const getAllUsers = () => {
  return users.map(user => ({
    email: user.email,
    password: user.password,
    name: user.name,
    role: user.role
  }));
};