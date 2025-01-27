import {Children, createContext, useContext, useState } from "react";

const AuthContext = createContext(null); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user"); 

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");

    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const register = async (email, password) => {
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      throw new Error("User Already exist");
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
    };

    const updateUsers = [...users, newUser];

    setUsers(updateUsers);

    localStorage.setItem("users", JSON.stringify(updateUsers));


    const userWithoutPassword = { id: newUser.id, email: newUser.email };
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };

  const login = async (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid Credentails");
    }

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
    };

    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("userAuth must be used within an AuthProvider");
  }
  return context;
};
