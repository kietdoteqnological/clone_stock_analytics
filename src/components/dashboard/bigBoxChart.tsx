import React, { useState } from "react";
import style from "@src/src/components/dashboard/bigBoxChart.module.scss";
import paypal from "@src/src/assets/paypal-logo.png";
import Image from "next/image";
import { HiOutlineViewfinderCircle, HiOutlineCamera } from "react-icons/hi2";
import { IoTrendingUpSharp, IoTrendingDownSharp } from "react-icons/io5";
import Tab from "../common/tab";
import { ChartOption } from "@src/src/interface/chartOption";
import ReactECharts from "echarts-for-react";
import ParameterBox, { ParameterObj } from "./parameterBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/src/app/store";
import { fetchStocksThunk } from "@src/src/store/stocks/slice";
import Loading from "../common/loading";

interface Props {
  name: string;
  money: number;
  percentage: number;
  isUp: boolean;
  option: ChartOption;
  symbol: string;
  loading: boolean;
}

const BigBoxChart: React.FC<Props> = ({
  money,
  isUp,
  percentage,
  option,
  symbol,
  loading,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<number>(0);
  const { stocks } = useSelector((state: RootState) => state.stocks);

  const setTabHandler = (idx: number) => {
    setActiveTab(idx);
  };

  const triggleDispatch = (type: string) => {
    if (type === "5D")
      dispatch(fetchStocksThunk({ funtion: "TIME_SERIES_WEEKLY", symbol }));
    if (type === "1M")
      dispatch(fetchStocksThunk({ funtion: "TIME_SERIES_MONTHLY", symbol }));
  };

  const listOption = ["5D", "1M", "6M", "5Y", "MAX"];

  const listObjTmp1: ParameterObj[] = [
    { name: "Prev. Close", value: "253.67" },
    { name: "Open", value: "250.19" },
    { name: "Volumn", value: "29,381,464" },
    { name: "Average Vol. (3m)", value: "31,224,175" },
  ];

  const listObjTmp2: ParameterObj[] = [
    { name: "1-Year Change", value: "-10.06%" },
    { name: "Day's Range", value: "248.11-253.55" },
    { name: "Day's Range", value: "241.51-349.47" },
    { name: "Market Cap", value: "1.89T" },
  ];

  const listObjTmp3: ParameterObj[] = [
    { name: "Shr Outstanding", value: "7,749,000" },
    { name: "Revenue", value: "250.19" },
    { name: "Dividend (Yield)", value: "2.48" },
    { name: "Beta", value: "OK" },
  ];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.logoBox}>
          <div className={style.logo}>
            <Image alt="logo" src={paypal} />
          </div>
          <select className={style.select}>
            <option value="">
              {stocks["Meta Data"]["2. Symbol"] === ""
                ? "Paypal"
                : stocks["Meta Data"]["2. Symbol"]}
            </option>
          </select>
        </div>
        <div className={style.chooseBox}>
          <div className={style.tabs}>
            <div className={`${style.item} + ${style.active}`}>
              Interactive Chart
            </div>
            <div className={style.item}>Streaming Chart</div>
          </div>

          <div className={style.tabs}>
            <div className={style.item}>
              <HiOutlineCamera />
            </div>
            <div className={style.item}>
              <HiOutlineViewfinderCircle />
            </div>
          </div>
        </div>
      </div>
      <div className={style.informationContainer}>
        <div className={style.information}>
          <div className={style.moneyInfo}>
            <p className={style.money}>{money}</p>
            <span className={`${style.percentage} + ${isUp ? style.up : ""}`}>
              {isUp ? <IoTrendingUpSharp /> : <IoTrendingDownSharp />}
              <p>{percentage}</p>
            </span>
          </div>
          <div className={style.note}>
            <span className={style.time}>09:35:3</span>
            <span className={style.status}>
              - Closed. Currency in <b>USD</b> <u>(Disclaimer)</u>
            </span>
          </div>
        </div>
        <div className={style.tabsDay}>
          <Tab
            listItem={listOption}
            onSetTab={setTabHandler}
            state={activeTab}
            onTriggerMonthData={triggleDispatch}
          />
        </div>
      </div>
      <div className={style.chart}>
        {loading === false && (
          <ReactECharts
            option={{ ...option }}
            style={{ width: "100%", height: "100%" }}
          />
        )}

        {loading && <Loading />}
      </div>
      <div className={style.parameter}>
        <ParameterBox listObj={listObjTmp1} />
        <ParameterBox listObj={listObjTmp2} />
        <ParameterBox listObj={listObjTmp3} />
      </div>
    </div>
  );
};

export default BigBoxChart;
