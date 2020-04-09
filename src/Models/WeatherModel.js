import { observable, action } from "mobx";
import { WeatherController } from "../api/weatherController";

const weatherController = new WeatherController();

export default class WeatherModel {
  @observable weatherData;
  @observable latitude;
  @observable longitude;
  @observable language = "en";

  @action getWeather() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
      lang: this.language,
    };
    this.weatherData = weatherController.getWeatherForecast(queries);
  }
}
