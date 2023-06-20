class WeatherApi {
  // constructor for getting the interval
  constructor(inrerval) {
    this.inrerval = inrerval;
  }

  // a function that requests data and formats it for output
  async getWeatherData(interval) {
    // using fetch to get data from api
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${
        process.env["OPENWEATHER_API_TOKEN"]
      }&cnt=${interval * 3 + interval / 3}&units=metric&lang=ua&q=Izmail`
    );
    // receive them and format the output as I need
    const data = await response.json();
    const dataAboutWeatherWithInterval = data.list
      .map((weather) => {
        if (+weather.dt_txt.slice(11).slice(0, -6) % interval === 0) {
          return `Time: ${weather.dt_txt}\nTemperature: ${weather.main.temp}\nWind speed: ${weather.wind.speed}\nFeels like: ${weather.main.feels_like}\nMax: ${weather.main.temp_max}\nMin: ${weather.main.temp_min}`;
        } else {
          return null;
        }
      })
      .filter((item) => {
        return item !== null;
      });
    // return an already formatted string, which will be the message for the user
    return (
      `\nWeather in ${data.city.name}. Population: ${data.city.population} people.\n\n` +
      dataAboutWeatherWithInterval.join("\n\n")
    );
  }
}

module.exports = new WeatherApi();
