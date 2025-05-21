import {config, UnitType} from '@br/weather/core/config';
import {formatDate} from "@br/weather/core/helpers";
import {Text, View, Card, FastImage, TouchableOpacity} from '@br/weather/core/components';
import {JSX} from "react";
import {WeatherData} from '@br/weather/weather/interfaces';
import {styles} from './WeatherItem.styles';


export interface WeatherItemProps {
    data: WeatherData;
    isToday?: boolean;
    unit: UnitType;
    toggleUnit: () => void;
    accessibilityLabel?: string;
}

const WeatherItem = (props: WeatherItemProps): JSX.Element => {
    const {data, isToday, unit, toggleUnit, accessibilityLabel} = props;
    const imageUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    const displayUnit = unit === config.weather.unitCodes.celsius ? 'C' : 'F';
    return (
        <View
            style={styles.layout}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
        >
            <Card style={styles.card}>
                <View style={styles.row}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: imageUrl,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <TouchableOpacity
                        accessibilityRole={'button'}
                        onPress={toggleUnit}>
                        <Text style={styles.bold} category='h3'>
                            {`${data.temperature.min}°${displayUnit} - ${data.temperature.max}°${displayUnit}`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text category='s1'>{data.description}</Text>
                <View style={styles.row}>
                    <Text>Humidity: </Text>
                    <Text style={styles.bold} category='h6'>{`${data.humidity}%`}</Text>
                </View>

                {isToday && (
                    <TouchableOpacity onPress={toggleUnit}>
                        <Text category='h1' style={[styles.bold, styles.currentTemp]}>
                            {`${data.temperature.current}°${displayUnit}`}
                        </Text>
                    </TouchableOpacity>
                )}
                <Text category='h6' style={[styles.bold, styles.date]}>
                    {`${formatDate(data.date)}, ${formatDate(data.date, 'dddd')} ${isToday ? '(Today)' : ''}`}
                </Text>
            </Card>
        </View>
    );
};


export default WeatherItem;
