# V3-codex 작업 파일

## 1) 기준 문서
- `reference/DORO_과학문화바우처_AI지침_2026.md`
- `reference/V3_GPT_PRO_보완_작업.pdf`

## 2) V3-codex 반영 범위
- 선정 전 표현 유지: `신청 예정 상품` 기준 문구 유지
- 온라인몰 교구형 톤 강화: `DOROBUS` 중심 문구 제거/완화
- 키트 구매 후 자가학습 UX 보강:
  - `부품 탐정`
  - `안전 퀘스트`
  - `한 단계씩 만들기`
  - `왜 안 되지?` 증상별 해결
  - `과학 원리 실험실`
  - `미션 카드`
  - `나만의 실험 기록장`
  - `완성 인증서`
- `?from=qr` 진입 시 빠른 시작 버튼 제공
- 학습 진행 상태 `localStorage` 저장

## 3) 주요 구현 파일
- `assets/js/kit-data.js`
  - 6개 키트별 학습 데이터(부품/안전퀴즈/조립단계/트러블슈팅/미션/과학원리)
- `assets/js/learning.js`
  - 상세 페이지 공통 학습 모듈 렌더링 및 상태 저장 로직
- `assets/css/style.css`
  - 학습 모듈 전용 UI 스타일(모바일 360px 대응)
- `programs/*/index.html`
  - 학습 모드 TOC 링크 추가
  - `kit-data.js`, `learning.js` 스크립트 연결
- `assets/js/i18n.js`
  - `운영형태` → `학습형태` 라벨 정리
- `index.html`
  - `DOROBUS` 카드 문구를 온라인몰 교구형 문구로 교체

## 4) 확인 포인트
- 상세 페이지 URL 예시:
  - `programs/1-bluetooth-speaker/index.html?from=qr`
  - `programs/2-mood-light/index.html?from=qr`
- 확인 항목:
  - 학습 섹션이 각 상세 페이지에서 노출되는지
  - 체크/퀴즈/미션/기록 저장이 새로고침 후 유지되는지
  - 모바일에서 버튼/카드가 한 줄 폭을 넘지 않는지
  - 언어 토글 사용 시 기존 텍스트 전환이 깨지지 않는지

## 5) 잔여 TODO
- 키트별 실제 부품 이미지 매핑(현재 텍스트 중심)
- 각 키트의 트러블슈팅 문구를 운영팀 검수 문구로 최종 치환
- 인증서 디자인(브랜드 시각 요소) 고도화
