"""Retoque editorial para fotos clínicas del sitio.

Calidez en medios tonos, sombras más profundas y viñeta suave.
Procesa todas las fotos en public/images/fotos-qx/ (excepto *.original.jpg).

Uso:
  .venv-tools/bin/python scripts/grade-clinical-photo.py
  .venv-tools/bin/python scripts/grade-clinical-photo.py --input public/images/fotos-qx/quirofano-sala.jpg
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
FOTOS_DIR = ROOT / "public/images/fotos-qx"
BACKUP_SUFFIX = ".original.jpg"
QUALITY = 95

# Hero: grade sin recorte agresivo (object-cover en viewport).
HERO_FILES = {"quirofano-sala.jpg"}


def vignette(
    img: Image.Image,
    strength: float = 0.26,
    center: tuple[float, float] = (0.46, 0.38),
) -> Image.Image:
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    px = mask.load()
    cx, cy = w * center[0], h * center[1]
    max_dist = ((w * 0.75) ** 2 + (h * 0.75) ** 2) ** 0.5

    for y in range(h):
        for x in range(w):
            dist = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
            t = min(1.0, dist / max_dist)
            px[x, y] = int(255 * (1 - strength * (t**1.45)))

    dark = Image.new("RGB", (w, h), (18, 36, 38))
    return Image.composite(img, dark, mask)


def deepen_shadows(img: Image.Image) -> Image.Image:
    def curve(value: int) -> int:
        x = value / 255.0
        if x < 0.28:
            x *= 0.78
        elif x < 0.55:
            x = 0.28 * 0.78 + (x - 0.28) * 0.96
        elif x > 0.92:
            x = min(1.0, x * 1.015)
        return int(max(0, min(255, x * 255)))

    return img.point(curve)


def warm_grade(img: Image.Image) -> Image.Image:
    r, g, b = img.split()
    r = r.point(lambda v: min(255, int(v * 1.07 + 6)))
    g = g.point(lambda v: max(0, int(v * 0.97 + 2)))
    b = b.point(lambda v: max(0, int(v * 0.93)))
    return Image.merge("RGB", (r, g, b))


def crop_portrait(img: Image.Image) -> Image.Image:
    """Recorte 3:4 para marcos editoriales (About, Consulta)."""
    w, h = img.size
    img = img.crop(
        (int(w * 0.02), int(h * 0.04), int(w * 0.92), int(h * 0.94)),
    )

    cw, ch = img.size
    target_ratio = 3 / 4
    current_ratio = cw / ch
    if current_ratio > target_ratio:
        new_w = int(ch * target_ratio)
        offset = int((cw - new_w) * 0.08)
        img = img.crop((offset, 0, offset + new_w, ch))
    else:
        new_h = int(cw / target_ratio)
        offset = int((ch - new_h) * 0.06)
        img = img.crop((0, offset, cw, offset + new_h))

    return img


def crop_hero(img: Image.Image) -> Image.Image:
    """Recorte mínimo: mantiene encuadre full-bleed del hero."""
    w, h = img.size
    return img.crop(
        (int(w * 0.01), int(h * 0.02), int(w * 0.99), int(h * 0.98)),
    )


def apply_color_grade(
    img: Image.Image,
    *,
    vignette_strength: float = 0.26,
    vignette_center: tuple[float, float] = (0.46, 0.38),
) -> Image.Image:
    img = warm_grade(img)
    img = deepen_shadows(img)
    img = ImageEnhance.Contrast(img).enhance(1.1)
    img = ImageEnhance.Color(img).enhance(0.94)
    img = ImageEnhance.Brightness(img).enhance(0.98)
    img = vignette(img, strength=vignette_strength, center=vignette_center)
    return img.filter(
        ImageFilter.UnsharpMask(radius=1.1, percent=70, threshold=4),
    )


def grade_clinical(img: Image.Image, filename: str) -> Image.Image:
    img = ImageOps.exif_transpose(img).convert("RGB")

    if filename in HERO_FILES:
        img = crop_hero(img)
        img = apply_color_grade(
            img,
            vignette_strength=0.22,
            vignette_center=(0.42, 0.45),
        )
    else:
        img = crop_portrait(img)
        img = apply_color_grade(img)

    return img


def process(path: Path, backup: bool = True) -> None:
    if not path.exists():
        raise FileNotFoundError(path)

    backup_path = path.with_name(path.stem + BACKUP_SUFFIX)
    if backup and not backup_path.exists():
        backup_path.write_bytes(path.read_bytes())
        print(f"backup -> {backup_path.relative_to(ROOT)}")

    source = backup_path if backup_path.exists() else path
    graded = grade_clinical(Image.open(source), path.name)
    tmp = path.with_suffix(".graded.tmp.jpg")
    graded.save(tmp, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    tmp.replace(path)
    print(f"graded -> {path.relative_to(ROOT)} ({graded.size[0]}x{graded.size[1]})")


def process_all(backup: bool = True) -> None:
    paths = sorted(
        p
        for p in FOTOS_DIR.glob("*.jpg")
        if not p.name.endswith(BACKUP_SUFFIX)
        and not p.name.endswith(".graded.tmp.jpg")
    )
    if not paths:
        print("no hay fotos en fotos-qx/")
        return

    for path in paths:
        process(path, backup=backup)


def main() -> None:
    parser = argparse.ArgumentParser(description="Retoque editorial fotos clínicas")
    parser.add_argument("--input", type=Path, help="Un solo archivo (default: todas)")
    parser.add_argument("--no-backup", action="store_true")
    args = parser.parse_args()

    if args.input:
        process(args.input.resolve(), backup=not args.no_backup)
    else:
        process_all(backup=not args.no_backup)


if __name__ == "__main__":
    main()
