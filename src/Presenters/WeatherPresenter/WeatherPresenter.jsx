import React from "react";
import { observer } from 'mobx-react';
import TemperatureChart from '../../Components/TemperatureChart';
import WindChart from '../../Components/WindChart';
import OverallChart from '../../Components/OverallStatChart';
import "./WeatherPresenter.scss";

const locationMessage = "Please, allow to read your coordinates. Your data is not stored and only used for showing the weather in your location";

@observer
class WeatherPresenter extends React.Component {
  componentDidMount() {
    const { weatherStore } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        weatherStore.longitude = pos.coords.longitude;
        weatherStore.latitude = pos.coords.latitude;
        weatherStore.getWeather();
        weatherStore.getLocationByCoords();
      }, (err) => {
        alert(locationMessage);
        weatherStore.getWeather();
      });
    } else {
      alert(locationMessage);
      weatherStore.getWeather();
    }
  }

  render() {
    const { weatherStore, theme } = this.props;
    return (
      <main>
        <section className="weather-wrapper">
          <TemperatureChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures} city={weatherStore.city} country={weatherStore.country} theme={theme.themeClass} />
          <WindChart winds={weatherStore.winds} city={weatherStore.city} country={weatherStore.country} theme={theme.themeClass} />
          <OverallChart overalls={weatherStore.overalls} city={weatherStore.city} country={weatherStore.country} theme={theme.themeClass} />
        </section>
      </main>
    );
  }
}

export default WeatherPresenter;
