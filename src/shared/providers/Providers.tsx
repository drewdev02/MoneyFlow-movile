import { PropsWithChildren } from "react";
import { DatabaseProvider } from "./DatabaseProvider";
import { NetworkProvider } from "./NetworkProvider";



export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <DatabaseProvider>
            <NetworkProvider>
                {children}
            </NetworkProvider>
        </DatabaseProvider>
    )
}
