import { getAuth } from "firebase/auth";
import {
  child,
  getDatabase,
  limitToLast,
  onValue,
  orderByKey,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import app from "./index";
import store from "../lib/redux";
import {
  addPokemonComments,
  addPokemonCommentsIds,
  addPokemonNewComment,
} from "../lib/redux/slices/pokemonsSlice";
import { TComment } from "../utils/types";

type TCommentResponse = { [uid: string]: string };

const db = getDatabase(app);
const auth = getAuth(app);

// db/comments/[pokemonId]/   [pushKey]:{[uid]:'comment'}

const commentsRef = (pokemonId: number) => ref(db, `comments/${pokemonId}`);
const commentsByPushRef = (pokemonId: number, pushKey: string) =>
  ref(db, `comments/${pokemonId}/${pushKey}`);

type TdbWriteComment = { pokemonId: number; comment: string };
export const dbWriteComment = async ({
  pokemonId,
  comment,
}: TdbWriteComment) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("dbWriteComment was called with: ", pokemonId, comment);
      const uid = user.uid;
      // push '{uid:comment}' to /comments/[pokemonId]/[newCommentKey]:{uid:comment}
      const newCommentKey = push(child(ref(db), `commments/${pokemonId}`)).key;
      if (!newCommentKey)
        throw new Error(
          `An error occured in dbWriteComment while creating a key`
        );
      try {
        await set(commentsByPushRef(pokemonId, newCommentKey), {
          [uid]: comment,
        });
      } catch (error) {
        throw new Error(`An error occured in dbWriteComment: ${error}`);
      }

      //   onValue(
      //     commentsByPushRef(pokemonId, newCommentKey),
      //     (snapshot) => {
      //       console.log("A listener on dbWriteComment was CALLED");
      //       const value: TCommentResponse = snapshot.val();
      //       const [uid, comment] = Object.entries(value)[0];
      //       const newComment = {
      //         commentId: newCommentKey,
      //         uid: uid,
      //         comment: comment,
      //       };
      //       console.log(
      //         "I dispathced newComment to the store with: ",
      //         newComment
      //       );
      //       store.dispatch(addPokemonNewComment({ pokemonId, newComment }));
      //     },
      //     { onlyOnce: true }
      //   );
    } else {
      throw new Error(
        `No user is logged in. dbWriteComment call cannot be made.`
      );
    }
  });
};

export const dbGetComments = async (pokemonId: number) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("dbGetComments was called with: ", pokemonId);

      const pokemonCommentsRef = query(
        commentsRef(pokemonId),
        orderByKey(),
        limitToLast(5)
      );
      onValue(pokemonCommentsRef, (snapshot) => {
        console.log("A listener on dbGetComments was CALLED");
        const value: TCommentResponse = snapshot.val();
        const comments: TComment[] = [];
        // const commentsIds: TComment["commentId"][] = [];
        if (!value) {
          const comments: TComment[] = [];
          store.dispatch(addPokemonComments({ pokemonId, comments }));
          return;
        }
        Object.entries(value)
          .reverse()
          .forEach(([commentId, commentBody]) =>
            Object.entries(commentBody).forEach(([uid, comment]) => {
              const mapped = {
                commentId: commentId,
                uid: uid,
                comment: comment,
              };
              comments.push(mapped);
              //   commentsIds.push(commentId);
            })
          );
        store.dispatch(addPokemonComments({ pokemonId, comments }));
        // store.dispatch(addPokemonCommentsIds({ pokemonId, commentsIds }));
      });
    } else {
      throw new Error(
        `No user is logged in. dbWriteComment call cannot be made.`
      );
    }
  });
};

export const dbDeleteComment = async (pokemonId: number, commentId: string) => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log("dbDeleteComment was called with: ", pokemonId, commentId);
      await remove(commentsByPushRef(pokemonId, commentId));
      //   store.dispatch(removeComment(pokemonId, commentId));
    } else {
      throw new Error(
        `No user is logged in. dbDeleteComment call cannot be made.`
      );
    }
  });
};
