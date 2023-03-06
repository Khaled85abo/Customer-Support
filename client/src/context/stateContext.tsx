import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useReducer,
} from "react";
import * as axios from "../axios";
import { saveToken } from "../axios";
import { RESMSGVAIRANTS } from "../constants/responseVariants";
import { ResMsgVariantsType } from "../types";
import { RolesType } from "../types/roles";

type ShowSnackbarType = {
  message: string;
  action: null | (() => void);
  actionMessage: string;
  severity: ResMsgVariantsType;
  show: boolean;
  timing: number;
};
type StateContextType = {
  authorized: boolean;
  login: (isClient: boolean, email: string, password: string) => void;
  loginState: LoginState;
  logout: () => void;
  setUiError: (error: string) => void;
  resetUiError: () => void;
  rolesRes: {
    roles: RolesType | {};
    error: string;
    loading: boolean;
  };
  showSnackbar: ShowSnackbarType;
  showSnackbarMessage: (severity: ResMsgVariantsType, message: string) => void;
  resetShowSnackbar: () => void;
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

const PAYLOADACTIONS = {
  error: "error",
  success: "success",
} as const;
const SOLOACTIONS = {
  login: "login",
  logOut: "logOut",
  resetError: "resetError",
} as const;
type PayloadActionsType = typeof PAYLOADACTIONS[keyof typeof PAYLOADACTIONS];
type soloActionsType = typeof SOLOACTIONS[keyof typeof SOLOACTIONS];

type LoginAction =
  | { type: soloActionsType }
  | { type: PayloadActionsType; payload: string };

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case SOLOACTIONS.login: {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case PAYLOADACTIONS.success: {
      return {
        ...state,
        role: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case PAYLOADACTIONS.error: {
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
      };
    }
    case SOLOACTIONS.logOut: {
      return {
        ...state,
        role: null,
        isLoggedIn: false,
      };
    }
    case SOLOACTIONS.resetError: {
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
  const [rolesRes, setRolesRes] = useState({
    loading: false,
    error: "",
    roles: {},
  });
  const defautSnackbar = {
    message: "",
    severity: RESMSGVAIRANTS.info,
    actionMessage: "",
    action: null,
    show: false,
    timing: 4000,
  };
  const [showSnackbar, setShowSnackbar] =
    useState<ShowSnackbarType>(defautSnackbar);

  const getRoes = async () => {
    setRolesRes((prev) => ({ ...prev, loading: true }));
    try {
      const res = await axios.getRoles();
      setRolesRes((prev) => ({ ...prev, roles: res.data.roles, error: "" }));
    } catch (error: any) {
      setRolesRes((prev) => ({ ...prev, error: error.response.data.error }));
    } finally {
      setRolesRes((prev) => ({ ...prev, loading: false }));
    }
  };
  const login = async (isClient: boolean, email: string, password: string) => {
    dispatch({ type: SOLOACTIONS.login });
    try {
      let res: { data: { token: string; role: string } };
      if (isClient) {
        res = await axios.loginClient({ email, password });
      } else {
        res = await axios.loginEmployee({ email, password });
      }
      getRoes();
      saveToken(res.data.token);
      dispatch({ type: PAYLOADACTIONS.success, payload: res.data.role });
    } catch (error: any) {
      dispatch({
        type: PAYLOADACTIONS.error,
        payload: error.response.data.error,
      });
    }
  };

  const setUiError = (error: string) => {
    dispatch({ type: PAYLOADACTIONS.error, payload: error });
  };
  const resetUiError = () => {
    dispatch({ type: SOLOACTIONS.resetError });
  };
  const resetShowSnackbar = () => {
    setShowSnackbar((prev) => defautSnackbar);
  };
  const showSnackbarMessage = (
    severity: ResMsgVariantsType,
    message: string
  ) => {
    setShowSnackbar((prev) => ({ ...prev, show: true, severity, message }));
  };

  const logout = () => {
    dispatch({ type: SOLOACTIONS.logOut });
    axios.removeToken();
  };
  const values = {
    authorized,
    login,
    loginState,
    logout,
    setUiError,
    resetUiError,
    rolesRes,
    showSnackbar,
    showSnackbarMessage,
    resetShowSnackbar,
  };

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
