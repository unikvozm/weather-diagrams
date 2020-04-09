import React from "react";
import { observer } from 'mobx-react';

@observer
class WeatherChart extends React.Component {
  componentDidMount() {
    const { weatherStore } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
		  console.log(pos);
        weatherStore.longitude = pos.coords.longitude;
        weatherStore.latitude = pos.coords.latitude;
        weatherStore.getWeather();
      });
    }
  }
  render() {
	const { weatherStore } = this.props;
    return (
    <div>
      <ul>
        <li>longitude: {weatherStore.longitude}</li>
        <li>latitude: {weatherStore.latitude}</li>
      </ul>	
    </div>
    );
  }
}

export default WeatherChart;
