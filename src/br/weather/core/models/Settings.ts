import {Mode} from "@br/weather/core/interfaces";
import {produce} from 'immer';

export interface SettingsState {
    mode: Mode
}

export interface SettingsModel {
    state: SettingsState;
    reducers: {
        setMode: (state: SettingsState, mode: Mode) => SettingsState;
    };
}

export const settings: SettingsModel = {
    state: {
        mode: 'light',
    },
    reducers: {
        setMode: produce((draftState: SettingsState, mode: Mode) => {
            draftState.mode = mode;
        }),
    },
};
