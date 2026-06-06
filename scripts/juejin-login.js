// 掘金登录脚本 - 自动检测登录并保存状态
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const userDataDir = path.join(__dirname, '..', '.browser-data');
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  await page.goto('https://juejin.cn/', { waitUntil: 'domcontentloaded' });

  console.log('✅ 浏览器已打开，正在检测登录状态...');
  console.log('📋 如果看到登录页面，请登录你的掘金账号');

  // Wait for login by checking for user avatar, up to 5 minutes
  let loggedIn = false;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(5000);
    const avatar = await page.$('[class*="avatar"] img, .user-avatar, [data-testid="avatar"]');
    const loginBtn = await page.$('text=登录');
    const userMenu = await page.$('[class*="user"]');

    if (avatar || userMenu) {
      if (!loginBtn || !(await loginBtn.isVisible())) {
        loggedIn = true;
        break;
      }
    }
    if (i % 6 === 0) console.log(`⏳ 等待登录中... (${Math.round(i*5/60)}分钟)`);
  }

  if (loggedIn) {
    // Save cookies
    const cookies = await browser.cookies();
    fs.writeFileSync(path.join(__dirname, '..', '.juejin-cookies.json'), JSON.stringify(cookies, null, 2));

    // Also save localStorage
    const storage = await page.evaluate(() => {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = localStorage.getItem(key);
      }
      return items;
    });
    fs.writeFileSync(path.join(__dirname, '..', '.juejin-storage.json'), JSON.stringify(storage, null, 2));

    console.log('✅ 登录成功！认证状态已保存');
    console.log('🚀 现在可以用 node scripts/juejin-post.js 自动发布文章了');
  } else {
    console.log('⚠️ 未检测到登录，超时退出。请重新运行');
  }

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
