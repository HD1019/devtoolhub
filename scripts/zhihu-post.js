// 知乎自动发布文章脚本
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTICLES = [
  {
    title: '做了15个完全免费的开发者在线工具：数据不上传、无需注册，打开即用',
    content: `作为一名全栈开发者，我每天都要和各种小工具打交道——格式化JSON、压缩图片、生成二维码、测试正则表达式……

但市面上的"免费在线工具"有个共性：它们会把你的数据上传到服务器处理。

你不信？下次用任何在线JSON格式化工具时，打开F12 → Network面板，看看你的JSON是不是通过POST请求发到了某个后端。你的API密钥、用户数据、业务逻辑——全都经过第三方服务器。

这让我很不舒服。于是我自己做了一套。

## 核心原则：数据不离开你的浏览器

所有工具都使用浏览器原生API实现：
- Canvas API → 图片压缩（不上传）
- crypto.getRandomValues() → 密码/UUID生成（密码学安全）
- JSON.parse/stringify → JSON处理（纯本地）
- FileReader API → 文件读取（本地访问）

你可以打开Network面板验证——使用任何工具时，看不到任何数据上传请求。

## 20个工具一览

**数据处理类：** JSON格式化&验证、JSON转CSV、Base64编解码、URL编解码、HTML实体编码

**图像文字类：** 图片压缩、二维码生成（真实可扫）、Markdown预览、Lorem Ipsum生成、字数统计

**开发辅助类：** 密码生成器、UUID生成器、颜色转换器、调色板生成器、文本差异对比

**代码处理类：** CSS压缩&格式化、JS压缩&格式化、正则表达式测试器、Cron表达式解析、HTTP状态码参考、进制转换器、时间戳转换

## 技术方案

纯HTML/CSS/JS，零框架、零构建。每个工具一个独立HTML文件，部署在GitHub Pages上，0服务器成本。

唯一的外部依赖是 marked.js（CDN，Markdown渲染）。

🔗 在线使用：https://hd1019.github.io/devtoolhub/
📦 GitHub：https://github.com/HD1019/devtoolhub （MIT协议）

欢迎体验，尤其欢迎打开F12验证隐私。如有好的工具需求也欢迎提。`,
    tags: ['前端开发', '程序员', '效率工具', '开源', 'Web开发']
  }
];

(async () => {
  const userDataDir = path.join(__dirname, '..', '.browser-data');
  if (!fs.existsSync(userDataDir)) {
    console.log('❌ 请先运行 node scripts/juejin-login.js 保存浏览器状态');
    process.exit(1);
  }

  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  const article = ARTICLES[0];

  console.log('🌐 打开知乎创作中心...');
  await page.goto('https://www.zhihu.com/creator/writing', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Check if need to login
  if (page.url().includes('signin') || page.url().includes('login')) {
    console.log('⚠️ 需要登录知乎。请在浏览器中登录知乎账号，登录后将自动继续...');

    // Wait for redirect to creator page
    try {
      await page.waitForURL('**/creator/**', { timeout: 120000 });
    } catch {
      console.log('❌ 登录超时，请手动登录后重试');
      await browser.close();
      process.exit(1);
    }
  }

  console.log('✅ 已进入知乎创作中心');
  await page.waitForTimeout(3000);

  // Fill title
  console.log('📝 填写标题...');
  const titleArea = page.locator('[placeholder*="标题"], .title-input, textarea[placeholder*="输入标题"]').first();
  try {
    await titleArea.waitFor({ timeout: 15000 });
    await titleArea.click();
    await titleArea.fill(article.title);
  } catch {
    console.log('⚠️ 找不到标题输入框，可能需要手动操作');
  }

  // Fill content
  console.log('📝 填写正文...');
  // Zhihu uses a rich text editor, try the contenteditable div
  try {
    const editor = page.locator('[contenteditable="true"], .public-DraftEditor-content, .ql-editor').first();
    await editor.waitFor({ timeout: 10000 });
    await editor.click();

    // Convert markdown to paragraphs for zhihu editor
    const paragraphs = article.content.split('\n\n').filter(Boolean);
    for (const para of paragraphs) {
      await editor.press('Enter');
      // Insert as text (zhihu auto-converts to rich text)
      await page.keyboard.type(para.trim(), { delay: 5 });
      await page.waitForTimeout(200);
    }
  } catch {
    console.log('⚠️ 自动填写内容失败，可能需要手动粘贴');
  }

  console.log('✅ 文章内容已填入编辑器');
  console.log('📌 请检查内容并在浏览器中完成最终发布（设置封面、话题等）');
  console.log('💡 发布后关闭浏览器即可');

})().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
