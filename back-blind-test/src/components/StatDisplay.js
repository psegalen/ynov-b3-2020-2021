export const StatDisplay = (props) => (
  <div
    style={{
      boxSizing: "border-box",
      width: "250px",
      borderRadius: "32px",
      backgroundColor: props.color,
      color: "white",
      padding: "16px",
      margin: "16px",
    }}
  >
    <h4>{props.title}</h4>
    <h1>{props.number}</h1>
  </div>
);
