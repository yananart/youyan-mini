/**
 * eslint配置
 * 中文文档 https://cn.eslint.org/docs/user-guide/configuring
 */
module.exports = {
    // 指定脚本的运行环境
    env: {
        // 启用除了 modules 以外的所有 ECMAScript 6 特性
        es6: true,
        // 浏览器环境中的全局变量
        browser: true,
        // Node.js 全局变量和 Node.js 作用域
        node: true,
    },
    // 表示你想使用的额外的语言特性
    ecmaFeatures: {
        modules: true,
    },
    // 解析器选项
    parserOptions: {
        // ECMAScript 版本
        ecmaVersion: 2018,
        // module（如果你的代码是 ECMAScript 模块)
        sourceType: 'module',
    },
    // 脚本在执行期间访问的额外的全局变量
    globals: {
        wx: true,
        App: true,
        Page: true,
        getCurrentPages: true,
        getApp: true,
        Component: true,
        requirePlugin: true,
        requireMiniProgram: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {},
}
