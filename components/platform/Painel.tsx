"use client";

import { useEffect, useRef, useState } from "react";
import { Store } from "@/types/Store";

type Props = {
  stores: Store[];
};

function StorePreview({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  const previewWidth = 1200;
  const previewHeight = 600;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / previewWidth);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gray-100"
      style={{
        aspectRatio: `${previewWidth} / ${previewHeight}`,
      }}
    >
      <iframe
        src={`/${slug}`}
        title={`Prévia da loja ${slug}`}
        loading="lazy"
        className="absolute left-0 top-0 border-0"
        style={{
          width: `${previewWidth}px`,
          height: `${previewHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function StoresList({ stores }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {stores.map((store) => (
        <article
          key={store.id}
          className="min-w-0 overflow-hidden rounded-xl border bg-white shadow-sm"
        >
          <StorePreview slug={store.slug} />

          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{store.slug}</p>
              <p className="text-sm text-gray-500">
                Prévia da loja
              </p>
            </div>

            <a
              href={`/${store.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md bg-orange-600 px-3 py-2 text-sm text-white hover:bg-orange-700"
            >
              Acessar
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}