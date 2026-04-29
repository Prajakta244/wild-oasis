import { useRef } from "react";

const useClick = (handler) => {
    const ref = useRef();
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, true);
  return ref
}

export default useClick