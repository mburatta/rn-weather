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
import {act, screen, within} from '@testing-library/react-native';
import WeatherScreen from "./WeatherScreen";
import axios from 'axios';
import {InteractionManager} from 'react-native';

beforeAll(() => {
    // rAF -> setTimeout(0)
    // @ts-ignore
    global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);
    // Esegui subito i callback di InteractionManager (se usato)
    jest.spyOn(InteractionManager, 'runAfterInteractions').mockImplementation((cb: any) => {
        if (typeof cb === 'function') cb();
        return { then: (fn: any) => fn && fn(), cancel: () => {} } as any;
    });
});

describe('WeatherScreen', () => {

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);
        jest.useFakeTimers();
    });

    afterEach(() => {
        mock.restore();
        //jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.clearAllMocks();

    });

    async function flushAll() {
        await act(async () => {
            jest.runAllTimers();       // timers (incluso rAF polyfill)
            await Promise.resolve();   // microtask queue (promesse)
        });
    }


    test('Weather Forecast! text is visible', async () => {

        const mockSuccessResponse = {
            current: {
                humidity: 81,
                temp: 29.8,
                weather: [{main: 'Clouds', description: 'few clouds', icon: '02d'}],
            },
            daily: [
                {
                    dt: 1618317040,
                    humidity: 70,
                    temp: {min: 29.5, max: 30.3},
                    weather: [{main: 'Rain', description: 'light rain', icon: '10d'}],
                },
            ],
        } as any;

        // Intercetta qualsiasi GET che contenga "/onecall" nel path (query inclusa)
        mock.onGet(/onecall/).reply(200, mockSuccessResponse);

        const expected = 'Weather Forecast!';
        renderWithKitten(<WeatherScreen />);
        await flushAll();

        const weathers = await screen.findByRole('adjustable');
        expect(weathers).toBeOnTheScreen();
        expect(weathers).toHaveProp('accessibilityLabel', 'Weather for the next few days');

        const forecast = await screen.findByLabelText('Weather forecast for 13/04/2021');
        expect(forecast).toBeOnTheScreen();

        expect(within(forecast).getByText('few clouds')).toBeTruthy();
        expect(within(forecast).getByText('29°C - 30°C')).toBeTruthy();
        expect(within(forecast).getByText('Humidity:')).toBeTruthy();
        expect(within(forecast).getByText('81%')).toBeTruthy();
        expect(within(forecast).getByText('29°C')).toBeTruthy();
        expect(within(forecast).getByText('13/04/2021, Tuesday (Today)')).toBeTruthy();
    });
})
