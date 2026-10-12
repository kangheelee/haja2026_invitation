# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

친구들과 하는 밴드("하자밴드") 할로윈 올나잇 파티 홍보용 웹사이트. 빌드 도구 없는 정적 사이트(`index.html` + `styles.css` + `script.js`). 브라우저로 `index.html`을 직접 열거나 `python3 -m http.server`로 확인함.

## 행사 정보 (2026, 확정)

- 타이틀: "LET's HAJA" / 하자있는 하자밴드 올나잇 파티
- 일시: 2026.10.31 (Sat) 20:00 시작 ~ 다음날 새벽
- 장소: 용산 어썸그라운드 — https://naver.me/5V8gEnor
- 참가비: 40,000원
- 컨셉: 할로윈. 할로윈 의상은 선택 (필수 아님)
- 21:00 깜짝 공연
- 베스트 드레서상 있음
- 다음날 새벽까지 Free Drink & Food
- 포스터 문구: "this one's for you", "cheers to tonight", "good drinks & better nights"
- 인스타그램: @band._.haja — https://www.instagram.com/band._.haja/ — 공지사항을 여기에 올림. 팔로우를 요청하고, 문의도 여기로 받음.

- 불참 시 가급적 일찍, 늦어도 24시간 전까지 알려달라는 주의사항이 있음 (사이트 RSVP 섹션, invitation.md 둘 다 들어 있음)
- 참가 신청 폼 (Google Forms): https://forms.gle/m7sKKtDTaMsMQVWb9 — `index.html`(히어로, RSVP, dock 3곳)과 `invitation.md`에 들어 있음. 바꿀 땐 둘 다 바꿀 것.

**아직 정해지지 않은 것** (지어내지 말고, TODO로 남기거나 사용자에게 물어볼 것): 새 장소의 주차/흡연/루프탑 규칙, 정확한 종료 시각, 베스트 드레서 시상 시각.

## 저장소 내 자료

- `haja.JPG` — 올해 포스터. 비주얼 톤의 기준
- `invitation.md` — 초대장 텍스트. 원래 작년(2025.07 트로피칼 컨셉, 신촌) 내용이었고 올해 정보로 업데이트함. 작년 형식(굵게 강조, 주의사항 목록, 시간표)을 유지하되 이모지는 쓰지 않음.
- `DESIGN.md` — 레이아웃과 컴포넌트 원칙 참고 문서. Mistral AI 사이트 분석이라 브랜드 요소는 가져오지 않음.

## 디자인 방향

- **기본 톤은 포스터처럼 어둡게.** 검정 배경에 주황색 포인트를 쓰고, 텍스트는 흰색/오프화이트. DESIGN.md의 밝은 크림 톤은 쓰지 않음.
- 포스터 시그니처 요소: 굵고 둥근 주황색 디스플레이 레터링, 원형(어안렌즈) 사진 크롭, 모서리 주황색 하프톤 점 패턴(CSS `radial-gradient`), 주황색 꽃/별 모양 포인트
- DESIGN.md에서 가져올 것: 타이포 계층과 간격 체계, 8px 버튼 / 12px 카드 radius, 주황색은 주요 CTA에만 쓰기, 페이지 하단 그라데이션 스트라이프 밴드(주황 계열로 변형)
- 할로윈 컨셉은 주황/검정 팔레트 안에서 은근하게 표현. 유치한 클립아트는 쓰지 않음.
- **사이트에 이모지를 쓰지 않음** (사용자가 싫어함). 아이콘이 필요하면 인라인 SVG(꽃 심볼, 화살표, 핀)를 쓰고, 그 외에는 모노 라벨과 번호(01/02/03)로 대신함.
- 히어로는 CSS로 재현하지 않고 진짜 포스터 이미지(`haja.JPG`)를 씀. 하단 정보 띠는 잘라냄(`aspect-ratio: 891/1075`).
- 폰트: Instrument Serif(라틴 디스플레이와 숫자. 한글 글리프가 없으니 한글에는 쓰지 말 것), Pretendard(본문, 한글 제목), JetBrains Mono(라벨, 메타 정보)
- 구성: 티켓(ADMIT ONE), 순서표처럼 점선으로 이은 타임테이블, 번호 매긴 하이라이트, RSVP 섹션 하나만 주황 그라데이션. 하단 고정 버튼(dock)은 히어로를 지나면 나타나고 RSVP가 화면에 보이면 숨김.
- 스크롤 등장 효과는 `.js` 클래스가 있을 때만 숨김 처리함. JS가 실패해도 내용이 사라지지 않게 하기 위함.
- **모바일 전용 세로 레이아웃.** 반응형으로 만들지 않음. 폭이 최대 430px인 한 컬럼이고, 데스크톱에서는 그 컬럼을 가운데 두고 양옆을 검정으로 비워 둠. 멀티컬럼 브레이크포인트는 만들지 않음. 카카오톡/인스타그램으로 링크를 공유하므로 OG 메타 태그가 필요함.
- 색상 토큰은 `styles.css`의 `:root` CSS 변수로 관리함.
- DESIGN.md 수정 후 린트: `npx @google/design.md lint DESIGN.md`
