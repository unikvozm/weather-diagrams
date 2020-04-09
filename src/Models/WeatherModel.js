import { observable, action } from "mobx";
import { WeatherController } from "../api/weatherController";
import { convertTimeInDay } from "../utils/convertTime";

const weatherController = new WeatherController();

export default class WeatherModel {
  @observable weatherInfo = [];
  @observable latitude;
  @observable longitude;
  @observable language = "en";
  @observable minTemperatures = [];
  @observable maxTemperatures = [];

  @action async getWeather() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
      lang: this.language,
    };
    const weatherData = await weatherController.getWeatherForecast(queries);
    this.weatherInfo = weatherData.daily.data.map((day) => {
      return {
        min: day.temperatureLow,
        max: day.temperatureHigh,
        time: convertTimeInDay(day.time),
        overall: day.icon,
        windSpeed: day.windSpeed,
      };
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
