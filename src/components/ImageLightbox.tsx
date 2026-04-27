import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  open: boolean;
  images: string[];
  initialIndex?: number;
  alt?: string;
  onClose: () => void;
}

const ImageLightbox = ({
  open,
  images,
  initialIndex = 0,
  alt = "Product image",
  onClose,
}: ImageLightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setZoomed(false);
    }
  }, [open, initialIndex]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const next = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i + 1) % Math.max(images.length, 1));
  }, [images.length]);

  const prev = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i - 1 + images.length) % Math.max(images.length, 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (zoomed) return;
    const threshold = 60;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  if (!images || images.length === 0) return null;

  const node = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "rgba(0,0,0,0.96)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 text-white">
            <button
              onClick={onClose}
              aria-label="Close image viewer"
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <X size={20} />
            </button>
            <div
              className="text-sm font-medium px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              {index + 1} / {images.length}
            </div>
            <button
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
          </div>

          {/* Main image area */}
          <div
            ref={containerRef}
            className="flex-1 relative flex items-center justify-center overflow-hidden touch-pan-y"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                drag={zoomed ? true : "x"}
                dragConstraints={zoomed ? containerRef : { left: 0, right: 0 }}
                dragElastic={zoomed ? 0.2 : 0.4}
                onDragEnd={handleDragEnd}
              >
                <motion.img
                  src={images[index]}
                  alt={`${alt} ${index + 1}`}
                  draggable={false}
                  onDoubleClick={() => setZoomed((z) => !z)}
                  className="max-w-full max-h-full object-contain select-none"
                  style={{ touchAction: zoomed ? "none" : "pan-y" }}
                  animate={{ scale: zoomed ? 2 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows (hidden when only one image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center text-white"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center text-white"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="px-3 pb-5 pt-2">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((src, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={`${src}-${i}`}
                      onClick={() => {
                        setZoomed(false);
                        setIndex(i);
                      }}
                      aria-label={`View image ${i + 1}`}
                      className="flex-shrink-0 rounded-lg overflow-hidden"
                      style={{
                        width: 56,
                        height: 56,
                        border: active
                          ? "2px solid hsl(18, 95%, 55%)"
                          : "2px solid rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(node, document.body);
};

export default ImageLightbox;
