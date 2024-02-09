import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ShowWithTooltip({ tooltipText, children, placement="right"}) {
  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>{tooltipText}</Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
}

export default ShowWithTooltip;
