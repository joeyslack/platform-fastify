"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const http_adapter_1 = require("@nestjs/core/adapters/http-adapter");
const fastify = require("fastify");
const cors = __importStar(require("fastify-cors"));
const formBody = __importStar(require("fastify-formbody"));
const Reply = __importStar(require("fastify/lib/reply"));
const pathToRegexp = __importStar(require("path-to-regexp"));
class FastifyAdapter extends http_adapter_1.AbstractHttpAdapter {
    constructor(instanceOrOptions = fastify()) {
        const instance = instanceOrOptions &&
            instanceOrOptions.server
            ? instanceOrOptions
            : fastify(instanceOrOptions);
        super(instance);
    }
    listen(port, ...args) {
        return this.instance.listen(port, ...args);
    }
    reply(response, body, statusCode) {
        const isNativeResponse = typeof response.status !== 'function';
        if (isNativeResponse) {
            const fastifyContext = {
                preSerialization: null,
                preValidation: [],
                preHandler: [],
                onSend: [],
                onError: [],
            };
            response = new Reply(response, fastifyContext, {});
        }
        if (statusCode) {
            response.status(statusCode);
        }
        return response.send(body);
    }
    status(response, statusCode) {
        return response.code(statusCode);
    }
    render(response, view, options) {
        return response.view(view, options);
    }
    redirect(response, statusCode, url) {
        const code = statusCode ? statusCode : common_1.HttpStatus.FOUND;
        return response.status(code).redirect(url);
    }
    setErrorHandler(handler) {
        return this.instance.setErrorHandler(handler);
    }
    setNotFoundHandler(handler) {
        return this.instance.setNotFoundHandler(handler);
    }
    getHttpServer() {
        return this.instance.server;
    }
    getInstance() {
        return this.instance;
    }
    register(...args) {
        return this.instance.register(...args);
    }
    inject(...args) {
        return this.instance.inject(...args);
    }
    close() {
        return this.instance.close();
    }
    initHttpServer(options) {
        this.httpServer = this.instance.server;
    }
    useStaticAssets(options) {
        return this.register(load_package_util_1.loadPackage('fastify-static', 'FastifyAdapter.useStaticAssets()', () => require('fastify-static')), options);
    }
    setViewEngine(options) {
        return this.register(load_package_util_1.loadPackage('point-of-view', 'FastifyAdapter.setViewEngine()'), options, () => require('point-of-view'));
    }
    setHeader(response, name, value) {
        return response.header(name, value);
    }
    getRequestMethod(request) {
        return request.raw.method;
    }
    getRequestUrl(request) {
        return request.raw.url;
    }
    enableCors(options) {
        this.register(cors, options);
    }
    registerParserMiddleware() {
        this.register(formBody);
    }
    createMiddlewareFactory(requestMethod) {
        return (path, callback) => {
            const re = pathToRegexp.compile(path);
            const normalizedPath = path === '/*' ? '' : path;
            this.instance.use(normalizedPath, (req, res, next) => {
                const queryParamsIndex = req.originalUrl.indexOf('?');
                const pathname = queryParamsIndex >= 0
                    ? req.originalUrl.slice(0, queryParamsIndex)
                    : req.originalUrl;
                if (!re.apply(pathname + '/') && normalizedPath) {
                    return next();
                }
                if (requestMethod === common_1.RequestMethod.ALL ||
                    req.method === common_1.RequestMethod[requestMethod]) {
                    return callback(req, res, next);
                }
                next();
            });
        };
    }
}
exports.FastifyAdapter = FastifyAdapter;
