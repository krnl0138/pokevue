import { RemoveCircleOutline } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  ListItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { dbInterface } from "../../lib/api/dbInterface";
import { RootState } from "../../lib/redux";
import { selectCurrentUserUid } from "../../lib/redux/slices/userSlice";
import {
  getOtherUser,
  selectOtherUser,
} from "../../lib/redux/slices/usersSlice";
import {
  styleGlobalBorderComponent,
  styleGlobalContainerDark,
  styleGlobalHoverShadow,
} from "../../styles/styles";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TUser } from "../../utils/types";

const styleListItem = {
  backgroundColor: "#fdfdfd",
  margin: "4px 0",
  ...styleGlobalBorderComponent,
  ...styleGlobalHoverShadow,
};

const styleUserDataBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "0.5rem",
  marginRight: "1rem",
  minWidth: "70px",
  // maxWidth: "70px",
  textAlign: "center",
};

type TCommentItem = {
  uid: TUser["uid"];
  comment: string;
  commentId: string;
  pokemonId: number;
};
export const CommentItem = ({
  uid,
  comment,
  pokemonId,
  commentId,
}: TCommentItem) => {
  const db = dbInterface();
  const dispatch = useAppDispatch();
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    if (!uid) return;
    dispatch(getOtherUser(uid));
    executedRef.current = true;
  }, [dispatch, uid]);

  const currentUserUid = useAppSelector(selectCurrentUserUid);
  const user = useAppSelector((state: RootState) =>
    selectOtherUser(state, uid)
  );
  const handleOnClick = async () =>
    await db.deleteComment(pokemonId, commentId);

  const theme = useTheme();
  const styleItem =
    theme.palette.mode === "light"
      ? { ...styleListItem, backgroundColor: "#fdfdfd" }
      : { ...styleListItem, ...styleGlobalContainerDark };
  return (
    <ListItem component="div" sx={styleItem}>
      <Box sx={styleUserDataBox}>
        {user ? (
          <>
            <Avatar>
              {user.avatar && (
                <Image
                  width="70"
                  height="70"
                  src={user.avatar}
                  alt="User avatar"
                />
              )}
              {user.avatar ? "" : user.username}
            </Avatar>

            <Typography
              component="p"
              variant="caption"
              sx={{ fontSize: "0.675rem", fontWeight: "300", marginTop: "3px" }}
            >
              {user.username}
            </Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Typography
        component="p"
        variant="body1"
        sx={{
          fontWeight: "300",
          fontSize: "0.9rem",
          padding: "8px 0",
          width: "70%",
        }}
      >
        {comment}
      </Typography>

      {uid === currentUserUid && (
        <Button
          type="submit"
          variant="text"
          onClick={handleOnClick}
          sx={{ marginLeft: "auto" }}
        >
          <RemoveCircleOutline fontSize="small" />
        </Button>
      )}
    </ListItem>
  );
};
