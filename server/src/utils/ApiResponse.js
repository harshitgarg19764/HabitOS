export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }

  static success(data, message = 'Success', statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  static created(data, message = 'Created successfully') {
    return new ApiResponse(201, data, message);
  }

  static paginated(data, pagination, message = 'Success') {
    return {
      success: true,
      statusCode: 200,
      data,
      message,
      pagination,
    };
  }
}
