import React, {JSX, useEffect, useState} from 'react';

import {config, UnitType} from '@br/weather/core/config';
import {WeatherData} from '@br/weather/weather/interfaces';
import {weatherService} from '@br/weather/weather/services';
import {Alert, AppLayout, ActivityIndicator} from '@br/weather/core/components';
import {Button} from 'react-native';
import WeatherItem from '@br/weather/weather/components/WeatherItem/WeatherItem';
import styles from './WeatherScreen.styles.ts';

interface Conditions {
    lat: number;
    long: number;
    city: string;
    unit: UnitType;
    lang: string;
}
const WeatherScreen = (): JSX.Element => {
    const [conditions, setConditions] = useState<Conditions>({
        long: 45.4642,
        lat: 9.1896,
        city: 'Milan',
        unit: config.weather.unitCodes.celsius,
        lang: 'en',
    });
    const [weatherForecasts, setWeatherForecasts] = useState<WeatherData[]>([]);

    const refresh = async (): Promise<void> => {
        try {
            const data = await weatherService.getDailyWeatherForecast(conditions);
            setWeatherForecasts(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', String(error));
            }
        }
    };

    useEffect(() => {
        refresh();
    }, [conditions]);

    const toggleUnit = (): void => {
        setConditions({
            ...conditions,
            unit:
                conditions.unit === config.weather.unitCodes.celsius
                    ? config.weather.unitCodes.fahrenheit
                    : config.weather.unitCodes.celsius,
        });
    };

    if (weatherForecasts.length === 0) {
        return (
            <AppLayout style={styles.noDataLayout}>
                <ActivityIndicator size="large" />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Button onPress={toggleUnit} title='Toggle unit'></Button>
            {weatherForecasts.map((weatherForecast, index) => (
                <WeatherItem
                    key={weatherForecast.date}
                    data={weatherForecast}
                    isToday={index === 0}
                    unit={weatherForecast.temperature.unit}
                />
            ))}
        </AppLayout>
    );
};

export default WeatherScreen;
