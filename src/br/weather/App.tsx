import React, {JSX, useMemo} from 'react';
import {NavItem} from '@br/weather/core/interfaces';
import {WeatherScreen} from "@br/weather/weather/screens";
import {SettingsScreen} from "@br/weather/settings/screens";

import {Navigation, ApplicationProvider, dark, light, mapping, Loading} from '@br/weather/core/components';
import * as brWeatherTheme from '@br/weather/assets/jsons/br-weather-theme.json';

import {default as StorybookDefault} from '../../../.storybook';
import Config from 'react-native-config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector} from 'react-redux';
import {persistor, RootState, store} from './Store.ts';

const navItems: NavItem[] = [
    {
        name: 'weather',
        title: 'Weather',
        component: WeatherScreen,
        icon: 'thought-bubble-outline',
        iconFocused: 'thought-bubble',
    },
    {
        name: 'settings',
        title: 'Settings',
        component: SettingsScreen,
        icon: 'cog-outline',
        iconFocused: 'cog',
    },
];

const BaseApp = (): JSX.Element => {

    const mode = useSelector((state: RootState) => state.settings.mode);
    const evaTheme = useMemo(() => (mode === 'light' ? light : dark), [mode]);
    const themed = useMemo(() => ({ ...evaTheme, ...brWeatherTheme }), [evaTheme]);

    return (
        <ApplicationProvider mapping={mapping} theme={themed}>
            <SafeAreaProvider>
                <Navigation navItems={navItems} />
            </SafeAreaProvider>
        </ApplicationProvider>
    );
};
const App = (): JSX.Element => {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loading />}>
                <BaseApp/>
            </PersistGate>
        </Provider>
    );
};

const getAppEntryPoint = () => {
    if (Config.STORYBOOK_ENABLED === 'true') {
        return StorybookDefault;
    }
    return App;
};

export default getAppEntryPoint();
