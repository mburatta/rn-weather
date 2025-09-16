import {ApplicationProvider, light, mapping, View} from '@br/weather/core/components';
import * as brWeatherTheme from "@br/weather/assets/jsons/br-weather-theme.json";
import type {Meta, StoryObj} from '@storybook/react';
import {DarkMode} from "@br/weather/settings/components";
import {ModeContext} from "@br/weather/core/contexts";

const meta = {
    title: 'Theme mode toggle',
    component: DarkMode,
    decorators: [
        (Story) => (
            <ApplicationProvider mapping={mapping} theme={{...light, ...brWeatherTheme}}>
                <View style={{padding: 16, alignItems: 'flex-start'}}>
                    <Story />
                </View>
            </ApplicationProvider>
        ),
    ],
} satisfies Meta<typeof DarkMode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const darkThemeMode: Story = {
    render: () => {
        return (
            <ModeContext.Provider value={{mode: 'dark', setMode: () => {}}}>
                <DarkMode/>
            </ModeContext.Provider>
        );
    },
};

export const lightThemeMode: Story = {
    render: () => {
        return (
            <ModeContext.Provider value={{mode: 'light', setMode: () => {}}}>
                <DarkMode/>
            </ModeContext.Provider>
        );
    },
};
