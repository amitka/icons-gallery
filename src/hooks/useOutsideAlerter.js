import React, { useState, useEffect } from "react";

export const useOutsideAlerter = ref => {
  const [outside, setOutside] = useState(false);

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      //alert("You clicked outside of me!");
      setOutside(true);
    } else setOutside(false);
  }

  return {
    outside
  };
};
