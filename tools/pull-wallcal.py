# -*- coding: utf-8 -*-
"""한달(wallcal) 산출물을 projects.sungd.uk 로 옮긴다 — pull-pillbox.py 와 같은 꼴.

원본은 wallcal repo 의 docs/. 글에서 가리킬 것만 골라 public/p/wallcal/ 로 복사한다.

⚠ 위젯 캡처는 **에뮬레이터의 데모 달력**으로 찍는다. 폰 홈 화면을 찍으면 실제 일정이
   그대로 공개 저장소에 남는다. 원본을 다시 만드는 절차는 wallcal 의 docs/img/README.md 에.
"""
import pathlib
import shutil
import subprocess

SRC = pathlib.Path.home() / "dev/wallcal"
DOCS = SRC / "docs"
OUT = pathlib.Path(__file__).resolve().parent.parent / "public/p/wallcal"

need = [DOCS / "img/widget-light.png", DOCS / "img/widget-dark.png",
        DOCS / "img/app.png", DOCS / "img/day.png", DOCS / "img/icon.png",
        DOCS / "legend.html"]
missing = [str(p) for p in need if not p.exists()]
if missing:
    raise SystemExit("wallcal 체크아웃이 최신이 아니다 — git pull 부터.\n  없음: "
                     + "\n  없음: ".join(missing))
OUT.mkdir(parents=True, exist_ok=True)


def shrink(src, dst, width):
    shutil.copy2(src, dst)
    subprocess.run(["sips", "--resampleWidth", str(width), str(dst)],
                   check=True, capture_output=True)


# ── 위젯 — 밝을 때·어두울 때. 소개 맨 위 그림은 밝은 판을 쓴다
shrink(DOCS / "img/widget-light.png", OUT / "widget-light.png", 1200)
shrink(DOCS / "img/widget-dark.png", OUT / "widget-dark.png", 1200)
shutil.copy2(OUT / "widget-light.png", OUT / "widget.png")

# ── 화면 — 앱 목록과 그날 시간 축
shrink(DOCS / "img/app.png", OUT / "app.png", 900)
shrink(DOCS / "img/day.png", OUT / "day.png", 300)

# ── 아이콘 — tools/icon.svg 를 규칙대로 그린 것(wallcal 쪽에서 뜬다)
shutil.copy2(DOCS / "img/icon.png", OUT / "icon.png")

# ── 일정 도감 — 종류별로 어떻게 보이는지 한 장
shutil.copy2(DOCS / "legend.html", OUT / "legend.html")

print("wallcal →", OUT)
for p in sorted(OUT.iterdir()):
    print("  ", p.name, f"{p.stat().st_size // 1024}KB")
