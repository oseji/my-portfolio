// components/ProjectMock.tsx
import Image from "next/image";
import type { Project } from "@/lib/portfolio";

import pennywiseImg from "@/assets/projects/pennywise.png";
import bingeImg from "@/assets/projects/binge.png";
import hrSphereImg from "@/assets/projects/hrSphere.png";
import ipAddressImg from "@/assets/projects/ip address.png";
import swagImg from "@/assets/projects/qa/swaglabs.png";

const PROJECT_IMAGES: Record<string, typeof pennywiseImg> = {
    pennywise: pennywiseImg,
    binge: bingeImg,
    hrsphere: hrSphereImg,
    iptracker: ipAddressImg,
    swag: swagImg,
};

type Props = { project: Project };

export function ProjectMock({ project }: Props) {
    const src = PROJECT_IMAGES[project.id];
    if (!src) return null;

    return (
        <Image
            src={src}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            placeholder="blur"
        />
    );
}
