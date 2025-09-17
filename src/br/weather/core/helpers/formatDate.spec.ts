import { formatDate } from '@br/weather/core/helpers/formatDate';
import dayjs from 'dayjs';


jest.mock('dayjs', () => {

    const formatMock = jest.fn(() => 'mocked-date');
    const unixMock = jest.fn(() => ({ format: formatMock }));

    return {
        unix: unixMock,
    }
});


const dateFormatMock = 'YYYY-MM-DD';
jest.mock('@br/weather/config', () => ({
    config: {
        dateFormat: dateFormatMock,
    },
}));

describe('formatDate', () => {
    it('dovrebbe formattare correttamente il timestamp', () => {
        const timestamp = 1633024800; // Esempio di timestamp
        const result = formatDate(timestamp);

        const { unix } = require('dayjs');
        const formatMock = unix().format;

        expect(unix) .toHaveBeenCalledWith(timestamp);
        expect(formatMock).toHaveBeenCalledWith(dateFormatMock);
        expect(result).toBe('mocked-date');
    });
});
