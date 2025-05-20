/**
 * @format
 */

import React from 'react';
import {fireEvent, render, screen, waitFor, within} from '@testing-library/react-native';
import App from "./App";
import navigationRef from '@br/weather/core/services/NavigationService';


jest.mock('react-native-config', () => ({
    Config: { STORYBOOK_ENABLED: 'false' }
}));

jest.mock('../../../.storybook', () => ({
}));

// jest.useFakeTimers();

test('Weather Forecast page is the first page visible', async () => {

    render(<App />);

    // aspetta che la navigazione sia pronta
    await waitFor(() => expect(navigationRef.isReady()).toBe(true));

    const route = navigationRef.getCurrentRoute();
    expect(route?.name).toBe('weather');

    const weatherHead = await screen.findByRole('header', { name:'Weather' });
    expect(weatherHead).toBeVisible();
    expect(weatherHead).toHaveTextContent('Weather');

    const weatherSummary = await screen.findByRole('summary');
    expect(weatherSummary).toHaveTextContent('Weather Forecast!');
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
    expect(weatherHead).toBeVisible();
    expect(weatherHead).toHaveTextContent('Settings');

    const settingsSummary = await screen.findByRole('summary');
    expect(settingsSummary).toBeVisible();
    expect(settingsSummary).toHaveTextContent('Settings!')
})
