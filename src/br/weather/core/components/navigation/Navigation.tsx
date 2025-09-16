
import React, {JSX, useMemo} from 'react';
import {NavigationContainer, DarkTheme as RNDarkTheme, DefaultTheme as RNLightTheme, Theme as RNTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavItem} from '@br/weather/core/interfaces';
import {useTheme} from '@ui-kitten/components';
import navigationRef from '@br/weather/core/services/NavigationService.ts';
import {useModeContext} from "@br/weather/core/contexts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
    navItems: NavItem[];
}

const Tab = createBottomTabNavigator();

export const Navigation = (props: Props): JSX.Element => {
    const {navItems} = props;

    const theme = useTheme();
    const {mode} = useModeContext();

    const navTheme: RNTheme = useMemo(() => {
        const isDark = mode === 'dark';
        const base = isDark ? RNDarkTheme : RNLightTheme;

        // Colori principali presi dal tema UI Kitten
        const background = theme['background-basic-color-1'];
        const card = theme['background-basic-color-2'] ?? background;
        const text = theme['text-basic-color'];
        const border = theme['border-basic-color-3'] ?? 'transparent';
        const primary = theme['color-primary-default'];
        const notification = theme['color-danger-500'] ?? '#ff3d71';

        return {
            ...base,
            dark: isDark,
            colors: {
                ...base.colors,
                primary,
                background,
                card,
                text,
                border,
                notification,
            },
        };
    }, [mode, theme]);

    const tabBarBg = theme['background-basic-color-1'];
    const tabBarBorder = theme['border-basic-color-3'] ?? 'transparent';
    const headerBg = theme['background-basic-color-1'];
    const headerText = theme['text-basic-color'];

    return (
        <NavigationContainer theme={navTheme} ref={navigationRef}>
            <Tab.Navigator
                screenOptions={{
                    // Colori delle icone/tab
                    tabBarActiveTintColor: theme['color-primary-default'],
                    tabBarInactiveTintColor: theme['background-basic-color-6'],
                    // Sfondo e bordo della tab bar
                    tabBarStyle: {
                        backgroundColor: tabBarBg,
                        borderTopColor: tabBarBorder,
                    },
                    // Header (se visibile) allineato al tema
                    headerStyle: {
                        backgroundColor: headerBg,
                    },
                    headerTitleStyle: {
                        color: headerText,
                    },
                    headerTintColor: headerText,
                }}

                initialRouteName={navItems[0].name}>
                {navItems.map((navItem) => (
                    <Tab.Screen
                        key={navItem.name}
                        name={navItem.name}
                        component={navItem.component}
                        options={{
                            title: navItem.title,
                            tabBarIcon: (iconProps) => {
                                const {focused, color, size} = iconProps;
                                return (
                                    <Icon
                                        name={focused ? navItem.iconFocused : navItem.icon}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                        }}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};
