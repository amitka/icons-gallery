import React, {useContext, useEffect, useState, Fragment} from "react";
import {AppContext} from "../../hooks/useAppContext";

export const SvgIcon = props => {
  const [state] = useContext(AppContext);
  return (
    <div style={{width: "60px", height: "60px", margin: "20px"}}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="36px"
        height="36px"
      >
        <path d={props.path} />
      </svg>
      <span>{state.message}</span>
    </div>
  );
};

export const SvgIconTest = ({path, name}) => {
  const [icon, setIcon] = useState();
  useEffect(() => {
    import(path).then(({img}) => {
      setIcon({img});
    });
  }, []);

  return (
    <div>
      {icon && <img src={icon} alt="" />}
      <span>{name}</span>
    </div>
  );
};

export const SvgIcon2 = ({svg}) => {
  return <div dangerouslySetInnerHTML={{__html: svg}}></div>;
};
