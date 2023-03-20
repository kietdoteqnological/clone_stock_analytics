import React, { useEffect } from "react";
import DashBoardLayout from "../components/layout/dash";
import style from "@src/src/styles/dashboard.module.scss";
import GreenButton from "../components/common/greenButton";
import ChartBox from "../components/dashboard/chartBox";
import google from "@src/src/assets/google-logo.png";
import netflix from "@src/src/assets/netflix-logo.png";
import paypal from "@src/src/assets/paypal-logo.png";
import TableBox from "../components/dashboard/tableBox";
import { TableData } from "../interface/tableData";
import BigBoxChart from "../components/dashboard/bigBoxChart";
import { genDataCandlestickOpts, genDataLineOpts } from "../utils/chart";
import { fetchStocksThunk } from "../store/stocks/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { DATA_GOOGLE, DATA_NETFLIX, DATA_PAYPAL } from "../constanst/constant";

const DashBoard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { stocks, loading } = useSelector((state: RootState) => state.stocks);

  useEffect(() => {
    dispatch(
      fetchStocksThunk({ funtion: "TIME_SERIES_WEEKLY", symbol: "PYPL" })
    );
  }, [dispatch]);

  const tableDataGar: TableData[] = [
    {
      name: "QRTEB",
      last: 5.2,
      change: 2.16,
      chg: 71.24,
    },
    {
      name: "LTRPB",
      last: 14,
      change: 4.84,
      chg: 52.84,
    },
    {
      name: "GROSS",
      last: 9.51,
      change: 2.3,
      chg: 31.9,
    },
    {
      name: "RYTM",
      last: 8.77,
      change: 2.1,
      chg: 31.48,
    },
  ];

  const tableDataDec: TableData[] = [
    {
      name: "ATRA",
      last: 5.2,
      change: 2.16,
      chg: 71.24,
    },
    {
      name: "TXMD",
      last: 5.33,
      change: 2.94,
      chg: 35.55,
    },
    {
      name: "NA",
      last: 8.8,
      change: 3.25,
      chg: 26.97,
    },
    {
      name: "BVS",
      last: 6.54,
      change: 1.17,
      chg: 15.18,
    },
  ];
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.titleContainer}>
          <p className={style.title}>Overview</p>
          <p className={style.note}>Let&#39;s check your stats today!</p>
        </div>
        <div className={style.buttonContainer}>
          <GreenButton content="Request" isRevertColor={true} />
          <GreenButton content="Invest" />
        </div>
      </div>
      <div className={style.brandChart}>
        <ChartBox
          imageSrc={paypal}
          title="Paypal"
          code="PYPL"
          money="$2.187.79"
          percentage="1.76%"
          isUp={false}
          option={genDataLineOpts(DATA_PAYPAL.Data)}
          // onClick={() => clickChangeDataHandler(DATA_PAYPAL.Data)}
        />

        <ChartBox
          imageSrc={netflix}
          title="Netflix"
          code="NFLX"
          money="$2.187.79"
          percentage="1.76%"
          isUp={true}
          option={genDataLineOpts(DATA_NETFLIX.Data)}
          // onClick={() => clickChangeDataHandler(DATA_NETFLIX.Data)}
        />

        <ChartBox
          imageSrc={google}
          title="Google"
          code="GOOGL"
          money="$2.187.79"
          percentage="1.76%"
          isUp={true}
          option={genDataLineOpts(DATA_GOOGLE.Data)}
          // onClick={() => clickChangeDataHandler(DATA_GOOGLE.Data)}
        />
      </div>
      <div className={style.mainContent}>
        <BigBoxChart
          loading={loading && stocks.Data.length > 0}
          name="temp"
          isUp={true}
          money={252.72}
          percentage={0.37}
          option={genDataCandlestickOpts(stocks.Data)}
          symbol={stocks["Meta Data"]["2. Symbol"]}
        />

        <div className={style.tableBoxContainer}>
          <TableBox
            isUp={true}
            title="Gainers"
            date="Jul 13,2022 4:00 PM"
            data={tableDataGar}
          />
          <TableBox
            isUp={false}
            title="Decliners"
            date="Jul 13,2022 4:00 PM"
            data={tableDataDec}
          />
        </div>
      </div>
    </div>
  );
};

DashBoard.Layout = DashBoardLayout;
export default DashBoard;
