import CanvasJSReact from "../canvasjs.react";
import React from "react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class WindChart extends React.Component {
  render() {
    const { winds, city, country } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: `The Wind Speed Forecast for this week in ${city}, ${country}`
      },
      axisY: {
        title: "Wind Speed in m/s",
        includeZero: true,
      },
      data: [{
        type: "column", //change type to bar, line, area, pie, etc
        indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: winds,
      }]
    }
    return (
      <div>
        <CanvasJSChart
          options={options}
        />
      </div>
    );
  }
}
