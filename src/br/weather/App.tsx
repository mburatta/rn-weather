import React, {JSX, useMemo} from 'react';
import {NavItem} from '@br/weather/core/interfaces';
import {WeatherScreen} from "@br/weather/weather/screens";
import {SettingsScreen} from "@br/weather/settings/screens";

import {Navigation, ApplicationProvider, dark, light, mapping} from '@br/weather/core/components';
import * as brWeatherTheme from '@br/weather/assets/jsons/br-weather-theme.json';

import {default as StorybookDefault} from '../../../.storybook';
import Config from 'react-native-config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useMode} from '@br/weather/core/hooks/UseMode.ts';
import {ModeContext} from '@br/weather/core/contexts';

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

const App = (): JSX.Element => {

    const mode = useMode()
    const evaTheme = useMemo(() => (mode.mode === 'light' ? light : dark), [mode.mode]);
    const themed = useMemo(() => ({ ...evaTheme, ...brWeatherTheme }), [evaTheme]);

    return (
        <ModeContext.Provider value={mode}>
            <ApplicationProvider mapping={mapping} theme={themed}>
                <SafeAreaProvider>
                    <Navigation navItems={navItems} />
                </SafeAreaProvider>
            </ApplicationProvider>
        </ModeContext.Provider>
    );
};

const getAppEntryPoint = () => {
    if (Config.STORYBOOK_ENABLED === 'true') {
        return StorybookDefault;
    }
    return App;
};

export default getAppEntryPoint();
