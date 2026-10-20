# Streaming Video Generation: Past and Future

中英文静态网页部署包 · 2026-10-20

## 部署

将此目录中的全部文件原样上传到静态网站目录即可。无需安装依赖、执行构建或配置后端，也不需要 API key。

- 中文入口：`index.html`
- 英文入口：`en.html`
- 页首提供中英文切换；可在本地直接打开 HTML 预览。

可以放在网站根目录，也可以放在子目录，例如 `https://your-domain.example/sgf-plus/`。子目录地址应以 `/` 结尾；请让服务器把 `/sgf-plus` 重定向至 `/sgf-plus/`，或直接使用 `/sgf-plus/index.html`。

请保留目录结构，完整上传 `assets/`、`vendor/`、`css/`、`js/`、`blog.css` 和 `ui.js`。替换旧版时同时更新两份 HTML 和样式、脚本，并刷新旧缓存。

## 功能与依赖

图片、KaTeX、数学字体、页面脚本均在包内。引文旁的“译”/“EN”使用原生折叠控件，离线可用。

正文通过 Google Fonts 可选加载网络字体；无法访问时自动使用系统字体，不影响阅读、公式或语言切换。如部署环境不允许外部字体，可删除两份 HTML 中指向 `fonts.googleapis.com` 的那一行样式链接。

HTTPS 环境可使用现代剪贴板接口复制引用；其他环境会尝试兼容复制。如果浏览器仍不允许，会选中引用文本并提示手动复制。页面不包含访问计数、分析埋点或后端请求。

请保留 `vendor/katex/LICENSE`。`manifest.sha256` 可用于核对上传文件完整性。

## English deployment notes

Upload this entire folder to any static host; no build step or backend is required. Chinese entry: `index.html`; English entry: `en.html`. Preserve the relative directory structure. When hosting in a subdirectory, use its trailing-slash URL or an explicit HTML filename.

Images, KaTeX, math fonts, and scripts are included locally. The optional Google Fonts stylesheet falls back to system fonts when unavailable. Translation controls work offline. Citation copying includes a fallback and manual-selection option. No analytics or page-view service is included.
