import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen.tsx';

test('Settings! text is visible', () => {
    const expected = 'Settings!';
    renderWithKitten(<SettingsScreen />);

    const heading = screen.getByRole('summary');
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent(expected);
});
