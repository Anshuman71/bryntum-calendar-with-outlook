/**
 * Application configuration
 */
import { CalendarConfig } from '@bryntum/calendar';

const calendarConfig: Partial<CalendarConfig> = {
    date : new Date(2022, 2, 15),

    crudManager : {
        transport : {
            load : {
                url : 'data/calendar-data.json'
            }
        },
        autoLoad : true
    }
};

export { calendarConfig };
