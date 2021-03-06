import { RemoteAuthentication } from "./remote-authentication";
import { HttpStatusCode } from "../../protocols/http";
import { HttpPostClientSpy } from "@/data/test";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
import { InvalidCredentialsError,UnexpectedError } from "@/domain/errors";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/domain/models";
import faker from "faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  // MOCK - Podemos dizer que é uma requisicao FAKE para testar o método.
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();

  // SUT - System under test (Objeto que esta sendo testado.)
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();

    // Partner vai me retornar o metodo testado da vez e um mock
    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const { httpPostClientSpy, sut } = makeSut();

    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test("Should throw invalid credentials error if HttpPostClient returns 401", async () => {
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {sut,httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathrized
    }

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test("Should throw unexpectedError if HttpPostClient returns 400", async () => {
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {sut,httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpectedError if HttpPostClient returns 500", async () => {
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {sut,httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpectedError if HttpPostClient returns 404", async () => {
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {sut,httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.auth(authenticationParams);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return and AccountModel if HttpPostClient returns 200", async () => {
    //Isso daqui vai me retornar um modelo re resposta da minha requisicao ( accessToken )
    const httpResult = mockAccountModel();
    
    // Recebe os parametros de usuario {email, password}
    const authenticationParams = mockAuthentication();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {sut,httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(authenticationParams);

    expect(account).toEqual(httpResult)
  });

});
