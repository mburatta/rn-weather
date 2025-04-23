import React, {JSX} from 'react';
import {NavItem} from '@br/weather/core/interfaces';
import {WeatherScreen} from "@br/weather/weather/screens";
import {SettingsScreen} from "@br/weather/settings/screens";

import {Navigation, ApplicationProvider, dark, light, mapping} from '@br/weather/core/components';
import * as brWeatherTheme from '@br/weather/assets/jsons/br-weather-theme.json';

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
    return (
        <ApplicationProvider mapping={mapping} theme={{...light, ...brWeatherTheme}}>
            <Navigation navItems={navItems} />
        </ApplicationProvider>
    );
};

export default App;
