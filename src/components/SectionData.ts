const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export interface SectionContentConfig {
  id: string;
  imageUrl: string;
  backgroundColor: string;
}

export const sectionsContentConfig: SectionContentConfig[] = [
  {
    id: "about",
    imageUrl: `${basePath}/images/top-01.webp`,
    backgroundColor: "bg-blue-50",
  },
  {
    id: "projects",
    imageUrl: `${basePath}/images/top-02.webp`,
    backgroundColor: "bg-green-50",
  },
  {
    id: "contact",
    imageUrl: `${basePath}/images/top-03.webp`,
    backgroundColor: "bg-purple-50",
  },
];
