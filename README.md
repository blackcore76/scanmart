# scanmart# 스캔마트 - AI 장보기 보조 PWA

## 🚀 배포 방법

### GitHub Pages 배포

1. GitHub 저장소 생성
2. 이 폴더의 파일을 모두 업로드
3. Settings → Pages → Source: main branch

### API 키 설정 (중요!)

`index.html`에서 아래 부분을 찾아 실제 API 키로 교체:

```js
const ANTHROPIC_KEY_PLACEHOLDER = '@@ANTHROPIC_KEY@@';
```

→ 아래처럼 변경:

```js
// 방법 1: 직접 삽입 (로컬 테스트용)
const ANTHROPIC_KEY_PLACEHOLDER = 'sk-ant-...실제키...';
```

> ⚠️ 실제 배포 시에는 API 키를 클라이언트에 직접 넣지 말고
> 백엔드 프록시 서버를 통해 호출하는 것을 권장합니다.

## 📱 스마트폰 설치

1. 스마트폰 Chrome으로 배포된 URL 접속
2. 주소창 우측 메뉴 → "홈 화면에 추가"
3. 앱처럼 실행 가능

## 🛠 기능 현황

| 기능 | 상태 |
|------|------|
| PWA 설치 | ✅ |
| 카메라 연결 | ✅ |
| AI OCR (Claude Vision) | ✅ |
| 상품명/가격 자동 추출 | ✅ |
| 장바구니 | ✅ |
| 수량 조절 | ✅ |
| 총액 계산 | ✅ |
| 로컬 저장 | ✅ |
| Firestore 연동 | 🔜 다음 단계 |

## 📁 파일 구조

```
shopping-pwa/
├── index.html      ← 메인 앱
├── manifest.json   ← PWA 설정
├── sw.js           ← 서비스 워커 (오프라인)
├── icon-192.png    ← 앱 아이콘 (직접 추가 필요)
├── icon-512.png    ← 앱 아이콘 (직접 추가 필요)
└── README.md
```

## 다음 단계 (STEP 7)

Firebase 연동:
```js
// firebase.js 추가 예정
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
```