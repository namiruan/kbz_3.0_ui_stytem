'''
v2 빌드: 단일 파일 뷰 + 사이드바 라우팅
- 한 번에 한 파일만 본문에 렌더링
- URL hash 라우팅 (공유·북마크 가능)
- 페이지 하단 prev/next
- 우측 TOC (h2/h3 점프)
- 키보드 ← → 단축키
- 부드러운 페이지 전환
'''
import os, json, re

# 스크립트 위치 기준 — 어디서 실행하든 동일하게 작동
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(SCRIPT_DIR, 'design-system')
OUTPUT_HTML = os.path.join(SCRIPT_DIR, 'design-system.html')

FILE_ORDER = [
    ('README.md',                'Overview',     'overview'),
    ('workflow/designer.md',     '🎨 Designer',   'workflow'),
    ('workflow/planner.md',      '🧭 Planner',    'workflow'),
    ('governance/versioning.md', '버전 관리',       'governance'),
    ('governance/_spec.md',      '문서 작성 규칙',  'governance'),
    ('tokens/_index.md',         '아키텍처',       'tokens'),
    ('tokens/_spec.md',          '문서 규칙',      'tokens'),
    ('tokens/color.md',          '색상',           'tokens'),
    ('tokens/space.md',          '공간',           'tokens'),
    ('tokens/typography.md',     '타이포그래피',    'tokens'),
    ('tokens/radius.md',         'Radius',        'tokens'),
    ('tokens/elevation.md',      'Elevation',      'tokens'),
    ('tokens/motion.md',         '모션',           'tokens'),
    ('tokens/icon.md',           '아이콘',         'tokens'),
    ('interaction.md',           '인터랙션',        'interaction'),
    ('adaptation.md',            '반응형·다크모드', 'adaptation'),
    ('product.md',               '제품 패턴',      'product'),
    ('accessibility.md',         '접근성',         'accessibility'),
    ('architecture.md',          '컴포넌트 구조',   'architecture'),
]