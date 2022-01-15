export enum HttpStatusCode {
    noContent = 204,
    unathrized = 401
}

export type HttpResponse = {
    statusCode: HttpStatusCode,
    body?:any;
}