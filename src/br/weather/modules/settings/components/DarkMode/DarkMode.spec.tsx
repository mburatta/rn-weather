import {act, fireEvent, render, screen} from '@testing-library/react-native';



// Mock del modulo che esporta useModeContext
jest.mock('@br/weather/core/contexts/ModeContext', () => {
    const actual = jest.requireActual('@br/weather/core/contexts/ModeContext');
    return {
        ...actual,
        useModeContext: jest.fn(() => ({ mode: 'dark', setMode: jest.fn() })),
    };
});

import {useModeContext} from '@br/weather/core/contexts/ModeContext';
import {DarkMode} from '@br/weather/settings/components/DarkMode/DarkMode';
import {InteractionManager} from "react-native";

// Mocka InteractionManager per eseguire subito i callback
jest.spyOn(InteractionManager, 'runAfterInteractions').mockImplementation((cb: any) => {
    typeof cb === 'function' && cb();
    // restituisci un oggetto compatibile
    return { then: (fn: any) => fn && fn(), cancel: () => {} } as any;
});

beforeAll(() => {
    // @ts-ignore
    global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);
});

describe('DarkMode component', () => {

    beforeEach(() => {
        jest.useFakeTimers(); // gestiremo setTimeout(50)
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    test('Test texts', () => {
        (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'light', setMode: jest.fn() });
        renderWithKitten(<DarkMode />);

        expect(screen.getByText('Dark Mode')).toBeVisible();
        expect(screen.getByText('Toggle between Dark/Light mode')).toBeVisible();
    });

    test('Switch is off when theme is Light', () => {
        (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'light', setMode: jest.fn() });
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');
        expect(toggle).not.toBeChecked();

    });

    test('Switch is on if the theme is Dark', () => {
        (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'dark', setMode: jest.fn() });
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');
        expect(toggle).toBeChecked();
    });

    test("When mode is light and user toggle the switch Dark Mode component call setMode with 'dark' value", () => {

        const mockSetMode = jest.fn();

        (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'light', setMode: mockSetMode });
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');

        act(() => {
            fireEvent(toggle, 'onChange', true); // from light -> true -> dark
            // avanza i timer per far scattare rAF (mockato con setTimeout) e setTimeout(50)
            jest.runAllTimers();
        });

        expect(mockSetMode).toHaveBeenCalledTimes(1);
        expect(mockSetMode).toHaveBeenCalledWith('dark');
    });

    test("When mode is dark and user toggle the switch Light Mode component call setMode with 'light' value", () => {

        const mockSetMode = jest.fn();

        (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'light', setMode: mockSetMode });
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');

        act(() => {
            fireEvent(toggle, 'onChange', true); // from light -> true -> dark
            // avanza i timer per far scattare rAF (mockato con setTimeout) e setTimeout(50)
            jest.runAllTimers();
        });

        expect(mockSetMode).toHaveBeenCalledTimes(1);
        expect(mockSetMode).toHaveBeenCalledWith('dark');
    });


})
