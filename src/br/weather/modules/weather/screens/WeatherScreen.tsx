import React, {JSX, useEffect, useRef, useState} from 'react';

import {config, UnitType} from '@br/weather/core/config';
import {WeatherData} from '@br/weather/weather/interfaces';
import {weatherService} from '@br/weather/weather/services';
import {ActivityIndicator, Alert, AppLayout, ICarouselInstance, useStyleSheet} from '@br/weather/core/components';
import WeatherItem from '@br/weather/weather/components/WeatherItem/WeatherItem';
import themedStyles, {ThemedStyles} from './WeatherScreen.styles.ts';
import {useImmer} from 'use-immer';
import {formatDate} from '@br/weather/core/helpers';
import {Dimensions, Text, View} from 'react-native';
import {Carousel, Pagination } from '@br/weather/core/components';
import {useSharedValue} from "react-native-reanimated";


interface Conditions {
    lat: number;
    long: number;
    city: string;
    unit: UnitType;
    lang: string;
}
const WeatherScreen = (): JSX.Element => {

    const styles = useStyleSheet<ThemedStyles>(themedStyles)

    const [conditions, setConditions] = useImmer<Conditions>({
        long: 45.4642,
        lat: 9.1896,
        city: 'Milan',
        unit: config.weather.unitCodes.celsius,
        lang: 'en',
    });
    const [weatherForecasts, setWeatherForecasts] = useState<WeatherData[]>([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const {width: screenWidth} = Dimensions.get('window');

    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

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

    const onPressPagination = (index: number) => {

        setActiveSlide(index);
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    useEffect(() => {
        refresh();
    }, [conditions]);

    const toggleUnit = (): void => {
        setConditions((draft) => {
            draft.unit =
                conditions.unit === config.weather.unitCodes.celsius
                    ? config.weather.unitCodes.fahrenheit
                    : config.weather.unitCodes.celsius;
        });
    };

    const renderWeatherItem = ({item: weatherForecast, index}: {item: WeatherData; index: number}): JSX.Element => {
        return (
            <WeatherItem
                key={weatherForecast.date}
                data={weatherForecast}
                isToday={index === 0}
                unit={weatherForecast.temperature.unit}
                toggleUnit={toggleUnit}
                accessibilityLabel={`Weather forecast for ${formatDate(weatherForecast.date)}`}
            />
        );
    };

    if (weatherForecasts.length === 0) {
        return (
            <AppLayout style={styles.noDataLayout}>
                <ActivityIndicator size='large' />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <View
                accessible={true}
                accessibilityRole="adjustable"
                accessibilityLabel="Weather for the next few days"
            >
                <Carousel
                    ref={ref}
                    data={weatherForecasts}
                    loop={weatherForecasts.length > 1}
                    pagingEnabled={true}
                    snapEnabled={true}
                    width={screenWidth}
                    style={{
                        width: screenWidth,
                    }}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    onProgressChange={progress}
                    renderItem={renderWeatherItem}
                />

                <Pagination.Basic<WeatherData>
                    progress={progress}
                    data={weatherForecasts}
                    size={20}
                    dotStyle={
                        styles.dot
                    }
                    activeDotStyle={
                        styles.activeDot
                    }
                    containerStyle={[
                        styles.paginationContainer
                    ]}
                    horizontal
                    onPress={onPressPagination}
                />
            </View>
        </AppLayout>
    );
};

export default WeatherScreen;
