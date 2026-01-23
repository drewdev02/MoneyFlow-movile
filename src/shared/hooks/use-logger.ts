import { Logger, LoggerFactory } from "@/core/logger";
import { useMemo } from "react";

export function useLogger (name: string): Logger{
 return useMemo(() => LoggerFactory.createLogger(name),[name])
} 