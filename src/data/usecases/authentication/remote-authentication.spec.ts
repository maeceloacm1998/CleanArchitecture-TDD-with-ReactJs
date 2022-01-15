import { RemoteAuthentication } from "./remote-authentication";
import { HttpStatusCode } from "./protocols/http/http-response";
import { HttpPostClientSpy } from "@/data/test/moch-http-client";
import { mockAuthentication } from "@/domain/test/moch_authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import faker from "faker";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  // MOCK - Podemos dizer que é uma requisicao FAKE para testar o método.
  const httpPostClientSpy = new HttpPostClientSpy();

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
});
