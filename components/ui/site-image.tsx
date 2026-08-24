import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "quality"> & {
  /** Calidad percibida: se sirve el archivo estático ya optimizado en /public. */
  quality?: number;
};

/**
 * Imagen del sitio sin Image Optimization de Vercel/Next.
 * Los archivos en /public ya están comprimidos a alta calidad;
 * así cargan rápido en cualquier host sin depender del optimizador.
 */
export function SiteImage({
  alt,
  loading,
  decoding = "async",
  ...props
}: SiteImageProps) {
  const priority = props.priority === true;

  return (
    <Image
      {...props}
      alt={alt}
      unoptimized
      decoding={decoding}
      loading={priority ? undefined : (loading ?? "lazy")}
    />
  );
}
