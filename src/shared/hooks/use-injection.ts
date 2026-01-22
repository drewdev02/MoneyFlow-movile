import { container } from "@/core/di/container";
import { ServiceIdentifier } from "inversify";


export function useInjection<T>(serviceIdentifier: ServiceIdentifier<T>): T {
    return container.get<T>(serviceIdentifier, {
        autobind:true
    });
}
