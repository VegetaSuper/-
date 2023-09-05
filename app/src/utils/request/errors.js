export function rejectError (code, message) {
    switch (code) {
        case 401:
            message = message ?? '认证失败，无法访问系统资源'
            break
        case 403:
            message = message ?? '当前操作没有权限'
            break
        case 404:
            message = message ?? '访问资源不存在'
            break
        case 50000:
            message = message ?? '服务器异常'
            break
        default:
            message = message ?? `【${code}】: 系统未知错误，请反馈给管理员!`
            break
    }
    return message
}