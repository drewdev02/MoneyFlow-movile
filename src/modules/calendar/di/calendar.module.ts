import { ContainerModule } from "inversify";
import { CalendarViewModel } from "../presentation/viewmodels/CalendarViewModel";

export const calendarModule = new ContainerModule((options) => {
    options.bind<CalendarViewModel>(CalendarViewModel).toSelf();
});
