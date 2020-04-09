import { observable, action } from "mobx";
import WeatherController from "../api/weatherController";
import LocationController from "../api/locationController";
import { convertTimeInDay } from "../utils/convertTime";

const weatherController = new WeatherController();
const locationController = new LocationController();
const timeNow = new Date().getTime();

export default class WeatherModel {
  @observable weatherInfo = [];
  @observable latitude = 0;
  @observable longitude = 0;
  @observable minTemperatures = [];
  @observable maxTemperatures = [];
  @observable timeZone;
  @observable country = "";
  @observable city = "";
  @observable newPlace = "";

  @action async getWeather() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
    };
    const weatherData = await weatherController.getWeatherForecast(queries);
    if (weatherData.daily) {
      this.weatherInfo = weatherData.daily.data.map((day) => {
        return {
          min: day.temperatureLow,
          max: day.temperatureHigh,
          overall: day.icon,
          windSpeed: day.windSpeed,
        };
      });
      this.timeZone = weatherData.timezone;
      this.weatherInfo.forEach((day, index) => {
        day.time = convertTimeInDay(
          new Date(timeNow + index * 86400000), // 1000 ms/s * 60 s/min * 60 min/h * 24 h/day
          this.timeZone
        ); 
      });
      this.getMaxTemperatures();
      this.getMinTemperatures();
      this.getLocationByCoords();
    }
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

  @action async getLocationByCoords() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
    };
    const locationData = await locationController.getLocationDataFromCoords(
      queries
    );
    this.country = locationData.country;
    this.city =
      locationData.city ||
      locationData.town ||
      locationData.village ||
      locationData.county ||
      locationData.state;
  }
}
