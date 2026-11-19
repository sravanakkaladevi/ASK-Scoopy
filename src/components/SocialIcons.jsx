const SocialIcons = ({ className = '' }) => (
  <div className={`social-icons ${className}`}>
    <a
      href="https://www.instagram.com/_sravansravan824_/"
      target="_blank"
      rel="noopener noreferrer"
      className="social-icons-btn social-icons-btn--instagram"
      aria-label="Instagram @_sravansravan824_"
      title="@_sravansravan824_"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
      </svg>
      <span className="social-handle-text">@_sravansravan824_</span>
    </a>
  </div>
)

export default SocialIcons
