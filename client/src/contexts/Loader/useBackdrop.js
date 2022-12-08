import { useContext } from "react";
import BackdropContext from "./BackdropContext";

export default () => {
  return useContext(BackdropContext);
};
