const ApiErrorNames = {
    UnKnownError: {
        code: -1,
        errmsg: '未知错误'
    },
    UserNotExist: {
        code: 1001,
        errmsg: '用户不存在'
    },
    UserNameNotNull: {
        code: 1002,
        errmsg: '用户名不能为空'
    },
    UserSomeNull: {
        code: 1003,
        errmsg: '填写不全哦！'
    },
    UserSomeError: {
        code: 1004,
        errmsg: '操作失败'
    },
    nullUserId: {
        code: 1005,
        errmsg: 'userId为空'        
    },
    UserSomeNull: {
        code: 2001,
        errmsg: '状态不太对！'
    },
    dbError: {
        code: 3001,
        errmsg: '数据库报错'
    }
}

ApiErrorNames.getErrorInfo = (errorInfo) => {
    if (!errorInfo) {
        errorInfo = ApiErrorNames.UnKnownError;
    }
    return errorInfo;
}
module.exports = ApiErrorNames;