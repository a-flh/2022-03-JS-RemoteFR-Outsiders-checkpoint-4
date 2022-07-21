import React, { useState, createContext } from "react";

const MainContext = createContext();
/* eslint-disable */
function MainContextProvider({ children }) {
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isSignupModal,
        setIsSignupModal,
        isLoginModal,
        setIsLoginModal,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
/* eslint-enable */
export { MainContext, MainContextProvider };
