import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useReducer,
} from "react";
import * as axios from "../axios";
import { saveToken } from "../axios";
type StateContextType = {
  authorized: boolean;
  login: (isClient: boolean, email: string, password: string) => void;
  loginState: LoginState;
  logout: () => void;
  setUiError: (error: string) => void;
  resetUiError: () => void;
};
interface LoginState {
  isLoading: boolean;
  error: string;
  role: string | null;
  isLoggedIn: boolean;
}
const StateContext = createContext<StateContextType | null>(null);

export function useStateContext() {
  const stateContext = useContext(StateContext);
  if (!stateContext) {
    throw Error(
      "Error: check if your element is wrapped by StateContextProvider"
    );
  }
  return stateContext;
}

const initialState: LoginState = {
  isLoading: false,
  error: "",
  role: null,
  isLoggedIn: false,
};

type LoginAction =
  | { type: "login" | "logOut" | "resetError" }
  | { type: "error" | "success"; payload: string };

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case "success": {
      return {
        ...state,
        role: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
      };
    }
    case "logOut": {
      return {
        ...state,
        role: null,
        isLoggedIn: false,
      };
    }
    case "resetError": {
      return {
        ...state,
        error: "",
      };
    }
    default:
      return state;
  }
}

export default function StateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const login = async (isClient: boolean, email: string, password: string) => {
    dispatch({ type: "login" });

    try {
      let res;
      if (isClient) {
        res = await axios.loginClient({ email, password });
      } else {
        res = await axios.loginEmployee({ email, password });
      }

      saveToken(res.data.token);
      dispatch({ type: "success", payload: res.data.role });
    } catch (error: any) {
      dispatch({ type: "error", payload: error.response.data.error });
    }
  };

  const setUiError = (error: string) => {
    dispatch({ type: "error", payload: error });
  };
  const resetUiError = () => {
    dispatch({ type: "resetError" });
  };

  const logout = () => {
    dispatch({ type: "logOut" });
    axios.removeToken();
  };
  const values = {
    authorized,
    login,
    loginState,
    logout,
    setUiError,
    resetUiError,
  };

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
