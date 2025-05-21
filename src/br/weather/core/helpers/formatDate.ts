import dayjs from 'dayjs';
import {config} from '@br/weather/core/config';

export const formatDate = (timestamp: number, template: string = config.dateFormat): string => {
    return dayjs.unix(timestamp).format(template);
};
