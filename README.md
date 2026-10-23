# 凤阙 · 未央 / LOVE-AND-PSY

原创宫廷互动叙事 Web demo。以《盛世天下》一类作品的分支选择体验为参考，使用自定义世界观、人物和剧情。

你将扮演新任女史沈知微，从一封匿名密信开始，在谋略、胆识与人心之间作出选择。

## 已有功能

- 两条开场路线、54 条完整选择路径、三个结局。
- 实时属性变化、人物图鉴、选择记录。
- 浏览器本地存档、读档和重新开始。
- 桌面与手机自适应页面、阅读亮度切换。

这是文字与 CSS 场景 demo，尚未包含真人视频、音频、云存档或完整长篇剧情。存档仅保存在当前浏览器中。

## 本地开发

需要 Node.js 22.18+（当前环境为 24.19）。

```sh
npm ci --cache /tmp/love-psy-npm-cache
npm run dev
```

```sh
npm test       # 遍历所有剧情路径，检查结局和状态更新
npm run build  # TypeScript 检查与静态生产构建
npm run preview
```

主要文件：`src/story.ts` 为剧情与状态规则，`src/main.ts` 为界面与存档，`src/style.css` 为视觉样式。修改剧情不需要改动渲染器。

## 发布站点

`docs/` 已包含生产构建，可直接用于 GitHub Pages。仓库管理员在 **Settings → Pages → Build and deployment** 选择 **Deploy from a branch**，分支选 **main**，目录选 **/docs**，保存。私有仓库需账户方案支持 Pages；当前集成没有启用 Pages 的权限，因此站点尚未上线。

更新发布产物：

```sh
npm run build
cp -R dist/. docs/
```

将源码和更新后的 `docs` 一起提交。网站实际地址和部署结果以 GitHub Pages 设置为准。

详细调研、技术取舍与验证记录见 [技术选型](research/技术选型.md)。
