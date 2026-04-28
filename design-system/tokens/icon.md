---
file: tokens/icon.md
version: 0.4.1
depends-on: tokens/_index.md
---

# 아이콘 시스템


아이콘 크기는 컴포넌트 height와 매칭한다. 한 화면에서 스타일은 하나로 통일한다.

| 토큰 | 크기 | 사용처 |
|------|------|--------|
| `--icon-12` | 12px | 보조 인디케이터(badge 내부, 메타 정보) |
| `--icon-16` | 16px | 기본. md size 컴포넌트(Button, Input) |
| `--icon-20` | 20px | lg size, 단독 아이콘 버튼 |
| `--icon-24` | 24px | xl size, 페이지 헤더, 네비게이션 |

## 스타일 일관성

한 화면에서 outlined 또는 filled 중 하나만 사용한다. 혼용 금지.
선택적 강조 표현(active 상태, 알림)에서만 filled 허용.

## 정렬

- 텍스트와 함께 쓸 때 옵티컬 센터 정렬 (line-height 기준 중앙)
- 아이콘과 텍스트 사이 간격은 `--space-gap-xs`
- 아이콘 색상은 텍스트 색상 상속 (`color: inherit`)

## Do / Don't

```html
<!-- ✅ DO — 텍스트 + 아이콘 -->
<button class="btn btn--md">
  <Icon name="save" size="16" />
  저장
</button>

<!-- ✅ DO — 단독 아이콘 버튼 (aria-label 필수) -->
<button class="btn-icon" aria-label="삭제">
  <Icon name="delete" size="20" />
</button>

<!-- ❌ DON'T — 단독 아이콘 + 라벨 없음 -->
<button><Icon name="delete" /></button>

<!-- ❌ DON'T — 한 화면에 outlined와 filled 혼용 -->
<Icon name="save" variant="outlined" />
<Icon name="delete" variant="filled" />
```

> ⚠️ 단독 아이콘 버튼은 반드시 `aria-label` 또는 `aria-labelledby` 제공.
> 자세한 접근성 요구사항은 `accessibility.md` 참조.
