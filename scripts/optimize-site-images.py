"""Optimiza fotos clínicas para servirlas estáticas (sin Image Optimization).

Solo re-encodea a JPEG progresivo SIN reducir resolución ni calidad perceptible.
No procesa backups (*.original.jpg). Preferí grade-clinical-photo.py para retoque.

Uso: .venv-tools/bin/python scripts/optimize-site-images.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
FOTOS = ROOT / "public" / "images" / "fotos-qx"
MAX_EDGE = 2560
QUALITY = 95


def optimize(path: Path) -> None:
    img = Image.open(path).convert("RGB")
    w, h = img.size
    scale = min(1.0, MAX_EDGE / max(w, h))
    if scale < 1:
        img = img.resize(
            (int(w * scale), int(h * scale)),
            Image.Resampling.LANCZOS,
        )
    tmp = path.with_suffix(".tmp.jpg")
    img.save(tmp, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    tmp.replace(path)
    print(f"ok {path.name} -> {img.size[0]}x{img.size[1]} q={QUALITY}")


def main() -> None:
    for path in sorted(FOTOS.glob("*.jpg")):
        if path.name.endswith(".original.jpg"):
            continue
        optimize(path)


if __name__ == "__main__":
    main()
