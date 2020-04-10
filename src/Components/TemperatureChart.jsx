import CanvasJSReact from "../canvasjs.react";
import React from "react";
import { ThemeType } from '../Constants/ThemeTypes';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class TemperatureChart extends React.Component {
  render() {
    const { min, max, city, country, theme } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: theme === ThemeType.light ? "light2" : "dark2", //"light1", "dark1", "dark2"
      title: {
        text: `The Temperature Forecast for this week in ${city}, ${country}`,
      },
      axisY: {
        title: "Temperature in °C",
        includeZero: false,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: "max Temperature",
          showInLegend: true,
          dataPoints: max,
        },
        {
          type: "spline",
          name: "min Temperature",
          showInLegend: true,
          dataPoints: min,
        },
      ],
    };
    return (
      <div className="chart">
        <CanvasJSChart
          options={options}
        />
      </div>
    );
  }
}
