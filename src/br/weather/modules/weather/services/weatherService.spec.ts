import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {weatherService} from './weatherService';
import {GetDailyWeatherForecastParams} from '@br/weather/weather/interfaces';

/**
 * 1️⃣  Mock di axios **prima** di importare il service
 *     ▸ usiamo il modulo reale di axios, ma facciamo sì che
 *       `axios.create()` restituisca *la stessa* istanza di default.
 *     ▸ così l'oggetto `http` creato dentro weatherService punta proprio
 *       all'istanza che stiamo per intercettare con axios‑mock‑adapter.
 */
jest.mock('axios', () => {
    const realAxios = jest.requireActual('axios');
    // stub di create che ritorna l'istanza di default
    realAxios.create = jest.fn(() => realAxios);
    return {__esModule: true, default: realAxios};
});

describe('weatherService.getDailyWeatherForecast (axios‑mock‑adapter)', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    it('mappa correttamente la risposta di successo', async () => {
        const mockSuccessResponse = {
            current: {
                humidity: 81,
                temp: 298.55,
                weather: [{main: 'Clouds', description: 'few clouds', icon: '02d'}],
            },
            daily: [
                {
                    dt: 1618317040,
                    humidity: 70,
                    temp: {min: 295.51, max: 303.15},
                    weather: [{main: 'Rain', description: 'light rain', icon: '10d'}],
                },
            ],
        } as any;

        // Intercetta qualsiasi GET che contenga "/onecall" nel path (query inclusa)
        mock.onGet(/onecall/).reply(200, mockSuccessResponse);

        const params: GetDailyWeatherForecastParams = {lat: 10, long: 106, unit: 'metric'} as const;

        const result = await weatherService.getDailyWeatherForecast(params);

        // Verifica che la richiesta sia partita con i giusti query params
        expect(mock.history.get).toHaveLength(1);
        const {url, params: sentParams} = mock.history.get[0];
        expect(url).toBe('/onecall');
        expect(sentParams).toMatchObject({lat: params.lat, lon: params.long});

        // Mapping
        expect(result).toHaveLength(mockSuccessResponse.daily.length);
        expect(result[0]).toEqual({
            date: mockSuccessResponse.daily[0].dt,
            status: mockSuccessResponse.current.weather[0].main,
            description: mockSuccessResponse.current.weather[0].description,
            humidity: mockSuccessResponse.current.humidity,
            temperature: {
                min: Math.floor(mockSuccessResponse.daily[0].temp.min),
                max: Math.floor(mockSuccessResponse.daily[0].temp.max),
                current: Math.floor(mockSuccessResponse.current.temp),
                unit: 'metric',

            },
            icon: mockSuccessResponse.current.weather[0].icon,
        });
    });

    it("propaga correttamente un errore cod/message restituito dall'API", async () => {
        const mockErrorResponse = {cod: 401, message: 'Invalid API key'} as any;
        mock.onGet(/onecall/).reply(200, mockErrorResponse);

        await expect(weatherService.getDailyWeatherForecast({lat: 0, long: 0} as const)).rejects.toThrow(
            'Invalid API key',
        );
    });

    it('rilancia errori di rete (networkError)', async () => {
        mock.onGet(/onecall/).networkError();

        await expect(weatherService.getDailyWeatherForecast({lat: 0, long: 0} as const)).rejects.toThrow();
    });
});
