import React from "react";
import { observer } from 'mobx-react';
import WeatherChart from '../Components/WeatherChart';
import { normCoords } from '../utils/normilizeCoordinates';

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
    } else {
      weatherStore.getWeather();
    }
  }

  handleChange = (e) => {
    const { weatherStore } = this.props;
    weatherStore.newPlace = e.target.value;
  }

  render() {
    const { weatherStore } = this.props;
    return (
      <main>
        <ul>
          <li>longitude: {normCoords(weatherStore.longitude)}</li>
          <li>latitude: {normCoords(weatherStore.latitude)}</li>
        </ul>
        <input type="text" placeholder="Enter a city" onChange={this.handleChange} onKeyDown={this.handleKey} />
        <WeatherChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures} city={weatherStore.city} country={weatherStore.country} />
      </main>
    );
  }
}

export default WeatherPresenter;
