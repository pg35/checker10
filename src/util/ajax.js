import { T, getT, getDispatch, createAction } from "../reducer";

window.ajaxUrl = "https://www.goodcopy.xyz/wp-admin/admin-ajax.php";
export function ajaxGet(data, onSuccess, onFail, onFinally) {
  const args = { data, type: "GET" };
  return ajax(args, onSuccess, onFail, onFinally);
}
export function aysncUpdateState(method, data, actionType, key) {
  const args = { data, type: method };
  const dispatch = getDispatch();
  return ajax(
    args,
    (data) => {
      if (data.success) {
        dispatch(createAction(actionType, { [key]: data.data.list }));
      }
    },
    () => {
      dispatch(createAction(actionType, { [key]: null }));
    }
  );
}
export function ajax(args, onSuccess, onFail, onFinally) {
  const dispatch = getDispatch();
  return window.jQuery
    .ajax(window.ajaxUrl, { ...args, dataType: "json" })
    .done((data, textStatus, jqXHR) => {
      onSuccess && onSuccess(data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      onFail && onFail(textStatus);
    })
    .always(() => {
      onFinally && onFinally();
    });
}
