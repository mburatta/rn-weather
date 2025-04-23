import React, {JSX} from 'react';
import {Navigation} from '@br/weather/core/components';
import {NavItem} from '@br/weather/core/interfaces';
import {WeatherScreen} from "@br/weather/weather/screens";
import {SettingsScreen} from "@br/weather/settings/screens";


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
    return <Navigation navItems={navItems} />;
};

export default App;
