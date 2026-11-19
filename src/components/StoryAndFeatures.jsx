import './StoryAndFeatures.css'

const FEATURES = [
  {
    icon: '🌱',
    title: '100% Grass-Fed Cream',
    desc: 'Sourced from heritage family farms with pasture-raised cows. Rich, velvety, and naturally packed with Omega-3s.',
  },
  {
    icon: '🫐',
    title: 'Zero Artificial Dyes',
    desc: 'Our vibrant colors come entirely from real wild bilberries, sun-ripened Alphonso mangoes, and ruby strawberries.',
  },
  {
    icon: '❄️',
    title: 'Melt-Free Dry Ice Box',
    desc: 'Shipped in insulated compostable coolers with sub-zero dry ice bricks. Guaranteed frozen rock solid upon arrival.',
  },
  {
    icon: '🥄',
    title: 'Micro-Batch Churning',
    desc: 'We craft only 30 gallons at a time with low-overrun freezing, giving our ice cream its signature dense, luxurious scoop.',
  },
]

export default function StoryAndFeatures() {
  return (
    <section id="story-section" className="story-section">
      <div className="story-container">
        {/* Why Scoopy Cards */}
        <div className="section-head text-center">
          <span className="section-tagline">The Scoopy Promise</span>
          <h2 className="section-title">Why Our Ice Cream Hits Different</h2>
          <p className="section-subtitle">
            We spent 3 years obsessing over milk fats, fruit crystallization, and cold-chain logistics so you
            never receive a melted carton.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((item) => (
            <div key={item.title} className="feature-card">
              <span className="feature-icon">{item.icon}</span>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Cold-Chain Dry-Ice Guarantee Banner */}
        <div className="cold-chain-banner">
          <div className="cold-chain-content">
            <span className="cold-badge">Cold-Chain Guarantee</span>
            <h3 className="cold-title">Sub-Zero (-20°C) Doorstep Delivery</h3>
            <p className="cold-desc">
              Every single order is hand-packed with custom high-density dry-ice bricks and wrapped in 100%
              recycled cornstarch insulation. If your pints arrive soft or melted in any way, we will immediately
              reship or refund you 100% with no questions asked.
            </p>
            <div className="cold-stats-row">
              <div className="cold-stat">
                <span className="stat-num">99.8%</span>
                <span className="stat-label">Arrive Rock Solid</span>
              </div>
              <div className="cold-stat">
                <span className="stat-num">&lt; 45 Min</span>
                <span className="stat-label">Local Hub Fulfillment</span>
              </div>
              <div className="cold-stat">
                <span className="stat-num">Zero</span>
                <span className="stat-label">Styrofoam or Plastic Waste</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
