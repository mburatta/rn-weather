import {Text} from 'react-native-gesture-handler';
import {JSX} from 'react';
import {AppLayout} from '@br/weather/core/components';

const WeatherScreen = (): JSX.Element => {
    return (
        <AppLayout>
            <Text accessibilityRole='summary'>Weather Forecast!</Text>
        </AppLayout>
    );
};

export default WeatherScreen;
