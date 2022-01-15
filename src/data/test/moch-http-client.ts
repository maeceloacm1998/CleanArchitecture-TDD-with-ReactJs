import { HttpPostClient, HttpPostParams } from "@/data/usecases/authentication/protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "@/data/usecases/authentication/protocols/http/http-response";

export class HttpPostClientSpy implements HttpPostClient {
    url?: string;
    body?: object;
    response: HttpResponse = {
        statusCode: HttpStatusCode.noContent
    }

    post(params: HttpPostParams ): Promise<HttpResponse> {
        this.url = params.url;
        this.body = params.body;

        return Promise.resolve(this.response);
    }
}