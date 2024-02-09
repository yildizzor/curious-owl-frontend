import { Card } from "react-bootstrap";

function MultilineCardText({ children }) {
  return (
    <Card.Text
      as={"pre"}
      style={{
        fontFamily: "inherit",
        fontSize: "inherit",
        lineHeight: "inherit",
      }}
    >
      {children}
    </Card.Text>
  );
}

export default MultilineCardText;
