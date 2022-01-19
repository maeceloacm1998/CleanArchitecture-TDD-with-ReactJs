import { HttpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
    data: faker.random.objectElement(),
  status: faker.random.number(),
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockFakeRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe("AxiosHttpClient", () => {
  test("Should call axios is correctly values", async () => {
    const request = mockFakeRequest();

    const sut = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("Should call axios return correctly body", async () => {
    const sut = makeSut();

    const promise = await sut.post(mockFakeRequest());

   expect(promise).toEqual({
       statusCode: mockedAxiosResult.status,
       body: mockedAxiosResult.data
   })
  });
});
