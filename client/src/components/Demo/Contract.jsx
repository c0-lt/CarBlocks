import { useRef, useEffect } from "react";

function Contract({ value }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value]);

  return (
    <code>
      {`contract CarBlocks {
  uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>
    </code>
  );
}

export default Contract;
