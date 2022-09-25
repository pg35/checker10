import Spinner from "./Spinner";

export default function Loading(props) {
  return (
    <p>
      {props.message ? props.message : "Loading..."}
      <Spinner />
    </p>
  );
}
