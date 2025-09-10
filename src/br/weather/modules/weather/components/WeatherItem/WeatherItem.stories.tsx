import type {Meta, StoryObj} from '@storybook/react';
import WeatherItem from './WeatherItem';
import {ApplicationProvider, light, mapping, Text, View} from '@br/weather/core/components';
import * as brWeatherTheme from '@br/weather/assets/jsons/br-weather-theme.json';
import {UnitType} from '@br/weather/core/config';

const meta = {
    title: 'Weather Item',
    component: WeatherItem,
    argTypes: {
        data: {
            control: 'object',
        },
        isToday: {
            control: 'boolean',
        },
        unit: {
            control: 'select',
            options: ['metric', 'imperial'],
        },
    },
    args: {
        data: {
            date: 1746702000,
            humidity: 75,
            temperature: {
                current: 290,
                min: 284,
                max: 290,
                unit: 'metric',
            },
            status: 'Rain',
            description: 'moderate rain',
            icon: '10d',
        },
        isToday: true,
        unit: 'metric',
        toggleUnit: () => void 0,
    },
    decorators: [
        (Story) => (
            <ApplicationProvider mapping={mapping} theme={{...light, ...brWeatherTheme}}>
                <View style={{padding: 16, alignItems: 'flex-start'}}>
                    <Story />
                </View>
            </ApplicationProvider>
        ),
    ],
} satisfies Meta<typeof WeatherItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Celsius: Story = {
    render: (args) => {
        const {data, unit} = args;
        return (
            <WeatherItem
                data={data}
                unit={unit}
                toggleUnit={function (): void {
                    throw new Error('Function not implemented.');
                }}></WeatherItem>
        );
    },
};

export const Fahrenheit: Story = {
    args: {
        ...meta.args,
        unit: 'imperial' as UnitType,
    },
    render: (args) => {
        const {data, unit} = args;
        return (
            <WeatherItem
                data={data}
                unit={unit}
                toggleUnit={function (): void {
                    throw new Error('Function not implemented.');
                }}></WeatherItem>
        );
    },
};
