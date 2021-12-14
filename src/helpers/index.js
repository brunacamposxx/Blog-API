const STATUS_CODE_OK = 200;
const STATUS_CODE_CREATED = 201;
const STATUS_CODE_BAD_REQUEST = 400;

const postInexistente = {
  status: 404,
  message: '"id" and "userId" are not the same. You are not authorized',
};

module.exports = {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  postInexistente,
};