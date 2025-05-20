import dayjs from 'dayjs';
import {config} from '@br/weather/core/config';

export const formatDate = (timestamp: number): string => {
    return dayjs.unix(timestamp) .format(config.dateFormat);
};
