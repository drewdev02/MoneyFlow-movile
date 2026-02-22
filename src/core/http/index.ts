import axios, { Axios } from 'axios';
import { LoggerFactory } from '../logger';
import { ConfigService, EnvConfigService } from '../config/ConfigService';
import { container } from '../di/container';



export class HttpClient extends Axios { }



const config = container?.get(ConfigService) ?? new EnvConfigService();
export const axiosClient = axios.create({
    baseURL: config.apiUrl,
})

const logger = LoggerFactory.createLogger("HttpClient");
axiosClient.interceptors.request.use(requestConfig => {
    requestConfig.headers['X-Request-Start'] = Date.now();
    logger.debug("[REQUEST]", {
        method: requestConfig.method,
        url: requestConfig.url,
        headers: requestConfig.headers,
        params: requestConfig.params,
        data: requestConfig.data,
    })
    const token = ""; // Aquí puedes obtener el token de autenticación si es necesario
    if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    return requestConfig;
}, error => {
    logger.error("[REQUEST]", error);
    return error;
})


axiosClient.interceptors.response.use(response => {
    const start = response.config.headers['X-Request-Start'];
    const duration = start ? Date.now() - start : null;
    logger.debug("[RESPONSE]", {
        status: response.status,
        url: response.config.url,
        headers: response.headers,
        duration: duration !== null ? `${duration}ms` : "unknown",
        data: response.data,
    })
    return response;
}, error => {
    logger.error("[RESPONSE]", error);
    return error;
})




