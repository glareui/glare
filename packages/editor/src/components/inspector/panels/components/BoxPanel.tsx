import { memo } from "react";
import ColorsControl from "./../../controls/ColorsControl";

const BoxPanel = () => (
  <ColorsControl
    withFullColor
    label="Color"
    name="backgroundColor"
    enableHues
  />
);

export default memo(BoxPanel);
