const STATUS_CODE_OK = 200;
const STATUS_CODE_CREATED = 201;
const STATUS_CODE_BAD_REQUEST = 400;

const ERROR_CATEGORY_NOT_FOUND = {
  status: 400,
  message: '"categoryIds" not found',
};

module.exports = {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  ERROR_CATEGORY_NOT_FOUND,
};