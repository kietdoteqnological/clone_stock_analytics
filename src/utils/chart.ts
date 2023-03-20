/* eslint-disable @typescript-eslint/indent */
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { graphic } from "echarts";
import { ChartOption, DataItem } from "../interface/chartOption";

export const genDataLineOpts = (data: DataItem[]) => {
  const fakeData: number[] = [];

  for (let i = 0; i < data.length - 1; i++) {
    fakeData.push(data[i][4]);
  }

  const color = fakeData[0] >= fakeData.slice(-1)[0] ? "red" : "green";

  const downColor = [
    {
      offset: 0,
      color: "rgba(233,151,165,1)",
    },
    {
      offset: 1,
      color: "rgba(237,237,237,1)",
    },
  ];

  const upColor = [
    {
      offset: 0,
      color: "rgba(180,233,151,1)",
    },
    {
      offset: 1,
      color: "rgba(212,226,210,1)",
    },
  ];

  return {
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        show: false,
      },
    ],
    yAxis: [
      {
        type: "value",
        show: false,
        scale: true,
      },
    ],
    series: [
      {
        data: fakeData,
        type: "line",
        areaStyle: {
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            fakeData[0] >= fakeData.slice(-1)[0] ? downColor : upColor
          ),
        },
        lineStyle: {
          color: color,
          width: 1,
        },
        showSymbol: false,
        markLine: {
          symbol: "none",
          data: [{ yAxis: fakeData[fakeData.length - 1] }],
          itemStyle: {
            color: color,
          },
          silent: true,
          emphasis: {
            lineStyle: {
              color: color,
            },
          },
          label: {
            normal: {
              show: true,
              position: "insideEndTop",
            },
            fontSize: "2px",
          },
        },
        color: color,
      },
    ],
    tooltip: {
      trigger: "axis",
      show: true,
    },

    grid: [
      {
        left: "5px",
        right: "5px",
        top: 0,
        bottom: "3%",
      },
    ],
  } as ChartOption;
};

export const genDataCandlestickOpts = (data: DataItem[]) => {
  return {
    dataset: {
      source: data,
    },
    grid: [
      {
        left: "5%",
        right: "15%",
        bottom: 80,
        top: 12,
      },
      {
        left: "5%",
        right: "15%",
        height: 40,
        bottom: 80,
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: true },
        axisLabel: {
          formatter: function (value) {
            dayjs.extend(localizedFormat);
            return dayjs(value).format("L");
          },
        },
      },
      {
        type: "category",
        gridIndex: 1,
        boundaryGap: true,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        show: true,
        scale: true,
        splitArea: {
          show: false,
        },
        axisLabel: {
          margin: 20,
        },
        position: "right",
        nameTextStyle: {
          fontSize: 8,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        show: true,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      //position: ["50%", "2%"],
      position: function (pos, _params, _el, _elRect, size) {
        const obj: Record<string, number> = {
          top: 2,
        };
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      extraCssText: "font-size: 10px; display: flex",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        return `<div class="tooltip" >
          <b style="color: ${params[0].color}">${params[0].name}</b>
          <div class="tooltip-box">
            <span><b>Open:</b> ${params[0].data[1]}</span>
            <span><b>Highest</b>: ${params[0].data[2]}</span>
          </div>
          <div class="tooltip-box">
            <span><b>Lowest:</b> ${params[0].data[3]}</span>
            <span><b>Close:</b>: ${params[0].data[4]}</span>
          </div>
        </div>`;
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 6,
      pieces: [
        {
          value: 1,
          color: "#fbdae0",
        },
        {
          value: -1,
          color: "#d7f2e9",
        },
      ],
    },
    series: [
      {
        type: "candlestick",
        itemStyle: {
          color: "#ec2e51",
          color0: "#1dcc98",
        },
        encode: {
          x: 0,
          y: [1, 4, 3, 2],
        },
        emphasis: {
          itemStyle: {
            borderCap: "round",
          },
        },
      },
      {
        name: "Volumn",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: "#d7f2e9",
          borderRadius: 5,
        },
        large: true,
        encode: {
          x: 0,
          y: 5,
        },
      },
    ],
  } as ChartOption;
};
