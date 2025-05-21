import {screen} from '@testing-library/react-native';
import WeatherItem, {WeatherItemProps} from './WeatherItem';

// Mock di config (assumiamo che config.weather.unitCodes.celsius === 'metric')
jest.mock('@br/weather/core/config', () => ({
    config: {weather: {unitCodes: {celsius: 'metric'}}},
}));

// Mock di formatDate per restituire una stringa costante e semplificare l'asserzione
jest.mock('@br/weather/core/helpers', () => ({
    formatDate: (ts: number, template: string) => {
        if(template === 'dddd') {
            return 'Friday';
        } else {
            return '09/05/2025';
        }
    },
}));

// Dati di test fittizi
const baseData: WeatherItemProps['data'] = {
    date: 1746702000,
    humidity: 75,
    temperature: {current: 290, min: 284, max: 300, unit: 'metric'},
    status: 'Rain',
    description: 'moderate rain',
    icon: '10d',
};

test('mostra la data, “(Today)” e tutte le temperature in °C quando unit = metric', () => {
    renderWithKitten(
        <WeatherItem
            data={baseData}
            unit='metric'
            isToday={true}
            toggleUnit={() => {
                throw new Error('Function not implemented.');
            }}
        />,
    );

    expect(screen.getByText('09/05/2025, Friday (Today)')).toBeVisible();
    expect(screen.getByText('290°C')).toBeVisible();
    expect(screen.getByText('284°C - 300°C')).toBeVisible();
    expect(screen.getByText('Humidity:')).toBeVisible();
    expect(screen.getByText('75%')).toBeVisible();
});

test('NON mostra "Current temp." né "(Today)" e usa °F quando unit = imperial', () => {
    renderWithKitten(
        <WeatherItem
            data={baseData}
            unit='imperial'
            isToday={false}
            toggleUnit={() => {
                throw new Error('Function not implemented.');
            }}
        />,
    );

    expect(screen.queryByText(/\(Today\)/)).toBeNull();
    expect(screen.queryByText(/^290°F\./)).toBeNull();
    expect(screen.getByText('284°F - 300°F')).toBeVisible();
});
