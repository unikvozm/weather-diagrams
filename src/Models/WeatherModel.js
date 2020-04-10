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
  @observable winds = [];
  @observable timeZone;
  @observable country = "";
  @observable city = "";
  @observable newPlace = "";
  @observable overalls = [];

  @action async getWeather() {
    const queries = {
      lat: this.latitude,
      long: this.longitude,
    };
    const weatherData = await weatherController.getWeatherForecast(queries);
    if (weatherData) {
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
	  this.getWinds();
	  this.getOverallStat();
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

  @action getWinds() {
    this.winds = this.weatherInfo.map((day, index) => {
      return { x: index, y: day.windSpeed };
    });
  }

  @action getOverallStat() {
    const overalls = {};
    this.weatherInfo.forEach((day) => {
      if (overalls[day.overall]) {
        overalls[day.overall] += 1;
      } else overalls[day.overall] = 1;
    });
    this.overalls = Object.keys(overalls).map((key) => {
      return { y: overalls[key] * 100 / 8, label: key };
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
    if (locationData) {
      this.country = locationData.country;
      this.city =
        locationData.city ||
        locationData.town ||
        locationData.village ||
        locationData.county ||
        locationData.state;
    }
  }

  @action async updateLocation() {
    const locationData = await locationController.getLocationDataFromInput(
      this.newPlace
    );
    if (locationData) {
      this.latitude = locationData.geometry.lat;
      this.longitude = locationData.geometry.lng;
      this.country = locationData.components.country;
      this.city =
        locationData.components.city ||
        locationData.components.town ||
        locationData.components.village ||
        locationData.components.county ||
        locationData.components.state;
      this.getWeather();
    }
  }
}
