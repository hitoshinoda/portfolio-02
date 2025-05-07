"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

import SectionLayout from "@/components/SectionLayout";
import { sectionsContentConfig, SectionContentConfig } from "@/components/SectionData";

export default function HomePage() {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Mousewheel, Pagination]}
        className="h-screen w-full"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
      >
        {sectionsContentConfig.map((config: SectionContentConfig) => {
          const paragraphs = t.raw(`sections.${config.id}.paragraphs`) as string[];
          
          return (
            <SwiperSlide
              key={config.id}
              className="flex items-center justify-center"
            >
              <div className="h-full w-full">
                <SectionLayout
                  key={`${config.id}-${activeIndex}`}
                  title={t(`sections.${config.id}.title`)}
                  subtitle={t(`sections.${config.id}.subtitle`)}
                  paragraphs={paragraphs}
                  imageUrl={config.imageUrl}
                  imageAlt={t(`sections.${config.id}.imageAlt`)}
                  backgroundColor={config.backgroundColor}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
