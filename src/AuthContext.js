import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async function setUserData(values) {
    return await db
      .collection("userData")
      .doc(values.email)
      .set({
        orders: [],
        favorites: [],
        cart: [],
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        age: values.age,
        phone: values.phone,
        tomcoins: 0,
      })
      .then(() => {
        console.log("Added");
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
