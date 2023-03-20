import React from "react";
import style from "@src/src/components/dashboard/parameterBox.module.scss";

interface Props {
  listObj: ParameterObj[];
}

export interface ParameterObj {
  name: string;
  value: string;
}

const ParameterBox: React.FC<Props> = ({ listObj }) => {
  return (
    <div className={style.container}>
      {listObj.map((obj, idx) => (
        <div key={idx} className={style.box}>
          <div className={style.name}>{obj.name}</div>
          <div className={style.value}>{obj.value}</div>
        </div>
      ))}
    </div>
  );
};
export default ParameterBox;
