import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = (await readFile(join(root, 'index.html'), 'utf8'))
  .replace(/\s*<meta http-equiv="refresh"[^>]*>/g, '')
  .replace(/\s*<link rel="canonical"[^>]*>/g, '')
  .replace(/\s*<noscript>[\s\S]*?<\/noscript>/g, '')
  .replace(/\s*<script>window\.location\.replace\('ko\/'\);<\/script>/g, '');

const languages = {
  ko: {
    htmlLang: 'ko',
    title: '마은재 | Backend · AI Service Integration 포트폴리오',
    nav: ['About me', '프로젝트', '트러블슈팅', '협업방식'],
    hero: ['안녕하세요,<br>Java/Spring Backend<br><span class="accent">개발자 마은재입니다.</span>', '인증·결제·성능 최적화와 AI 서비스 연동을 구현합니다.'],
    footer: 'Backend · AI Service Integration 포트폴리오'
  },
  zh: {
    htmlLang: 'zh-CN',
    title: 'MA RanQian | Backend · AI Service Integration Portfolio',
    nav: ['关于我', '项目', '问题复盘', '协作方式'],
    hero: ['你好，<br>我是 Java/Spring Backend<br><span class="accent">开发者 MA RanQian。</span>', '我专注于认证、支付、性能优化和 AI 服务集成。'],
    footer: 'Backend · AI Service Integration 作品集'
  },
  en: {
    htmlLang: 'en',
    title: 'MA RanQian | Backend · AI Service Integration Portfolio',
    nav: ['About me', 'Projects', 'Troubleshooting', 'Collaboration'],
    hero: ['Hello,<br>I am a Java/Spring Backend<br><span class="accent">Developer, MA RanQian.</span>', 'I build authentication, payment, performance, and AI service integrations.'],
    footer: 'Backend · AI Service Integration Portfolio'
  }
};

const translations = {
  zh: [
    ['About me', '关于我'], ['파이널 프로젝트', '最终项目'], ['미니 프로젝트', '小组项目'], ['프로젝트 보러가기', '查看项目'], ['프로젝트', '项目'], ['트러블슈팅', '问题复盘'], ['협업방식', '协作方式'],
    ['#집요한 문제해결', '#深入解决问题'], ['#책임감', '#责任感'], ['#안정적인 설계', '#稳定设计'], ['#끊임없는 배움', '#持续学习'],
    ['문제를 깊이 이해하고 안정적으로 만드는 개발', '先理解问题，再稳定地构建解决方案'],
    ['좋은 코드는 빠르게 만들어진 기능보다, 문제를 얼마나 깊이 이해했는지에서 시작된다고 믿습니다.', '我相信，好代码不是从快速堆出功能开始，而是从深入理解问题开始。'],
    ['사용자의 흐름과 도메인을 먼저 살피고, 요구사항을 작고 명확한 단위로 나누어 안정적으로 구현합니다. 빠르게 실행하고 결과를 돌아보며 더 나은 방향으로 개선해 나갑니다.', '我会先理解用户流程和业务领域，把需求拆成小而明确的单元，稳定实现，再根据结果持续改进。'],
    ['프로젝트 보러가기', '查看项目'], ['Tech Stack', '技术栈'], ['Backend', '后端'], ['Frontend', '前端'], ['Collaboration', '协作'], ['Database', '数据库'], ['DevOps', 'DevOps'], ['AI · LLM', 'AI · LLM'], ['Tool', '工具'],
    ['Experience', '经历'], ['코리아IT아카데미', '韩国 IT Academy'], ['클라우드네이티브 & 생성형 AI SaaS 플랫폼 구축 과정 수료', '云原生与生成式 AI SaaS 平台开发课程'], ['한양대학교', '汉阳大学'], ['디지털미디어콘텐츠 전공 석사', '数字媒体内容专业 硕士'], ['재학 중 매 학기 등록금 30% 장학금 수혜', '在读期间每学期获得 30% 学费奖学金'], ['졸업 기수 최우수 논문상 수상', '获得毕业届最佳论文奖'], ['정보미디어 전공 학사', '信息媒体专业 学士'], ['방송영상제작, 미디어콘텐츠, 마케팅커뮤니케이션 등 미디어 관련 과목 이수', '学习广播视频制作、媒体内容和营销传播等课程'], ['중국 전국 대학생 광고예술대회 우수상 수상', '获得中国全国大学生广告艺术大赛优秀奖'],
    ['Projects', '项目'], ['Final Project', '最终项目'], ['Mini Project', '小组项目'], ['페이지 보기', '查看详情'],
    ['클라우드네이티브 &amp; 생성형 AI SaaS 플랫폼 구축 과정 수료', '云原生与生成式 AI SaaS 平台开发课程'],
    ['Java·Spring Boot, React, Docker·AWS, FastAPI·LLM 기반 풀스택 웹 개발, 클라우드 배포 자동화, 생성형 AI 서비스 연동 실습 이수', '学习 Java/Spring Boot、React、Docker/AWS、FastAPI/LLM 全栈开发、云端部署自动化和生成式 AI 服务集成'],
    ['© 2026 · Java, Spring Boot, DB, 배포와 문제 해결', '© 2026 · Java、Spring Boot、数据库、部署与问题解决'], ['닫기', '关闭'], ['확대 이미지', '放大图片'],
    ['구직자는 이력서, 면접, 커리어 진단처럼 여러 준비 단계를 흩어진 도구로 해결해야 합니다. CareerWave는 이 흐름을 한 서비스 안에서 연결해 AI 기반 면접 코칭, 서류 분석, 커리어 진단을 제공하는 것을 목표로 했습니다.<br><br>저는 그중에서도 사용자가 안정적으로 가입하고 인증받고 구독 결제까지 이어질 수 있도록 하는 백엔드 핵심 흐름을 담당했습니다.', '求职者通常需要用多个分散的工具完成简历、面试和职业诊断。CareerWave 试图把这些流程连接在一个服务中，提供 AI 面试辅导、材料分析和职业诊断。<br><br>我负责用户注册、认证、订阅和支付等后端核心流程，确保用户能够稳定完成整个流程。'],
    ['지도에서 고른 실제 장소와 학습 이력을 기반으로 맞춤 회화·음성 연습·발음 평가를 제공하는 AI 영어 학습 서비스입니다.<br><br>저는 AI 회화 코칭 기능을 FastAPI AI 서버부터 Spring 연동, React 프론트까지 풀스택으로 담당했습니다.', 'Mapingo 是一款根据用户选择的真实地点和学习记录，提供个性化对话、语音练习和发音评价的 AI 英语学习服务。<br><br>我负责从 FastAPI AI 服务、Spring 集成到 React 前端的 AI 对话辅导流程。'],
    ['Problem Solving', '问题解决'], ['트러블슈팅 기록으로 보여주는 성장', '用问题复盘展示成长'], ['프로젝트를 진행하며 만난 오류를 재현 조건, 원인 분석, 해결 과정, 검증 결과로 나누어 기록했습니다.', '我把项目中遇到的问题拆分为复现条件、原因分析、解决过程和验证结果。'], ['결과 화면만 확인하지 않고 로그, 요청 값, DB 상태를 함께 보며 문제가 발생한 지점을 좁혀갑니다.', '我不只看结果页面，也会结合日志、请求参数和数据库状态定位问题。'], ['같은 문제가 반복되지 않도록 원인과 확인 기준을 남기는 습관을 포트폴리오에 담았습니다.', '我会记录原因和验证标准，避免同类问题反复出现。'], ['문제 상황과 재현 조건을 먼저 적습니다.', '先记录问题和复现条件。'], ['로그, 요청 값, DB 상태를 기준으로 원인을 좁힙니다.', '根据日志、请求参数和数据库状态缩小原因范围。'], ['수정 후 같은 조건에서 다시 검증합니다.', '修改后在相同条件下重新验证。'],
    ['팀과 함께 일하는 방식', '团队协作方式'], ['브랜치 전략과 커밋 컨벤션을 맞춥니다', '统一分支策略和提交规范'], ['기능 단위 브랜치를 만들고, 작업 범위가 한 PR에 과하게 섞이지 않도록 관리합니다.', '按功能创建分支，避免一个 PR 混入过多工作范围。'], ['커밋 메시지는 변경 의도가 드러나도록 팀 컨벤션에 맞춰 작성합니다.', '按照团队规范编写能体现变更意图的提交信息。'], ['이슈 단위로 작업을 추적합니다', '按 Issue 跟踪工作'], ['구현할 기능, 버그, 개선 사항을 이슈로 나누고 진행 상태와 완료 기준을 남겨 작업 흐름이 보이도록 정리합니다.', '把功能、Bug 和改进拆成 Issue，记录状态和完成标准，让工作流可追踪。'], ['코드리뷰 코멘트로 개선 과정을 남깁니다', '记录 Code Review 改进过程'], ['구현 결과만 공유하지 않고, 리뷰 코멘트와 수정 내역을 함께 기록해 팀 안에서 개선한 과정을 남깁니다.', '不仅分享实现结果，也记录 Review 评论和修改过程。'],
    ['배우고 고민하며, 꾸준히 성장하겠습니다.', '持续学习、思考并成长。'], ['새로운 기술과 낯선 문제에도 주저하지 않고,<br>사용자의 관점에서 더 나은 서비스를 만들어가겠습니다.', '面对新技术和陌生问题不退缩，<br>从用户视角持续构建更好的服务。'], ['GitHub 바로가기', '前往 GitHub'],
    ['풀스택 신입 개발자 포트폴리오', 'Backend · AI Service Integration 作品集']
  ],
  en: [
    ['About me', 'About me'], ['파이널 프로젝트', 'Final Project'], ['미니 프로젝트', 'Mini Project'], ['프로젝트 보러가기', 'View projects'], ['프로젝트', 'Projects'], ['트러블슈팅', 'Troubleshooting'], ['협업방식', 'Collaboration'],
    ['#집요한 문제해결', '#Deep problem solving'], ['#책임감', '#Ownership'], ['#안정적인 설계', '#Reliable design'], ['#끊임없는 배움', '#Continuous learning'],
    ['문제를 깊이 이해하고 안정적으로 만드는 개발', 'Building reliable solutions by understanding the problem deeply'],
    ['좋은 코드는 빠르게 만들어진 기능보다, 문제를 얼마나 깊이 이해했는지에서 시작된다고 믿습니다.', 'I believe good code starts with deeply understanding the problem, not simply shipping features quickly.'],
    ['사용자의 흐름과 도메인을 먼저 살피고, 요구사항을 작고 명확한 단위로 나누어 안정적으로 구현합니다. 빠르게 실행하고 결과를 돌아보며 더 나은 방향으로 개선해 나갑니다.', 'I start with user flows and domain context, break requirements into small clear units, implement reliably, and improve from results.'],
    ['프로젝트 보러가기', 'View projects'], ['Tech Stack', 'Tech Stack'], ['Backend', 'Backend'], ['Frontend', 'Frontend'], ['Collaboration', 'Collaboration'], ['Database', 'Database'], ['DevOps', 'DevOps'], ['AI · LLM', 'AI · LLM'], ['Tool', 'Tools'],
    ['Experience', 'Experience'], ['코리아IT아카데미', 'Korea IT Academy'], ['클라우드네이티브 & 생성형 AI SaaS 플랫폼 구축 과정 수료', 'Cloud Native & Generative AI SaaS Platform Development'], ['한양대학교', 'Hanyang University'], ['디지털미디어콘텐츠 전공 석사', 'M.A. in Digital Media Contents'], ['재학 중 매 학기 등록금 30% 장학금 수혜', 'Received a 30% tuition scholarship every semester'], ['졸업 기수 최우수 논문상 수상', 'Received the best thesis award in the graduating cohort'], ['정보미디어 전공 학사', 'B.A. in Information Media'], ['방송영상제작, 미디어콘텐츠, 마케팅커뮤니케이션 등 미디어 관련 과목 이수', 'Coursework in broadcasting, media contents, and marketing communication'], ['중국 전국 대학생 광고예술대회 우수상 수상', 'Excellence award in the China National College Student Advertising Arts Competition'],
    ['Projects', 'Projects'], ['Final Project', 'Final Project'], ['Mini Project', 'Mini Project'], ['페이지 보기', 'View case study'],
    ['클라우드네이티브 &amp; 생성형 AI SaaS 플랫폼 구축 과정 수료', 'Cloud Native &amp; Generative AI SaaS Platform Development'],
    ['Java·Spring Boot, React, Docker·AWS, FastAPI·LLM 기반 풀스택 웹 개발, 클라우드 배포 자동화, 생성형 AI 서비스 연동 실습 이수', 'Training in Java/Spring Boot, React, Docker/AWS, FastAPI/LLM full-stack development, cloud deployment automation, and generative AI service integration'],
    ['© 2026 · Java, Spring Boot, DB, 배포와 문제 해결', '© 2026 · Java, Spring Boot, databases, deployment, and problem solving'], ['닫기', 'Close'], ['확대 이미지', 'Enlarge image'],
    ['구직자는 이력서, 면접, 커리어 진단처럼 여러 준비 단계를 흩어진 도구로 해결해야 합니다. CareerWave는 이 흐름을 한 서비스 안에서 연결해 AI 기반 면접 코칭, 서류 분석, 커리어 진단을 제공하는 것을 목표로 했습니다.<br><br>저는 그중에서도 사용자가 안정적으로 가입하고 인증받고 구독 결제까지 이어질 수 있도록 하는 백엔드 핵심 흐름을 담당했습니다.', 'Job seekers often use disconnected tools for resumes, interviews, and career diagnosis. CareerWave connects these steps in one service with AI interview coaching, document analysis, and career diagnosis.<br><br>I owned the backend flows for registration, authentication, subscriptions, and payments so users could complete the journey reliably.'],
    ['지도에서 고른 실제 장소와 학습 이력을 기반으로 맞춤 회화·음성 연습·발음 평가를 제공하는 AI 영어 학습 서비스입니다.<br><br>저는 AI 회화 코칭 기능을 FastAPI AI 서버부터 Spring 연동, React 프론트까지 풀스택으로 담당했습니다.', 'Mapingo is an AI English learning service that provides contextual conversation, voice practice, and pronunciation evaluation from real places and learning history.<br><br>I owned the AI coaching flow across the FastAPI AI server, Spring integration, and React frontend.'],
    ['Problem Solving', 'Problem Solving'], ['트러블슈팅 기록으로 보여주는 성장', 'Growth through troubleshooting'], ['프로젝트를 진행하며 만난 오류를 재현 조건, 원인 분석, 해결 과정, 검증 결과로 나누어 기록했습니다.', 'I document project issues as reproduction conditions, root-cause analysis, solution, and verification.'], ['결과 화면만 확인하지 않고 로그, 요청 값, DB 상태를 함께 보며 문제가 발생한 지점을 좁혀갑니다.', 'I narrow down failures using logs, request values, and database state instead of looking only at the final screen.'], ['같은 문제가 반복되지 않도록 원인과 확인 기준을 남기는 습관을 포트폴리오에 담았습니다.', 'I record causes and verification criteria so the same issue does not recur.'], ['문제 상황과 재현 조건을 먼저 적습니다.', 'Write the problem and reproduction conditions first.'], ['로그, 요청 값, DB 상태를 기준으로 원인을 좁힙니다.', 'Narrow the cause using logs, requests, and DB state.'], ['수정 후 같은 조건에서 다시 검증합니다.', 'Re-verify under the same conditions after the fix.'],
    ['팀과 함께 일하는 방식', 'How I collaborate'], ['브랜치 전략과 커밋 컨벤션을 맞춥니다', 'Align branch strategy and commit conventions'], ['기능 단위 브랜치를 만들고, 작업 범위가 한 PR에 과하게 섞이지 않도록 관리합니다.', 'I create feature-focused branches and keep each PR centered on one purpose.'], ['커밋 메시지는 변경 의도가 드러나도록 팀 컨벤션에 맞춰 작성합니다.', 'I follow team conventions so commit messages reveal the intent of each change.'], ['이슈 단위로 작업을 추적합니다', 'Track work by issue'], ['구현할 기능, 버그, 개선 사항을 이슈로 나누고 진행 상태와 완료 기준을 남겨 작업 흐름이 보이도록 정리합니다.', 'I split features, bugs, and improvements into issues with status and completion criteria.'], ['코드리뷰 코멘트로 개선 과정을 남깁니다', 'Make improvements visible through code review'], ['구현 결과만 공유하지 않고, 리뷰 코멘트와 수정 내역을 함께 기록해 팀 안에서 개선한 과정을 남깁니다.', 'I record review comments and follow-up changes, not only the final implementation.'],
    ['배우고 고민하며, 꾸준히 성장하겠습니다.', 'I will keep learning, thinking, and growing.'], ['새로운 기술과 낯선 문제에도 주저하지 않고,<br>사용자의 관점에서 더 나은 서비스를 만들어가겠습니다.', 'I approach new technologies and unfamiliar problems with curiosity,<br>and build better services from the user perspective.'], ['GitHub 바로가기', 'Go to GitHub'],
    ['풀스택 신입 개발자 포트폴리오', 'Backend · AI Service Integration Portfolio']
  ]
};

const habon = {
  ko: `<div class="tl-item"><span class="tl-dot"></span><div class="tl-period">2024.08 — 2025.05</div><h3>(주)하본인터내셔널</h3><p class="tl-role">해외영업·마케팅</p><ul class="tl-list"><li>대만·홍콩 바이어, 브랜드사, 구매·물류·마케팅 부서 사이의 요청과 출고 일정을 조율했습니다.</li><li>견적, 발주, 수출 출고와 고객 요청의 담당자·기한·후속 조치를 관리했습니다.</li><li>브랜드 홍보, 인플루언서 seeding, 마케팅 콘텐츠와 프로모션을 지원했습니다.</li></ul></div>`,
  zh: `<div class="tl-item"><span class="tl-dot"></span><div class="tl-period">2024.08 — 2025.05</div><h3>(주)하본인터내셔널</h3><p class="tl-role">海外营业·营销</p><ul class="tl-list"><li>协调台湾、香港买家、品牌方以及采购、物流、营销部门的需求和出货进度。</li><li>管理报价、订单、出口出货以及客户请求的负责人、期限和后续事项。</li><li>支持品牌宣传、网红 seeding、营销内容和促销活动。</li></ul></div>`,
  en: `<div class="tl-item"><span class="tl-dot"></span><div class="tl-period">2024.08 — 2025.05</div><h3>(주)하본인터내셔널</h3><p class="tl-role">Overseas Sales &amp; Marketing</p><ul class="tl-list"><li>Coordinated requests and shipping schedules across Taiwan/Hong Kong buyers, brands, purchasing, logistics, and marketing teams.</li><li>Tracked owners, deadlines, and follow-ups for quotations, orders, exports, and customer requests.</li><li>Supported brand promotion, influencer seeding, marketing content, and campaigns.</li></ul></div>`
};

function languageMenu(current) {
  return `<div class="i18n-switcher" aria-label="Language"><a href="../ko/index.html"${current === 'ko' ? ' aria-current="page"' : ''}>한국어</a><a href="../zh/index.html"${current === 'zh' ? ' aria-current="page"' : ''}>中文</a><a href="../en/index.html"${current === 'en' ? ' aria-current="page"' : ''}>English</a></div>`;
}

for (const [code, copy] of Object.entries(languages)) {
  let html = source
    .replace('<html lang="ko">', `<html lang="${copy.htmlLang}">`)
    .replace('<title>마은재 | 풀스택 포트폴리오</title>', `<title>${copy.title}</title>`)
    .replace(/<h1>안녕하세요,<br>풀스택 개발자<br><span class="accent">마은재입니다\.<\/span><\/h1>/, `<h1>${copy.hero[0]}</h1>`)
    .replace(/<p class="hero-sub">[\s\S]*?<\/p>/, `<p class="hero-sub">${copy.hero[1]}</p>`)
    .replace(/(<\/nav>)/, `${languageMenu(code)}$1`)
    .replace(/<span><strong>마은재<\/strong> · 풀스택 신입 개발자 포트폴리오<\/span>/, `<span><strong>마은재</strong> · ${copy.footer}</span>`)
    .replaceAll('href="final-project.html"', `href="../${code}/final-project.html"`)
    .replaceAll('href="mini-project.html"', `href="../${code}/mini-project.html"`)
    .replaceAll('href="troubleshooting.html"', `href="../${code}/troubleshooting.html"`)
    .replaceAll('href="collaboration.html"', `href="../${code}/collaboration.html"`)
    .replaceAll('src="assets/', 'src="../assets/');

  for (const [from, to] of [...(translations[code] ?? [])].sort((a, b) => b[0].length - a[0].length)) html = html.split(from).join(to);

  html = html.replace('</head>', `<style>.i18n-switcher{position:fixed;right:24px;top:18px;z-index:1100;display:flex;gap:8px;font-size:12px;font-weight:700}.i18n-switcher a{color:#6E6E73;text-decoration:none;padding:5px 8px;border:1px solid #E5E5E7;border-radius:999px;background:#fff}.i18n-switcher a[aria-current="page"]{color:#0066FF;border-color:#0066FF}@media(max-width:900px){.i18n-switcher{right:16px;top:14px}}</style></head>`);
  html = html.replaceAll('Azure OpenAI', 'Azure Speech');
  html = html.replace(/<span class="tech-chip"><img src="\.\.\/assets\/logos\/langchain\.svg"[^>]*><span>LangChain<\/span><\/span>/g, '');
  const timelineMarker = '<div class="tl-item">\n                <span class="tl-dot"></span>\n                <div class="tl-period">2021.09 — 2024.08</div>';
  html = html.replace(timelineMarker, `${habon[code]}\n            ${timelineMarker}`);
  const out = join(root, code, 'index.html');
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html);
}

console.log('Generated localized homepage prototypes: ko, zh, en');
