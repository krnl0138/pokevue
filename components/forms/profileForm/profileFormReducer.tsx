export type TProfileFormData = {
  email: string;
  password: string;
  username: string;
  avatar: string;
};

type TInitialState = {
  error: string;
  isSubmitted: boolean;
  isLoading: boolean;
  data: TProfileFormData;
};

type TProfileAction = {
  type: "field" | "submit" | "success" | "failed";
  field?: keyof TProfileFormData;
  value?: string;
};

export const initialStateProfile: TInitialState = {
  error: "",
  isSubmitted: false,
  isLoading: false,
  data: {
    email: "",
    password: "",
    avatar: "",
    username: "",
  },
};

export const profileReducer = (
  state: TInitialState,
  action: TProfileAction
) => {
  switch (action.type) {
    case "submit": {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        data: { ...initialStateProfile.data },
      };
    }
    case "failed": {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: "Incorrect username or password",
        data: { ...initialStateProfile.data },
      };
    }
    case "field": {
      if (!action.field) return state;
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    }
    default:
      return state;
  }
};
