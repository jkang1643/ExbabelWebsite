import React from 'react';

interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    gradientBorder?: boolean;
}

export const AuroraCard: React.FC<AuroraCardProps> = ({
    children,
    className = '',
    gradientBorder = false,
    ...props
}) => {
    // Base classes that apply the Aurora design system
    const baseClasses = "relative bg-base-white rounded-aurora-xl transition-all duration-base ease-aurora-standard";

    // Design system shadow rules
    // Default: Colored diffused light
    // Hover: Expanded shadow + Lift + Warmth
    const shadowClasses = "shadow-aurora-card hover:shadow-aurora-hover hover:-translate-y-[2px]";

    // Border logic
    // Simple border: border-aurora-default
    // Gradient border (Premium): Implemented via masked background or pseudo element if needed.
    // For simplicity and performance, we'll use the border color tokens first, as border-image conflicts with radius.
    // If gradientBorder is true, we simulate it with a specific class or style.
    const borderClasses = gradientBorder
        ? "border border-transparent relative after:absolute after:inset-0 after:rounded-aurora-xl after:border after:border-transparent after:bg-gradient-to-br after:from-aurora-pink/60 after:to-aurora-mint/60 after:[mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] after:[-webkit-mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] after:[mask-composite:exclude] after:[-webkit-mask-composite:destination-out] after:pointer-events-none"
        : "border border-aurora-default hover:border-aurora-hover";

    return (
        <div
            className={`${baseClasses} ${shadowClasses} ${borderClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
