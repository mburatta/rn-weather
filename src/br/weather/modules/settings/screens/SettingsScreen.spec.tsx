import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen.tsx';
import {init} from '@rematch/core';
import {Provider} from 'react-redux';

type SettingsState = { mode: 'light' | 'dark' };
const settings = {
    state: { mode: 'light' } as SettingsState,
    reducers: {
        setMode: (state: SettingsState, mode: 'light' | 'dark') => ({ ...state, mode }),
    },
};

const createStore = (preloaded?: Partial<SettingsState>) =>
    init({
        models: { settings },
    });

test('Settings! text is visible', () => {
    const store = createStore({ mode: 'light' });
    const { getByRole } = renderWithKitten(
        <Provider store={store}>
            <SettingsScreen />
        </Provider>
    );

    const themeModeToggle = screen.getByRole('switch');
    expect(themeModeToggle).toBeVisible();
});
