import React from "react";
import style from "@src/src/components/common/tab.module.scss";

const Tab: React.FC<{
  listItem: string[];
  onSetTab: (idx: number) => void;
  state: number;
  onTriggerMonthData: (type: string) => void;
}> = ({ listItem, onSetTab, state, onTriggerMonthData }) => {
  const handlerOnSetTab = (idx: number, name: string) => {
    onSetTab(idx);
    if (name === "1M" || name === "5D") onTriggerMonthData(name);
  };

  return (
    <div className={style.tabs}>
      {listItem.map((item, idx) => {
        return (
          <div
            className={`${style.tabItem} + ${
              state === idx ? style.active : ""
            }`}
            key={idx}
            onClick={() => handlerOnSetTab(idx, item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
