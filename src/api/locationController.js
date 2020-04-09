const GEOCODER_TOKEN = "cdb1e310abc5419f88c96b50bb013ea1";

export default class LocationController {
  constructor() {
    this.baseUrl = "https://api.opencagedata.com/geocode/v1/json";
    this.proxy = "https://cors-anywhere.herokuapp.com/";
  }

  async getLocationDataFromCoords(queries) {
    const { lat, long } = queries;
    const url = `${this.baseUrl}?key=${GEOCODER_TOKEN}&q=${lat}%2C%20${long}&language=en&pretty=1`;

    try {
      const req = await fetch(url);
      const data = await req.json();
      return data.results[0].components;
    } catch (err) {
      alert("Something went wrong");
      throw new Error(err);
    }
  }

  async getLocationDataFromInput(input) {
	const cityToSearch = input.replace(' ', '%20');
	const url = `${this.baseUrl}?q=${cityToSearch}&key=${GEOCODER_TOKEN}&language=en&pretty=1`;
	
	try {
		const req = await fetch(url);
		const data = await req.json();
		return data.results[0];
	  } catch (err) {
		alert("Something went wrong");
		throw new Error(err);
	  }
  }
}
