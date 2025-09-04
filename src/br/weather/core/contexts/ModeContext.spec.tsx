import React, {useState} from 'react';
import {Text, Pressable} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Mode} from '@br/weather/core/interfaces';
import {ModeContext, useModeContext} from '@br/weather/core/contexts/ModeContext';

// Simple consumer used across tests to read and toggle the context value
function Consumer() {
    // Read current mode and setter from context
    const {mode, setMode} = useModeContext();

    // Toggle handler: switch between light and dark
    const onToggle = () => setMode(mode === 'light' ? ('dark' as const) : ('light' as const));

    return (
        <>
            {/* Show current mode so we can assert on it */}
            <Text testID="mode-text">{mode}</Text>
            {/* Simulate a user action that calls setMode */}
            <Pressable testID="toggle-btn" onPress={onToggle}>
                <Text>toggle</Text>
            </Pressable>
        </>
);
}

describe('ModeContext', () => {

    test('Default without Provider: mode="light" and setMode is a no-op', () => {
        // Render consumer without any Provider -> falls back to context default
        render(<Consumer />);

        // Expect the default mode to be "light"
        const modeText = screen.getByTestId('mode-text');
        expect(modeText).toHaveTextContent('light');

        // Pressing the toggle uses the default setMode (no-op) -> text should not change
        const btn = screen.getByTestId('toggle-btn');
        fireEvent.press(btn);
        expect(modeText).toHaveTextContent('light');
    });

    test('Custom Provider override: uses provided value and calls provided setMode', () => {
        // Create a mock setMode to assert invocation and argument
        const mockSetMode = jest.fn();

        render(
            <ModeContext.Provider value={{mode: 'dark', setMode: mockSetMode}}>
                <Consumer />
            </ModeContext.Provider>
        );

        // The consumer should read "dark" from the custom Provider
        const modeText = screen.getByTestId('mode-text');
        expect(modeText).toHaveTextContent('dark');

        // Toggling from dark should call setMode with "light"
        const btn = screen.getByTestId('toggle-btn');
        fireEvent.press(btn);
        expect(mockSetMode).toHaveBeenCalledTimes(1);
        expect(mockSetMode).toHaveBeenCalledWith('light');
    });

    test('Stateful Provider: consumer re-renders when setMode updates the state', () => {
        // Build a Provider that manages its own state using useState
        function StatefulProvider({children}: {children: React.ReactNode}) {
            const [mode, setMode] = useState<Mode>('light');
            return <ModeContext.Provider value={{mode, setMode}}>{children}</ModeContext.Provider>;
        }

        render(
            <StatefulProvider>
                <Consumer />
            </StatefulProvider>
        );

        // Initial state is "light"
        const modeText = screen.getByTestId('mode-text');
        expect(modeText).toHaveTextContent('light');

        // First press toggles to "dark"
        const btn = screen.getByTestId('toggle-btn');
        fireEvent.press(btn);
        expect(modeText).toHaveTextContent('dark');

        // Second press toggles back to "light"
        fireEvent.press(btn);
        expect(modeText).toHaveTextContent('light');
    });
});
