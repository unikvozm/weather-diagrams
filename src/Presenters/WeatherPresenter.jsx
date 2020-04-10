import React from "react";
import { observer } from 'mobx-react';
import TemperatureChart from '../Components/TemperatureChart';
import WindChart from '../Components/WindChart';
import OverallChart from '../Components/OverallStatChart';


@observer
class WeatherPresenter extends React.Component {

  componentDidMount() {
    const { weatherStore } = this.props;
    weatherStore.getWeather();
    if (!weatherStore.longitude || !weatherStore.latitude) {
      weatherStore.getLocationByCoords();
    }
  }

  render() {
    const { weatherStore } = this.props;
    return (
      <main className="weather-wrapper">
        <TemperatureChart min={weatherStore.minTemperatures} max={weatherStore.maxTemperatures} city={weatherStore.city} country={weatherStore.country} />
        <WindChart winds={weatherStore.winds} city={weatherStore.city} country={weatherStore.country} />
        <OverallChart overalls={weatherStore.overalls} city={weatherStore.city} country={weatherStore.country} />
      </main>
    );
  }
}

export default WeatherPresenter;
