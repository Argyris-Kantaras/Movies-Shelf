import styles from "./errorMessage.module.css";

function ErrorMessage(props) {
  return (
    <div>
      <h1>
        Sorry, we couldn't find what you are looking for. Please try again and
        make sure that title was typed correctly!({props.err})
      </h1>
    </div>
  );
}

export default ErrorMessage;
