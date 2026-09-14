import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = (await readFile(join(root, 'final-project.html'), 'utf8'))
  .replace(/<div class="i18n-switcher"[\s\S]*?<\/div>/g, '');
// Generate one locale at a time so reviewed translations are never overwritten.
// Default: English. Pass `--zh` to regenerate only the Chinese page.
const outputLanguages = process.argv.includes('--zh') ? ['zh'] : ['en'];

// Keep the Korean page as the source of truth. Exact text-node replacements preserve
// every section, image, link, metric, and technical evidence in the original page.
const translations = {
  zh: {
    '파이널프로젝트 | CareerWave':'最终项目 | CareerWave','프로젝트':'项目','파이널 프로젝트':'最终项目','미니 프로젝트':'迷你项目','트러블슈팅':'问题排查','협업방식':'协作方式','Final Project · 2026.05 – 2026.07 · 팀 6인':'最终项目 · 2026.05 – 2026.07 · 6人团队','AI 취업 지원 통합 플랫폼':'AI 求职支持综合平台','CareerWave는 IT 취준생을 위한 AI 기반 개인화 취업 준비 플랫폼입니다. 이력서·자기소개서를 등록하면 AI가 서류를 분석해 핵심 역량을 추출하고, 실시간 AI 모의면접으로 면접 데이터를 축적합니다. 이 데이터를 바탕으로 현재 역량에 맞는 채용 공고를 추천하는 선순환 구조를 지향합니다.':'CareerWave 是面向 IT 求职者的 AI 个性化求职准备平台。上传简历和自我介绍后，AI 分析材料并提取核心能力，再通过实时 AI 模拟面试积累面试数据，基于这些数据推荐与当前能力匹配的职位，形成持续优化的闭环。','CareerWave 메인 화면 · career-wave-rgl8bugsx-ma-ranqian.vercel.app':'CareerWave 主页面 · career-wave-rgl8bugsx-ma-ranqian.vercel.app','GitHub 저장소':'GitHub 仓库','담당 역할 · 설계 중심':'负责范围 · 以设计为中心','담당 역할':'负责范围','설계 중심':'以设计为中心','주요 구현':'主要实现','설계 산출물':'设计产出','AWS 아키텍처':'AWS 架构','대표 화면':'代表界面','핵심 성과':'核心成果','대용량 · 배치 성능 개선':'大数据量与批处理性能优化','인증 · 소셜 로그인 보안 강화':'认证与社交登录安全强化','기술적 의사결정':'技术决策','핵심 역량':'核心能力','협업 · 이 프로젝트에서 배운 점':'协作与项目收获','협업':'协作','이 프로젝트에서 배운 점':'项目收获','코드 및 PR':'代码与 PR','개요·역할':'概览·职责','기술 의사결정':'技术决策','협업·회고':'协作·复盘','코드·PR':'代码·PR','마은재':'MA RanQian','풀스택 신입 개발자 포트폴리오':'全栈初级开发者作品集',
    '개인·기업 회원가입 · 약관 동의 증적 · 계정 복구':'个人与企业注册 · 条款同意凭证 · 账户恢复','JWT 인증·세션 관리 · 소셜 로그인':'JWT 认证与会话管理 · 社交登录','구독 생명주기 · Toss 결제 연동 · 관리자 인증':'订阅生命周期 · Toss 支付集成 · 管理员认证','인증 보안 강화 · 자동결제 배치 · 채용공고 성능 최적화':'认证安全强化 · 自动支付批处理 · 招聘列表性能优化','사용자가 가입하고 로그인하고, 다시 계정을 찾고, 결제하고, 구독을 유지하는 핵심 흐름이 실제 서비스 안에서 안정적으로 이어지도록 설계하고 구현했습니다.':'我负责设计并实现注册、登录、找回账户、支付和维持订阅等核心流程，确保它们在真实服务中稳定衔接。','기능을 구현할 때 ‘지금 동작하게’보다 ‘6개월 뒤에도 안전하게 유지되는가’를 먼저 생각했습니다. 인증·결제처럼 민감한 영역에서는 정상 흐름보다 실패와 예외를 먼저 설계에 담았고, 데이터는 성격(사라져도 되는가 / 반드시 남아야 하는가)에 따라 저장 위치와 구조를 나눴습니다.':'实现功能时，我优先考虑“六个月后是否仍能安全维护”，而不只是“现在能否运行”。在认证、支付等敏感领域，我先设计失败与异常路径，并按数据是否可丢失来划分存储位置与结构。','이 과정에서 Claude Code와 Codex로 구현 전 예외 시나리오와 설계 대안을 빠르게 비교했고, PR 단계에서는 CodeRabbit과 팀 리뷰를 함께 활용해 놓친 경계 조건이나 리팩터링 포인트를 더 촘촘하게 점검했습니다. 단순히 코드를 빨리 쓰는 용도가 아니라, 설계 검토와 리뷰 루프 자체를 더 짧고 촘촘하게 만드는 데 AI를 활용했습니다.':'在此过程中，我用 Claude Code 和 Codex 快速比较实现前的异常场景与设计方案，并在 PR 阶段结合 CodeRabbit 和团队评审，检查边界条件与重构点。AI 不只是用来更快写代码，也用于缩短并强化设计评审与反馈闭环。','사용자 요청이 애플리케이션 서버와 데이터베이스로 이어지는 배포 구성을 정리합니다.':'整理用户请求经应用服务器到数据库的部署结构。','회원·구독·결제·이용권·약관 등 전체 도메인의 관계와 상태 전이·삭제 정책을 함께 정리합니다.':'整理会员、订阅、支付、权益和条款等领域的关系、状态流转与删除策略。','회원가입과 계정 복구':'注册与账户恢复','가입 단계에서는 회원 유형에 따라 필요한 검증을 분리하고, 계정 복구에서는 사용자가 다시 서비스로 돌아올 수 있는 안전한 경로를 만드는 데 집중했습니다.':'注册阶段按会员类型拆分必要校验；账户恢复则聚焦于为用户提供安全的回归路径。','개인 회원과 기업 회원의 회원가입 흐름 분리':'拆分个人与企业注册流程','기업 회원 대상 사업자등록번호 검증':'验证企业会员营业执照编号','재직증명서 PDF 업로드 및 S3 저장':'在职证明 PDF 上传并存储到 S3','문서 버전 기준의 약관 동의 증적 저장':'按文档版本保存条款同意凭证','아이디·이메일·휴대폰 번호 중복 사전 차단':'预先阻止账号、邮箱和手机号重复','개인/기업 경로를 나눈 아이디 찾기':'区分个人与企业路径的账号找回','Reset Token 해시 저장 기반 비밀번호 재설정':'基于 Reset Token 哈希存储的密码重置','TTL·실패 횟수 제한을 포함한 복구 방어 로직':'包含 TTL 与失败次数限制的恢复防护逻辑','인증, 세션, 소셜 로그인':'认证、会话与社交登录','로그인 성공 자체보다, 로그인 이후 세션이 어떻게 유지되고 소셜 계정이 기존 회원 정보와 어떻게 연결되는지를 안정적으로 설계하는 데 집중했습니다.':'相比登录成功本身，我更关注登录后的会话如何维持，以及社交账号如何稳定关联既有会员信息。','Access Token · Refresh Token 이중 토큰 구조':'Access Token · Refresh Token 双令牌结构','Redis JTI 블랙리스트 기반 로그아웃 즉시 무효화':'基于 Redis JTI 黑名单的退出即刻失效','Refresh Token SHA-256 해시 저장':'仅存储 Refresh Token 的 SHA-256 哈希','사용자당 5세션 동시 제한':'每位用户最多同时 5 个会话','세션 유휴 타임아웃 적용':'应用会话空闲超时','로그인 IP Rate Limit으로 반복 시도 제어':'通过登录 IP Rate Limit 控制重复尝试','Kakao · Naver · Google 3-provider OAuth 연동':'集成 Kakao、Naver、Google 三方 OAuth','소셜 가입 시 추가 정보 입력 단계 분리':'社交注册时拆分补充信息步骤','기존 회원 계정 연동과 마지막 로그인 방식 안내':'关联既有会员账户并提示上次登录方式','CWE-598 대응을 위한 단기 쿠키 전달 방식 전환':'为应对 CWE-598 切换为短期 Cookie 传递','구독과 결제 정합성':'订阅与支付一致性','결제 성공 이후 구독 상태, 이용권, 사용량이 서로 어긋나지 않도록 구독 생명주기와 결제 결산을 하나의 흐름으로 묶어 다뤘습니다.':'将订阅生命周期与支付结算纳入同一流程，避免支付成功后订阅状态、权益和用量彼此不一致。','플랜 선택, 활성화, 해지, 만료로 이어지는 구독 생명주기':'覆盖套餐选择、激活、取消和到期的订阅生命周期','상품별 무료 1회 이용권 발급 및 소진 관리':'按产品发放并管理一次性免费权益','월 사용량·사용률 조회와 구독 현황 제공':'提供月度用量、使用率和订阅状态查询','결제·구독·이용권·사용량 변경의 단일 트랜잭션 처리':'以单事务处理支付、订阅、权益和用量变更','Toss 실패 이력의 REQUIRES_NEW 독립 저장':'以 REQUIRES_NEW 独立保存 Toss 失败记录','orderId · idempotencyKey · paymentKey 기반 중복 결제 방어':'基于 orderId、idempotencyKey、paymentKey 防止重复支付','billingKey AES 암호화 저장과 직렬화 경로 차단':'AES 加密存储 billingKey，并从序列化路径中排除','개인 회원가입':'个人注册','기업 회원가입 · 재직증명서':'企业注册 · 在职证明','마지막 로그인 방식 안내':'上次登录方式提示','계정 찾기':'找回账户','개인 회원 아이디 찾기':'找回个人账号','기업 회원 아이디 찾기':'找回企业账号','구독 결제':'订阅支付','구독 현황':'订阅状态','구독 · 결제 내역':'订阅与支付记录','약 94% ↓':'约 94% ↓','자동결제 배치 최적화':'自动支付批处理优化','N+1 조회·순차 호출 병목을 배치 선로딩과 멱등키 기반 병렬화로 개선했습니다. 결제 정확도 100% 유지.':'通过批量预加载和基于幂等键的并行化，改善 N+1 查询与串行调用瓶颈；支付准确率保持 100%。','약 99.8% ↓':'约 99.8% ↓','채용공고 딥페이지네이션':'招聘列表深度分页','100만 건 규모의 OFFSET 병목을 커버링 인덱스와 deferred join으로 개선했습니다. API·프론트 계약 유지.':'通过覆盖索引与 deferred join 改善百万级 OFFSET 瓶颈，同时保持 API 与前端契约不变。','약 93% ↓':'约 93% ↓','채용공고 목록 API':'招聘列表 API','반복 집계 쿼리를 Redis 캐시로 분리하고, ACTIVE 공고만 담는 PostgreSQL 부분 인덱스를 적용했습니다.':'将重复聚合查询拆分为 Redis 缓存，并应用仅包含 ACTIVE 职位的 PostgreSQL 部分索引。','JWT · 세션 보안 인프라':'JWT · 会话安全基础设施','로그아웃 즉시 무효화 · 5세션 제한':'退出即刻失效 · 限制 5 个会话','Redis JTI 블랙리스트로 로그아웃 즉시 토큰을 무효화하고, Refresh Token은 SHA-256 해시만 저장했습니다. 로그인 실패 카운트(Redis)와 잠금 상태(DB)를 분리해 저장했습니다.':'通过 Redis JTI 黑名单让令牌退出即刻失效，仅存储 Refresh Token 的 SHA-256 哈希；将登录失败计数（Redis）与锁定状态（DB）分开保存。','소셜 로그인 보안 강화':'社交登录安全强化','CWE-598 차단 · 60초 단기 쿠키':'阻断 CWE-598 · 60 秒短期 Cookie','소셜 콜백에서 access token이 URL에 노출되는 취약점(CWE-598)을 60초·SameSite=Strict 단기 쿠키로 전환해 3개 노출 경로를 차단하고, state는 getAndDelete 원자 처리로 중복 콜백을 막았습니다.':'将社交回调中 access token 暴露在 URL 的漏洞（CWE-598）改为 60 秒、SameSite=Strict 短期 Cookie，阻断 3 条暴露路径；state 通过 getAndDelete 原子处理防止重复回调。','가용성 vs 보안':'可用性 vs 安全性','Redis 장애 시 역할별 장애 정책':'Redis 故障时按角色区分策略','Redis(임시) + DB(권위)':'Redis（临时）+ DB（权威）','편의 vs 노출 위험':'便利性 vs 暴露风险','자동 구현 vs 복합 쿼리 분리':'自动实现 vs 复杂查询拆分','딥페이지네이션 성능 문제':'深度分页性能问题','소셜 로그인 사용자 결제 404 문제':'社交登录用户支付 404 问题','인증·결제·성능 트러블슈팅 전체 기록 보기 →':'查看认证、支付与性能排障完整记录 →','브랜치 전략·커밋·PR·리뷰 협업 방식 자세히 보기 →':'查看分支策略、提交、PR 与评审协作方式 →','요구사항과 역할을 먼저 문서로 맞추고, 변경 사항은 구현 전에 문서에 반영해 팀이 같은 기준으로 작업할 수 있도록 했습니다.':'先通过文档对齐需求与职责，并在实现前记录变更，让团队依据同一标准协作。','Issue 기준 브랜치와 PR 설명을 연결해 변경 의도와 범위를 남겼고, CodeRabbit과 팀 리뷰 피드백을 수정 커밋으로 반영해 논의가如何 적용되었는지 추적 가능하게 유지했습니다.':'将 Issue 对应分支与 PR 说明关联，记录变更意图与范围；把 CodeRabbit 和团队评审反馈落实为修正提交，保持讨论到代码的可追踪性。','프론트와는 Spec, Swagger, DTO, TypeScript 타입을 함께 보며 API 계약을 맞췄고, 인증·과금 도메인 전반에 공통 응답 형식(ApiResponse)을 적용해 재작업 비용을 줄였습니다.':'与前端共同核对 Spec、Swagger、DTO 和 TypeScript 类型以对齐 API 契约，并在认证与计费领域统一使用 ApiResponse，减少返工。','QA에서 발견된 문제는 백엔드만 따로 보지 않고 DB, 로그, 프론트 동작을 함께 확인하며 원인을 좁혀 갔습니다.':'QA 发现的问题不只从后端单独排查，而是结合数据库、日志和前端行为逐步缩小根因。','이 프로젝트를 통해 기능 구현 자체보다, 서비스를 안정적으로 운영하기 위한 설계 기준을 더 분명하게 갖게 되었습니다.':'通过这个项目，我比单纯实现功能更清晰地建立了稳定运营服务的设计标准。','우선 성능과 안정성은 감각적으로 판단하기보다, 로그·실행 계획·응답 시간처럼 재현 가능한 지표를 기반으로 확인해야 한다는 점을 배웠습니다.':'我学到性能与稳定性应以日志、执行计划、响应时间等可复现指标验证，而不是凭感觉判断。','또한 외부 결제사나 소셜 로그인처럼 통제할 수 없는 요소가 포함된 기능일수록 fallback과 예외 대응을 초기 설계 단계부터 함께 고려해야 한다는 점을 체감했습니다.':'我也切身体会到，越是包含外部支付商或社交登录等不可控因素，越要在早期设计中同时考虑 fallback 与异常处理。','특히 인증과 결제처럼 민감한 도메인에서는 정상 흐름을 구현하는 것에 그치지 않고, 실패 상황에서도 서비스 흐름이 끊기지 않도록 설계하는 것이 중요하다는 점을 배웠습니다.':'尤其在认证和支付等敏感领域，不能只实现正常流程，还必须确保失败时服务链路不会中断。','소셜 로그인 결제 404 수정':'修复社交登录支付 404','채용공고 목록 API 성능 최적화':'优化招聘列表 API 性能','세션 유휴 타임아웃 · 다층 방어':'会话空闲超时 · 多层防护','채용공고 딥페이지네이션 개선':'改善招聘列表深度分页','GitHub 프로필':'GitHub 个人主页'
  },
  en: {}
};

Object.assign(translations.zh, {
  '처음부터 로그인 실패 관련 데이터를 한 저장소에 몰아넣기보다, 데이터의 성격을 기준으로 나눠 저장했습니다. 실패 횟수는 TTL로 자동 소멸되어야 하고 쓰기 빈도도 높기 때문에 Redis에 두는 것이 적절했습니다. 반면 계정 잠금 상태는 서버 재시작이나 Redis 장애가 발생해도 유지되어야 하는 권위 데이터이기 때문에 DB에 저장했습니다.':'没有把登录失败相关数据全部放进一个存储，而是按数据性质拆分。失败次数应通过 TTL 自动过期且写入频繁，因此放在 Redis；账户锁定状态即使服务器重启或 Redis 故障也必须保留，所以存入数据库。',
  '이렇게 나누면 Redis가 내려가더라도 이미 잠긴 계정은 계속 잠긴 상태로 유지됩니다. 반대로 실패 횟수처럼 일시적인 데이터는 빠르게 누적하고 자동 정리할 수 있습니다.':'这样即使 Redis 不可用，已锁定账户仍保持锁定；而失败次数这类临时数据可以快速累积并自动清理。',
  '저장소를 기술 스택 기준으로 나눈 것이 아니라, “이 상태가 사라져도 되는가 / 반드시 남아야 하는가”를 기준으로 나눈 결정이었습니다.':'这不是按技术栈划分存储，而是按“该状态能否丢失、是否必须保留”来决定。',
  'billingKey는 노출되면 무단 결제로 이어질 수 있는 고감도 결제 정보였습니다. 단순히 AES로 암호화해 저장하는 것만으로는 충분하지 않다고 봤습니다. 실제 서비스에서는 “암호화는 되어 있지만, 실수로 직렬화되거나 로그에 섞여 나가는” 사고도 충분히 발생할 수 있기 때문입니다.':'billingKey 是一旦暴露就可能导致未授权支付的高敏感支付信息。仅以 AES 加密保存并不足够，真实服务中仍可能发生已加密值被误序列化或混入日志的事故。',
  '그래서 저장 단계에서는 AES 암호화를 적용하고, 코드 구조상으로는 @Getter(AccessLevel.NONE)와 전용 접근 메서드를 사용해 Jackson 직렬화 후보 자체에서 빠지도록 설계했습니다.':'因此在保存阶段使用 AES 加密，并通过 @Getter(AccessLevel.NONE) 与专用访问方法，让它从 Jackson 的序列化候选中结构性排除。',
  '이 결정의 핵심은 “민감정보는 잘 보관하는 것”에서 끝나지 않고, “실수로도 바깥으로 새지 않게 경로를 줄이는 것”까지 포함해야 한다는 점이었습니다.':'这个决定的核心是：敏感信息不仅要妥善保存，还要减少任何可能因误操作泄露到外部的路径。',
  '조회 로직은 모두 같은 방식으로 처리하지 않았습니다. 단순 중복 확인이나 단건 조회는 JPA Repository 메서드로 두고, 기업회원 아이디 찾기처럼 여러 테이블을 묶고 조건이 복잡한 쿼리는 별도의 QueryRepository로 분리했습니다.':'查询逻辑没有全部采用同一种方式。简单重复检查和单条查询使用 JPA Repository 方法；涉及多表和复杂条件的查询则拆分到独立 QueryRepository。',
  '단순 조회까지 모두 복잡한 쿼리 레이어로 밀어 넣으면 코드가 과도하게 무거워지고, 반대로 복합 조인을 전부 메서드 네이밍 기반 Repository에 우겨 넣으면 쿼리 의도가 흐려지고 유지보수가 어려워지기 때문입니다.':'如果把简单查询也全部塞进复杂查询层，代码会过重；如果把复杂连接硬塞进基于方法命名的 Repository，查询意图会模糊且难以维护。',
  '“무조건 하나로 통일”이 아니라 조회의 복잡도에 따라 저장소 역할을 나눈 결정이었습니다.':'这不是强制统一，而是按查询复杂度划分存储层职责。',
  '채용공고 데이터를 100만 건으로 확장한 뒤, 목록 조회 API의 딥페이지 구간에서 응답이 급격히 느려졌습니다. 처음에는 부하 테스트에서 보인 지연을 캐시 문제로 오해해 캐시 동기화 방식으로 접근했지만, 실제로는 OFFSET 자체가 병목의 원인이었습니다. 이후 EXPLAIN ANALYZE를 통해 실행 계획을 다시 확인했고, ACTIVE 공고를 위한 커버링 인덱스와 deferred join 구조를 적용해 문제를 해결했습니다.':'招聘数据扩展到 100 万条后，列表 API 在深分页区间响应急剧变慢。起初我误以为负载测试中的延迟是缓存问题，实际瓶颈来自 OFFSET 本身。通过 EXPLAIN ANALYZE 重新确认执行计划后，应用 ACTIVE 职位覆盖索引与 deferred join 解决了问题。',
  '이 경험을 통해 체감 성능이나 부하 테스트 노이즈만으로 판단하지 않고, 재현 가능한 지표를 기준으로 병목을 찾는 습관이 중요하다는 점을 배웠습니다.':'这段经历让我养成了不凭体感或负载测试噪声判断，而以可复现指标定位瓶颈的习惯。',
  '또 다른 사례는 카카오 로그인 사용자에게만 결제 요청 시 404가 발생하던 문제였습니다. DB를 직접 조회한 결과 소셜 로그인 사용자의 이메일이 비어 있는 경우가 있었고, 주문 생성 과정의 NOT NULL 제약 위반이 중복 요청 처리용 catch 로직에 잘못 흡수되고 있었습니다. 이후 INSERT 전 사전 검증을 추가하고 예외 처리를 분리했으며, 프론트의 상태 코드 분기까지 함께 수정해 문제를 해결했습니다.':'另一个案例是 Kakao 登录用户发起支付时才出现 404。直接查询数据库发现部分社交登录用户邮箱为空，订单创建时的 NOT NULL 约束异常被错误地吸收到重复请求 catch 逻辑中。随后增加 INSERT 前校验、拆分异常处理，并同步修正前端状态码分支。',
  '이 과정을 통해 겉으로 같은 예외처럼 보여도 실제 원인은 다를 수 있으며, 데이터 제약 위반은 사전 검증으로 먼저 차단하는 편이 더 안전하다는 점을 배웠습니다.':'这个过程让我认识到，表面相同的异常可能有不同根因；数据约束违反应优先通过前置校验阻断。',
  'Issue 기준 브랜치와 PR 설명을 연결해 변경 의도와 범위를 남겼고, CodeRabbit과 팀 리뷰 피드백을 수정 커밋으로 반영해 논의가 실제 코드에 어떻게 적용되었는지 추적 가능하게 유지했습니다.':'我将 Issue 对应分支与 PR 说明关联，记录变更意图与范围；把 CodeRabbit 和团队评审反馈落实为修正提交，保持讨论到代码的可追踪性。'
});

Object.assign(translations.zh, {
  '블랙리스트 조회가 실패했을 때 모든 사용자를 일괄 차단하는 방식도 가능했지만, 그렇게 하면 일반 사용자가 대규모로 강제 로그아웃되는 문제가 생길 수 있었습니다. 반대로 모두 허용하면 고권한 계정까지 그대로 통과할 수 있어 위험했습니다.':'黑名单查询失败时可以阻断所有用户，但这会导致大量普通用户被强制退出；全部放行则可能让高权限账户绕过安全检查，风险同样很高。',
  '그래서 일반 사용자는 가용성을 우선해 허용하고, 관리자는 보안을 우선해 거부하는 방식으로 정책을 나눴습니다. 수천 명의 일반 사용자가 한 번에 이탈하는 비용과, 소수 관리자 토큰이 통과했을 때의 위험이 같지 않다고 판단했기 때문입니다.':'因此，普通用户优先保证可用性而放行，管理员则优先保证安全性而拒绝。',
  '이 결정은 “같은 장애라도 모든 사용자에게 같은 정책을 적용해야 하는 것은 아니다”라는 기준에서 출발했습니다.':'这个决定基于一个原则：即使是同一种故障，也不必对所有用户采用相同策略。',
  '로그인 실패 횟수와 계정 잠금 상태 분리 저장':'分开保存登录失败次数与账户锁定状态',
  'billingKey는 암호화 저장을 넘어 직렬화 경로에서 구조적으로 제외':'billingKey 不仅加密保存，还从序列化路径中结构性排除',
  'JPA Repository + QueryRepository 역할 분리':'分离 JPA Repository 与 QueryRepository 职责',
  '딥페이지네이션 성능 문제':'深度分页性能问题','소셜 로그인 사용자 결제 404 문제':'社交登录用户支付 404 问题','ixxveon/career-wave 저장소 보기':'查看 ixxveon/career-wave 仓库'
});

// English is intentionally generated from the Chinese map for the shared structure;
// Korean technical names and metrics remain unchanged where they are proper nouns.
for (const [ko, zh] of Object.entries(translations.zh)) translations.en[ko] = zh;
Object.assign(translations.en, {
  '프로젝트':'Projects','파이널 프로젝트':'Final Project','미니 프로젝트':'Mini Project','트러블슈팅':'Troubleshooting','협업방식':'Collaboration',
  '문제排查':'Troubleshooting','协作方式':'Collaboration','查看认证、支付与性能排障完整记录 →':'View authentication, payment, and performance troubleshooting →','查看分支策略、提交、PR 与评审协作方式 →':'View branch, commit, PR, and review collaboration →','查看 ixxveon/career-wave 仓库':'View ixxveon/career-wave repository','查看项目':'View project','代表界面':'Key screens','主要实现':'Key implementation','设计产出':'Design artifacts','核心成果':'Key outcomes','技术决策':'Technical decisions','协作与项目收获':'Collaboration and lessons learned','负责范围':'Responsibilities','以设计为中心':'Design-led'
});

Object.assign(translations.en, {
  '처음부터 로그인 실패 관련 데이터를 한 저장소에 몰아넣기보다, 데이터의 성격을 기준으로 나눠 저장했습니다. 실패 횟수는 TTL로 자동 소멸되어야 하고 쓰기 빈도도 높기 때문에 Redis에 두는 것이 적절했습니다. 반면 계정 잠금 상태는 서버 재시작이나 Redis 장애가 발생해도 유지되어야 하는 권위 데이터이기 때문에 DB에 저장했습니다.':'I separated login-failure data by its purpose instead of placing everything in one store. Attempt counts belong in Redis because they are high-frequency and should expire by TTL; account-lock state belongs in the database because it must survive restarts and Redis outages.',
  '이렇게 나누면 Redis가 내려가더라도 이미 잠긴 계정은 계속 잠긴 상태로 유지됩니다. 반대로 실패 횟수처럼 일시적인 데이터는 빠르게 누적하고 자동 정리할 수 있습니다.':'This keeps already-locked accounts locked even when Redis is unavailable, while temporary attempt counts can accumulate quickly and be cleaned up automatically.',
  '저장소를 기술 스택 기준으로 나눈 것이 아니라, “이 상태가 사라져도 되는가 / 반드시 남아야 하는가”를 기준으로 나눈 결정이었습니다.':'The split is based on whether a state may disappear or must be retained, rather than on technology preference.',
  'billingKey는 노출되면 무단 결제로 이어질 수 있는 고감도 결제 정보였습니다. 단순히 AES로 암호화해 저장하는 것만으로는 충분하지 않다고 봤습니다. 실제 서비스에서는 “암호화는 되어 있지만, 실수로 직렬화되거나 로그에 섞여 나가는” 사고도 충분히 발생할 수 있기 때문입니다.':'billingKey is highly sensitive payment data: exposure could enable unauthorized charges. AES encryption alone is not sufficient because encrypted values can still be accidentally serialized or logged.',
  '그래서 저장 단계에서는 AES 암호화를 적용하고, 코드 구조상으로는 @Getter(AccessLevel.NONE)와 전용 접근 메서드를 사용해 Jackson 직렬화 후보 자체에서 빠지도록 설계했습니다.':'I applied AES encryption at rest and used @Getter(AccessLevel.NONE) with a dedicated accessor so billingKey is structurally excluded from Jackson serialization candidates.',
  '이 결정의 핵심은 “민감정보는 잘 보관하는 것”에서 끝나지 않고, “실수로도 바깥으로 새지 않게 경로를 줄이는 것”까지 포함해야 한다는 점이었습니다.':'The key principle is to protect sensitive data not only at rest, but also by minimizing every path through which it could leak accidentally.',
  '조회 로직은 모두 같은 방식으로 처리하지 않았습니다. 단순 중복 확인이나 단건 조회는 JPA Repository 메서드로 두고, 기업회원 아이디 찾기처럼 여러 테이블을 묶고 조건이 복잡한 쿼리는 별도의 QueryRepository로 분리했습니다.':'I did not force every read through one pattern: simple duplicate checks and single-row lookups use JPA Repository methods, while multi-table and complex queries use a dedicated QueryRepository.',
  '단순 조회까지 모두 복잡한 쿼리 레이어로 밀어 넣으면 코드가 과도하게 무거워지고, 반대로 복합 조인을 전부 메서드 네이밍 기반 Repository에 우겨 넣으면 쿼리 의도가 흐려지고 유지보수가 어려워지기 때문입니다.':'Putting simple reads into a complex query layer makes the code heavy; forcing complex joins into method-name repositories hides intent and hurts maintainability.',
  '“무조건 하나로 통일”이 아니라 조회의 복잡도에 따라 저장소 역할을 나눈 결정이었습니다.':'This was a complexity-based separation of responsibilities, not an arbitrary push for one uniform approach.',
  '채용공고 데이터를 100만 건으로 확장한 뒤, 목록 조회 API의 딥페이지 구간에서 응답이 급격히 느려졌습니다.':'After expanding job data to one million rows, the listing API slowed sharply on deep pages.',
  '이 경험을 통해 체감 성능이나 부하 테스트 노이즈만으로 판단하지 않고, 재현 가능한 지표를 기준으로 병목을 찾는 습관이 중요하다는 점을 배웠습니다.':'This taught me to locate bottlenecks using reproducible metrics rather than intuition or noisy load-test observations.',
  '또 다른 사례는 카카오 로그인 사용자에게만 결제 요청 시 404가 발생하던 문제였습니다.':'Another issue was a 404 that occurred only when Kakao-login users attempted payment.',
  '이 과정을 통해 겉으로 같은 예외처럼 보여도 실제 원인은 다를 수 있으며, 데이터 제약 위반은 사전 검증으로 먼저 차단하는 편이 더 안전하다는 점을 배웠습니다.':'I learned that identical-looking errors can have different causes, and that data-constraint violations are safer to stop with pre-validation.',
  'Issue 기준 브랜치와 PR 설명을 연결해 변경 의도와 범위를 남겼고, CodeRabbit과 팀 리뷰 피드백을 수정 커밋으로 반영해 논의가 실제 코드에 어떻게 적용되었는지 추적 가능하게 유지했습니다.':'I linked issue branches to PR descriptions, recorded intent and scope, and applied CodeRabbit and team-review feedback as follow-up commits so decisions remained traceable in code.'
});

Object.assign(translations.en, {
  '처음에는 부하 테스트에서 보인 지연을 캐시 문제로 오해해 캐시 동기화 방식으로 접근했지만, 실제로는 OFFSET 자체가 병목의 원인이었습니다. 이후 EXPLAIN ANALYZE를 통해 실행 계획을 다시 확인했고, ACTIVE 공고를 위한 커버링 인덱스와 deferred join 구조를 적용해 문제를 해결했습니다.':'I initially suspected cache synchronization, but OFFSET itself was the bottleneck. EXPLAIN ANALYZE confirmed the plan; a covering index for ACTIVE jobs and deferred join solved the issue.','DB를 직접 조회한 결과 소셜 로그인 사용자의 이메일이 비어 있는 경우가 있었고, 주문 생성 과정의 NOT NULL 제약 위반이 중복 요청 처리용 catch 로직에 잘못 흡수되고 있었습니다. 이후 INSERT 전 사전 검증을 추가하고 예외 처리를 분리했으며, 프론트의 상태 코드 분기까지 함께 수정해 문제를 해결했습니다.':'A database check found missing emails for some social-login users, while a NOT NULL violation was incorrectly absorbed by duplicate-request handling. I added pre-insert validation, separated exception handling, and fixed the frontend status branch.'
});

function apply(html, lang) {
  const map = translations[lang];
  const pairs = Object.entries(map).sort((a,b) => b[0].length - a[0].length);
  for (const [from, to] of pairs) html = html.split(from).join(to);
  // Some entries are chained (Korean source -> Chinese baseline -> English copy).
  // Run the table twice so the second pass resolves those intermediate values.
  for (const [from, to] of pairs) html = html.split(from).join(to);
  if (lang === 'en') {
    const enTerms = {
      '最终项目 · 2026.05 – 2026.07 · 6人团队':'Final Project · 2026.05 – 2026.07 · 6-person team','AI 求职支持综合平台':'AI Career Support Platform','GitHub 仓库':'GitHub repository','个人与企业注册 · 条款同意凭证 · 账户恢复':'Individual & company signup · consent evidence · account recovery','JWT 认证与会话管理 · 社交登录':'JWT authentication & session management · social login','订阅生命周期 · Toss 支付集成 · 管理员认证':'Subscription lifecycle · Toss payments · admin authentication','认证安全强化 · 自动支付批处理 · 招聘列表性能优化':'Authentication security · automated billing batch · job-list performance','以设计为中心':'Design-led','主要实现':'Key implementation','设计产出':'Design artifacts','AWS 架构':'AWS architecture','注册与账户恢复':'Signup & account recovery','认证、会话与社交登录':'Authentication, sessions & social login','订阅与支付一致性':'Subscription & payment consistency','代表界面':'Key screens','核心成果':'Key outcomes','大数据量与批处理性能优化':'Large-scale and batch performance','自动支付批处理优化':'Automated billing batch optimization','招聘列表深度分页':'Deep pagination for job listings','招聘列表 API':'Job-list API','认证与社交登录安全强化':'Authentication & social-login security','核心能力':'Core capabilities','可用性 vs 安全性':'Availability vs security','Redis 故障时按角色区分策略':'Role-based policy during Redis failures','Redis（临时）+ DB（权威）':'Redis (temporary) + DB (authoritative)','便利性 vs 暴露风险':'Convenience vs exposure risk','自动实现 vs 复杂查询拆分':'Generated queries vs complex-query separation','分离 JPA Repository 与 QueryRepository 职责':'Separate JPA Repository and QueryRepository responsibilities','深度分页性能问题':'Deep-pagination performance issue','社交登录用户支付 404 问题':'404 payment issue for social-login users','协作':'Collaboration','项目收获':'Lessons learned','代码与 PR':'Code & PR','概览·职责':'Overview · responsibilities','协作·复盘':'Collaboration · retrospective','代码·PR':'Code · PR','GitHub 个人主页':'GitHub profile','最终项目':'Final Project','迷你项目':'Mini Project','问题排查':'Troubleshooting','协作方式':'Collaboration','查看项目':'View project','查看详情':'View details','个人注册':'Individual signup','企业注册 · 在职证明':'Company signup · employment certificate','上次登录方式提示':'Last login method','找回账户':'Account recovery','找回个人账号':'Find individual account','找回企业账号':'Find company account','订阅支付':'Subscription payment','订阅状态':'Subscription status','订阅与支付记录':'Subscription & payment history','约 94% ↓':'~94% ↓','约 99.8% ↓':'~99.8% ↓','约 93% ↓':'~93% ↓'
    };
    for (const [from, to] of Object.entries(enTerms)) html = html.split(from).join(to);
  }
  return html
    .replace('<meta charset="utf-8"/>', '<meta charset="utf-8"/><meta http-equiv="Cache-Control" content="no-store"/><meta http-equiv="Pragma" content="no-cache"/>')
    .replace('<html lang="ko">', `<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">`)
    .replace(/<title>.*?<\/title>/, `<title>${lang === 'zh' ? 'CareerWave 最终项目' : 'CareerWave Final Project'}</title>`)
    .replace(/href="assets\//g, 'href="../assets/')
    .replace(/src="assets\//g, 'src="../assets/')
    .replace(/href="index\.html/g, `href="../${lang}/index.html`)
    .replace(/href="final-project\.html/g, `href="../${lang}/final-project.html`)
    .replace(/href="mini-project\.html/g, `href="../${lang}/mini-project.html`)
    .replace(/href="troubleshooting\.html/g, `href="../${lang}/troubleshooting.html`)
    .replace(/href="collaboration\.html/g, `href="../${lang}/collaboration.html`)
    .replace('</head>', '<style>.i18n-switcher{position:fixed;right:24px;top:18px;z-index:1100;display:flex;gap:8px;font-size:12px;font-weight:700}.i18n-switcher a{color:#6E6E73;text-decoration:none;padding:5px 8px;border:1px solid #E5E5E7;border-radius:999px;background:#fff}.i18n-switcher a[aria-current="page"]{color:#0066FF;border-color:#0066FF}.hero-copy{min-width:0}.hero-band .page-hero h1{font-size:clamp(38px,3.4vw,48px);overflow-wrap:anywhere}.hero-band .page-hero h1 .hero-line.nowrap{white-space:normal}.toc{right:40px}@media(max-width:900px){.i18n-switcher{right:16px;top:14px}}</style></head>')
    .replace('</nav>', `<div class="i18n-switcher" aria-label="Language"><a href="../ko/final-project.html">한국어</a><a href="../zh/final-project.html"${lang==='zh'?' aria-current="page"':''}>中文</a><a href="../en/final-project.html"${lang==='en'?' aria-current="page"':''}>English</a></div></nav>`);
}

for (const lang of outputLanguages) {
  await mkdir(join(root, lang), { recursive: true });
  await writeFile(join(root, lang, 'final-project.html'), apply(source, lang));
}
console.log('Generated CareerWave Chinese and English pages without removing source sections.');
