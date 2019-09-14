import { RequestMethod } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AbstractHttpAdapter } from '@nestjs/core/adapters/http-adapter';
import fastify = require('fastify');
export declare class FastifyAdapter extends AbstractHttpAdapter {
    constructor(instanceOrOptions?: fastify.FastifyInstance<any, any, any> | fastify.ServerOptions | fastify.ServerOptionsAsHttp | fastify.ServerOptionsAsHttp2 | fastify.ServerOptionsAsSecure | fastify.ServerOptionsAsSecureHttp | fastify.ServerOptionsAsSecureHttp2);
    listen(port: string | number, callback?: () => void): any;
    listen(port: string | number, hostname: string, callback?: () => void): any;
    reply(response: any, body: any, statusCode?: number): any;
    status(response: any, statusCode: number): any;
    render(response: any, view: string, options: any): any;
    redirect(response: any, statusCode: number, url: string): any;
    setErrorHandler(handler: Function): any;
    setNotFoundHandler(handler: Function): any;
    getHttpServer<T = any>(): T;
    getInstance<T = any>(): T;
    register(...args: any[]): any;
    inject(...args: any[]): any;
    close(): any;
    initHttpServer(options: NestApplicationOptions): void;
    useStaticAssets(options: {
        root: string;
        prefix?: string;
        setHeaders?: Function;
        send?: any;
    }): any;
    setViewEngine(options: any): any;
    setHeader(response: any, name: string, value: string): any;
    getRequestMethod(request: any): string;
    getRequestUrl(request: any): string;
    enableCors(options: CorsOptions): void;
    registerParserMiddleware(): void;
    createMiddlewareFactory(requestMethod: RequestMethod): (path: string, callback: Function) => any;
}
