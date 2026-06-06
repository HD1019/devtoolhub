// 掘金自动发布文章脚本
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTICLE = {
  title: '15个完全免费的开发者在线工具——数据不上传、无需注册',
  content: `
作为一名开发者，我受够了那些嘴上说"免费"、背后却把数据上传到自己服务器的在线工具。JSON格式化工具把你的API密钥传回后端，图片压缩工具存着你的个人截图，密码生成器理论上能记录你生成的每个密码。

于是我自己做了一套——**所有处理在浏览器本地完成，数据永远不离开你的电脑。**

不放心？打开F12 Network面板，用任何工具观察——你看不到一个数据上传请求。

## 🔧 工具列表

| 工具 | 核心实现 |
|------|---------|
| JSON格式化&验证 | JSON.parse 本地解析 |
| 图片压缩 | Canvas API，不上传 |
| 二维码生成 | 真实可扫QR码 |
| 密码生成器 | crypto.getRandomValues() |
| Base64编解码 | 文本和文件互转 |
| UUID生成器 | UUID v4批量生成 |
| URL编解码 | encodeURI/Component |
| 颜色转换器 | HEX↔RGB↔HSL互转 |
| Markdown预览 | 实时GFM渲染 |
| 文本差异对比 | LCS算法逐行比对 |
| 字数统计 | 中英文混合计数 |
| 时间戳转换 | Unix秒/毫秒互转 |
| HTML实体编码 | 转义与反转义 |
| JSON转CSV | 一键导出Excel |
| 调色板生成器 | 5种配色方案 |

## 💡 为什么我选择全浏览器本地处理？

1. **隐私零风险**——你的JSON数据、图片、密码永远不会离开浏览器
2. **速度极快**——无需等待服务器响应，本地计算即开即用
3. **零服务器成本**——GH Pages部署，纯静态文件
4. **完全免费**——不需要注册、不限制次数

## 🛠 技术栈

纯HTML/CSS/JS，每个工具一个独立文件，零框架零构建。唯一的第三方依赖是marked.js（Markdown渲染）。

## 🔗 在线体验

👉 [https://hd1019.github.io/devtoolhub/](https://hd1019.github.io/devtoolhub/)

源码：[https://github.com/HD1019/devtoolhub](https://github.com/HD1019/devtoolhub) (MIT协议，欢迎Star)

欢迎体验，尤其欢迎打开Network面板验证隐私。有任何工具需求欢迎提。
`,
  tags: ['前端', '工具', '开源', '程序员', '效率'],
  category: '前端'
};

(async () => {
  const userDataDir = path.join(__dirname, '..', '.browser-data');

  // Check if logged in
  if (!fs.existsSync(userDataDir)) {
    console.log('❌ 请先运行 node scripts/juejin-login.js 登录');
    process.exit(1);
  }

  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  console.log('🌐 打开掘金...');
  await page.goto('https://juejin.cn/creator/content/article', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Check if redirected to login
  const currentUrl = page.url();
  if (!currentUrl.includes('creator')) {
    console.log('❌ 未登录或登录已过期，请重新运行 node scripts/juejin-login.js');
    await browser.close();
    process.exit(1);
  }

  // Wait for editor to load
  console.log('⏳ 等待编辑器加载...');
  await page.waitForTimeout(3000);

  // Fill title
  console.log('📝 填写标题...');
  const titleInput = page.locator('input[placeholder*="输入文章标题"]').first();
  await titleInput.waitFor({ timeout: 15000 });
  await titleInput.click();
  await titleInput.fill(ARTICLE.title);

  // Fill content via markdown editor
  console.log('📝 填写内容...');
  // Try to find the editor area
  const editorArea = page.locator('.bytemd-editor textarea, .markdown-editor textarea, .CodeMirror textarea').first();

  try {
    await editorArea.waitFor({ timeout: 10000 });
    await editorArea.click();
    await editorArea.fill(ARTICLE.content);
  } catch {
    // Fallback: try to paste using clipboard
    console.log('⚠️ 尝试备用输入方式...');
    await page.evaluate((content) => {
      const editor = document.querySelector('.bytemd-editor textarea, .markdown-editor textarea, .CodeMirror textarea');
      if (editor) {
        editor.value = content;
        editor.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, ARTICLE.content);
  }

  // Select category
  console.log('📂 选择分类...');
  try {
    await page.locator('text=分类').first().click();
    await page.waitForTimeout(500);
    await page.locator(`text=${ARTICLE.category}`).first().click();
  } catch { console.log('⚠️ 分类选择跳过'); }

  // Add tags
  console.log('🏷 添加标签...');
  for (const tag of ARTICLE.tags) {
    try {
      const tagInput = page.locator('input[placeholder*="标签"], input[placeholder*="搜索"]').first();
      await tagInput.fill(tag);
      await page.waitForTimeout(800);
      // Click the dropdown option
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
    } catch { console.log(`⚠️ 标签 ${tag} 添加失败`); }
  }

  console.log('✅ 文章填写完成！检查后手动点击"发布"按钮');
  console.log('📌 之后可以关闭浏览器');

})().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
