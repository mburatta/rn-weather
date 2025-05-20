import { RenderAPI, RenderOptions } from '@testing-library/react-native';
import React from 'react';

declare global {
    /**
     * Render a React element inside a UI-Kitten <ApplicationProvider>.
     */
    function renderWithKitten(
        ui: React.ReactElement,
        options?: RenderOptions
    ): RenderAPI;
}

export {};
