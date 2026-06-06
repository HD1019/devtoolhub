// 掘金自动发布 - 简化版：填内容→用户点发布
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTICLE = {
  title: '15个完全免费的开发者在线工具：数据不上传、无需注册',
  tags: '前端,工具,开源,程序员,效率',
  content: `作为一名开发者，我受够了那些嘴上说"免费"、背后却把数据上传到自己服务器的在线工具。

JSON格式化工具把你的API密钥传回后端，图片压缩工具存着你的个人截图，密码生成器理论上能记录你生成的每个密码。

于是我自己做了这一套——**所有处理在浏览器本地完成，数据永远不离开你的电脑。**

不放心？打开F12 Network面板，用任何工具试试，你看不到一个数据上传请求。

## 工具列表

- JSON格式化&验证、图片压缩（Canvas API，不上传）、二维码生成（真实可扫）
- 密码生成器（crypto安全随机）、Base64编解码、UUID生成器
- URL编解码、颜色转换器（HEX↔RGB↔HSL）、Markdown实时预览
- 文本差异对比（LCS算法）、字数统计（中英文）、时间戳转换
- HTML实体编解码、JSON转CSV、Lorem Ipsum生成器
- CSS压缩&格式化、JS压缩&格式化、调色板生成器、正则测试器
- Cron表达式解析、HTTP状态码参考、进制转换器

## 为什么选择全浏览器本地处理

- **隐私零风险**：JSON、图片、密码永远不离开你的浏览器
- **速度极快**：无需等待服务器响应，本地计算即开即用
- **零成本部署**：纯静态HTML文件，GitHub Pages免费托管
- **完全免费**：不需要注册、不限制次数、不弹广告

## 技术实现

Canvas API 处理图片、crypto.getRandomValues() 生成密码和UUID、JSON.parse 本地格式化……全部是浏览器原生API。零框架、零后端、零构建。

👉 在线使用：https://hd1019.github.io/devtoolhub/
📦 GitHub：https://github.com/HD1019/devtoolhub （MIT协议）`
};

(async () => {
  const userDataDir = path.join(__dirname, '..', '.browser-data');
  if (!fs.existsSync(userDataDir)) {
    console.log('❌ 请先运行 node scripts/juejin-login.js');
    process.exit(1);
  }

  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();
  console.log('🌐 打开掘金编辑器...');
  await page.goto('https://juejin.cn/editor/drafts/new', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(4000);

  // Check login
  if (page.url().includes('login') || page.url().includes('signin')) {
    console.log('❌ 登录已过期，请重新运行 login 脚本');
    await browser.close();
    process.exit(1);
  }

  console.log('📝 填入标题...');
  // Try multiple selectors for title
  const titleSelectors = [
    'input[placeholder*="标题"]',
    '.title-input input',
    '[class*="title"] input'
  ];
  for (const sel of titleSelectors) {
    const el = page.locator(sel).first();
    if (await el.count() > 0) {
      await el.click();
      await el.fill(ARTICLE.title);
      console.log('✅ 标题已填入');
      break;
    }
  }

  // Copy content to clipboard and paste
  console.log('📝 填入正文...');
  await page.evaluate((text) => {
    // Find code mirror or textarea
    const cm = document.querySelector('.CodeMirror');
    if (cm && cm.CodeMirror) {
      cm.CodeMirror.setValue(text);
      return;
    }
    const ta = document.querySelector('.bytemd-editor textarea, textarea');
    if (ta) {
      ta.value = text;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    // Last resort: find any large textarea
    const all = document.querySelectorAll('textarea');
    for (const a of all) {
      if (a.offsetHeight > 100) {
        a.value = text;
        a.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }
    }
  }, ARTICLE.content);

  console.log('✅ 标题和正文已填入编辑器！');
  console.log('');
  console.log('📌 现在请在浏览器中完成最后两步：');
  console.log('   1. 添加标签：' + ARTICLE.tags);
  console.log('   2. 选择分类：前端');
  console.log('   3. 点击"发布文章"按钮');
  console.log('');
  console.log('⏳ 浏览器保持打开，发布后可关闭');

  // Keep browser open for user to publish
  await new Promise(() => {});

})().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
