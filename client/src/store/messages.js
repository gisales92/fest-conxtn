// constants
export const SET_MESSAGES = "messages/SET_MESSAGES";
export const READ_MESSAGE = "messages/READ_MESSAGE";
export const NEW_MESSAGE = "messages/NEW_MESSAGE";

// selectors
export const messagesSelector = (state) => state.messages;

// action creators
// set all messages for the current user
export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  };
}
// update a message as read
export function readMessage(message) {
  return {
    type: READ_MESSAGE,
    message,
  };
}
// create a new message
export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message,
  };
}

// thunks
// fetch all messages thunk
export const getMessages = () => async (dispatch) => {
  const res = await fetch("/api/my/messages");
  if (res.ok) {
    const data = await res.json();
    dispatch(setMessages(data.messages));
    return data;
  }
  return res;
};
// mark a message as read thunk
export const updateRead = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/my/messages/${messageId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(readMessage(data));
    return data;
  }
  return res;
};
// create a new message thunk
export const createMessage = (message) => async (dispatch) => {
  const { senderId, recipientId, body } = message;
  const res = await fetch("/api/my/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId,
      recipientId,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(newMessage(data));
    return data;
  }
  return res;
};

// reducer
export default function messagesReducer(state = {}, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_MESSAGES:
      newState = action.messages;
      break;
    case READ_MESSAGE:
      newState[action.message.sender.id].forEach((message) => {
        message.read = true;
      });
      break;
    case NEW_MESSAGE:
      if (newState[action.message.recipient.id]) {
        newState[action.message.recipient.id].push(action.message);
      } else {
        newState[action.message.recipient.id] = [action.message];
      }
      break;
    default:
      break;
  }
  return newState;
}
