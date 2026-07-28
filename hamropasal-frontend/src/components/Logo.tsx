export const Logo = ({ className = "h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* HP monogram */}
    <path d="M4 4H12V28H4V4Z" fill="currentColor"/>
    <path d="M4 14H20V18H4V14Z" fill="currentColor"/>
    <path d="M16 4H24V28H16V4Z" fill="currentColor"/>
    
    {/* Wordmark */}
    <text x="32" y="22" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="600" fill="currentColor">
      Hamropasal
    </text>
  </svg>
);

export const LogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="8" height="24" rx="1" fill="currentColor"/>
    <rect x="4" y="14" width="16" height="4" rx="1" fill="currentColor"/>
    <rect x="16" y="4" width="8" height="24" rx="1" fill="currentColor"/>
  </svg>
);
