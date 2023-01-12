import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData:any;
  currenttime = new Date();
  cityName?: string;
  constructor() {}

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherData)

  }

  onSubmit(){
      let data =  JSON.parse('{"coord":{"lon":151.2073,"lat":-33.8679},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":296.9,"feels_like":297,"temp_min":296.13,"temp_max":298.84,"pressure":1014,"humidity":64},"visibility":10000,"wind":{"speed":1.79,"deg":61,"gust":4.02},"clouds":{"all":59},"dt":1673404232,"sys":{"type":2,"id":2002865,"country":"AU","sunrise":1673376924,"sunset":1673428181},"timezone":39600,"id":2147714,"name":"Sydney","cod":200}')
    this.setWeatherData(data);

  }

  getWeatherData(){
    let data =  JSON.parse('{"coord":{"lon":151.2073,"lat":-33.8679},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":296.9,"feels_like":297,"temp_min":296.13,"temp_max":298.84,"pressure":1014,"humidity":64},"visibility":10000,"wind":{"speed":1.79,"deg":61,"gust":4.02},"clouds":{"all":59},"dt":1673404232,"sys":{"type":2,"id":2002865,"country":"AU","sunrise":1673376924,"sunset":1673428181},"timezone":39600,"id":2147714,"name":"Sydney","cod":200}')
    this.setWeatherData(data);
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let country = new Date(this.WeatherData.sys.country);
    let sunsetRise = new Date(this.WeatherData.sys.sunrise * 1000);
    this.WeatherData.sunrise_time = sunsetRise.toLocaleTimeString();
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
