"""Extrae los logos embebidos del manual de marca con transparencia.

Las imágenes del PDF guardan el color y la máscara de opacidad por separado
(smask), así que hay que recombinarlas para recuperar el PNG con alfa.

Uso: .venv-tools/bin/python scripts/extract-brand-logo.py <ruta.pdf> <destino>
"""

import hashlib
import sys
from pathlib import Path

import pymupdf


def main(pdf_path: str, out_dir: str) -> None:
    doc = pymupdf.open(pdf_path)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    seen: dict[str, str] = {}

    for page_index, page in enumerate(doc, start=1):
        for image in page.get_images(full=True):
            xref, smask = image[0], image[1]

            pix = pymupdf.Pixmap(doc, xref)
            if smask:
                pix = pymupdf.Pixmap(pix, pymupdf.Pixmap(doc, smask))

            data = pix.tobytes("png")
            digest = hashlib.sha256(data).hexdigest()[:12]

            if digest in seen:
                print(f"  p{page_index} xref {xref}: duplicado de {seen[digest]}")
                continue

            name = f"logo-p{page_index}-{xref}.png"
            (out / name).write_bytes(data)
            seen[digest] = name
            print(
                f"  p{page_index} xref {xref}: {name} "
                f"{pix.width}x{pix.height} alpha={pix.alpha} "
                f"{len(data) / 1024:.0f} KB"
            )

    doc.close()
    print(f"\n{len(seen)} imágenes únicas en {out}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
