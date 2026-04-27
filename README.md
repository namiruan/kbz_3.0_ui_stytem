# KBZ 3.0 UI System

KBZ 3.0 UI 시스템 레포지토리입니다.

## 파일 업로드 가이드

### 압축파일 업로드 방법

이 레포지토리는 압축파일(zip, tar.gz 등)을 지원합니다.

**CLI(터미널)를 통한 업로드:**
```bash
git add 파일명.zip
git commit -m "파일 추가"
git push origin main
```

**파일 크기 제한:**
- 일반 git push: 파일당 최대 100MB
- GitHub 웹 UI 업로드: 최대 25MB
- 100MB 초과 파일: Git LFS 사용 필요

### Git LFS 설정 (대용량 압축파일용)

100MB 이상의 압축파일은 Git LFS를 사용하세요:

```bash
git lfs install
git lfs track "*.zip"
git lfs track "*.tar.gz"
git add .gitattributes
git add 파일명.zip
git commit -m "대용량 파일 추가 (LFS)"
git push origin main
```
