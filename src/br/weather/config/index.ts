
export type UnitType = 'metric' | 'imperial';

export const config = {
    weather: {
        apiKey: '1cbe25fcd8a0f8b6a0b303b867f66f5c',
        unitCodes: {
            celsius: 'metric' as UnitType,
            fahrenheit: 'imperial' as UnitType,
        },
    },
    dateFormat: 'DD/MM/YYYY',
};
