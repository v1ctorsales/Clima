import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  WeatherData:any;
  WeatherIcon:any;
  //tempoagora = new Date();

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
  .catch(err => { this.setDataErro() })
  ;

  }


  setWeatherData(url: any){

    let tempoagora = new Date().getTime() + 10800000;
    
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

    //console.log('sunset: '+sunsetTime.getTime())
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

    let timezone = (this.WeatherData.timezone);
    this.WeatherData.currentDate ;

    
    let cityIcon = this.WeatherData.weather[0].icon;
    this.WeatherData.urlicon = ('http://openweathermap.org/img/wn/'+cityIcon+'@2x.png')

    //console.log(this.tempoagora)
    //console.log(this.WeatherData.timezone)

    this.tempoagora = this.tempoagora

    let newtime = this.tempoagora + (this.WeatherData.timezone * 1000)
    
    this.WeatherData.temponovo = newtime;

    console.log(this.WeatherData.temponovo)
    console.log(this.tempoagora)

    let oldcity = this.WeatherData

    return(this.WeatherData.timezone, this.WeatherData);
    
    

  }

  setDataErro(){
    alert("Local não encontrado.");
  }

  tempoagora = new Date().getTime() + 10800000; //pra transormar em horario do fuso 0


  private getWeatherIcon(cityIcon: string){
    let url = ('http://openweathermap.org/img/wn/'+cityIcon+'@2x.png')

  fetch(url)
  .then(res => res.json())
  .then(out =>
    this.setWeatherIcon(out))
  .catch(err => { console.log("deubigode") })
  ;

  }

  setWeatherIcon(icone: any){
    this.WeatherIcon = icone;
    console.log(icone)
  }
}
