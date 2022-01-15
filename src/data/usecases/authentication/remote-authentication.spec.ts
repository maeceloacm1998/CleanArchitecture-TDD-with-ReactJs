import { HttpPostClientSpy } from "../../test/moch-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import faker from "faker";

type SutTypes ={
    sut: RemoteAuthentication,
    httpPostClientSpy: HttpPostClientSpy
}


//
const makeSut = (url :string = faker.internet.url()): SutTypes => {
    // MOCK - Podemos dizer que é uma requisicao FAKE para testar o método.
    const httpPostClientSpy = new HttpPostClientSpy();

    // SUT - System under test (Objeto que esta sendo testado.)
    const sut = new RemoteAuthentication(url, httpPostClientSpy);

    return {
        sut,
        httpPostClientSpy
    }
}

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();

    // Partner vai me retornar o metodo testado da vez e um mock
    const {httpPostClientSpy,sut} = makeSut(url);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
