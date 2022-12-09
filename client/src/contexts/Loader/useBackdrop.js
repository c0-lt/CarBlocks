import { useContext } from "react";
import BackdropContext from "./BackdropContext";

const useBackdrop = () => {
  return useContext(BackdropContext);
};

export default useBackdrop;
