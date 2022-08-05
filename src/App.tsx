/**
 * Main Application script
 */
import React, { FunctionComponent, useRef } from 'react';
import { BryntumCalendar } from '@bryntum/calendar-react';
import { calendarConfig } from './CalendarConfig';
import './App.scss';

const App: FunctionComponent = () => {

    const calendar = useRef<BryntumCalendar>(null);

    return (
        <BryntumCalendar
            ref = {calendar}
            {...calendarConfig}
        />
    );
};

// If you plan to use stateful React collections for data binding please check this guide
// https://www.bryntum.com/docs/calendar/guide/Calendar/integration/react/data-binding

export default App;
