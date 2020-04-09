import { observable, action } from "mobx";
import { WeatherController } from "../api/weatherController";
import { convertTimeInDay } from "../utils/convertTime";

const weatherController = new WeatherController();
const timeNow = new Date().getTime();

export default class WeatherModel {
  @observable weatherInfo = [];
  @observable latitude;
  @observable longitude;
  @observable minTemperatures = [];
  @observable maxTemperatures = [];
  @observable timeZone;

  @action async getWeather() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
    };
    const weatherData = await weatherController.getWeatherForecast(queries);
    this.weatherInfo = weatherData.daily.data.map((day) => {
      return {
        min: day.temperatureLow,
        max: day.temperatureHigh,
        overall: day.icon,
        windSpeed: day.windSpeed,
      };
    });
    this.weatherInfo.forEach((day, index) => {
      day.time = convertTimeInDay(new Date(timeNow + index * 86400000), this.timeZone); // 1000 ms/s * 60 s/min * 60 min/h * 24 h/day
    });
    this.getMaxTemperatures();
    this.getMinTemperatures();
  }

  @action getMinTemperatures() {
    this.minTemperatures = this.weatherInfo.map((day) => {
      return { y: day.min, label: day.time };
    });
  }

  @action getMaxTemperatures() {
    this.maxTemperatures = this.weatherInfo.map((day) => {
      return { y: day.max, label: day.time };
    });
  }
}
