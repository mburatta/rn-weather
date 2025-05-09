import {screen} from '@testing-library/react-native';
import WeatherItem, {WeatherItemProps} from './WeatherItem';

// Mock di config (assumiamo che config.weather.unitCodes.celsius === 'metric')
jest.mock('@br/weather/core/config', () => ({
    config: {weather: {unitCodes: {celsius: 'metric'}}},
}));

// Mock di formatDate per restituire una stringa costante e semplificare l'asserzione
jest.mock('@br/weather/core/helpers', () => ({
    formatDate: (ts: number) => '09/05/2025',
}));


// Dati di test fittizi
const baseData: WeatherItemProps['data'] = {
    date: 1746702000,
    humidity: 75,
    temperature: {current: 290, min: 284, max: 290},
    status: 'Rain',
    description: 'moderate rain',
    icon: '10d',
};

test('mostra la data, “(Today)” e tutte le temperature in °C quando unit = metric', () => {

    renderWithKitten(<WeatherItem data={baseData} unit='metric' isToday={true} />);

    expect(screen.getByText('Date : 09/05/2025 (Today)')).toBeVisible();
    expect(screen.getByText('Current temp. : 290°C')).toBeVisible();
    expect(screen.getByText('Min temp. : 284°C')).toBeVisible();
    expect(screen.getByText('Max temp. : 290°C')).toBeVisible();
    expect(screen.getByText('Humidity. : 75%')).toBeVisible();
})

test('NON mostra "Current temp." né "(Today)" e usa °F quando unit = imperial', () => {
    renderWithKitten(
        <WeatherItem data={baseData} unit="imperial" isToday={false} />
    );

    expect(screen.queryByText(/\(Today\)/)).toBeNull();
    expect(screen.queryByText(/^Current temp\./)).toBeNull();
    expect(screen.getByText('Min temp. : 284°F')).toBeVisible();
    expect(screen.getByText('Max temp. : 290°F')).toBeVisible();
});
