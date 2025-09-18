import { init, RematchRootState } from '@rematch/core';
import createRematchPersist, { getPersistor } from '@rematch/persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {settings} from '@br/weather/core/models';
import {composeWithDevTools} from "remote-redux-devtools";
import devTools from 'remote-redux-devtools';

const models = { settings } as const;

type RootModel = typeof models;

const persistPlugin = createRematchPersist<RootModel, RootModel, Record<string, never>>({
    key: 'weatherStorage',
    whitelist: ['settings'],
    throttle: 1000,
    version: 1,
    storage: AsyncStorage,
});

export const store = init<RootModel>({
    models,
    plugins: [persistPlugin],
    redux: {
        devtoolComposer: composeWithDevTools({
            name: 'RNWeatherStore',
            realtime: true,
            hostname: 'localhost',
            port: 8001,
            maxAge: 100,
        }),
    },
});

export const persistor = getPersistor();

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = RematchRootState<RootModel>;
