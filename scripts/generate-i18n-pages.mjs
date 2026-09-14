import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['final-project.html', 'mini-project.html', 'troubleshooting.html', 'collaboration.html'];
const languages = ['ko', 'zh', 'en'];
const labels = { ko: '한국어', zh: '中文', en: 'English' };

function switcher(lang, page) {
  return `<div class="i18n-switcher" aria-label="Language"><a href="../ko/${page}"${lang === 'ko' ? ' aria-current="page"' : ''}>한국어</a><a href="../zh/${page}"${lang === 'zh' ? ' aria-current="page"' : ''}>中文</a><a href="../en/${page}"${lang === 'en' ? ' aria-current="page"' : ''}>English</a></div>`;
}

for (const page of pages) {
  const source = (await readFile(join(root, page), 'utf8'))
    .replace(/<div class="i18n-switcher"[\s\S]*?<\/div>/g, '');
  for (const lang of languages) {
    let html = source
      .replace('<html lang="ko">', `<html lang="${lang === 'zh' ? 'zh-CN' : lang}">`)
      .replace(/href="assets\//g, 'href="../assets/')
      .replace(/src="assets\//g, 'src="../assets/')
      .replace(/href="index\.html/g, `href="../${lang}/index.html`)
      .replace(/href="final-project\.html/g, `href="../${lang}/final-project.html`)
      .replace(/href="mini-project\.html/g, `href="../${lang}/mini-project.html`)
      .replace(/href="troubleshooting\.html/g, `href="../${lang}/troubleshooting.html`)
      .replace(/href="collaboration\.html/g, `href="../${lang}/collaboration.html`)
      .replace('</head>', '<style>.i18n-switcher{position:fixed;right:24px;top:18px;z-index:1100;display:flex;gap:8px;font-size:12px;font-weight:700}.i18n-switcher a{color:#6E6E73;text-decoration:none;padding:5px 8px;border:1px solid #E5E5E7;border-radius:999px;background:#fff}.i18n-switcher a[aria-current="page"]{color:#0066FF;border-color:#0066FF}@media(max-width:900px){.i18n-switcher{right:16px;top:14px}}</style></head>')
      .replace('</nav>', `${switcher(lang, page)}</nav>`);
    const out = join(root, lang, page);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, html);
  }
}

console.log(`Generated ${pages.length} pages for ${languages.length} languages using the existing Korean content as the structure baseline.`);
