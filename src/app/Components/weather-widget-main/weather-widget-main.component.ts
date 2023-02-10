import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData:any;
  WeatherIcon:any;
  //tempoagora = new Date();
  tempoagora = new Date()//.getTime() / 1000;

  cityName: string = 'Contagem';
  cityIcon: string = '04n';
  constructor() {}

  ngOnInit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';

  }

  onSubmit(){
      this.getWeatherData(this.cityName);
      this.cityName = '';

  }

  private getWeatherData(cityName: string){
    let url = ('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&lang=pt&appid=01661b82dd64746b6ac02bf1fdebd38a')

  fetch(url)
  .then(res => res.json())
  .then(out =>
    this.setWeatherData(out))
  .catch(err => { throw err })
  ;

  }


  setWeatherData(url: any){
    this.WeatherData = url;
    let country =(this.WeatherData.sys.country);
    let icone =(this.WeatherData.weather[0].icon);
    let description =(this.WeatherData.weather[0].description);

    let sunsetRise = new Date(this.WeatherData.sys.sunrise * 1000);

    this.WeatherData.sunrise_time = sunsetRise.toLocaleTimeString();
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();

    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime() && currentDate.getTime() > sunsetRise.getTime());

    console.log('sunset: '+sunsetTime.getTime())
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

    let timezone = (this.WeatherData.timezone);
    this.WeatherData.currentDate ;

    return(currentDate);
    
  }


  private getWeatherIcon(cityIcon: string){
    let url = ('http://openweathermap.org/img/wn/'+cityIcon+'@2x.png')

  fetch(url)
  .then(res => res.json())
  .then(out =>
    this.setWeatherIcon(out))
  .catch(err => { throw err })
  ;

  }

  setWeatherIcon(icone: any){
    this.WeatherIcon = icone;
    console.log(icone)
  }
}
