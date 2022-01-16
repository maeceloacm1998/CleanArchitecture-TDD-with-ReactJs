import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from "@/data/protocols/http";


/**
 *Como explicacao, vale ressaltar que o T e R sao utilizado para pasasr valores genericos.  
    Utilizei o T para referenciar ao TIPO do meu body, pois como vamos trablhar com esse metodo para
    fazer qualquer requisicao POST, precisamos SEMPRE passar qual vai ser a tipagem do meu body.

    Utilizei o R para referenciar qual vai ser o tipo da resposta que vou recever dessa requisicao.
*/

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return Promise.resolve(this.response);
  }
}
