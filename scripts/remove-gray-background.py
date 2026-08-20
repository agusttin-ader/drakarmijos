#!/usr/bin/env python3
"""Remove gray backdrop and clean logo edges for a crisp transparent circle."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

LOGO_PATH = Path(__file__).resolve().parents[1] / "public" / "images" / "logo.png"


def is_background_pixel(r: int, g: int, b: int, bg: tuple[int, int, int], tol: int) -> bool:
    if abs(r - g) > 18 or abs(g - b) > 18 or abs(r - b) > 18:
        return False
    distance = abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2])
    return distance <= tol * 3


def is_turquoise(r: int, g: int, b: int) -> bool:
    return g > r + 6 and b > r + 4 and g > 130 and b > 120


def is_white_content(r: int, g: int, b: int) -> bool:
    return r > 168 and g > 168 and b > 168


def is_fringe_pixel(r: int, g: int, b: int) -> bool:
    if is_turquoise(r, g, b) or is_white_content(r, g, b):
        return False
    spread = max(r, g, b) - min(r, g, b)
    if spread > 28:
        return False
    average = (r + g + b) / 3
    return 155 < average < 250


def sample_background(img: Image.Image) -> tuple[int, int, int]:
    w, h = img.size
    px = img.load()
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    rs, gs, bs = [], [], []

    for x, y in corners:
        r, g, b, a = px[x, y]
        if a > 0:
            rs.append(r)
            gs.append(g)
            bs.append(b)

    if not rs:
        return (208, 211, 214)

    return (sum(rs) // len(rs), sum(gs) // len(gs), sum(bs) // len(bs))


def flood_remove_background(img: Image.Image, tol: int = 34) -> Image.Image:
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


def apply_smooth_circle_mask(img: Image.Image, feather: float = 1.2) -> Image.Image:
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
    draw.ellipse(
        (cx - radius, cy - radius, cx + radius, cy + radius),
        fill=255,
    )

    if feather > 0:
        mask = mask.filter(ImageFilter.GaussianBlur(feather))

    r, g, b, alpha = img.split()
    alpha = Image.composite(alpha, Image.new("L", img.size, 0), mask)
    return Image.merge("RGBA", (r, g, b, alpha))


def process_logo(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    bg = sample_background(rgba)
    transparent_corners = sum(
        1
        for x, y in (
            (0, 0),
            (rgba.size[0] - 1, 0),
            (0, rgba.size[1] - 1),
            (rgba.size[0] - 1, rgba.size[1] - 1),
        )
        if rgba.getpixel((x, y))[3] == 0
    )

    if transparent_corners >= 3:
        print("Logo already transparent — running edge cleanup only.")
        cleaned = remove_fringe(rgba)
    else:
        print(f"Detected backdrop color: rgb{bg}")
        cleaned = flood_remove_background(img)

    cleaned = remove_fringe(cleaned)
    cleaned = apply_smooth_circle_mask(cleaned, feather=1.1)
    bbox = cleaned.getbbox()
    return cleaned.crop(bbox) if bbox else cleaned


def main() -> None:
    if not LOGO_PATH.exists():
        raise SystemExit(f"Logo not found: {LOGO_PATH}")

    source = Image.open(LOGO_PATH)
    print(f"Processing {LOGO_PATH.name} ({source.size[0]}x{source.size[1]})")

    result = process_logo(source)
    result.save(LOGO_PATH, "PNG", optimize=True)
    print(f"Saved clean logo: {result.size[0]}x{result.size[1]}")


if __name__ == "__main__":
    main()
