import React from "react";
import { observer } from 'mobx-react';
import WeatherChart from '../Components/WeatherChart';
import {normCoords} from '../utils/normilizeCoordinates';

@observer
class WeatherPresenter extends React.Component {
  componentDidMount() {
    const { weatherStore } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
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
        <li>longitude: {normCoords(weatherStore.longitude)}</li>
        <li>latitude: {normCoords(weatherStore.latitude)}</li>
      </ul>	
      <WeatherChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures}/>
    </div>
    );
  }
}

export default WeatherPresenter;
