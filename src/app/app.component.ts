import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-weather-widget';
  WeatherData:any;
  constructor() {}

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherData)

  }
  getWeatherData(){
    let data =  JSON.parse('{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"base":"stations","main":{"temp":285.37,"feels_like":285.05,"temp_min":284.32,"temp_max":286.13,"pressure":1001,"humidity":92},"visibility":10000,"wind":{"speed":6.69,"deg":220},"rain":{"1h":0.15},"clouds":{"all":100},"dt":1673382337,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1673337790,"sunset":1673367127},"timezone":0,"id":2643743,"name":"London","cod":200}')
    this.setWeatherData(data);
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}
