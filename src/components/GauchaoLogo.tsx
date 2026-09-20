import React from 'react';

interface GauchaoLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'monochrome';
  size?: number;
}

export const GauchaoLogo: React.FC<GauchaoLogoProps> = ({
  className = '',
  variant = 'full',
  size = 52
}) => {
  const isMono = variant === 'monochrome';
  const circleColor = isMono ? '#000000' : '#8B0000'; // Dark crimson or black
  const accentColor = isMono ? '#333333' : '#B22222';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="46" stroke={circleColor} strokeWidth="3.5" fill="#ffffff" />
        <circle cx="50" cy="50" r="41" stroke={circleColor} strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.6" />

        {/* Traditional Gaucho Silhouette */}
        {/* Hat brim */}
        <path
          d="M26 44 C34 40, 66 40, 74 44 C78 45, 74 47, 65 47 C50 48, 35 48, 26 47 C22 46, 22 45, 26 44 Z"
          fill={circleColor}
        />
        {/* Hat top */}
        <path
          d="M37 43 C37 32, 41 29, 50 29 C59 29, 63 32, 63 43 Z"
          fill={circleColor}
        />
        {/* Hat ribbon/band */}
        <path
          d="M37 41 C44 40, 56 40, 63 41 L63 43 C56 42, 44 42, 37 43 Z"
          fill={isMono ? '#666666' : '#DC2626'}
        />

        {/* Head & Neck */}
        <ellipse cx="50" cy="48" rx="7.5" ry="9" fill={circleColor} />

        {/* Gaucho Neckerchief / Lenço Gaúcho */}
        <path
          d="M45 54 L50 63 L55 54 C53 52, 47 52, 45 54 Z"
          fill={isMono ? '#555555' : '#EF4444'}
        />
        <circle cx="50" cy="54" r="2.5" fill="#ffffff" />

        {/* Shoulders & Traditional Poncho */}
        <path
          d="M27 75 C31 60, 42 56, 50 56 C58 56, 69 60, 73 75 C66 78, 34 78, 27 75 Z"
          fill={circleColor}
        />
        
        {/* Poncho drape fold lines */}
        <path d="M50 58 L50 77" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M40 64 L37 76" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M60 64 L63 76" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

        {/* Star / Tradition Accent */}
        <polygon points="50,16 52,21 57,21 53,24 55,29 50,26 45,29 47,24 43,21 48,21" fill={accentColor} />
      </svg>
      {variant === 'full' && (
        <span className="text-[10px] font-black tracking-widest text-neutral-900 uppercase mt-0.5 leading-none font-mono">
          GAUCHÃO
        </span>
      )}
    </div>
  );
};
