import CanvasJSReact from "../canvasjs.react";
import React from "react";
import { ThemeType } from '../Constants/ThemeTypes';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class OverallChart extends React.Component {
  render() {
    const { overalls, city, country, theme } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: theme === ThemeType.light ? "light2" : "dark2", //"light1", "dark1", "dark2"
      title: {
        text: `The Overall Statistics for this week in ${city}, ${country}`
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: overalls
      }]
    }
    return (
      <div className="chart">
        <CanvasJSChart
          options={options}
        />
      </div>
    );
  }
}
