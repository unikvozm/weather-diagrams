import CanvasJSReact from "../canvasjs.react";
import React from "react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class TemperatureChart extends React.Component {
  render() {
    const { min, max, city, country } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
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
      <div>
        <CanvasJSChart
          options={options}
        />
      </div>
    );
  }
}
