import {useCallback, useEffect, useMemo, useState} from 'react';
import {Mode} from '@br/weather/core/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMode = (): {mode: Mode; setMode: (mode: Mode) => void} => {
    const storageKey = 'RNWeather.mode';

    const [mode, setMode] = useState<Mode>('light');

    const saveMode = useCallback(async (newMode: Mode): Promise<void> => {
        try {
            setMode(newMode);
            await AsyncStorage.setItem(storageKey, newMode);
        } catch (e) {
            setMode(newMode === 'light' ? 'dark' : 'light'); // revert state on error
            console.error('Error saving mode', e);
        }
    }, []);

    useEffect(() => {
        const loadMode = async (): Promise<void> => {
            try {
                const value = await AsyncStorage.getItem(storageKey);
                if (value) {
                    setMode(value as Mode);
                }
            } catch (e) {
                setMode('light')
                console.error('Error reading mode', e);
            }
        };
        loadMode();
    }, []);

    return useMemo(() => ({mode, setMode: saveMode}), [mode, saveMode]);
};
