import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/ThisDay.css";
import "./styles/ThisDayInfo.css";
import "./styles/Buttons.css";
import "./styles/Week.css";
import "./styles/Adaptation.css";

import { WeekPredict } from "../Week predict/Week";
import { During } from "../During The Day/during";

import logo from "../../assets/img/Header logo.svg";
import themeCange from "../../assets/img/ThemeChange.svg";
import sun from "../../assets/img/SunThD.svg";
import rain from "../../assets/img/rainIco.svg";
import smallRain from "../../assets/img/smallRainIco.svg";
import storm from "../../assets/img/StormIco.svg";
import cloudy from "../../assets/img/cloudyIco.svg";
import tempIco from "../../assets/img/tempThisDayInfo.svg";
import pressure from "../../assets/img/pressureThDI.svg";
import fallout from "../../assets/img/falloutThDI.svg";
import wind from "../../assets/img/windThDI.svg";
import moon from "../../assets/img/moon.svg";

export const Weather = () => {
  const [info, setInfo] = useState([]);
  const [time, setTime] = useState(new Date());
  const [weatherState, setWeatherState] = useState("");
  const [sel, setSel] = useState();

  // --------------------------------------------------

  const [one, setOne] = useState(new Date());
  const [two, setTwo] = useState(new Date());
  const [three, setThree] = useState(new Date());
  const [four, setFour] = useState(new Date());
  const [five, setFive] = useState(new Date());
  const [six, setSix] = useState(new Date());
  const [seven, setSeven] = useState(new Date());

  // --------------------------------------------------

  const [current0, setCurrent0] = useState([]);
  const [current1, setCurrent1] = useState([]);
  const [current2, setCurrent2] = useState([]);
  const [current3, setCurrent3] = useState([]);
  const [current4, setCurrent4] = useState([]);
  const [current5, setCurrent5] = useState([]);

  // --------------------------------------------------

  const [currentParams0, setCurrentParams0] = useState([]);
  const [currentParams1, setCurrentParams1] = useState([]);
  const [currentParams2, setCurrentParams2] = useState([]);
  const [currentParams3, setCurrentParams3] = useState([]);
  const [currentParams4, setCurrentParams4] = useState([]);
  const [currentParams5, setCurrentParams5] = useState([]);

  // --------------------------------------------------

  const [popDs, setPopDs] = useState([]);
  const [popDs1, setPopDs1] = useState([]);
  const [popDs2, setPopDs2] = useState([]);
  const [popDs3, setPopDs3] = useState([]);
  const [popDs4, setPopDs4] = useState([]);
  const [popDs5, setPopDs5] = useState([]);

  // --------------------------------------------------

  const [modalActive, setModalActive] = useState(false);
  const [modalActiveWeek, setModalActiveWeek] = useState(false);

  //----------------------------------------------------------

  const [sliced, setSliced] = useState();
  const [sliced1, setSliced1] = useState();
  const [sliced2, setSliced2] = useState();
  const [sliced3, setSliced3] = useState();
  const [sliced4, setSliced4] = useState();
  const [sliced5, setSliced5] = useState();

  //-----------------------------------------------------------

  const [theme, setTheme] = useState(false);

  //------------------------------------------------------------

  // Theme changing

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const root = document.querySelector(":root");

    const components = [
      "body-background",
      "components-background",
      "selector-background",
      "card-background",
      "text-color",
    ];

    components.forEach((component) => {
      root.style.setProperty(
        `--${component}-default`,
        `var(--${component}-${theme})`
      );
    });
    console.log(theme);
  }, [theme]);

  // Time

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let hours = time.getHours();
  let minutes = time.getMinutes();

  if (hours <= 9) hours = "0" + hours;
  if (minutes <= 9) minutes = "0" + minutes;

  const timeString = `${hours}:${minutes}`;

  //-------------------------------------------------

  let sunMoon;
  if (hours >= 6 && hours < 18) {
    sunMoon = sun;
  } else {
    sunMoon = moon;
  }

  // Temperature

  const src = `https://api.openweathermap.org/data/2.5/weather?q=${
    sel || "Karakol"
  }&appid=1135bd8bf0ee181fcc1891091063d278`;

  useEffect(() => {
    axios.get(src).then((data) => {
      setInfo(data.data);
      setWeatherState(data.data.weather[0].main);
    });
  }, [src]);

  //------------------------771201332-----------------------------------------------

  // during the day

  const duringTD = `https://api.openweathermap.org/data/2.5/forecast?q=${
    sel || "Karakol"
  }&appid=1135bd8bf0ee181fcc1891091063d278`;

  useEffect(() => {
    axios.get(duringTD).then((data) => {
      setCurrent0(data.data.list[1]);
      setCurrent1(data.data.list[2]);
      setCurrent2(data.data.list[3]);
      setCurrent3(data.data.list[4]);
      setCurrent4(data.data.list[5]);
      setCurrent5(data.data.list[6]);

      // --------------------------------------------------

      setCurrentParams0(data.data.list[1].weather[0].main);
      setCurrentParams1(data.data.list[2].weather[0].main);
      setCurrentParams2(data.data.list[3].weather[0].main);
      setCurrentParams3(data.data.list[4].weather[0].main);
      setCurrentParams4(data.data.list[5].weather[0].main);
      setCurrentParams5(data.data.list[6].weather[0].main);

      // --------------------------------------------------

      setPopDs(current0?.weather[0]?.main);
      setPopDs1(current1?.weather[0]?.main);
      setPopDs2(current2?.weather[0]?.main);
      setPopDs3(current3?.weather[0]?.main);
      setPopDs4(current4?.weather[0]?.main);
      setPopDs5(current5?.weather[0]?.main);

      //---------------------------------------------------------

      setSliced(current0?.dt_txt.slice(10, -3));
      setSliced1(current1?.dt_txt.slice(10, -3));
      setSliced2(current2?.dt_txt.slice(10, -3));
      setSliced3(current3?.dt_txt.slice(10, -3));
      setSliced4(current4?.dt_txt.slice(10, -3));
      setSliced5(current5?.dt_txt.slice(10, -3));
    });
  });

  //-------------------------------------------------------------------

  // During the day weather state conditions

  let wsDT;
  if (currentParams0 === "Rain") {
    wsDT = rain;
  } else if (currentParams0 === "Clouds") {
    wsDT = cloudy;
  } else if (currentParams0 === "Drizzle") {
    wsDT = smallRain;
  } else if (currentParams0 === "Thunderstorm") {
    wsDT = storm;
  } else if (currentParams0 === "Clear") {
    wsDT = sunMoon;
  } else {
    wsDT = rain;
  }

  let wsDT1;
  if (currentParams1 === "Rain") {
    wsDT1 = rain;
  } else if (currentParams1 === "Clouds") {
    wsDT1 = cloudy;
  } else if (currentParams1 === "Drizzle") {
    wsDT1 = smallRain;
  } else if (currentParams1 === "Thunderstorm") {
    wsDT1 = storm;
  } else if (currentParams1 === "Clear") {
    wsDT1 = sunMoon;
  } else {
    wsDT1 = rain;
  }

  let wsDT2;
  if (currentParams2 === "Rain") {
    wsDT2 = rain;
  } else if (currentParams2 === "Clouds") {
    wsDT2 = cloudy;
  } else if (currentParams2 === "Drizzle") {
    wsDT2 = smallRain;
  } else if (currentParams2 === "Thunderstorm") {
    wsDT2 = storm;
  } else if (currentParams2 === "Clear") {
    wsDT2 = sunMoon;
  } else {
    wsDT2 = rain;
  }

  let wsDT3;
  if (currentParams3 === "Rain") {
    wsDT3 = rain;
  } else if (currentParams3 === "Clouds") {
    wsDT3 = cloudy;
  } else if (currentParams1 === "Drizzle") {
    wsDT3 = smallRain;
  } else if (currentParams3 === "Thunderstorm") {
    wsDT3 = storm;
  } else if (currentParams3 === "Clear") {
    wsDT3 = sunMoon;
  } else {
    wsDT3 = rain;
  }

  let wsDT4;
  if (currentParams4 === "Rain") {
    wsDT4 = rain;
  } else if (currentParams4 === "Clouds") {
    wsDT4 = cloudy;
  } else if (currentParams4 === "Drizzle") {
    wsDT4 = smallRain;
  } else if (currentParams4 === "Thunderstorm") {
    wsDT4 = storm;
  } else if (currentParams4 === "Clear") {
    wsDT4 = sunMoon;
  } else {
    wsDT4 = rain;
  }

  let wsDT5;
  if (currentParams5 === "Rain") {
    wsDT5 = rain;
  } else if (currentParams5 === "Clouds") {
    wsDT5 = cloudy;
  } else if (currentParams5 === "Drizzle") {
    wsDT5 = smallRain;
  } else if (currentParams5 === "Thunderstorm") {
    wsDT5 = storm;
  } else if (currentParams5 === "Clear") {
    wsDT5 = sunMoon;
  } else {
    wsDT5 = rain;
  }

  //-----------------------------------------------------------------

  const duringTheDay = [
    {
      id: 0,
      time: sliced,
      img: wsDT,
      tempDegree: "+" + Math.round(current0?.main?.temp - 273.15) + "°",
      des: popDs,
    },
    {
      id: 1,
      time: sliced1,
      img: wsDT1,
      tempDegree: "+" + Math.round(current1?.main?.temp - 273.15) + "°",
      des: popDs1,
    },
    {
      id: 2,
      time: sliced2,
      img: wsDT2,
      tempDegree: "+" + Math.round(current2?.main?.temp - 273.15) + "°",
      des: popDs2,
    },
    {
      id: 3,
      time: sliced3,
      img: wsDT3,
      tempDegree: "+" + Math.round(current3?.main?.temp - 273.15) + "°",
      des: popDs3,
    },
    {
      id: 4,
      time: sliced4,
      img: wsDT4,
      tempDegree: "+" + Math.round(current4?.main?.temp - 273.15) + "°",
      des: popDs4,
    },
    {
      id: 5,
      time: sliced5,
      img: wsDT5,
      tempDegree: "+" + Math.round(current5?.main?.temp - 273.15) + "°",
      des: popDs5,
    },
  ];

  // weather state
  let ws;
  if (weatherState === "Rain") {
    ws = rain;
  } else if (weatherState === "Clouds") {
    ws = cloudy;
  } else if (weatherState === "Drizzle") {
    ws = smallRain;
  } else if (weatherState === "Thunderstorm") {
    ws = storm;
  } else if (weatherState === "Clear") {
    ws = sunMoon;
  } else {
    ws = rain;
  }

  // weather state description
  let ds;
  if (weatherState === "Rain") {
    ds = "Дождь";
  } else if (weatherState === "Clouds") {
    ds = "Облачно";
  } else if (weatherState === "Drizzle") {
    ds = "Небольшой дождь";
  } else if (weatherState === "Thunderstorm") {
    ds = "Гроза";
  } else if (weatherState === "Clear") {
    ds = "Ясно";
  } else {
    ds = ".";
  }

  //--------------------------------------------------------------------------

  const ThisDayInfoData = [
    {
      img: tempIco,
      des: "Температура",
      inform:
        Math.round(info?.main?.temp - 273.15) +
        "° - ощущается как " +
        Math.round(info?.main?.feels_like - 273.15) +
        "°",
    },
    {
      img: pressure,
      des: "Давление ",
      inform: info?.main?.pressure + " мм ртутного столба",
    },
    {
      img: fallout,
      des: "Влажность",
      inform: info?.main?.humidity + "%",
    },
    {
      img: wind,
      des: "Ветер",
      inform: Math.round(info?.wind?.speed) + " м/с",
    },
  ];

  //----------------------------------------------------------------------------

  // WeekPredict

  // Week dates

  useEffect(() => {
    setOne(new Date());
  }, []);

  let month = one.getMonth() + 1;

  //1
  let date1 = one.getDate();

  //2
  useEffect(() => {
    setTwo(new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)));
  }, []);

  let date2 = two.getDate();

  //3
  useEffect(() => {
    setThree(new Date(new Date(new Date().getTime() + 48 * 60 * 60 * 1000)));
  }, []);

  let date3 = three.getDate();

  //4
  useEffect(() => {
    setFour(new Date(new Date(new Date().getTime() + 72 * 60 * 60 * 1000)));
  }, []);

  let date4 = four.getDate();

  //5
  useEffect(() => {
    setFive(new Date(new Date(new Date().getTime() + 96 * 60 * 60 * 1000)));
  }, []);

  let date5 = five.getDate();

  //6
  useEffect(() => {
    setSix(new Date(new Date(new Date().getTime() + 120 * 60 * 60 * 1000)));
  }, []);

  let date6 = six.getDate();

  //7
  useEffect(() => {
    setSeven(new Date(new Date(new Date().getTime() + 144 * 60 * 60 * 1000)));
  }, []);

  let date7 = seven.getDate();

  // Week part months dates

  if (month <= 9) month = "0" + month;
  if (date1 <= 9) date1 = "0" + date1;
  if (date2 <= 9) date2 = "0" + date2;
  if (date3 <= 9) date3 = "0" + date3;
  if (date4 <= 9) date4 = "0" + date4;
  if (date5 <= 9) date5 = "0" + date5;
  if (date6 <= 9) date6 = "0" + date6;
  if (date7 <= 9) date7 = "0" + date7;

  const monthDate1 = `${date1}:${month}`;
  const monthDate2 = `${date2}:${month}`;
  const monthDate3 = `${date3}:${month}`;
  const monthDate4 = `${date4}:${month}`;
  const monthDate5 = `${date5}:${month}`;
  const monthDate6 = `${date6}:${month}`;
  const monthDate7 = `${date7}:${month}`;

  //---------------------------------------------------------

  // Week days's names

  let options = { weekday: "short" };

  //3
  let weekName3 = new Date(
    new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
  );
  let dayOfWeek3 = weekName3.toLocaleString("RU", options);

  //4
  let weekName4 = new Date(
    new Date(new Date().getTime() + 72 * 60 * 60 * 1000)
  );
  let dayOfWeek4 = weekName4.toLocaleString("RU", options);

  //5
  let weekName5 = new Date(
    new Date(new Date().getTime() + 96 * 60 * 60 * 1000)
  );
  let dayOfWeek5 = weekName5.toLocaleString("RU", options);

  //6
  let weekName6 = new Date(
    new Date(new Date().getTime() + 120 * 60 * 60 * 1000)
  );
  let dayOfWeek6 = weekName6.toLocaleString("RU", options);

  //7
  let weekName7 = new Date(
    new Date(new Date().getTime() + 144 * 60 * 60 * 1000)
  );
  let dayOfWeek7 = weekName7.toLocaleString("RU", options);

  // data
  const WeekData = [
    {
      id: 1,
      day: "Сегодня",
      date: monthDate1,
      img: ws,
      tempDay: "+" + Math.round(info?.main?.temp - 273.15) + "°",
      tempNight: "+" + Math.round(info?.main?.temp - 273.15) + "°",
      weatherDes: ds,
    },
    {
      id: 2,
      day: "Завтра",
      date: monthDate2,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
    {
      id: 3,
      day: dayOfWeek3,
      date: monthDate3,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
    {
      id: 4,
      day: dayOfWeek4,
      date: monthDate4,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
    {
      id: 5,
      day: dayOfWeek5,
      date: monthDate5,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
    {
      id: 6,
      day: dayOfWeek6,
      date: monthDate6,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
    {
      id: 7,
      day: dayOfWeek7,
      date: monthDate7,
      img: cloudy,
      tempDay: "+" + 0 + "°",
      tempNight: "+" + 0 + "°",
      weatherDes: "Облачно",
    },
  ];

  //----------------------------------------------------------------------------------

  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="main">
      <div className="container">
        <header className="header">
          <div className="logoPart">
            <img src={logo} alt="logo" />
            <p>WEATHER</p>
          </div>
          <div className="ThemeChangerPart">
            <img
              src={themeCange}
              onClick={toggleTheme}
              alt=""
              className="toggleTheme"
            />
            <select
              onChange={(e) => setSel(e.target.value)}
              className="selectCity"
            >
              <option value="Karakol">Karakol</option>
              <option value="Bishkek">Bishkek</option>
            </select>
          </div>
        </header>
      </div>
      {/* ---------------------------------------------------------------------------- */}
      <div className="container">
        <section className="TopPart">
          <div className="mainThD">
            <div className="topPart">
              <div className="topLeftPart">
                <p className="dayTemp">
                  {Math.round(info?.main?.temp - 273.15)}
                  <span>°</span>
                </p>
                <span className="today">Сегодня</span>
              </div>
              <img src={ws} alt="" className="weatherStateIco" />
            </div>
            <div className="bottomPart">
              <p className="time">
                Время: <span>{timeString}</span>
              </p>
              <p className="city">
                Город: <span>{info?.name}</span>
              </p>
            </div>
          </div>
          {/* ----------------------------------------------------------------- */}
          <div className="ThisDayInfoWrapper">
            <div className="mainThDI">
              {ThisDayInfoData.map((el, id) => {
                return (
                  <div el={el} key={id} className="items">
                    <div className="iconRound">
                      <img src={el.img} alt="" className="iconThDI" />
                    </div>
                    <span className="iconDes">{el.des}</span>
                    <p className="infoThDI">{el.inform}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      {/* -------------------------------------------------------------------- */}

      <div className="container">
        <div className="buttons">
          <div className="popUopButtons">
            <button className="forWeek" onClick={() => setModalActive(true)}>
              Подробнее
            </button>
            <button
              className="forMonth"
              onClick={() => setModalActiveWeek(true)}
            >
              На неделю
            </button>
          </div>
          <button className="canc" onClick={() => setModalActiveWeek(false)}>
            Отменить
          </button>
        </div>
      </div>
      {/* --------------------------------------------------------------------- */}
      <WeekPredict active={modalActiveWeek} setActive={setModalActiveWeek}>
        <div className="container">
          <div className="weekCards">
            {WeekData.map((el, id) => {
              return (
                <div el={el} key={id} className="weekCard">
                  <p className="dayW">{el.day}</p>
                  <span className="dateW">{el.date}</span>
                  <img src={el.img} alt="" className="imgW" />
                  <p className="tempDayW">{el.tempDay}</p>
                  <span className="tempNightW">{el.tempNight}</span>
                  <span className="weatherDesW">{el.weatherDes}</span>
                </div>
              );
            })}
          </div>
        </div>
      </WeekPredict>
      {/* ----------------------------------------------------------------------------- */}
      <During active={modalActive} setActive={setModalActive}>
        {/* <div className="container"> */}
        <div className="popUp">
          {duringTheDay.map((el, id) => {
            return (
              <div key={id} el={el} className="border">
                <span className="popUpTime">{el.time}</span>
                <img src={el.img} alt="" />
                <p>{el.tempDegree}</p>
                <span className="popUpDes">{el.des}</span>
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </During>
    </div>
  );
};
