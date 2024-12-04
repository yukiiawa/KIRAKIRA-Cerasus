/**
 * 根据当前环境（开发或生产）返回正确的后端地址
 * @returns 正确的后端地址。
 */
export default function getCorrectUri() {
	/**
	 * URI 必须包含协议头，不建议在结尾添加斜线 '/'
	 * eg. https://localhost:9999
	 *
	 * 请特别注意下方多个 if 判断中，变量 backendUrl 的值被改变的顺序。
	 * 例如，当 staging 或 production 为真时，即使 localBackend 为真，也不会使用本地后端。
	 */

	const { production, staging, localBackend } = environment;

	let backendUrl = "https://localhost:3000/api" // 开发环境，直接代理使用真实后端服务器。

	if (localBackend) backendUrl = "https://localhost:9999" // 开发环境，使用本地后端服务器。
	if (staging) backendUrl = "https://stg-rosales.kirafile.com" // 预生产环境，使用预生产后端服务器。
	if (production) backendUrl = "https://rosales.kirakira.moe" // 生产环境，使用生产后端服务器。

	return backendUrl;
}
