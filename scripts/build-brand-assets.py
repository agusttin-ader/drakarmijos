"""Genera los assets de marca de la web desde el manual de logo en PDF.

Produce:
  public/images/logo.png          emblema circular con alfa (header y uso general)
  public/images/logo-white.png    mismo emblema, blanco con huecos (footer oscuro)
  public/images/logo-completo.png emblema + firma "Dra. Karla Armijos" (Open Graph)
  app/icon.png                    favicon
  app/apple-icon.png              icono iOS, sobre fondo claro

El emblema sale de la imagen embebida de la página 3 (2474x2474 con máscara de
opacidad). La versión con firma es vectorial en la página 1, así que se rasteriza
a alta resolución y se le recorta el fondo blanco.

Uso: .venv-tools/bin/python scripts/build-brand-assets.py <ruta.pdf>
"""

import sys
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
EMBLEM_PAGE = 3
SIGNATURE_PAGE = 1
SIGNATURE_DPI = 500
# Recorte del logotipo "original" (emblema + regla + firma) medido sobre la
# página 1, en puntos. Excluye el patrón de fondo del manual.
SIGNATURE_REGION = pymupdf.Rect(175, 213, 437, 503)
BRAND_BG = (250, 248, 245)
APPLE_BG = BRAND_BG
# Se conserva la resolución nativa del PDF: remuestrear no ahorra peso en PNG y
# Next reescala en cada render igual.
EMBLEM_MAX = 2474
ICON_SIZE = 256


def trim_alpha(image: Image.Image, threshold: int = 6) -> Image.Image:
    alpha = image.getchannel("A").point(lambda v: 255 if v > threshold else 0)
    box = alpha.getbbox()
    return image.crop(box) if box else image


def emblem_to_white(emblem: Image.Image) -> Image.Image:
    """Círculo blanco con los gráficos interiores calados (huecos).

    El manual no incluye una versión negativa lista: en fondos oscuros el
    turquesa se pierde. Se conserva el alfa del emblema y se perforan los
    trazos blancos para que se lea la luna, los íconos y el texto circular.
    """
    src = emblem.convert("RGBA")
    pixels = src.load()
    if pixels is None:
        raise SystemExit("No se pudo leer el emblema")
    white = Image.new("RGBA", src.size)
    dest = white.load()
    if dest is None:
        raise SystemExit("No se pudo crear la variante blanca")
    width, height = src.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a < 10 or (r > 210 and g > 210 and b > 210):
                dest[x, y] = (255, 255, 255, 0)
            else:
                dest[x, y] = (255, 255, 255, a)
    return white


def square(image: Image.Image) -> Image.Image:
    side = max(image.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(
        image,
        ((side - image.width) // 2, (side - image.height) // 2),
        image,
    )
    return canvas


def extract_emblem(doc: pymupdf.Document) -> Image.Image:
    """Imagen embebida más grande con máscara de opacidad."""
    best = None
    for image in doc[EMBLEM_PAGE - 1].get_images(full=True):
        xref, smask = image[0], image[1]
        if not smask:
            continue
        pix = pymupdf.Pixmap(pymupdf.Pixmap(doc, xref), pymupdf.Pixmap(doc, smask))
        if best is None or pix.width > best.width:
            best = pix
    if best is None:
        raise SystemExit("No se encontró el emblema con transparencia en la página 3")

    emblem = Image.frombytes("RGBA", (best.width, best.height), best.samples)
    return square(trim_alpha(emblem))


def extract_signature(doc: pymupdf.Document) -> Image.Image:
    """Rasteriza el logotipo vectorial con firma sobre el fondo de la marca.

    Se mantiene opaco a propósito: el turquesa de marca es muy claro, así que
    derivar transparencia del blanco lo dejaría casi invisible.
    """
    page = doc[SIGNATURE_PAGE - 1]
    zoom = SIGNATURE_DPI / 72
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=SIGNATURE_REGION)
    render = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

    canvas = Image.new("RGB", render.size, BRAND_BG)
    # El blanco del PDF se reemplaza por el fondo de la marca.
    mask = render.convert("L").point(lambda v: 255 if v < 250 else 0)
    canvas.paste(render, (0, 0), mask)
    return canvas


def main(pdf_path: str) -> None:
    doc = pymupdf.open(pdf_path)

    emblem = extract_emblem(doc)
    if emblem.width > EMBLEM_MAX:
        emblem = emblem.resize((EMBLEM_MAX, EMBLEM_MAX), Image.LANCZOS)
    emblem_path = ROOT / "public/images/logo.png"
    emblem.save(emblem_path, optimize=True)
    print(f"{emblem_path.relative_to(ROOT)}  {emblem.width}x{emblem.height}")

    white = emblem_to_white(emblem)
    white_path = ROOT / "public/images/logo-white.png"
    white.save(white_path, optimize=True)
    print(f"{white_path.relative_to(ROOT)}  {white.width}x{white.height}")

    signature = extract_signature(doc)
    signature_path = ROOT / "public/images/logo-completo.png"
    signature.save(signature_path, optimize=True)
    print(f"{signature_path.relative_to(ROOT)}  {signature.width}x{signature.height}")

    icon = emblem.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS)
    icon_path = ROOT / "app/icon.png"
    icon.save(icon_path, optimize=True)
    print(f"{icon_path.relative_to(ROOT)}  {ICON_SIZE}x{ICON_SIZE}")

    # iOS no respeta la transparencia: se compone sobre el fondo de la marca.
    apple = Image.new("RGB", (180, 180), APPLE_BG)
    scaled = emblem.resize((164, 164), Image.LANCZOS)
    apple.paste(scaled, (8, 8), scaled)
    apple_path = ROOT / "app/apple-icon.png"
    apple.save(apple_path, optimize=True)
    print(f"{apple_path.relative_to(ROOT)}  180x180")

    doc.close()


if __name__ == "__main__":
    main(sys.argv[1])
