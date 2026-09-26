// components/ProjectMock.tsx
import Image from "next/image";
import type { Project } from "@/lib/portfolio";

import pennywiseImg from "@/assets/projects/frontend/pennywise.jpeg";
import bingeImg from "@/assets/projects/frontend/binge.png";
import hrSphereImg from "@/assets/projects/frontend/hrsphere.jpeg";
import ipAddressImg from "@/assets/projects/frontend/ipAddress.jpeg";
import swagImg from "@/assets/projects/qa/swaglabs.png";
import restfulImg from "@/assets/projects/qa/restful-booker-k6-output.png";
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

// What each QA screenshot actually shows, for its exhibit caption.
export const EXHIBIT_CAPTIONS: Record<string, string> = {
    swag: "System under test",
    restful: "k6 run output",
    fundtransfer: "Test run report",
};

type Props = {
    project: Project;
    fill?: boolean;
    sizes?: string;
};

export function ProjectMock({ project, fill = false, sizes }: Props) {
    const src = PROJECT_IMAGES[project.id];
    if (!src) return null;

    return fill ? (
        <Image
            src={src}
            alt={`${project.title} screenshot`}
            fill
            sizes={sizes ?? "(max-width: 1023px) 100vw, 60vw"}
            placeholder="blur"
        />
    ) : (
        <Image
            src={src}
            alt={`${project.title} screenshot`}
            sizes={sizes ?? "(max-width: 1023px) 100vw, 45vw"}
            placeholder="blur"
        />
    );
}
