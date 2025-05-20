import { axios, AxiosError } from '@br/weather/core/services';
import {config, UnitType} from '@br/weather/core/config';
import {
    GetDailyWeatherForecastJsonResult,
    GetDailyWeatherForecastParams,
    WeatherData,
} from '@br/weather/weather/interfaces';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org/data/3.0',
    timeout: 10_000,          // 10 s di timeout (opzionale)
});

export const getDailyWeatherForecast = async (
    params: GetDailyWeatherForecastParams,
): Promise<WeatherData[]> => {
    const { long, lat, unit = 'celsius', lang = 'vi' } = params;

    try {
        const { data } = await http.get<GetDailyWeatherForecastJsonResult>('/onecall', {
            params: {
                lat,
                lon: long,
                units: unit,
                lang,
                appid: config.weather.apiKey,
            },
        });

        if ((data as any).cod) {
            throw new Error((data as any).message);
        }

        const result: WeatherData[] = data.daily.map((w) => ({
            date: w.dt,
            status: w.weather[0].main,
            description: w.weather[0].description,
            humidity: w.humidity,
            temperature: {
                min: Math.floor(w.temp.min),
                max: Math.floor(w.temp.max),
                current: 0,
                unit: unit as UnitType,
            },
            icon: w.weather[0].icon,
        }));

        // aggiorna condizioni correnti
        if (result.length > 0) {
            result[0].humidity = data.current.humidity;
            result[0].temperature.current = Math.floor(data.current.temp);
            result[0].status = data.current.weather[0].main;
            result[0].description = data.current.weather[0].description;
            result[0].icon = data.current.weather[0].icon;
        }

        return result;
    } catch (error) {
        /**
         * `axios.isAxiosError` ti permette di capire se l'errore viene davvero da Axios;
         * puoi accedere a `error.response`, `error.request`, ecc.
         */
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<{ cod: string | number; message: string }>;
            if (err.response?.data?.message) {
                throw new Error(err.response.data.message);
            }
        }
        // Rilancia gli altri errori (timeout, rete, parsing, ecc.)
        throw error;
    }
};

export const weatherService = { getDailyWeatherForecast };
