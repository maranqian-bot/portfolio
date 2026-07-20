# Mini Project Content Draft

`mini-project.html`를 다시 만들 때 기준으로 사용할 Mapingo 콘텐츠 초안입니다.  
구조는 `final-project.html`의 섹션 순서를 그대로 따르고, 여기서는 UI가 아니라 내용만 정리합니다.

---

## 0. 사용 가능한 자산

현재 `portfolio-마은재/assets` 폴더에서 확인된 Mapingo 관련 자산:

- `assets/languagemap-home.png`
- `assets/mapingo-preview.mp4`
- `assets/mapingo-preview2.mp4`

현재 없는 자산:

- 실제 설계 문서 캡처
- ERD / 아키텍처 다이어그램 이미지
- AI 코칭 세부 화면 캡처
- 발음 평가 결과 화면 캡처
- 추천 콘텐츠 화면 캡처

정리 기준:

- 지금 바로 쓸 수 있는 실제 자산은 위 3개
- 나머지는 나중에 캡처가 생기면 끼워 넣고, 지금은 텍스트 기준으로 구조만 먼저 확정

---

## 1. Hero

### Eyebrow

`MINI PROJECT · 2026.04 – 2026.05 · 팀 프로젝트`

### Title

`Mapingo`  
`지도 기반 AI 영어 회화 코칭`

### Lead Text

Mapingo는 사용자가 지도에서 고른 실제 장소와 이전 학습 기록을 바탕으로 더 맥락적인 영어 회화 연습을 제공하는 AI 학습 서비스입니다.

저는 이 프로젝트에서 AI Coaching 기능을 맡아 FastAPI 기반 AI 서버 구현, Azure Speech · OpenAI 연동, 그리고 React · Spring · FastAPI 사이의 음성 업로드와 응답 계약 안정화까지 풀스택으로 담당했습니다.

단순히 AI 응답을 보여주는 데서 끝나지 않고, 스크립트 생성 → 음성 녹음 → 발음 평가 → 최종 피드백 → 후속 추천까지 하나의 학습 흐름으로 이어지도록 만드는 데 집중했습니다.

### Tech Pills

- `Python`
- `FastAPI`
- `OpenAI API`
- `Azure Speech`
- `FFmpeg`
- `Java`
- `Spring Boot`
- `React`
- `GitHub Actions`
- `AWS EC2`

### Hero Visual

- 1순위: `assets/mapingo-preview2.mp4`
- 대체: `assets/languagemap-home.png`

### Repo Links

- React: `https://github.com/soo97/languagemap-react`
- Spring: `https://github.com/soo97/languagemap-spring`
- FastAPI: `https://github.com/soo97/languagemap-FastAPI`

---

## 2. Overview

### Section Label

`Overview`

### Section Title

`담당 역할 · AI 흐름 중심`

### Kicker

이 페이지에서는 단순히 서비스 소개를 반복하기보다, 제가 맡은 AI Coaching 흐름을 어떤 기준으로 설계하고 안정화했는지를 중심으로 읽히게 정리합니다.

### Left Block Title

`담당 역할`

### Left Block Bullets

- 장소·학습 이력 기반 AI 회화 스크립트 생성
- LLM 응답 계약 설계 및 JSON 구조 안정화
- Azure Speech 발음 평가 · 한국어 피드백 흐름 구현
- React · Spring · FastAPI 음성 업로드 연동 안정화
- 외부 AI API 오류 대응 · fallback 설계
- GitHub Actions 기반 FastAPI 배포 자동화

### Left Block Highlight

AI 품질만 높이는 것이 아니라, 사용자가 실제로 끝까지 학습 결과를 받을 수 있도록 안정적인 코칭 흐름을 구현했습니다.

### Right Block Title

`설계 중심`

### Right Block Body

Mapingo의 AI Coaching은 OpenAI, Azure Speech, Spring API, React UI가 하나의 사용자 흐름으로 이어져야 했기 때문에 어느 한 단계만 흔들려도 전체 경험이 쉽게 끊길 수 있었습니다. 그래서 Prompt 품질을 높이는 일과 동시에, 응답 형식 계약, 브라우저별 음성 포맷 차이, multipart 업로드 경계, 외부 API timeout과 fallback까지 함께 설계해야 했습니다. 이 프로젝트를 통해 저는 “AI 기능을 만든다”는 일이 결국 “불안정한 외부 시스템을 포함한 전체 사용자 여정을 완성한다”는 일과 같다는 점을 배웠습니다.

---

## 3. Design Assets

### Section Label

`Design Assets`

### Section Title

`설계 산출물`

### Lead

Mapingo의 실제 설계 캡처가 현재 포트폴리오 폴더에 충분히 남아 있지 않기 때문에, 이 섹션은 나중에 실제 캡처를 넣기 전까지 어떤 설계 포인트를 보여줘야 하는지 기준을 먼저 정리하는 용도로 사용합니다.

### Recommended Cards

#### Card 1

- 제목: `Prompt 구조`
- 설명: 장소 정보, 이전 대화, 학습 평가, 개선 목표를 함께 넣어 같은 장소에서도 사용자별로 다른 스크립트가 생성되도록 설계했다는 점을 보여주는 카드
- 이미지 상태: 실제 캡처 없음

#### Card 2

- 제목: `3-서버 연동 흐름`
- 설명: React에서 녹음한 음성이 Spring을 거쳐 FastAPI로 전달되고, Azure Speech와 OpenAI 분석 결과가 다시 하나의 응답으로 합쳐져 화면으로 돌아오는 구조를 보여주는 카드
- 이미지 상태: 실제 캡처 없음

#### Card 3

- 제목: `Fallback 설계`
- 설명: timeout, 빈 응답, JSON 파싱 오류에도 코칭이 완전히 끊기지 않도록 fallback 경로를 둔 설계 기준을 설명하는 카드
- 이미지 상태: 실제 캡처 없음

### Later Image Wishlist

- Prompt 설계 문서 캡처
- AI 코칭 요청/응답 흐름 다이어그램
- FastAPI fallback 로직 설명 캡처

---

## 4. Implementation

### Section Label

`Implementation`

### Section Title

`주요 구현`

### Lead

Mapingo의 AI Coaching은 하나의 기능처럼 보이지만, 실제로는 스크립트 생성, 음성 처리, 최종 피드백과 추천까지 서로 다른 외부 시스템을 거치는 복합 흐름이었습니다. 그래서 구현도 세 개의 묶음으로 나눠 정리하는 편이 가장 자연스럽습니다.

### Card 1

- Kind: `Coaching Script`
- 제목: `맞춤 회화 스크립트와 응답 계약`
- 설명: 같은 장소라도 사용자의 이전 학습 흐름과 개선 목표에 따라 다른 연습이 나오도록 하고, 그 결과가 서비스에서 끝까지 소비될 수 있는 구조로 고정하는 데 집중했습니다.

#### Split A

- Label: `Prompt Design`
- 장소 정보, 이전 대화, 학습 평가, 개선 유형을 Prompt에 포함
- 단어·문법·대화 확장 목표에 따라 스크립트 분기
- 회화 예문이 반복되지 않도록 문맥 기반 입력 구조 설계

#### Split B

- Label: `Response Contract`
- Role · Instruction · Context · Output Format 분리
- LLM 응답 JSON Schema 제약
- Spring DTO와 React 화면이 기대하는 필드 구조 정렬

### Card 2

- Kind: `Speech Flow`
- 제목: `음성 녹음, 발음 평가, 피드백`
- 설명: 브라우저에서 녹음한 음성이 실제 평가 결과와 한국어 피드백까지 이어지도록, 입력 정규화와 업로드 안정화에 많은 시간을 썼습니다.

#### Split A

- Label: `Speech Processing`
- 브라우저 녹음 파일의 FFmpeg 기반 16kHz mono WAV 변환
- Azure Speech STT · TTS · Pronunciation Assessment 연동
- 문제 단어와 한국어 피드백을 포함한 최종 평가 응답 조립

#### Split B

- Label: `Upload Stability`
- MediaRecorder 마지막 chunk 반영 후 파일 확정
- multipart Content-Type · boundary 보존
- 무음, 저레벨 입력, 브라우저별 포맷 차이 대응

### Card 3

- Kind: `Feedback Loop`
- 제목: `최종 피드백과 후속 학습 연결`
- 설명: AI 코칭을 한 번의 결과 화면으로 끝내지 않고, 사용자가 다음 학습으로 자연스럽게 이어지도록 후속 추천까지 포함한 흐름을 구성했습니다.

#### Split A

- Label: `Final Feedback`
- 발음 점수와 recognizedText를 기반으로 한국어 피드백 생성
- problemWords 구조 normalize로 파싱 실패 방지
- 외부 API 실패 시에도 최소 결과를 반환하는 fallback 적용

#### Split B

- Label: `Follow-up Learning`
- 최종 피드백 기반 키워드 추출
- YouTube Data API 추천 콘텐츠 연결
- GitHub Actions 기반 FastAPI EC2 배포 자동화

---

## 5. Representative Screens

### Section Label

`Representative Screens`

### Section Title

`대표 화면`

### Lead

현재 실제 자산이 많지 않기 때문에, 지금은 남아 있는 영상과 메인 화면 이미지를 중심으로 구성하고, 나중에 세부 화면 캡처가 생기면 순서만 유지한 채 교체하는 방식이 가장 좋습니다.

### Immediately Usable Assets

#### Screen 1

- 캡션: `서비스 홈`
- 자산: `assets/languagemap-home.png`

#### Screen 2

- 캡션: `서비스 미리보기`
- 자산: `assets/mapingo-preview.mp4`

#### Screen 3

- 캡션: `AI 코칭 미리보기`
- 자산: `assets/mapingo-preview2.mp4`

### Recommended Future Screens

#### Screen 4

- 캡션: `맞춤 스크립트 생성`
- 필요한 화면: 장소/문맥 기반 대화 스크립트가 생성된 화면

#### Screen 5

- 캡션: `음성 업로드와 발음 평가`
- 필요한 화면: 녹음 업로드 후 발음 점수 또는 평가 결과가 보이는 화면

#### Screen 6

- 캡션: `최종 피드백과 추천`
- 필요한 화면: problemWords, 한국어 피드백, 추천 콘텐츠가 함께 보이는 화면

---

## 6. Impact

### Section Label

`Impact`

### Section Title

`핵심 성과`

### Lead

이 프로젝트에서는 AI를 붙였다는 사실보다, 실제 서비스에서 끊기기 쉬운 흐름을 얼마나 안정적으로 이어 붙였는지가 더 중요한 결과였습니다.

### Group 1

- 그룹명(한글): `AI 응답 품질 · 안정성`
- 그룹명(영문): `Reliability`

#### Item 1

- Metric: `Role · Instruction · Context · Output`
- Delta: `구조화 계약`
- PR: `https://github.com/soo97/languagemap-FastAPI/pull/16`
- 제목: `LLM 응답 구조 안정화`
- 설명: 문자열 배열과 객체 배열이 섞여도 final feedback 응답을 schema 호환 형태로 normalize해, AI 결과가 서비스 파싱 실패로 이어지지 않도록 만들었습니다.

#### Item 2

- Metric: `Azure Speech + OpenAI`
- Delta: `2단계 fallback`
- PR: `https://github.com/soo97/languagemap-FastAPI/pull/14`
- 제목: `외부 AI API 오류에도 코칭 지속`
- 설명: 발음 평가와 최종 피드백 과정에서 timeout이나 파싱 오류가 나도 기본 feedback과 problemWords를 반환해, 코칭 전체가 500으로 중단되지 않게 했습니다.

#### Item 3

- Metric: `WebM → WAV`
- Delta: `입력 정규화`
- PR: `https://github.com/soo97/languagemap-FastAPI/pull/13`
- 제목: `브라우저별 음성 입력 차이 보완`
- 설명: 브라우저마다 다른 녹음 포맷을 FFmpeg 기반 16kHz mono WAV로 표준화하고, Azure 평가 실패 시 STT fallback까지 연결해 실제 학습 흐름이 유지되도록 했습니다.

### Group 2

- 그룹명(한글): `풀스택 연동 · 배포`
- 그룹명(영문): `Delivery`

#### Item 1

- Kind: `React · Spring · FastAPI`
- 제목: `음성 업로드 연동 안정화`
- Key: `multipart 경계 · recorder file 확정`
- PR 1: `https://github.com/soo97/languagemap-react/pull/123`
- PR 2: `https://github.com/soo97/languagemap-spring/pull/152`
- 설명: React에서 마지막 chunk가 반영된 최종 파일만 업로드하고, Spring에서는 원본 multipart content type을 보존해 FastAPI가 실제 음성 형식을 잃지 않도록 정리했습니다.

#### Item 2

- Kind: `Deploy · CI/CD`
- 제목: `FastAPI EC2 배포 자동화`
- Key: `GitHub Actions 기반 배포 흐름`
- PR: `https://github.com/soo97/languagemap-FastAPI/pull/1`
- 설명: FastAPI AI 서버를 수동 실행에만 의존하지 않고, GitHub Actions로 EC2 배포 흐름을 자동화해 AI 기능 수정이 실제 서비스 반영까지 자연스럽게 이어지도록 만들었습니다.

---

## 7. Decisions

### Section Label

`Decisions`

### Section Title

`기술적 의사결정`

### Lead

Mapingo에서는 “AI를 더 똑똑하게 만드는가”만큼이나 “AI가 흔들려도 서비스는 끝까지 동작하는가”를 중요하게 봤습니다. 아래 네 가지 결정은 그 기준을 잘 보여주는 사례입니다.

### Decision 1

- Tradeoff: `자연스러움 vs 서비스 안정성`
- 제목: `Prompt 품질보다 응답 계약을 먼저 고정`
- 본문: LLM은 자연어 모델이라 설명 문장이나 형식 흔들림이 조금만 생겨도 서비스 파싱이 깨질 수 있었습니다. 그래서 먼저 출력 구조를 강하게 제한하고, 그 안에서 내용 품질을 높이는 순서로 접근했습니다.
- 본문: 이렇게 해야 React, Spring, FastAPI가 모두 같은 JSON 계약을 공유할 수 있고, 모델 출력이 조금 흔들려도 전체 사용자 흐름이 무너지지 않습니다.
- Takeaway: `좋은 답변`보다 `서비스가 끝까지 소비할 수 있는 답변`을 우선한 결정

### Decision 2

- Tradeoff: `브라우저별 대응 vs 서버 표준화`
- 제목: `입력 오디오는 서버에서 표준 포맷으로 정규화`
- 본문: 브라우저마다 MediaRecorder 포맷과 codec이 달라 프론트에서 모든 경우를 분기 처리하는 것은 유지보수 비용이 컸습니다. 대신 서버에서 WAV 표준 포맷으로 정규화해 Azure Speech가 안정적으로 받을 수 있는 입력으로 통일했습니다.
- 본문: 이 방식은 클라이언트 복잡도를 낮추고, 같은 입력 보정 기준을 모든 브라우저에 일관되게 적용할 수 있다는 장점이 있었습니다.
- Takeaway: 입력 다양성을 프론트에서 모두 흡수하기보다, 서버 쪽 표준화 파이프라인을 두는 편이 더 운영 가능하다고 판단

### Decision 3

- Tradeoff: `정확성 vs 연속성`
- 제목: `외부 AI API 실패 시 hard fail 대신 graceful fallback`
- 본문: Azure Speech나 OpenAI 호출이 한 번 실패했다고 코칭 전체를 500으로 끊으면, 사용자는 앞 단계에서 이미 말한 내용과 학습 흐름을 모두 잃게 됩니다. 그래서 일부 분석 값이 비더라도 가능한 범위의 결과를 반환하는 쪽을 택했습니다.
- 본문: 로그에는 어느 단계가 실패했는지 남기되, 사용자에게는 최소한의 피드백과 다음 단계 정보를 유지하는 것이 실제 학습 서비스에 더 맞는 방향이라고 봤습니다.
- Takeaway: `모든 값이 완벽해야만 응답한다`보다 `가능한 결과를 끝까지 전달한다`는 기준에서 출발한 결정

### Decision 4

- Tradeoff: `단일 서버 사고 vs 경계 관리`
- 제목: `Spring을 AI 기능의 orchestration 경계로 유지`
- 본문: AI 기능이 FastAPI 안에 많더라도, React가 직접 모든 AI 서버 세부사항을 알도록 만들면 프론트와 AI 서버가 과도하게 강결합됩니다. 그래서 Spring이 공통 API 경계와 도메인 응답 형식을 유지하고, FastAPI는 AI 처리 전담 서버로 분리하는 구조를 유지했습니다.
- 본문: 이렇게 하면 프론트는 비교적 안정적인 계약만 바라보고, FastAPI 쪽 개선이나 fallback 변경도 Spring 경계 안에서 흡수할 수 있습니다.
- Takeaway: AI 기능을 빠르게 붙이는 것보다, 이후 확장과 유지보수가 가능한 경계를 남기는 쪽을 선택

---

## 8. Troubleshooting

### Section Label

`Troubleshooting`

### Section Title

`트러블슈팅`

### Lead

Mapingo에서는 AI 품질 문제보다도, 응답 구조와 음성 업로드처럼 경계면에서 생기는 문제가 서비스 전체를 더 쉽게 흔들었습니다. 아래 두 사례가 그 과정을 가장 잘 보여줍니다.

### Case 1

- 제목: `LLM 응답 형식이 바뀌면 파싱 실패하던 문제`
- 본문: 처음에는 모델 프롬프트만 잘 쓰면 해결될 거라고 생각했지만, 실제로는 OpenAI가 문자열 배열과 객체 배열을 섞어 보내는 순간 FastAPI schema 검증과 Spring DTO 파싱이 함께 흔들릴 수 있었습니다. 그래서 Prompt 정교화만이 아니라 응답 normalize와 schema 호환 보정 로직을 같이 넣어, AI 답변이 조금 흔들려도 서비스가 끝까지 소비할 수 있게 정리했습니다.
- Learned: AI 품질 개선은 프롬프트 한 줄로 끝나는 것이 아니라, 출력 계약과 후처리까지 포함한 시스템 설계 문제라는 점을 배움

### Case 2

- 제목: `브라우저 음성 업로드와 3개 서버 연동이 함께 흔들리던 문제`
- 본문: React에서 정상적으로 녹음이 끝나도 마지막 chunk가 반영되기 전에 파일이 만들어지거나, multipart content type이 중간에서 바뀌면 Spring과 FastAPI 사이에서 업로드가 깨질 수 있었습니다. 이 문제를 해결하는 과정에서 프론트의 recorder 종료 시점, axios multipart 처리, Spring의 content type 보존, FastAPI의 fallback 응답까지 단계별로 다시 맞췄습니다.
- Learned: 문제는 한 군데가 아니라 경계면 여러 곳에 나뉘어 있었고, 로그와 요청 형태를 끝까지 따라가며 전체 흐름으로 봐야만 원인을 정확히 잡을 수 있다는 점을 배움

### Xref

- `troubleshooting.html`의 Mapingo 사례로 연결

---

## 9. Constraint

### Section Label

`Constraint`

### Section Title

`AI 연동의 현실적 제약과 대응`

### Lead

LLM과 음성 API는 품질이 높더라도 입력 편차, timeout, 응답 구조 흔들림 같은 제약이 분명했습니다. 그래서 구현 단계부터 우회 경로를 함께 설계했습니다.

### Card 1

- 제목: `LLM은 자연어 모델이라 형식이 흔들릴 수 있음`
- 설명: Prompt만으로 완벽히 제어하기 어렵기 때문에, 출력 형식 제약과 normalize 로직을 함께 넣어 서비스 파싱 안정성을 먼저 확보했습니다.

### Card 2

- 제목: `브라우저 음성 포맷은 환경마다 다름`
- 설명: WebM, 샘플링 차이, 저레벨 입력처럼 브라우저별 편차를 모두 프론트에서 해결하지 않고, 서버 정규화와 fallback으로 흡수하는 방향을 택했습니다.

### Card 3

- 제목: `외부 AI API는 실패를 전제로 봐야 함`
- 설명: Timeout, 빈 응답, JSON 오류가 발생해도 사용자 흐름을 완전히 끊지 않도록, 단계별 로그와 기본 응답 조합으로 graceful fallback을 설계했습니다.

### Note

AI 기능에서는 `정상 응답을 잘 만든다`만큼 `실패해도 학습 흐름을 유지한다`가 중요하다는 점을 이 프로젝트에서 명확히 배웠습니다.

---

## 10. Collaboration

### Section Label

`Collaboration`

### Section Title

`협업 · 이 프로젝트에서 배운 점`

### Kicker

Mapingo에서는 AI 기능 구현 자체보다도, FastAPI · Spring · React 팀원이 같은 계약을 공유하도록 맞추는 과정에서 협업의 중요성을 더 크게 느꼈습니다.

### Left Card Title

`협업`

### Left Card Bullets

- FastAPI에서 만든 응답 구조가 Spring DTO와 React 화면까지 그대로 이어지도록 PR 단위로 계약을 맞췄습니다.
- 음성 업로드 문제는 프론트, Spring, FastAPI 중 한쪽만 보면 해결되지 않아, 각 서버 로그와 Network 요청 형태를 함께 비교하며 원인을 좁혔습니다.
- 외부 API 오류는 `AI 서버 문제`로만 남기지 않고, 어떤 단계에서 fallback을 둘지 팀 기준으로 맞춰 사용자 경험이 끊기지 않게 정리했습니다.
- 배포와 환경 변수도 개인 로컬 설정에만 의존하지 않도록 GitHub Actions와 README 가이드를 남겨 팀원이 같은 흐름으로 재현할 수 있게 했습니다.

### Right Card Title

`이 프로젝트에서 배운 점`

### Right Card Body

Mapingo를 통해 저는 AI 기능 개발이 단순한 모델 호출이 아니라, 입력 포맷, 응답 계약, 외부 API 실패, 프론트 표시까지 모두 포함한 서비스 설계라는 점을 체감했습니다.

특히 OpenAI나 Azure Speech 같은 외부 서비스는 잘 동작할 때보다 흔들릴 때 더 많은 문제가 드러났고, 그래서 장애를 가정한 fallback과 로그 설계를 먼저 생각하는 습관이 생겼습니다.

또한 FastAPI만 잘 만든다고 기능이 완성되는 것이 아니라, Spring과 React가 같은 기준으로 응답을 이해해야 비로소 사용자 경험이 완성된다는 점을 배웠습니다.

---

## 11. Code & PR

### Section Label

`Code`

### Section Title

`코드 및 PR`

### Lead

Mapingo에서 제가 맡은 AI Coaching 흐름과 연동 안정화 작업 중, 문제 정의와 해결 방식이 잘 드러나는 PR만 추려 연결합니다.

### PR Links

- `최종 피드백 problemWords normalize`
  - `https://github.com/soo97/languagemap-FastAPI/pull/16`
- `발음 평가 fallback 로그 및 graceful fallback`
  - `https://github.com/soo97/languagemap-FastAPI/pull/14`
- `브라우저 음성 포맷 대응 · STT fallback`
  - `https://github.com/soo97/languagemap-FastAPI/pull/13`
- `녹음 파일 최종 확정 후 업로드`
  - `https://github.com/soo97/languagemap-react/pull/123`
- `multipart content type 보존`
  - `https://github.com/soo97/languagemap-spring/pull/152`
- `GitHub Actions EC2 배포 자동화`
  - `https://github.com/soo97/languagemap-FastAPI/pull/1`

### Repo Line

- FastAPI 저장소: `https://github.com/soo97/languagemap-FastAPI`

---

## 12. TOC 순서

`final-project.html`과 동일한 섹션 순서 기준:

1. `개요·역할`
2. `설계 산출물`
3. `주요 구현`
4. `대표 화면`
5. `핵심 성과`
6. `기술 의사결정`
7. `트러블슈팅`
8. `AI 제약 대응`
9. `협업·회고`
10. `코드·PR`

---

## 13. 지금 바로 UI에 넣을 때의 우선순위

### 바로 넣을 수 있는 것

- Hero 전체 문구
- Overview 전체 문구
- Implementation 3개 카드
- Impact 2개 그룹
- Decisions 4개
- Troubleshooting 2개 요약
- Constraint 3개 카드
- Collaboration / Code 섹션
- 실제 자산 3개

### 나중에 보강할 것

- Design Assets 실제 이미지
- Representative Screens의 세부 캡처 3장 이상

### 작업 원칙

- 다음 단계에서는 `final-project.html`의 기존 UI 구조를 최대한 그대로 유지
- 먼저 텍스트와 이미지 매핑만 정확히 반영
- 구조가 안정된 뒤에만 미세한 표현 수정
