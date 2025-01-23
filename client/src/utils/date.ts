import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import ru from 'dayjs/locale/ru';

dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(relativeTime);
dayjs.locale(ru);

export const DATE_FORMAT = {
  ISO_DATE: 'MM/DD/YYYY',
};