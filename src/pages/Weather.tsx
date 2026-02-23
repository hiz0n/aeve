import { useEffect, useState } from "react";
import axios from "axios";
import type { WeatherAPI, WeatherData } from "../types/weather";
import styles from "./Weather.module.scss";

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");

  const API_KEY = "de1229dc400c2a14e64670377d3d2e8b";
  const KAKAO_KEY = "2ae531c2d8d04bc05f8769f9dcba6a5a";

  // 날짜 시간 구하기
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatTime = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(formatTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // 날씨 + 미세먼지 + 카카오맵
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // 현재 날씨
          const { data } = await axios.get<WeatherAPI>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
          );

          const reData: WeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          };

          // 미세먼지(PM2.5)
          try {
            const airRes = await axios.get(
              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            reData.pm2_5 = airRes.data.list[0].components.pm2_5;
          } catch {
            console.warn("미세먼지 정보를 불러오지 못했습니다.");
          }

          setWeather(reData);

          // 카카오맵
          const script = document.createElement("script");
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services`;
          script.onload = () => {
            window.kakao.maps.load(() => {
              const mapContainer = document.getElementById("map") as HTMLElement;
              const mapOption = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3,
              };
              const map = new window.kakao.maps.Map(mapContainer, mapOption);

              new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(latitude, longitude),
                map,
              });
            });
          };
          document.body.appendChild(script);
        } catch {
          setError("날씨 정보를 가져올 수 없습니다");
        }
      },
      (err) => {
        console.error(err);
        setError("위치 정보를 가져올 수 없습니다.");
      }
    );
  }, []);

  if (error) return <p>{error}</p>;
  if (!weather) return null;

  let recommendation = "";
  if (weather.pm2_5 !== undefined) {
    if (weather.pm2_5 <= 15) recommendation = "가벼운 보습 정도면 충분해요.";
    else if (weather.pm2_5 <= 35) recommendation = "수분 크림 + 약산성 세안 추천!";
    else if (weather.pm2_5 <= 75) recommendation = "항산화 세럼 추천, 피부 보호가 필요해요.";
    else recommendation = "미세먼지 매우 많음, 외출 자제 및 선크림은 필수예요.";
  }

  return (
    <div className={styles.weather}>
      <div className={styles.info}>
        <h2>" Nature gives to every time and season some beauties of its own. "</h2>

        <div className={styles.designBox}>
          <div className={styles.timeWeatherBox}>
            <p className={styles.time}>{time}</p>

            <div className={styles.datas}>
              <p className={styles.city}>{weather.city}</p>
              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              />
              <p className={styles.temp}>{Math.round(weather.temp)}℃</p>
              <p className={styles.desc}>{weather.desc}</p>

              {/* ✅ 미세먼지 출력 */}
              <p className={styles.pmTitle}>오늘의 미세먼지 지수</p>
              {weather.pm2_5 !== undefined && <p className={styles.pm2_5}>{weather.pm2_5} μg/m³</p>}

              {/* ✅ 추천 문구 표시 */}
              {recommendation && <p className={styles.recommend}>{recommendation}</p>}
            </div>
          </div>

          {/* 카카오맵 표시 */}
          <div id="map" className={styles.map}></div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
