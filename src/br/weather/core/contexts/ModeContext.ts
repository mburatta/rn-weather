import {createContext, useContext} from 'react';
import {Mode} from "@br/weather/core/interfaces";

export const ModeContext = createContext<{mode: Mode; setMode: (mode: Mode) => void}>({
    mode: 'light',
    setMode: (_mode: Mode) => {},
})

export function useModeContext() {
    return useContext(ModeContext);
}
