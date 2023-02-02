const Alert = ({ alertText, alertType }) => {
  return alertText.map((text, index) => (
    <div className={`alert ${alertType}`} key={index}>
      {text.msg}
    </div>
  ));
};

export default Alert;
