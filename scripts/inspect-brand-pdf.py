"""Inspecciona el manual de marca: páginas, vectores e imágenes embebidas.

Uso: .venv-tools/bin/python scripts/inspect-brand-pdf.py <ruta.pdf>
"""

import sys

import pymupdf


def main(pdf_path: str) -> None:
    doc = pymupdf.open(pdf_path)
    print(f"Páginas: {len(doc)}\n")

    for page_index, page in enumerate(doc, start=1):
        rect = page.rect
        drawings = page.get_drawings()
        images = page.get_images(full=True)
        text = page.get_text().strip()

        print(f"--- Página {page_index} ---")
        print(f"  medidas: {rect.width:.0f} x {rect.height:.0f} pt")
        print(f"  vectores: {len(drawings)}")
        print(f"  texto: {len(text)} caracteres")
        print(f"  imágenes embebidas: {len(images)}")

        for image in images:
            xref = image[0]
            info = doc.extract_image(xref)
            print(
                f"    xref {xref}: {info['width']}x{info['height']} "
                f"{info['ext']} colorspace={info['colorspace']} "
                f"alpha={bool(info.get('smask'))} "
                f"{len(info['image']) / 1024:.0f} KB"
            )
        print()

    doc.close()


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "")
