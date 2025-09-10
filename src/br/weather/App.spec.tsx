/**
 * @format
 */

import MockAdapter from "axios-mock-adapter";

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

import React from 'react';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react-native';

jest.mock('react-native-config', () => ({
    Config: { STORYBOOK_ENABLED: 'false' }
}));

jest.mock('../../../.storybook', () => ({
}));

// jest.useFakeTimers();

import App from "./App";
import navigationRef from '@br/weather/core/services/NavigationService';
import axios from "axios";

describe('App tests', () => {

    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(axios);

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
    });

    afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
    });

    test('Weather Forecast page is the first page visible', async () => {

        render(<App />);

        await waitFor(() => expect(navigationRef.isReady()).toBe(true));

        const route = navigationRef.getCurrentRoute();
        expect(route?.name).toBe('weather');


        const weatherHead = await screen.findByRole('header', { name:'Weather' });
        expect(weatherHead).toBeVisible();
        expect(weatherHead).toHaveTextContent('Weather');

        const weatherSummary = await screen.findByRole('scrollbar');
        expect(weatherSummary).toBeOnTheScreen();
    });

    test( 'Open Setting screen selecting Settings tab', async () => {

        render(<App />);

        // Get *all* the buttons (tabs are buttons)
        const tabButtons = screen.getAllByRole('button');

        // Find the one labeled "Settings"
        const settingsTab = tabButtons.find((btn) =>
            within(btn).queryByText('Settings')
        );

        expect(settingsTab).toBeTruthy(); // make sure it's found
        fireEvent.press(settingsTab!);

        const route = navigationRef.getCurrentRoute();
        expect(route?.name).toBe('settings');

        const weatherHead = await screen.findByRole('header', { name:'Settings' });
        expect(weatherHead).toBeOnTheScreen();
        expect(weatherHead).toHaveTextContent('Settings');

        const settingsSummary = await screen.findByRole('summary');
        expect(settingsSummary).toBeOnTheScreen();
        expect(settingsSummary).toHaveTextContent('Settings!')

    })

})
