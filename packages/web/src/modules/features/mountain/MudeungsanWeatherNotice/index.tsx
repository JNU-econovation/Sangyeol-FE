import SunIcon from "@shared/components/primitives/ui/icons/SunIcon";
import SunriseIcon from "@shared/components/primitives/ui/icons/SunriseIcon";
import SunsetIcon from "@shared/components/primitives/ui/icons/SunsetIcon";

const MudeungsanWeatherNotice = () => {
  const weatherData = {
    temperature: 22.1,
    feelsLike: 25.4,
    precipitationProbability: 20,
    precipitationAmount: null,
    humidity: 100,
    sunrise: "05:30",
    sunset: "19:46",
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-gray-600 bg-main-white p-4 shadow-md">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <SunIcon size={16} className="text-primary" />
          <h3 className="text-base font-semibold text-black-900">
            무등산 날씨
          </h3>
        </div>
        <p className="text-xs font-normal text-gray-900">기상청 · 실시간</p>
      </div>

      <div className="flex items-end gap-3">
        <p className="text-3xl/normal font-bold tracking-tight text-black-900">
          {weatherData.temperature}℃
        </p>
        <span className="pb-1 text-sm font-medium text-gray-900">
          체감 ({weatherData.feelsLike}℃)
        </span>
      </div>

      <div className="flex w-full items-center rounded-xl bg-gray-300 p-3">
        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">강수확률</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData.precipitationProbability}%
          </p>
        </div>

        <div className="h-7 w-px shrink-0 bg-gray-600" />

        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">강수량(mm)</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData.precipitationAmount ?? "-"}
          </p>
        </div>

        <div className="h-7 w-px shrink-0 bg-gray-600" />

        <div className="flex flex-1 flex-col items-center gap-1">
          <p className="text-xs font-normal text-gray-900">습도</p>
          <p className="text-base font-semibold text-black-900">
            {weatherData.humidity}%
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <SunriseIcon size={14} className="text-gray-900" />
          <span className="text-xs font-medium text-black-800">
            일출 {weatherData.sunrise}
          </span>
        </div>
        <p className="text-xs font-medium text-gray-900">·</p>
        <div className="flex items-center gap-1">
          <SunsetIcon size={14} className="text-gray-900" />
          <span className="text-xs font-medium text-black-800">
            일몰 {weatherData.sunset}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MudeungsanWeatherNotice;
