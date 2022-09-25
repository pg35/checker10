import { useEffect } from "react";
import Loading from "./Loading";
import { ErrorMessage } from "./styled";
import { ajaxGet as doAjax2, aysncUpdateState } from "../util/ajax";
import { T, createAction } from "../reducer";

export default function TransactionList(props) {
  const {
    dispatch,
    state2: { transactionLog }
  } = props;
  const { ajaxStatus } = transactionLog;
  function loadList() {
    return doAjax2(
      { action: "pxq_pgck_get_transactions" },
      (data) => {
        if (data.success) {
          dispatch(
            createAction(T.transactionLog, {
              items: data.data.list,
              ajaxStatus: 2
            })
          );
          props.setState({ ...props.state, balance: data.data.balance });
        }
      },
      (textStatus) => {
        if ("abort" === textStatus) {
          console.log("translog aborting jaax");
          return;
        }
        dispatch(
          createAction(T.transactionLog, { items: null, ajaxStatus: 2 })
        );
      }
    );
  }
  useEffect(() => {
    if (2 === ajaxStatus) return;
    dispatch(createAction(T.transactionLog, { ajaxStatus: 1 }));
    const xhr = loadList();
    return () => {
      if (xhr) {
        console.log("unmounting translog");
        xhr.abort();
      }
    };
  }, [ajaxStatus]);

  let Comp = null;
  if (1 === ajaxStatus) {
    Comp = <Loading />;
  } else if (3 === ajaxStatus) {
    Comp = (
      <ErrorMessage>Failed to load transactions. Please refresh!</ErrorMessage>
    );
  } else if (2 === ajaxStatus) {
    const list = transactionLog.items.filter(
      (obj) => "draft" !== obj.status && "pending" !== obj.status
    );
    let tbody = null;
    if (!list.length) {
      tbody = (
        <tr>
          <td colSpan={6} style={{ textAlign: "center", padding: "40px 30px" }}>
            You don't have any transactions.
          </td>
        </tr>
      );
    } else {
      tbody = list.map((obj) => (
        <tr key={obj.id}>
          <td key="id">{obj.id}</td>
          <td key="date">{obj.created_at}</td>
          <td key="detail">{obj.detail}</td>
          <td key="credits">
            <span style={{ color: "credit" === obj.status ? "green" : "red" }}>
              {"credit" === obj.status ? "+" : "-"}

              {obj.credits}
            </span>
          </td>
        </tr>
      ));
    }
    Comp = (
      <table style={{ textAlign: "left", width: "100%" }}>
        <thead>
          <tr>
            <th key="id">ID</th>
            <th key="date">Date</th>
            <th key="detail">Description</th>
            <th key="credits">Credits</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "left", marginBottom: "10px" }}>
        <button
          disabled={1 === ajaxStatus}
          onClick={() =>
            dispatch(createAction(T.transactionLog, { ajaxStatus: 1 }))
          }
        >
          Refresh
        </button>
      </div>
      <div>{Comp}</div>
    </div>
  );
}
