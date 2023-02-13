import { createContext, ReactNode, useContext, useState } from "react";

type StateContextType = {
  token: string | null;
  authorized: boolean;
};

const StateContext = createContext<StateContextType>({
  token: null,
  authorized: false,
});

export function useStateContext() {
  return useContext(StateContext);
}

export function StateContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const values = {
    token: token,
    authorized,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
