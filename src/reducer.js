import { makeEnum } from "./util/general";

export const T = makeEnum([
  "ajaxStatus",
  "scanLog",
  "transactionLog",
  "welcomePopup"
]);
export function getT() {
  return T;
}
export function createAction(type, data) {
  return {
    type,
    data
  };
}
let globalDispatch = null;
export function setDispatch(dispatch) {
  globalDispatch = dispatch;
}
export function getDispatch() {
  return globalDispatch;
}

export default function reducer(state, action) {
  console.log("reduce", action);
  switch (action.type) {
    case T.welcomePopup:
      return {
        ...state,
        welcomePopup: false
      };
    case T.ajaxStatus:
      return {
        ...state,
        ajaxStatus: action.data
      };
    case T.scanLog:
      return {
        ...state,
        scanLog: {
          ...state.scanLog,
          ...action.data
        }
      };
    case T.transactionLog:
      return {
        ...state,
        transactionLog: {
          ...state.transactionLog,
          ...action.data
        }
      };
    default:
      throw new Error("Invalid action.type in reducer");
  }
}
