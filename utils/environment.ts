/**
 * 环境宏定义变量。
 */
export const environment = {
	/** 是否是服务端渲染？ */
	get server() { return process.server; },
	/** 是否是客户端渲染？ */
	get client() { return process.client; },
	/** 是否是生产环境下？ */
	get production() { return process.env.NODE_ENV === "production"; },
	/** 是否是预生产环境下？ */
	get staging() { return import.meta.env.VITE_BACKEND_PROVIDER === "staging"; },
	/** 是否是开发环境下？ */
	get development() { return process.env.NODE_ENV === "development"; },
	/** 是否使用本地运行的后端环境进行开发？ */
	get localBackend() {
		try {
			return import.meta.env.VITE_BACKEND_PROVIDER === "localhost";
		} catch (error) {
			console.error("ERROR", "ERROR in environment.localBackend: ", error);
			return false;
		}
	},
	/** cloudflare 的图片提供者的名字，生产环境时使用 cloudflare-prod，否则使用 cloudflare-stg */
	get cloudflareImageProvider() { return process.env.NODE_ENV === "production" ? "cloudflare-prod" : "cloudflare-stg"; },
	/** Cloudflare MPD 视频清单 URL 模板，其中 "{videoId}" 部分将会被替换为真实的视频 ID，生产和测试时使用不同的 URL */
	get cloudflareStreamVideoMpdUrlTemplate() { return process.env.NODE_ENV === "production" ? "https://customer-yvgxn6arnuae3q89.cloudflarestream.com/{videoId}/manifest/video.mpd" : "https://customer-o9xrvgnj5fidyfm4.cloudflarestream.com/{videoId}/manifest/video.mpd"; }
};



// get backendUrl() {

// 	const isProduction = process.env.NODE_ENV === "production";
// 	const isStaging = process.env.VITE_BACKEND_PROVIDER === "staging";
// 	const isLocalBackend = import.meta.env.VITE_BACKEND_PROVIDER === "localhost"

// 	let backendUrl = "https://localhost:3000/api" // 开发环境，直接代理使用真实后端服务器。

// 	console.log('env', { production, staging, localBackend })

// 	if (localBackend) backendUrl = "https://localhost:9999" // 开发环境，使用本地后端服务器。
// 	if (staging) backendUrl = "https://stg-rosales.kirafile.com" // 预生产环境，使用预生产后端服务器。
// 	if (production) backendUrl = "https://rosales.kirakira.moe" // 生产环境，使用生产后端服务器。

// 	console.log('backendUrl', backendUrl)

// 	return backendUrl;
// 	return process.env.VITE_BACKEND_PROVIDER === "staging" ? "https://stg-rosales.kirafile.com" : "https://rosales.kirakira.moe"
// }
