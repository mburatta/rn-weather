// useMode.test.ts
import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage, {AsyncStorageStatic} from '@react-native-async-storage/async-storage';
import {useMode} from './useMode';

// Official mock of AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('useMode', () => {
    const STORAGE_MODE_KEY = 'RNWeather.mode';

    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        (AsyncStorage as AsyncStorageStatic).clear();
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('The first value of the useMode Hook is "light"', () => {
        const {result} = renderHook(() => useMode());

        expect(result.current.mode).toBe('light');
        expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_MODE_KEY);
    });

    it('Update the mode with tle setMode and persit the new value into the storage', async () => {
        const {result} = renderHook(() => useMode());

        await act(async () => {
            await result.current.setMode('dark');
        });

        expect(result.current.mode).toBe('dark');
        expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_MODE_KEY, 'dark');

        await act(async () => {
            await result.current.setMode('light');
        });

        expect(result.current.mode).toBe('light');
        expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_MODE_KEY, 'light');
    });

    it('When the application start, it loads the value saved into the storage', async () => {
        await AsyncStorage.setItem(STORAGE_MODE_KEY, 'dark');

        const {result} = renderHook(() => useMode());

        // l’effetto che legge da storage è async: aspetta l’aggiornamento
        await waitFor(() => expect(result.current.mode).toBe('dark'));
        expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_MODE_KEY);
    });

    it('falls back to "light" and logs when AsyncStorage.getItem rejects', async () => {
        (AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>).mockRejectedValueOnce(
            new Error('boom'),
        );

        const {result} = renderHook(() => useMode());

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_MODE_KEY);

            // Mode should be "light" after the catch branch
            expect(result.current.mode).toBe('light');

            // The error log should have been emitted
            expect(consoleSpy).toHaveBeenCalledWith('Error reading mode', expect.any(Error));
        });
    });

    it('falls back to "light" and logs when AsyncStorage.setItem rejects', async () => {
        (AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>).mockRejectedValueOnce(
            new Error('boom'),
        );

        const {result} = renderHook(() => useMode());

        await act(async () => {
            await result.current.setMode('dark');
        });

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_MODE_KEY, 'dark');

        // Mode should be "light" after the catch branch
        expect(result.current.mode).toBe('light');

        // The error log should have been emitted
        expect(consoleSpy).toHaveBeenCalledWith('Error saving mode', expect.any(Error));
    });
});
