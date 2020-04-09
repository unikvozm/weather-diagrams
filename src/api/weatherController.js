const WEATHER_TOKEN = "b09c5fb76da37a975c47e9a40842e089";

export class WeatherController {
  constructor() {
    this.baseUrl = "https://api.darksky.net/forecast/";
    this.proxy = "https://cors-anywhere.herokuapp.com/";
  }

  async getWeatherForecast(queries) {
	const { lat, long, lang } = queries;
    const url = `${this.proxy}${this.baseUrl}${WEATHER_TOKEN}/${lat},${long}?exclude=minutely,hourly,flags&lang=${lang}&units=si`;

    try {
      const req = await fetch(url);
      const data = await req.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
