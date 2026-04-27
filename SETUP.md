# GitHub 셋업 가이드

이 디자인 시스템을 GitHub repo로 호스팅하고 자동화하기 위한 1회성 셋업 안내. 이후엔 md 수정 → push만 하면 됨.

## 1회 셋업 (15분)

### 1. GitHub Repo 생성

1. github.com에서 New repository → 이름 자유 (예: `kim-banjang-design-system`)
2. **Public**으로 생성 (GitHub Pages 무료 사용 위해. Private은 유료 필요)
3. README 등 자동 생성 옵션 모두 체크 해제 (충돌 방지)

### 2. 파일 업로드

로컬 작업 폴더 구조:

```
your-folder/
├── .github/
│   └── workflows/
│       ├── build.yml          ← push 시 자동 빌드·배포
│       └── release.yml        ← 태그 push 시 ZIP 릴리즈
├── design-system/             ← 16개 md 파일 (편집 대상)
│   ├── README.md
│   ├── workflow/
│   ├── tokens/
│   └── ...
├── tokens.css                 ← 실제 토큰 값
├── build.py                   ← HTML 빌드 스크립트
└── design-system.html         ← (자동 생성됨, 첫 push 전엔 있어도 없어도 됨)
```

이걸 git으로 push:

```bash
cd your-folder
git init
git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git
git add .
git commit -m "Initial: design system v0.5.0"
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화

1. Repo → **Settings** → **Pages**
2. Source: **GitHub Actions** 선택 (Branch 선택 X)
3. 저장

이제 push할 때마다 자동으로:
1. `build.py` 실행 → `design-system.html` 재생성
2. `design-system.zip` 생성
3. `https://YOUR_NAME.github.io/YOUR_REPO/`에 배포

첫 배포는 1-2분 소요. Actions 탭에서 진행 상황 확인 가능.

---

## 일상 운영 흐름

### 디자이너 — 시스템 수정

```bash
# md 파일만 수정. build.py는 안 돌려도 됨 (Actions가 알아서 함)
# 예: design-system/tokens/color.md 수정

git add design-system/tokens/color.md
git commit -m "Update color tokens: brand-600 to 0d4aa3"
git push

# 1-2분 후 https://yourname.github.io/repo/ 자동 갱신
```

GitHub web UI에서 직접 편집해도 됨. 더 간단:
1. 사이트에서 파일 클릭 → ✏️ 편집 → 변경 → Commit
2. 자동으로 빌드·배포

### 디자이너 — 버전 릴리즈

새 버전 정식 릴리즈할 땐 git tag 사용:

```bash
# 예: v0.5.0 → v0.6.0 (MINOR — 새 기능 추가)
git tag v0.6.0
git push origin v0.6.0
```

자동으로:
1. `design-system-v0.6.0.zip` 생성
2. GitHub Releases에 첨부
3. CHANGELOG 자동 생성 (커밋 메시지 기반)

기획자에게 공유할 때:
- **최신 ZIP**: `https://yourname.github.io/repo/design-system.zip` (항상 최신)
- **버전 ZIP**: GitHub Releases 페이지에서 v0.6.0 다운로드

### 기획자 — Claude Project에 등록

#### 옵션 A: 사이트에서 다운로드
1. `https://yourname.github.io/repo/` 접속
2. 우상단 **ZIP 다운로드** 클릭 (HTML 사이트 자체 기능)
3. Claude Project knowledge에 업로드

#### 옵션 B: 직접 URL 다운로드
1. `https://yourname.github.io/repo/design-system.zip` 직접 다운로드
2. Claude Project에 업로드

#### 옵션 C: Raw md URL로 등록 (가장 가벼움)
Claude Project가 URL fetch 지원하면 raw md URL 직접 등록:
```
https://yourname.github.io/repo/design-system/workflow/planner.md
https://yourname.github.io/repo/design-system/tokens/color.md
...
```

### 기획자 — 시스템 업데이트 알림 받기

GitHub repo의 **Watch → Custom → Releases** 켜두면 새 버전 릴리즈마다 이메일 알림.

---

## 트러블슈팅

### "Pages site is not yet available"
첫 배포는 1-2분 소요. Actions 탭에서 노란색 ●가 초록색 ✓로 바뀐 후 접속.

### Actions가 빨간색 ✗로 실패
1. Actions 탭에서 실패한 workflow 클릭
2. 에러 로그 확인 (대부분 `build.py` 에러 또는 파일 누락)
3. 로컬에서 `python build.py` 먼저 돌려보고 push

### 디자이너가 Python 없이 GitHub UI에서만 편집할 때
가능. md 파일은 GitHub web 에디터로 직접 편집 → commit → Actions가 자동으로 build.py 실행. Python 로컬 설치 불필요.

### Custom 도메인 연결 (선택)
Settings → Pages → Custom domain에 도메인 입력. CNAME 레코드 설정 필요.

---

## 워크플로우 요약

```
디자이너                      GitHub                       기획자
─────────                    ──────                       ──────
md 파일 수정      ─push─▶    Actions 자동 실행
                              ├─ build.py
                              ├─ HTML 생성
                              └─ ZIP 생성
                                    │
                                    ▼
                              Pages 배포  ─URL 공유─▶    LLM Project에 등록
                                                         프로토타입 도출
                                                              │
                                                              ▼
                              새 버전 태그 ──▶  Releases       개발팀 인계
                              자동 ZIP 보관
```
