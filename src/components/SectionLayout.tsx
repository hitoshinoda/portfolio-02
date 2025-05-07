"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SectionLayoutProps {
  title: string;
  subtitle?: string; // オプショナルなサブタイトル
  paragraphs: string[]; // 本文の段落を配列で受け取る
  imageUrl?: string; // オプショナルな画像URL
  imageAlt?: string; // 画像のaltテキスト
  backgroundColor?: string; // 背景色を動的に変える場合
  children?: React.ReactNode; // さらにカスタムな要素を埋め込みたい場合
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  title,
  subtitle,
  paragraphs,
  imageUrl,
  imageAlt = "Section image", 
  backgroundColor = "bg-gray-100",
  children,
}) => {
  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center p-8 md:p-16 ${backgroundColor}`}
    >
      <div className="text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-600 mb-8"
          >
            {subtitle}
          </motion.h2>
        )}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="my-8 relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        )}
        <div className="text-left text-lg text-gray-700 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        {/* children Prop を使って、この下にさらにセクション固有の要素を追加可能 */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionLayout;
