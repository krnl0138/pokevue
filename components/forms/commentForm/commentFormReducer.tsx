type TInitialState = {
  error: string;
  isPublished: boolean;
  isLoading: boolean;
  comment: string;
};

type TCommentAction = {
  type: "field" | "publish" | "success" | "failed";
  field?: TInitialState["comment"];
  value?: string;
};

export const initialStateComment: TInitialState = {
  error: "",
  isPublished: false,
  isLoading: false,
  comment: "",
};

export const commentReducer = (
  state: TInitialState,
  action: TCommentAction
) => {
  switch (action.type) {
    case "publish": {
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
        isPublished: true,
        comment: initialStateComment.comment,
      };
    }
    case "failed": {
      const error = action.value;
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: `Something was wrong in the comment section ${error}`,
        comment: initialStateComment.comment,
      };
    }
    case "field": {
      if (!action.field) return state;
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    default:
      return state;
  }
};
