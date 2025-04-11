/**
 * @format
 */

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from "@br/weather/App";

test('Now with typescript text is visible', () => {
    render(<App />);
    expect(screen.getByText('Now with Typescript')).toBeVisible();
});
