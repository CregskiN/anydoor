module.exports = {
    root: process.cwd(), // 进程执行路径 // 可视为根路径
    hostname: '127.0.0.1', // 主机名
    port: 9527,// 端口
    compress: /\.(html|js|css|md)/,// 检索.html / .js / .css / .md 文件名
    cache: { // 配置缓存信息
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true,
    },
};