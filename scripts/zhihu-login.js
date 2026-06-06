// 知乎登录 - 自动保存状态
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
  await page.goto('https://www.zhihu.com/', { waitUntil: 'domcontentloaded' });

  console.log('✅ 浏览器已打开');
  console.log('📋 请在浏览器中登录知乎账号');
  console.log('⏳ 自动检测登录状态...');

  let loggedIn = false;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(5000);
    // Check for user avatar/menu
    const signedIn = await page.$('[class*="AppHeader-profile"], .Profile-link, [data-za-detail-view-element_name="User"]');
    const loginBtn = await page.$('text=登录');

    if (signedIn || (!loginBtn)) {
      // Double check by visiting settings
      await page.goto('https://www.zhihu.com/settings/profile', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      if (!page.url().includes('signin') && !page.url().includes('login')) {
        loggedIn = true;
        break;
      }
    }
    if (i % 6 === 0) console.log(`⏳ 等待登录中... (${Math.round(i*5/60)}分钟)`);
  }

  if (loggedIn) {
    console.log('✅ 知乎登录成功！认证状态已保存');
    console.log('🚀 现在可以用 node scripts/zhihu-post.js 自动发布文章了');
  } else {
    console.log('⚠️ 未检测到登录，超时退出');
  }

  await browser.close();
  process.exit(0);
})().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
