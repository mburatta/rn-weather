import {config, UnitType} from '@br/weather/core/config';
import {formatDate} from "@br/weather/core/helpers";
import {Text, View} from '@br/weather/core/components';
import {JSX} from "react";
import {WeatherData} from '@br/weather/weather/interfaces';

export interface WeatherItemProps {
    data: WeatherData;
    isToday?: boolean;
    unit: UnitType;
}

const WeatherItem = (props: WeatherItemProps): JSX.Element => {
    const {data, isToday, unit} = props;
    const displayUnit = unit === config.weather.unitCodes.celsius ? 'C' : 'F';

    return (
        <View>
            <Text category='h6'>{`Date : ${formatDate(data.date)} ${isToday ? '(Today)' : ''}`}</Text>
            {isToday && <Text category='s1'>{`Current temp. : ${data.temperature.current}°${displayUnit}`}</Text>}
            <Text>{`Min temp. : ${data.temperature.min}°${displayUnit}`}</Text>
            <Text>{`Max temp. : ${data.temperature.max}°${displayUnit}`}</Text>
            <Text>{`Humidity. : ${data.humidity}%`}</Text>
        </View>
    );
};

export default WeatherItem;
