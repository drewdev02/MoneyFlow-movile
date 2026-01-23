import { ContainerModule } from "inversify";
import { ProfileViewModel } from "../presentation/viewmodels/ProfileViewModel";

export const profileModule = new ContainerModule((options) => {
    options.bind<ProfileViewModel>(ProfileViewModel).toSelf();
});
