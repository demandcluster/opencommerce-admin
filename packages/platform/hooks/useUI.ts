import {useContext} from "react";
import {UIContext} from "../context/UIContext";

const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
};

export default useUI;
