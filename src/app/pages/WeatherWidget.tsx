import { useState, useCallback } from "react";

const API_KEY = "996c9a10ab6df3ff8fdc55fd685e5c81";
const BASE = "https://api.openweathermap.org";
const ASSET = "/projects/weather-widget";

// --- Types ---
interface CurrentWeather {
  city: string;
  temp: number;
  feelsLike: number;
  condition: string;
  conditionId: number;
  wind: number;
  windDir: string;
  humidity: number;
  sunrise: number;
  sunset: number;
  moonPhase: number;
  dt: number;
  isDay: boolean;
}

interface DayForecast {
  dt: number;
  tempMax: number;
  tempMin: number;
  conditionId: number;
  isDay: boolean;
}

// --- Helpers ---
function degToCompass(deg: number): string {
  const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
}

function formatTime(unix: number, offset: number): string {
  const d = new Date((unix + offset) * 1000);
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m} ${ampm}`;
}

function formatDay(unix: number, offset: number, index: number): string {
  if (index === 0) return "Today";
  const d = new Date((unix + offset) * 1000);
  return d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

function formatDatetime(unix: number, offset: number): string {
  const d = new Date((unix + offset) * 1000);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
  const h = d.getUTCHours();
  const m = d.getUTCMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${weekday}, ${hour}:${m} ${ampm}`;
}

function toF(c: number): number { return Math.round(c * 9 / 5 + 32); }
function toC(c: number): number { return Math.round(c); }

function getMoonPhaseLabel(phase: number): string {
  if (phase === 0 || phase === 1) return "New Moon";
  if (phase < 0.25) return "Waxing Crescent";
  if (phase === 0.25) return "First Quarter";
  if (phase < 0.5) return "Waxing Gibbous";
  if (phase === 0.5) return "Full Moon";
  if (phase < 0.75) return "Waning Gibbous";
  if (phase === 0.75) return "Last Quarter";
  return "Waning Crescent";
}

function getMoonPhaseFile(phase: number): string {
  if (phase === 0 || phase === 1) return "moon-new.svg";
  if (phase < 0.25) return "moon-waxing-crescent.svg";
  if (phase === 0.25) return "moon-first-quarter.svg";
  if (phase < 0.5) return "moon-waxing-gibbous.svg";
  if (phase === 0.5) return "moon-full.svg";
  if (phase < 0.75) return "moon-waning-gibbous.svg";
  if (phase === 0.75) return "moon-last-quarter.svg";
  return "moon-waning-crescent.svg";
}

function getWeatherIcon(conditionId: number, isDay: boolean): string {
  const id = conditionId;
  if (id >= 200 && id < 300) return "weather-thunderstorm.svg";
  if (id >= 300 && id < 600) return "weather-rain.svg";
  if (id >= 600 && id < 700) return "weather-snow.svg";
  if (id >= 700 && id < 800) return "weather-fog.svg";
  if (id === 800) return isDay ? "weather-clear-day.svg" : "weather-clear-night.svg";
  if (id === 801 || id === 802) return isDay ? "weather-partly-cloudy-day.svg" : "weather-partly-cloudy-night.svg";
  if (id === 803 || id === 804) return "weather-cloudy.svg";
  return isDay ? "weather-clear-day.svg" : "weather-clear-night.svg";
}

// --- Embedded Widget ---
function WeatherWidgetEmbed() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tzOffset, setTzOffset] = useState(0);

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(
        `${BASE}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error("City not found. Please try another name.");
      const { lat, lon, name } = geoData[0];

      const weatherRes = await fetch(
        `${BASE}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      const data = await weatherRes.json();
      if (data.cod) throw new Error(data.message || "Weather data unavailable.");

      const offset = data.timezone_offset;
      setTzOffset(offset);
      const now = data.current;
      const isDay = now.dt > now.sunrise && now.dt < now.sunset;

      setCurrent({
        city: name,
        temp: now.temp,
        feelsLike: now.feels_like,
        condition: now.weather[0].description,
        conditionId: now.weather[0].id,
        wind: now.wind_speed,
        windDir: degToCompass(now.wind_deg),
        humidity: now.humidity,
        sunrise: now.sunrise,
        sunset: now.sunset,
        moonPhase: data.daily[0].moon_phase,
        dt: now.dt,
        isDay,
      });

      setForecast(
        data.daily.slice(0, 7).map((d: any) => ({
          dt: d.dt,
          tempMax: d.temp.max,
          tempMin: d.temp.min,
          conditionId: d.weather[0].id,
          isDay: true,
        }))
      );
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = () => fetchWeather(query);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetchWeather(query);
  };
  const displayTemp = (c: number) => unit === "F" ? toF(c) : toC(c);

  return (
    <div
      className="w-full mx-auto rounded-3xl p-5 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1.5px solid rgb(255,255,255,0.15)",
        boxShadow: "0 5px 48px rgba(0,0,0,0.4)",
        borderRadius: "50px",
        width: "62%",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Search row */}
      <div className="flex gap-2 items-center">
        <div
          className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{ background: "rgba(28,35,47,1)" }}
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white/70 font-light placeholder-gray-400 outline-none text-sm"
          />
          <button onClick={handleSearch} className="text-gray-300 hover:text-white transition-colors">
            <img src={`${ASSET}/icon-search.svg`} alt="Search" className="w-4 h-4" />
          </button>
        </div>
        <div
          className="flex rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          {(["C", "F"] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className="px-3 py-2 text-sm font-light transition-all duration-200"
              style={{
                background: unit === u ? "rgba(255,255,255,0.25)" : "transparent",
                color: unit === u ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              °{u}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      {error && !loading && (
        <div className="text-center py-8 text-white/70 text-sm">{error}</div>
      )}
      {!current && !loading && !error && (
        <div className="text-center py-12 text-white/60 font-light text-sm">
          Search for a city to see the weather.
        </div>
      )}
{/* Temperature Box */}
      {current && !loading && (
        <>
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(84,92,100,0.6)",
              border: "1px solid rgba(107, 103, 103, 0.1)",
              borderRadius: "50px"
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src={`${ASSET}/icon-location.svg`} alt="" className="w-4 h-4" />
              <span className="text-white text-xl font-medium">{current.city}</span>
            </div>
           <div className="grid px-4" style={{ gridTemplateColumns: "160px 1fr", maxWidth: "500px", margin: "0 auto" }}>
  {/* Row 1: weather icon and date/temp/condition */}
  <img
    src={`${ASSET}/${getWeatherIcon(current.conditionId, current.isDay)}`}
    alt={current.condition}
    className="w-28 h-28 object-contain"
  />
  <div className="text-left">
    <div className="text-white/70 leading-none text-sm mb-1">{formatDatetime(current.dt, tzOffset)}</div>
    <div className="text-white leading-none" style={{ fontSize: "4rem", fontWeight: 500 }}>
      {displayTemp(current.temp)}°{unit}
    </div>
    <div className="text-white leading-none text-base capitalize font-light mt-1">{current.condition}</div>
  </div>

  {/* Row 2: wind and humidity */}
  <span className="text-white/70 text-sm pt-3">Wind: <span className="text-white font-light">{current.wind} m/s {current.windDir}</span></span>
  <span className="text-white/70 text-sm pt-3">Humidity: <span className="text-white font-light">{current.humidity}%</span></span>
</div>
          </div>
{/* Sun & Moon Info */}
          <div
            className="rounded-full px-5 py-3 flex items-center justify-between"
            style={{ background: "rgba(28,35,47,1)" }}
          >
            <div className="flex items-center gap-2">
              <img src={`${ASSET}/icon-sunrise.svg`} alt="Sunrise" className="w-8 h-8" />
              <span className="text-white/70 font-light text-sm">{formatTime(current.sunrise, tzOffset)}</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={`${ASSET}/icon-sunset.svg`} alt="Sunset" className="w-8 h-8" />
              <span className="text-white/70 font-light text-sm">{formatTime(current.sunset, tzOffset)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/70 font-light text-sm">{getMoonPhaseLabel(current.moonPhase)}</span>
              <img
                src={`${ASSET}/${getMoonPhaseFile(current.moonPhase)}`}
                alt="Moon phase"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
{/* Forecast Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {forecast.map((day, i) => (
              <div
                key={day.dt}
                className="flex flex-col items-center gap-1.5 rounded-full py-3 px-1"
                style={{
                  background: i === 0 ? "rgba(255,255,255,0.18)" : "rgba(84,92,100,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-white text-xs font-light">{formatDay(day.dt, tzOffset, i)}</span>
                <img
                  src={`${ASSET}/${getWeatherIcon(day.conditionId, true)}`}
                  alt=""
                  className="w-7 h-7 object-contain"
                />
                <span className="text-white text-xs font-medium">{displayTemp(day.tempMax)}°</span>
                <span className="text-white/50 text-xs font-light leading-none">{displayTemp(day.tempMin)}°</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// --- Case Study Page ---
export default function WeatherWidget() {
  return (
   <div className="min-h-screen pt-24 px-8">
  <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-16">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">UI Design & Development</p>
          <h1 className="text-5xl dark:text-white mb-8">Weather Widget</h1>
          <div className="flex gap-3 flex-wrap">
            {["Figma", "React", "TypeScript", "Tailwind CSS", "OpenWeather API"].map((tool) => (
              <span
                key={tool}
                className="text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="mb-16">
          <div>
            <h2 className="text-xs tracking-widest uppercase text-gray-400 mb-4">Overview</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Most weather apps present more information than users ever asked for. Forecasts buried under ads, cluttered dashboards, and interfaces that require effort to parse at a glance. This project was an exercise in restraint — designing a weather widget that surfaces only what people actually check, wrapped in a visual language that feels current and considered.
            </p>
          </div>
        </div>

        {/* Design Decisions */}
        <div className="mb-16">
          <div>
            <h2 className="text-xs tracking-widest uppercase text-gray-400 mb-4">Design Decisions</h2>
          </div>
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The glassmorphism aesthetic was a deliberate choice, not just a trend follow. Frosted glass UI has become a foundational pattern in modern operating systems — Apple, Google, and others have adopted it precisely because it creates depth and context without sacrificing legibility. Crucially, it also allows a real photographic background to breathe through the interface, giving the widget a sense of place that flat UI cannot achieve.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Data hierarchy was kept intentional. Current temperature, condition, wind, and humidity cover what most users check daily. Sunrise, sunset, and moon phase add a layer of environmental awareness that elevates the widget beyond a basic forecast tool — details that reward a second glance without demanding it. The 7-day strip with daily highs and lows rounds it out as a complete at-a-glance snapshot.
            </p>
          </div>
        </div>

        {/* Technical */}
        <div className="mb-16">
          <div>
            <h2 className="text-xs tracking-widest uppercase text-gray-400 mb-4">Technical</h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The widget is built in React with TypeScript and Tailwind CSS, pulling live data from the OpenWeather One Call API 3.0. A city search geocodes the input in real time, fetches current conditions and an 8-day forecast in a single API call, and renders everything dynamically — icons, moon phase, wind direction, and local sunrise/sunset times all reflect the searched location. A °C / °F toggle converts all temperatures instantly without an additional API call.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800 mb-16" />

        {/* Live Demo */}
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Live Demo</p>
          <h2 className="text-2xl dark:text-white">Try it yourself</h2>
        </div>

        {/* Widget Canvas — rounded container with bg image */}
        <div
  className="relative overflow-hidden mb-24 flex items-center justify-center"
  style={{ minHeight: "600px", maxWidth: "800px", margin: "0 auto 6rem auto", borderRadius: "60px" }}
>
          <img
            src={`${ASSET}/bg.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 100%" }}
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-center justify-center p-10 min-h-[580px] w-full">
            <WeatherWidgetEmbed />
          </div>
        </div>

        {/* Mobile Prototype — placeholder */}
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">Mobile Design</p>
          <h2 className="text-2xl dark:text-white">Prototype</h2>
        </div>

        <div
          className="w-full rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700"
          style={{ minHeight: "400px" }}
        >
          <p className="text-gray-300 dark:text-gray-600 text-sm tracking-wide">
            Mobile prototype coming soon
          </p>
        </div>

      </div>
    </div>
  );
}