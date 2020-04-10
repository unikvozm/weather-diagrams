import React from "react";
import { observer } from 'mobx-react';
import TemperatureChart from '../Components/TemperatureChart';
import WindChart from '../Components/WindChart';
import { normCoords } from '../utils/normilizeCoordinates';

@observer
class WeatherPresenter extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    const { weatherStore } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        weatherStore.longitude = pos.coords.longitude;
        weatherStore.latitude = pos.coords.latitude;
        weatherStore.getWeather();
        weatherStore.getLocationByCoords();
      });
    } else {
      weatherStore.getWeather();
    }
  }

  handleChange = (e) => {
    const { weatherStore } = this.props;
    weatherStore.newPlace = e.target.value;
  }

  handleKey = (e) => {
    const { weatherStore } = this.props;
    if(e.key === 'Enter') {
      weatherStore.updateLocation();
      weatherStore.newPlace = '';
      this.input.current.value = ''
    }
  }

  render() {
    const { weatherStore } = this.props;
    return (
      <main>
        <ul>
          <li>longitude: {normCoords(weatherStore.longitude)}</li>
          <li>latitude: {normCoords(weatherStore.latitude)}</li>
        </ul>
        <input type="text" placeholder="Enter a city" ref={this.input} onChange={this.handleChange} onKeyDown={this.handleKey} />
        <TemperatureChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures} city={weatherStore.city} country={weatherStore.country} />
        <WindChart winds={weatherStore.winds} city={weatherStore.city} country={weatherStore.country} />
      </main>
    );
  }
}

export default WeatherPresenter;
