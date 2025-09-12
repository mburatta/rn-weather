import {act, fireEvent, render, screen} from '@testing-library/react-native';



// Mock del modulo che esporta useModeContext
jest.mock('@br/weather/core/contexts/ModeContext', () => {
    const actual = jest.requireActual('@br/weather/core/contexts/ModeContext');
    return {
        ...actual,
        useModeContext: jest.fn(() => ({ mode: 'dark', setMode: jest.fn() })),
    };
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

import * as ReactRedux from 'react-redux';
import {DarkMode} from '@br/weather/settings/components/DarkMode/DarkMode';
import {InteractionManager} from "react-native";
import {settings, SettingsState} from '@br/weather/core/models';
import {init} from '@rematch/core';

// ---- helpers for typed mocks
const useSelector = ReactRedux.useSelector as unknown as jest.Mock;
const useDispatch = ReactRedux.useDispatch as unknown as jest.Mock;

const makeDispatch = () => ({
    // Rematch-like shape expected by your component:
    settings: { setMode: jest.fn() },
});

const setReduxState = (mode: 'light' | 'dark', dispatchObj = makeDispatch()) => {
    useSelector.mockImplementation((sel: any) =>
        sel({ settings: { mode } }) // must match your RootState shape used in component
    );
    useDispatch.mockReturnValue(dispatchObj);
    return dispatchObj;
};

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
        setReduxState('light');
        // (useModeContext as jest.Mock).mockReturnValueOnce({ mode: 'light', setMode: jest.fn() });
        renderWithKitten(<DarkMode />);

        expect(screen.getByText('Dark Mode')).toBeVisible();
        expect(screen.getByText('Toggle between Dark/Light mode')).toBeVisible();
    });

    test('Switch is off when theme is Light', () => {
        setReduxState('light');
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');
        expect(toggle).not.toBeChecked();

    });

    test('Switch is on if the theme is Dark', () => {
        setReduxState('dark');
        renderWithKitten(<DarkMode />);

        const toggle = screen.getByRole('switch');
        expect(toggle).toBeChecked();
    });

    test("When mode is light and user toggle the switch Dark Mode component call setMode with 'dark' value", () => {

        const dispatchObj = setReduxState('light');
        renderWithKitten(<DarkMode />);
        const toggle = screen.getByRole('switch');

        act(() => {
            fireEvent(toggle, 'onChange', true);
            jest.runAllTimers(); // rAF + setTimeout(50)
        });

        expect(dispatchObj.settings.setMode).toHaveBeenCalledTimes(1);
        expect(dispatchObj.settings.setMode).toHaveBeenCalledWith('dark');
    });

    const createStore = (preloaded?: Partial<SettingsState>) =>
        init({
            models: { settings: { ...settings, state: { ...settings.state, ...preloaded } } },
        });

    test("When mode is dark and user toggle the switch Light Mode component call setMode with 'light' value", () => {

        const dispatchObj = setReduxState('dark');
        renderWithKitten(<DarkMode />);
        const toggle = screen.getByRole('switch');

        act(() => {
            fireEvent(toggle, 'onChange', false);
            jest.runAllTimers();
        });

        expect(dispatchObj.settings.setMode).toHaveBeenCalledTimes(1);
        expect(dispatchObj.settings.setMode).toHaveBeenCalledWith('light');
    });


})
