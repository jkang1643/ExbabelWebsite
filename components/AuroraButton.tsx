import React from 'react';

interface AuroraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
}

export const AuroraButton: React.FC<AuroraButtonProps> = ({
    variant = 'primary',
    className = '',
    children,
    ...props
}) => {
    // Base styles
    const baseStyles = "relative group overflow-visible rounded-button-pill px-8 py-3 font-semibold transition-all duration-base ease-aurora-out focus:outline-none focus:ring-4 focus:ring-aurora-mint/35";

    // Variant styles
    const variants = {
        primary: "bg-base-ink text-white shadow-aurora-card hover:shadow-aurora-hover border border-transparent",
        secondary: "bg-base-white text-base-ink border border-aurora-default hover:border-aurora-hover shadow-aurora-ambient",
        ghost: "bg-transparent text-base-ink hover:bg-aurora-mint/20 border border-transparent",
    };

    // The "Aurora Glow" effect via pseudo-element (simulated with a span since we can't easily do ::before in inline styles comfortably without custom CSS classes, but an absolute span works great)
    const glowEffect = (
        <span className="absolute inset-[-40%] -z-10 rounded-[inherit] bg-[radial-gradient(circle,var(--color-aurora-pink)_0%,var(--color-aurora-mint)_40%,transparent_70%)] opacity-0 blur-aurora-md transition-opacity duration-300 group-hover:opacity-60 pointer-events-none" />
    );

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Glow effect behind the button */}
            {variant === 'primary' && glowEffect}

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};
