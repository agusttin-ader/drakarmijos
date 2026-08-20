#!/usr/bin/env python3
"""Process Instagram highlight icons: transparent backdrop, clean edges, circular mask, upscale."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
HIGHLIGHTS_DIR = ROOT / "public" / "images" / "highlights"
SOURCE_SCREENSHOT = (
    Path.home()
    / ".cursor/projects/Users-agustinader-Desktop-Proyectos-drakarmijos-web/assets"
    / "Captura_de_Pantalla_2026-08-19_a_la_s__17.27.57-987b86ae-6957-4cc7-8be7-172f5b460e17.png"
)

OUTPUT_SIZE = 512
UPSCALE_FACTOR = 2


def is_background_pixel(r: int, g: int, b: int, bg: tuple[int, int, int], tol: int) -> bool:
    if abs(r - g) > 22 or abs(g - b) > 22 or abs(r - b) > 22:
        return False
    distance = abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2])
    return distance <= tol * 3


def is_mint_circle(r: int, g: int, b: int) -> bool:
    return g > r + 4 and b > r + 2 and g > 120 and b > 110


def is_white_content(r: int, g: int, b: int) -> bool:
    return r > 165 and g > 165 and b > 165


def is_fringe_pixel(r: int, g: int, b: int) -> bool:
    if is_mint_circle(r, g, b) or is_white_content(r, g, b):
        return False
    spread = max(r, g, b) - min(r, g, b)
    if spread > 32:
        return False
    average = (r + g + b) / 3
    return 120 < average < 252


def sample_background(img: Image.Image) -> tuple[int, int, int]:
    w, h = img.size
    px = img.load()
    samples: list[tuple[int, int, int]] = []

    for x, y in (
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, 0),
        (w // 2, h - 1),
    ):
        r, g, b, a = px[x, y]
        if a > 0:
            samples.append((r, g, b))

    if not samples:
        return (18, 18, 18)

    return (
        sum(item[0] for item in samples) // len(samples),
        sum(item[1] for item in samples) // len(samples),
        sum(item[2] for item in samples) // len(samples),
    )


def flood_remove_background(img: Image.Image, tol: int = 42) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    px = img.load()
    bg = sample_background(img)
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    def try_enqueue(x: int, y: int) -> None:
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            return
        r, g, b, a = px[x, y]
        if a == 0:
            visited[y][x] = True
            queue.append((x, y))
            return
        if is_background_pixel(r, g, b, bg, tol):
            visited[y][x] = True
            queue.append((x, y))

    for x in range(w):
        try_enqueue(x, 0)
        try_enqueue(x, h - 1)
    for y in range(h):
        try_enqueue(0, y)
        try_enqueue(w - 1, y)

    while queue:
        x, y = queue.popleft()
        r, g, b, _ = px[x, y]
        if is_background_pixel(r, g, b, bg, tol) or px[x, y][3] == 0:
            px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                nr, ng, nb, na = px[nx, ny]
                if na == 0 or is_background_pixel(nr, ng, nb, bg, tol):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def remove_fringe(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a > 0 and is_fringe_pixel(r, g, b):
                px[x, y] = (r, g, b, 0)

    return img


def apply_smooth_circle_mask(img: Image.Image, feather: float = 1.15) -> Image.Image:
    img = img.convert("RGBA")
    bbox = img.getbbox()
    if not bbox:
        return img

    left, top, right, bottom = bbox
    cx = (left + right) / 2
    cy = (top + bottom) / 2
    radius = min(right - left, bottom - top) / 2 - 0.5

    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=255)

    if feather > 0:
        mask = mask.filter(ImageFilter.GaussianBlur(feather))

    r, g, b, alpha = img.split()
    alpha = Image.composite(alpha, Image.new("L", img.size, 0), mask)
    return Image.merge("RGBA", (r, g, b, alpha))


def process_highlight(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    bg = sample_background(rgba)
    print(f"  backdrop rgb{bg}")

    cleaned = flood_remove_background(rgba)
    cleaned = remove_fringe(cleaned)
    cleaned = apply_smooth_circle_mask(cleaned, feather=1.1)

    bbox = cleaned.getbbox()
    if bbox:
        cleaned = cleaned.crop(bbox)

    if cleaned.width < OUTPUT_SIZE:
        cleaned = cleaned.resize(
            (OUTPUT_SIZE, OUTPUT_SIZE),
            Image.Resampling.LANCZOS,
        )

    return cleaned


def crop_icons_from_screenshot(source: Path) -> dict[str, Image.Image]:
    img = Image.open(source).convert("RGBA")
    w, h = img.size
    icon_w = w // 3
    pad_x = 6
    pad_y = 8
    crop_h = int(h * 0.82)

    names = ["orl", "turnos", "dormir-bien"]
    crops: dict[str, Image.Image] = {}

    for index, name in enumerate(names):
        left = index * icon_w + pad_x
        right = (index + 1) * icon_w - pad_x
        crop = img.crop((left, pad_y, right, crop_h))

        cw, ch = crop.size
        side = min(cw, ch)
        cx, cy = cw // 2, ch // 2
        crop = crop.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2))
        crops[name] = crop

    return crops


def main() -> None:
    HIGHLIGHTS_DIR.mkdir(parents=True, exist_ok=True)

    if SOURCE_SCREENSHOT.exists():
        print(f"Cropping from screenshot: {SOURCE_SCREENSHOT.name}")
        crops = crop_icons_from_screenshot(SOURCE_SCREENSHOT)
    else:
        print("Screenshot not found — reprocessing existing highlight PNGs.")
        crops = {
            path.stem: Image.open(path)
            for path in sorted(HIGHLIGHTS_DIR.glob("*.png"))
        }

    for name, source in crops.items():
        print(f"Processing {name}.png ({source.size[0]}x{source.size[1]})")
        result = process_highlight(source)
        out_path = HIGHLIGHTS_DIR / f"{name}.png"
        result.save(out_path, "PNG", optimize=True)
        print(f"  saved {out_path.name}: {result.size[0]}x{result.size[1]}")


if __name__ == "__main__":
    main()
