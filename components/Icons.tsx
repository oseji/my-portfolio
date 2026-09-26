// components/Icons.tsx
// One stroke weight, square terminals: drawn to sit with the linework.

type P = { size?: number; className?: string };

export function ArrowUpRight({ size = 14, className = "arrow" }: P) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            aria-hidden="true"
        >
            <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" />
        </svg>
    );
}

export function ArrowDown({ size = 14, className = "arrow" }: P) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
            aria-hidden="true"
        >
            <path d="M7 2v10M3 8l4 4 4-4" />
        </svg>
    );
}

export function Tick({ size = 12 }: P) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
            aria-hidden="true"
        >
            <path d="M2 6.5 4.8 9 10 3" />
        </svg>
    );
}
