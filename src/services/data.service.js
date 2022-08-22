import ApiService from "./api.service";

class DataError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const DataService = {
  /**
   * fetchData from api
   *
   * @returns api response
   * @throws DataError
   **/
  async makeRequest(requestData) {
    try {
      const response = await ApiService.customRequest(requestData);
      return response;
    } catch (error) {
      throw new DataError(
        error.response.status,
        error.response.data.message || error.response.data
      );
    }
  },
};

export default DataService;

export { DataService, DataError };
