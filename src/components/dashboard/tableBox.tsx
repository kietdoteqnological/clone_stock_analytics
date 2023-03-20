import React from "react";
import style from "@src/src/components/dashboard/tableBox.module.scss";
import { TableData } from "@src/src/interface/tableData";

interface Props {
  isUp: boolean;
  title: string;
  date: string;
  data: TableData[];
}

const TableBox: React.FC<Props> = ({ isUp, title, date, data }) => {
  const tableHeader = ["Name", "Last", "Change", "Chg. %"];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <p className={style.date}>{date}</p>
      </div>
      <table>
        <thead>
          <tr>
            {tableHeader.map((th, idx) => (
              <th key={idx}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((tb, index) => (
            <tr key={index}>
              <td>{tb.name}</td>
              <td>${tb.last}</td>
              <td className={`${isUp ? style.up : style.down}`}>
                {isUp ? "+" : "-"}
                {tb.change}
              </td>
              <td className={`${isUp ? style.up : style.down}`}>
                {isUp ? "+" : "-"}
                {tb.chg}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBox;
