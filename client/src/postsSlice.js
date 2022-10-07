

export function setPost(post) {
  return {
    type: "posts/set",
    payload: post,
  };
}

const initialState = [];

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case "posts/set":
      return [payload]
    default:
      break;
  }
  return state;
}