import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from "@/infra/test";
import { mockFakeRequest } from "@/data/test";
import axios from "axios";

type SutTypes = {
    sut: AxiosHttpClient,
    mockedAxios: jest.Mocked<typeof axios>;
}

jest.mock("axios");

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

    return{
        sut,
        mockedAxios
    }
};

describe("AxiosHttpClient", () => {
  test("Should call axios is correctly values", async () => {
    const request = mockFakeRequest();

    const {sut,mockedAxios} = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should call axios return correctly body", async () => {
    const {sut,mockedAxios} = makeSut();

    const promise = sut.post(mockFakeRequest());

   expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  });
});
