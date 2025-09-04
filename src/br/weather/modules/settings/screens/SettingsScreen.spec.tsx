import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen.tsx';

test('Settings! text is visible', () => {
    renderWithKitten(<SettingsScreen />);

    const themeModeToggle = screen.getByRole('switch');
    expect(themeModeToggle).toBeVisible();
});
