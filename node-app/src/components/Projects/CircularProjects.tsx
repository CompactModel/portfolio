import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../types/project";
import { inferTags } from "../../utils/inferTags";
import { projectImage } from "../../utils/projectImage";
import { DARK } from "../../data/config";
import "./CircularProjects.css";

interface CircularProjectsProps {
  projects: Project[];
  autoplay?: boolean;
  t: (key: string) => string;
}

function calculateGap(width: number) {
  const minWidth = 1024, maxWidth = 1456, minGap = 60, maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularProjects({ projects, autoplay = true, t }: CircularProjectsProps) {
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [hoverPrev,      setHoverPrev]      = useState(false);
  const [hoverNext,      setHoverNext]      = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const containerRef       = useRef<HTMLDivElement>(null);
  const autoplayRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const total              = useMemo(() => projects.length, [projects]);
  const active             = useMemo(() => projects[activeIndex], [activeIndex, projects]);

  useEffect(() => {
    const onResize = () => { if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth); };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (autoplay && total > 1) {
      autoplayRef.current = setInterval(() => setActiveIndex(p => (p + 1) % total), 5000);
    }
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [autoplay, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  goNext(-1);
      if (e.key === "ArrowRight") goNext(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const goNext = useCallback((dir: 1 | -1) => {
    setActiveIndex(p => (p + dir + total) % total);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [total]);

  function getImageStyle(index: number): React.CSSProperties {
    // Use window width (not container width) to reliably detect mobile vs desktop
    const isMobile = window.innerWidth < 768;
    const isActive = index === activeIndex;
    const isLeft   = (activeIndex - 1 + total) % total === index;
    const isRight  = (activeIndex + 1) % total === index;

    if (isMobile) {
      const mGap = containerWidth * 0.88;
      if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "scale(0.9)",                           transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
      if (isLeft)   return { zIndex: 2, opacity: 0.8, pointerEvents: "auto", transform: `translateX(-${mGap}px) scale(0.85)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)", cursor: "pointer" };
      if (isRight)  return { zIndex: 2, opacity: 0.8, pointerEvents: "auto", transform: `translateX(${mGap}px) scale(0.85)`,  transition: "all 0.8s cubic-bezier(.4,2,.3,1)", cursor: "pointer" };
      return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    }

    const gap        = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0) translateY(0) scale(1) rotateY(0deg)", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isLeft)   return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,  transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isRight)  return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  const tags = inferTags(active.title, active.description);

  return (
    <div className="cp-container">
      <div className="cp-grid">

        {/* Images carousel */}
        <div className="cp-image-container" ref={containerRef}>
          {projects.map((p, index) => {
            const src = p.image ?? projectImage(p.title, "");
            const isNeighbour = index === (activeIndex - 1 + total) % total || index === (activeIndex + 1) % total;
            const handleClick = isNeighbour
              ? () => goNext(index === (activeIndex - 1 + total) % total ? -1 : 1)
              : undefined;
            return src
              ? <img key={p.id} src={src} alt={p.title} className="cp-image" style={getImageStyle(index)} onClick={handleClick} />
              : <div key={p.id} className="cp-placeholder" style={getImageStyle(index)} onClick={handleClick}>PREVIEW</div>;
          })}
        </div>

        {/* Content */}
        <div className="cp-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <h3 className="cp-title" style={{ color: DARK, fontSize: "1.6rem" }}>
                {active.title}
              </h3>

              <div className="cp-tags">
                {tags.map(tag => <span key={tag} className="cp-tag">{tag}</span>)}
              </div>

              <motion.p className="cp-description" style={{ color: "#555", fontSize: "1rem" }}>
                {active.description.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)",  opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="cp-footer">
            {active.link
              ? <a
                  href={active.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cp-link"
                  style={{ background: DARK, color: "#fff" }}
                >
                  {t("view_project")} →
                </a>
              : <span />
            }

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <span className="cp-counter">{activeIndex + 1} / {total}</span>
              <div className="cp-arrow-buttons">
                <button
                  className="cp-arrow-button"
                  onClick={() => goNext(-1)}
                  style={{ backgroundColor: hoverPrev ? "#00a6fb" : DARK }}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous project"
                >
                  <FaArrowLeft size={16} color="#f1f1f7" />
                </button>
                <button
                  className="cp-arrow-button"
                  onClick={() => goNext(1)}
                  style={{ backgroundColor: hoverNext ? "#00a6fb" : DARK }}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next project"
                >
                  <FaArrowRight size={16} color="#f1f1f7" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
