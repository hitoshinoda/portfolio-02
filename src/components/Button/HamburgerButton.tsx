"use client";

import { motion, Variants } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

const defaultIconWidth = 48;

export default function HamburgerButton({
  isOpen,
  toggle,
  className = "w-12 h-6",
}: HamburgerButtonProps) {
  const iconWidth = defaultIconWidth;
  const lineWidthTop = iconWidth; // 48px
  const lineWidthBottom = 24; // 24px
  const yOffset = 6; // px (Calculated offset from center for h=16, thickness=2)

  const lineBaseStyle = "absolute right-0 bg-black h-[2px] origin-center";

  const topVariants: Variants = {
    closed: { rotate: 0, y: -yOffset, width: `${lineWidthTop}px` },
    open: { rotate: 45, y: 0, width: `${iconWidth}px` },
  };

  const bottomVariants: Variants = {
    closed: {
      rotate: 0,
      y: yOffset,
      width: `${lineWidthBottom}px`,
    },
    open: { rotate: -45, y: 0, width: `${iconWidth}px` },
  };

  return (
    <button
      onClick={toggle}
      className={`relative z-50 rounded focus:outline-none ${className}`}
      aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {/* Icon container */}
      <div className="relative w-full h-full">
        {/* Top line */}
        <motion.span
          className={lineBaseStyle} // Apply base style with bg-black
          style={{ top: "50%" }} // Center vertically as reference
          variants={topVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        {/* Bottom line */}
        <motion.span
          className={lineBaseStyle} // Apply base style with bg-black
          style={{ top: "50%" }} // Center vertically as reference
          variants={bottomVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </button>
  );
}
