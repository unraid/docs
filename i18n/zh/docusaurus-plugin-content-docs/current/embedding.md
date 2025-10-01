# 嵌入 Unraid 文档

在基于 iframe 的体验中加载 Unraid 文档时，请使用以下指南。查询参数涵盖了最常见的配置选项，对于需要动态协调的主机，可以使用可选的 `postMessage` API。

## 必需查询参数

- `embed=1` — 使页面进入特定于 iframe 的呈现调整（隐藏全局导航栏、页脚等）。请在每个嵌入的 URL 上包括此参数。

## 可选查询参数

- `theme=<light|dark>` — 强制初始文档主题，该值将在 iframe 会话中保持不变，因此刷新时主题将保持一致。
- `entry=<path>` — 为 iframe 会话标记逻辑入口点。提供一个绝对的文档路径（例如 `/unraid-os/...`）或完整的文档 URL；嵌入式 UI 显示一个浮动返回图标，将访问者返回到此路径，并在您停留在其上时隐藏自身。如果省略，则默认为第一个加载的 URL。
- `sidebar=1` — 重新启用文档侧边栏和目录，这些在嵌入模式下默认隐藏。

## 会话存储键

iframe界面使用`window.sessionStorage`在浏览器标签开启期间记住状态。通常宿主应用无需与这些键交互，但列出它们以完整性。

| 密钥                        | 用途                     |
| ------------------------- | ---------------------- |
| `unraidDocsIframe`        | 跟踪当前会话是否在iframe中开始。    |
| `unraidDocsTheme`         | 存储最近使用的文档主题以保持一致的重新加载。 |
| `unraidDocsIframeEntry`   | 保存回退按钮的iframe入口路径。     |
| `unraidDocsIframeSidebar` | 标记侧边栏是否被显式启用。          |

宿主可以清除这些键以重置嵌入状态，然后再打开新的iframe会话。

## 示例URL生成器

```js
function buildDocsUrl(path, { theme, entry, sidebar } = {}) {
  const url = new URL(path, "https://docs.unraid.net");
  url.searchParams.set("embed", "1");

  if (theme === "light" || theme === "dark") {
    url.searchParams.set("theme", theme);
  }

  if (entry) {
    url.searchParams.set("entry", entry);
  }

  if (sidebar) {
    url.searchParams.set("sidebar", "1");
  }

  return url.toString();
}
```

## 推荐的宿主流程

1. 决定哪个路由应作为iframe入口点并在加载iframe时通过`entry`传递。
2. 如果希望文档主题立即匹配，请传递当前宿主主题。
3. 仅当宿主布局可以容纳侧边栏所需的更宽视口时，才切换`sidebar=1`。
4. 拆除iframe会话时，选择性地清除会话存储键以在同一标签中启动新会话前删除残余状态。

## 消息API

嵌入的文档提供一个轻量级的`postMessage` API，通过结构化的消息类型报告准备状态、导航和主题更改。所有消息共享形状`{ source: "unraid-docs", type: string, …payload }`，以便宿主快速筛选特定文档流量。

### 从iframe发出的消息

| 类型                         | 负载                                | 用途                     |
| -------------------------- | --------------------------------- | ---------------------- |
| `unraid-docs:ready`        | `{ theme: "light" \\| "dark" }`  | iframe应用其起始主题后触发。      |
| `unraid-docs:theme-change` | `{ theme: "light" \\| "dark" }`  | 每当iframe主题更改时（包括初始发射）。 |
| `unraid-docs:navigation`   | `{ pathname, search, hash, url }` | 每当iframe内导航发生时触发。      |

### iframe接受的命令

| 类型                      | 负载                               | 用途              |
| ----------------------- | -------------------------------- | --------------- |
| `unraid-docs:set-theme` | `{ theme: "light" \\| "dark" }` | 请求更改主题而不需要重新加载。 |

示例宿主处理程序：

```js
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.source !== 'unraid-docs') {
    return;
  }

  if (data.type === 'unraid-docs:theme-change') {
    console.log('文档主题更改为', data.theme);
  }
});

function setIframeTheme(frame, theme) {
  if (!frame.contentWindow) {
    return;
  }

  frame.contentWindow.postMessage({
    source: 'unraid-docs',
    type: 'unraid-docs:set-theme',
    theme,
  }, '*');
}
```

查阅`iframe-test.html`以获取同时练习传出和传入消息的实际示例。

### 遗留兼容性

为了向后兼容，iframe仍然监听`{ type: "theme-update", theme }`，并继续发出历史的`theme-ready`和`theme-changed`消息以及新消息类型。宿主应迁移到结构化`unraid-docs:*` 合约，因为旧活动将在未来的版本中移除。示例测试页面还演示了如何在过渡期间同时广播两种消息格式。
