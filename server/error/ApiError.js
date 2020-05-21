const ApiErrorNames = require('./ApiErrorNames');

const ApiError = function(name) {
    Error.call(this);
    let errorInfo = ApiErrorNames.getErrorInfo(name);
    this.code = errorInfo.code;
    this.errmsg = errorInfo.errmsg;
}
ApiError.prototype = Object.create(Error.prototype);

module.exports = ApiError