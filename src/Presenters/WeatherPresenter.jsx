import React from "react";
import { observer } from 'mobx-react';
import WeatherChart from '../Components/WeatherChart';

@observer
class WeatherPresenter extends React.Component {
  componentDidMount() {
    const { weatherStore } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        weatherStore.longitude = pos.coords.longitude;
        weatherStore.latitude = pos.coords.latitude;
        weatherStore.getWeather();
        console.log(weatherStore.weatherData)
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
      <WeatherChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures}/>
    </div>
    );
  }
}

export default WeatherPresenter;
