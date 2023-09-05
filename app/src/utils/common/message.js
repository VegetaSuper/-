import { enqueueSnackbar } from 'notistack'

export function setupMessage () {

    class Message {

        /**
         * 规则：
         * * 文档地址 https://notistack.com/api-reference
         * * loading message只显示一个，新的message会替换正在显示的loading message
         * * loading message不会自动清除，除非被替换成非loading message，非loading message默认2秒后自动清除
         */

        showMessage (type, content, options = {}) {
            if (type === 'loading') {
                return
            }
            const defaultOptions = {
                autoHideDuration: 2000,
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                },
                variant: type
            }

            enqueueSnackbar(content, {
                ...defaultOptions,
                ...options
            })
        }

        //* todo 
        loading (content) {
            this.showMessage('loading', content, { autoHideDuration: 0 })
        }

        success (content, options = {}) {
            this.showMessage('success', content, options)
        }

        error (content, options = {}) {
            this.showMessage('error', content, options)
        }

        warning (content, options = {}) {
            this.showMessage('warning', content, options)
        }

        info (content, options = {}) {
            this.showMessage('info', content, options)
        }
    }

    return new Message()

}

// 初始化全局api
export function initWindowApi () {

    window.$message = setupMessage()
}