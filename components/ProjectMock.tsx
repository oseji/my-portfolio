// components/ProjectMock.tsx
import Image from "next/image";
import type { Project } from "@/lib/portfolio";

import pennywiseImg from "@/assets/projects/frontend/pennywise.jpeg";
import bingeImg from "@/assets/projects/frontend/binge.jpeg";
import hrSphereImg from "@/assets/projects/frontend/hrsphere.jpeg";
import ipAddressImg from "@/assets/projects/frontend/ipAddress.jpeg";
import swagImg from "@/assets/projects/qa/swaglabs.png";
import restfulImg from "@/assets/projects/qa/restful-booker.png";
import fundTransferImg from "@/assets/projects/qa/fund-transfer-api.png";

const PROJECT_IMAGES: Record<string, typeof pennywiseImg> = {
    pennywise: pennywiseImg,
    binge: bingeImg,
    hrsphere: hrSphereImg,
    iptracker: ipAddressImg,
    swag: swagImg,
    restful: restfulImg,
    fundtransfer: fundTransferImg,
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
            className="object-contain"
            placeholder="blur"
        />
    );
}
