/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from 'components/loading/Loading';
import { BsCheckCircleFill } from 'react-icons/bs';
import Button from 'components/button/Button';

import './weather.scss';

interface ResTypes {
  base: string;
  clouds: { all: string };
  code: number;
  coord: { lon: number; lat: number };
  id: number;
  dt: number;
  dt_txt: string;
  name: string;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  sys: { pod: string; country: string };
  weather: Weather[];
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: 'https://api.openweathermap.org/data/2.5/',
};

const locationData = ['Seoul', 'Incheon', 'Ulsan', 'Gyeongju', 'Busan', 'Jeju'];

const Weather = () => {
  const [weather, setWeather] = useState<ResTypes>({
    base: '',
    clouds: { all: '' },
    code: 0,
    coord: { lon: 0, lat: 0 },
    id: 0,
    dt: 0,
    dt_txt: '',
    name: '',
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    main: {
      feels_like: 0,
      grnd_level: 0,
      humidity: 0,
      pressure: 0,
      sea_level: 0,
      temp: 0,
      temp_kf: 0,
      temp_max: 0,
      temp_min: 0,
    },
    sys: { pod: '', country: '' },
    weather: [{ description: '', icon: '', id: 0, main: '' }],
  });
  const [preweather, setPreWeather] = useState<Weather[]>([]);

  //당일 날씨 받아오기
  const weatherFetch = async (location: string) => {
    const { data } = await axios.get(
      `${api.base}weather?q=${location}&units=metric&appid=${api.key}`,
    );
    setWeather(data);
    weatherPreFetch(location);
  };
  useEffect(() => {
    weatherFetch(locationData[0]);
  }, []);

  //예보5일 날씨 받아오기
  const weatherPreFetch = async (location: string) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api.key}`,
    );
    const res = data.list.filter((it: ResTypes) =>
      new RegExp('06:00:00', 'i').test(it.dt_txt),
    );
    const prediction: Weather[] = [];
    res.forEach((item: ResTypes) => {
      prediction.push(...item.weather);
    });
    setPreWeather(prediction);
  };
  //오늘 날짜 반환
  const dateBuilder = (d: Date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // 당일 날씨에 따라 배경이미지 변경
  const background = (w: string) => {
    switch (w) {
      case 'Clear':
        const clear = require('../../assets/images/weather/clear.webp');
        return clear;
      case 'Clouds':
        const clounds = require('../../assets/images/weather/cloud.webp');
        return clounds;
      case 'Rain':
        const rain = require('../../assets/images/weather/rain.webp');
        return rain;
      default:
        return 'Not data';
    }
  };
  return (
    <div className="weather container section mb-2">
      <div className="admin__title mb-1">
        <BsCheckCircleFill />
        <p>Check the weather and change the display!</p>
      </div>
      {Object.keys(weather).length !== 0 ? (
        <div
          className="weather__container"
          style={{
            backgroundImage: `url(${background(weather.weather[0].main)})`,
          }}
        >
          <div className="weather__container__right">
            <div className="weather__container__right__date">
              {dateBuilder(new Date())}
            </div>
            <div className="weather__container__right__state">
              <div className="weather__container__state__temp">
                {Object.keys(weather).length === 0 ? '' : weather.main.temp} °c
              </div>
              <div className="weather__container__state__cloud">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
          <div className="weather__container__left">
            <div className="weather__container__left__areas mb-1">
              {locationData.map((item, index) => (
                <Button
                  className="small"
                  key={index}
                  onClick={() => {
                    weatherFetch(item);
                    weatherPreFetch(item);
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div className="weather__container__left__area mb-1">
              {weather.name}. {weather.sys.country}
            </div>
            <div className="weather__container__left__pre ">
              {Object.keys(preweather).length === 0
                ? ''
                : preweather.map((item, index) => (
                    <div
                      key={index}
                      className="weather__container__left__pre__day "
                    >
                      <span>
                        {new Date(
                          new Date().setDate(
                            new Date().getDate() + (index + 1),
                          ),
                        ).getDate()}
                      </span>
                      <span key={index}>{item.main}</span>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                        alt=""
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Weather;
