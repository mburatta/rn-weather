/**
 * 1️⃣  Mock di axios **prima** di importare il service
 *     ▸ usiamo il modulo reale di axios, ma facciamo sì che
 *       `axios.create()` restituisca *la stessa* istanza di default.
 *     ▸ così l'oggetto `http` creato dentro weatherService punta proprio
 *       all'istanza che stiamo per intercettare con axios‑mock‑adapter.
 */
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios', () => {
    const realAxios = jest.requireActual('axios');
    // stub di create che ritorna l'istanza di default
    realAxios.create = jest.fn(() => realAxios);
    return {__esModule: true, default: realAxios};
});

import React from 'react';
import {screen, within} from '@testing-library/react-native';
import WeatherScreen from "./WeatherScreen";
import axios from 'axios';

describe('WeatherScreen', () => {

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    test('Weather Forecast! text is visible', async () => {

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

        const expected = 'Weather Forecast!';
        renderWithKitten(<WeatherScreen />);

        const weathers = await screen.findByRole('scrollbar');
        expect(weathers).toBeOnTheScreen();
        expect(weathers).toHaveProp('accessibilityLabel', 'Weather for the next few days');

        const forecast = await screen.findByLabelText('Weather forecast for 13/04/2021');
        expect(forecast).toBeOnTheScreen();

        expect(within(forecast).getByText('few clouds')).toBeTruthy();
        expect(within(forecast).getByText('295°C - 303°C')).toBeTruthy();
        expect(within(forecast).getByText('Humidity:')).toBeTruthy();
        expect(within(forecast).getByText('81%')).toBeTruthy();
        expect(within(forecast).getByText('298°C')).toBeTruthy();
        expect(within(forecast).getByText('13/04/2021, Tuesday (Today)')).toBeTruthy();
    });
})
