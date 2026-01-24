import {container} from "@/core/di/container";
import {ServiceIdentifier} from "inversify";
import {useMemo} from "react";


export function useInjection<T>(serviceIdentifier: ServiceIdentifier<T>): T {
    return useMemo(() => container.get<T>(serviceIdentifier, {
        autobind: true
    }), [serviceIdentifier])
}
