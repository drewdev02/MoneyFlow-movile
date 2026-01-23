import {ContainerModule} from "inversify";
import {CalendarViewModel} from "../presentation/viewmodels/CalendarViewModel";
import {GenerateCalendarData} from "@/modules/calendar/domain/usecases/GenerateCalendarData";

export const calendarModule = new ContainerModule((options) => {
    options.bind<GenerateCalendarData>(GenerateCalendarData).toSelf();
    options.bind<CalendarViewModel>(CalendarViewModel).toDynamicValue(c =>
        new CalendarViewModel(c.get(GenerateCalendarData))
    );
});
