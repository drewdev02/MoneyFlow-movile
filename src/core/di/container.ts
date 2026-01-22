import { Container } from 'inversify';
import { CalendarViewModel } from '@/modules/calendar/presentation/viewmodels/CalendarViewModel';

export const container = new Container({ defaultScope: 'Singleton' });

container.bind<CalendarViewModel>(CalendarViewModel)
.toDynamicValue(  () => new CalendarViewModel());

