import React from "react";
import style from "@src/src/components/dashboard/chartBox.module.scss";
import AvatarBox from "../common/avatarBox";
import { StaticImageData } from "next/image";
import ReactECharts from "echarts-for-react";
import { ChartOption } from "@src/src/interface/chartOption";
import { IoTrendingUpSharp, IoTrendingDownSharp } from "react-icons/io5";

interface Props {
  imageSrc: string | StaticImageData;
  title: string;
  code: string;
  money: string;
  percentage: string;
  isUp: boolean;
  option: ChartOption;
  onClick?: () => void;
}
const ChartBox: React.FC<Props> = (props) => {
  const { imageSrc, title, code, money, percentage, option, isUp, onClick } =
    props;
  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.header}>
        <AvatarBox imageSrc={imageSrc} title={title} note={code} />
        <div>
          <p className={style.money}>{money}</p>
          <span className={`${style.percentage} + ${isUp ? style.up : ""}`}>
            {isUp ? <IoTrendingUpSharp /> : <IoTrendingDownSharp />}
            <p>{percentage}</p>
          </span>
        </div>
      </div>
      <div className={style.chart}>
        <ReactECharts
          option={{ ...option }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default ChartBox;
