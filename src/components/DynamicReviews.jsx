import { useState, useMemo, useEffect } from 'react'
import { animate } from 'animejs'
import { initialReviews } from '../data/initialReviews'
import { flavors } from '../data/flavors'
import { useCart } from '../context/CartContext'
import './DynamicReviews.css'

const REVIEWS_STORAGE_KEY = 'scoopy_reviews_v1'
const HELPFUL_STORAGE_KEY = 'scoopy_helpful_v1'

const TASTE_TAG_PRESETS = [
  'Super Creamy',
  'Authentic Fruit',
  'Melt-Free Delivery',
  'Not Too Sweet',
  'Rich Indulgence',
  'Kid Approved',
  '10/10 Packaging',
  'Repeat Customer',
]

const RATING_LABELS = {
  5: 'Pure perfection! 🍨',
  4: 'Delicious & creamy!',
  3: 'Pretty good overall',
  2: 'Fair, needs tuning',
  1: 'Not my favorite',
}

export default function DynamicReviews() {
  const { addToast } = useCart()

  // Reviews loaded from localStorage or default
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialReviews
    } catch {
      return initialReviews
    }
  })

  // Helpful votes track per user
  const [helpfulVoted, setHelpfulVoted] = useState(() => {
    try {
      const saved = localStorage.getItem(HELPFUL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Form expansion state
  const [isFormOpen, setIsFormOpen] = useState(false)

  // New review form fields
  const [formRating, setFormRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [formAuthor, setFormAuthor] = useState('')
  const [formFlavor, setFormFlavor] = useState(flavors[0].name.replace('\n', ' '))
  const [formTitle, setFormTitle] = useState('')
  const [formComment, setFormComment] = useState('')
  const [formTags, setFormTags] = useState(['Super Creamy'])

  // Filter & Search states
  const [starFilter, setStarFilter] = useState('all')
  const [flavorFilter, setFlavorFilter] = useState('all')
  const [searchFilter, setSearchFilter] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Reply inline composer states: { [reviewId]: replyText }
  const [replyOpenId, setReplyOpenId] = useState(null)
  const [replyText, setReplyText] = useState('')

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
    } catch (e) {
      console.error('Failed to save reviews', e)
    }
  }, [reviews])

  useEffect(() => {
    try {
      localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(helpfulVoted))
    } catch (e) {
      console.error('Failed to save helpful votes', e)
    }
  }, [helpfulVoted])

  // Aggregate stats
  const totalReviewsCount = reviews.length
  const averageRating = useMemo(() => {
    if (totalReviewsCount === 0) return 5.0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return (sum / totalReviewsCount).toFixed(1)
  }, [reviews, totalReviewsCount])

  const starBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((r) => {
      counts[r.rating] = (counts[r.rating] || 0) + 1
    })
    return counts
  }, [reviews])

  // Filter and sort reviews
  const visibleReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        if (starFilter !== 'all' && r.rating !== Number(starFilter)) return false
        if (flavorFilter !== 'all' && r.flavor !== flavorFilter) return false
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase()
          const inAuthor = r.author.toLowerCase().includes(q)
          const inComment = r.comment.toLowerCase().includes(q)
          const inTitle = r.title?.toLowerCase().includes(q)
          if (!inAuthor && !inComment && !inTitle) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return 0 // keep array order where latest is first
        if (sortBy === 'highest') return b.rating - a.rating
        if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount
        return 0
      })
  }, [reviews, starFilter, flavorFilter, searchFilter, sortBy])

  // Submit new review
  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!formAuthor.trim()) {
      addToast('Please enter your name', 'error')
      return
    }
    if (!formComment.trim()) {
      addToast('Please write a short review or comment', 'error')
      return
    }

    const AVATAR_COLORS = ['#7C55D6', '#E2551B', '#D62E68', '#79A036', '#7A3B26', '#3D9970']
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]

    const newReview = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim(),
      avatarColor: randomColor,
      rating: formRating,
      date: 'Just now',
      flavor: formFlavor,
      title: formTitle.trim() || 'Delicious sweet experience!',
      comment: formComment.trim(),
      tags: formTags,
      helpfulCount: 1,
      verified: true,
      replies: [],
    }

    setReviews([newReview, ...reviews])
    setIsFormOpen(false)
    setFormAuthor('')
    setFormTitle('')
    setFormComment('')
    setFormTags(['Super Creamy'])
    addToast('🎉 Your review was posted successfully! Thank you!', 'success')
  }

  const handleStarClick = (starVal, e) => {
    setFormRating(starVal)
    if (e?.currentTarget) {
      try {
        animate(e.currentTarget, {
          scale: [1, 1.4, 1],
          duration: 350,
          ease: 'outBack',
        })
      } catch {
        // fallback
      }
    }
  }

  // Toggle helpful vote
  const handleToggleHelpful = (reviewId, e) => {
    if (e?.currentTarget) {
      try {
        animate(e.currentTarget, {
          scale: [1, 1.15, 1],
          duration: 300,
          ease: 'outQuad',
        })
      } catch {
        // fallback
      }
    }
    const isVoted = helpfulVoted.includes(reviewId)

    if (isVoted) {
      setHelpfulVoted(helpfulVoted.filter((id) => id !== reviewId))
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, helpfulCount: Math.max(0, r.helpfulCount - 1) } : r
        )
      )
    } else {
      setHelpfulVoted([...helpfulVoted, reviewId])
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
        )
      )
      addToast('Marked as helpful! 👍', 'info')
    }
  }

  // Add inline reply
  const handleAddReply = (reviewId) => {
    if (!replyText.trim()) return

    const newReply = {
      id: `rep-${Date.now()}`,
      author: 'Sweet Ice Cream Fan',
      isOwner: false,
      date: 'Just now',
      text: replyText.trim(),
    }

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, replies: [...(r.replies || []), newReply] } : r
      )
    )

    setReplyText('')
    setReplyOpenId(null)
    addToast('Reply added to discussion!', 'success')
  }

  const toggleFormTag = (tag) => {
    setFormTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <section id="reviews-section" className="reviews-section">
      <div className="reviews-container">
        {/* Section Header */}
        <div className="section-head text-center">
          <span className="section-tagline">Real Community Love</span>
          <h2 className="section-title">Customer Reviews & Discussion</h2>
          <p className="section-subtitle">
            See what ice cream connoisseurs across the country are saying. Leave your own feedback,
            rate your favorite scoop, and join the conversation!
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="rating-overview-card">
          <div className="overall-score-col">
            <span className="big-rating-number">{averageRating}</span>
            <div className="big-stars-row">
              {'★★★★★'.split('').map((star, idx) => (
                <span key={idx} className="big-star-icon">
                  {star}
                </span>
              ))}
            </div>
            <span className="total-reviews-caption">Based on {totalReviewsCount} sweet reviews</span>
            <span className="verified-satisfaction-pill">✓ 99.4% Verified Satisfaction</span>
          </div>

          {/* Star breakdown bars */}
          <div className="breakdown-bars-col">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starBreakdown[stars] || 0
              const pct = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0
              return (
                <div
                  key={stars}
                  className="star-bar-row"
                  onClick={() => setStarFilter(starFilter === String(stars) ? 'all' : String(stars))}
                  title={`Filter by ${stars} stars`}
                >
                  <span className="star-label">{stars} ★</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: stars >= 4 ? '#2ecc71' : stars === 3 ? '#f1c40f' : '#e74c3c',
                      }}
                    />
                  </div>
                  <span className="star-count-num">{count}</span>
                </div>
              )
            })}
          </div>

          {/* Write a review prompt */}
          <div className="write-prompt-col">
            <div className="prompt-badge">Tried Scoopy?</div>
            <h3 className="prompt-title">Share Your Flavor Experience</h3>
            <p className="prompt-desc">
              Your honest reviews help our master churners craft even better flavors every week.
            </p>
            <button
              className="write-review-cta-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
            >
              {isFormOpen ? 'Hide Review Form' : 'Write a Review ✍️'}
            </button>
          </div>
        </div>

        {/* Expandable Write a Review Form */}
        {isFormOpen && (
          <div className="review-form-wrapper">
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-head">
                <h3 className="form-heading">Leave a Customer Review</h3>
                <p className="form-subheading">Share your thoughts on the texture, flavor, and delivery.</p>
              </div>

              {/* Star Rating Selector */}
              <div className="form-field-group">
                <label className="form-label">Your Rating *</label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      className={`star-select-btn ${
                        (hoverRating || formRating) >= starVal ? 'is-active' : ''
                      }`}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={(e) => handleStarClick(starVal, e)}
                      aria-label={`${starVal} stars`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="star-sentiment-label">
                    {RATING_LABELS[hoverRating || formRating]}
                  </span>
                </div>
              </div>

              {/* Author & Flavor row */}
              <div className="form-grid-2">
                <div className="form-field-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Johnson"
                    className="form-input"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-label">Flavor Reviewed *</label>
                  <select
                    className="form-select"
                    value={formFlavor}
                    onChange={(e) => setFormFlavor(e.target.value)}
                  >
                    {flavors.map((f) => {
                      const name = f.name.replace('\n', ' ')
                      return (
                        <option key={f.id} value={name}>
                          {name}
                        </option>
                      )
                    })}
                    <option value="Custom Artisan Bowl">Custom Artisan Bowl</option>
                    <option value="The Quintet Tasting Flight">The Quintet Tasting Flight</option>
                  </select>
                </div>
              </div>

              {/* Review Title */}
              <div className="form-field-group">
                <label className="form-label">Headline / Title</label>
                <input
                  type="text"
                  placeholder="e.g. The best pistachio scoop I have ever had!"
                  className="form-input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              {/* Review Comment Text */}
              <div className="form-field-group">
                <label className="form-label">Your Review & Comments *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How was the creaminess, sweetness, and delivery temperature? What did you love most?"
                  className="form-textarea"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                />
                <span className="form-char-count">{formComment.length} characters</span>
              </div>

              {/* Taste Highlight Tags */}
              <div className="form-field-group">
                <label className="form-label">Add Highlights (Click to toggle):</label>
                <div className="tag-presets-row">
                  {TASTE_TAG_PRESETS.map((tag) => {
                    const isSelected = formTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`preset-tag-chip ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => toggleFormTag(tag)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Submit Row */}
              <div className="form-submit-row">
                <button type="submit" className="submit-review-btn">
                  <span>Publish Customer Review</span>
                  <span>🚀</span>
                </button>
                <button
                  type="button"
                  className="cancel-form-btn"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter & Search Bar for Reviews */}
        <div className="reviews-filter-bar">
          <div className="filter-chips-left">
            <button
              className={`filter-btn ${starFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setStarFilter('all')}
            >
              All Stars ({totalReviewsCount})
            </button>
            <button
              className={`filter-btn ${starFilter === '5' ? 'is-active' : ''}`}
              onClick={() => setStarFilter('5')}
            >
              5 ★ Only ({starBreakdown[5] || 0})
            </button>
            <button
              className={`filter-btn ${starFilter === '4' ? 'is-active' : ''}`}
              onClick={() => setStarFilter('4')}
            >
              4 ★ ({starBreakdown[4] || 0})
            </button>
          </div>

          <div className="reviews-search-group">
            <input
              type="text"
              placeholder="Search comments..."
              className="reviews-search-input"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <select
              className="reviews-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {visibleReviews.length > 0 ? (
            visibleReviews.map((rev) => {
              const isVoted = helpfulVoted.includes(rev.id)
              const isReplying = replyOpenId === rev.id

              return (
                <article key={rev.id} className="review-card">
                  {/* Card Header: Avatar, Name, Rating, Date */}
                  <div className="review-card-top">
                    <div className="author-info-group">
                      <div
                        className="author-avatar"
                        style={{ backgroundColor: rev.avatarColor || '#7C55D6' }}
                      >
                        {rev.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="author-name-row">
                          <span className="author-name">{rev.author}</span>
                          {rev.verified && (
                            <span className="verified-badge" title="Verified Customer Purchase">
                              ✓ Verified Buyer
                            </span>
                          )}
                        </div>
                        <div className="review-meta-row">
                          <div className="review-stars-static">
                            {'★'
                              .repeat(rev.rating)
                              .padEnd(5, '☆')
                              .split('')
                              .map((s, i) => (
                                <span
                                  key={i}
                                  className={i < rev.rating ? 'star-gold' : 'star-muted'}
                                >
                                  {s}
                                </span>
                              ))}
                          </div>
                          <span className="meta-dot">•</span>
                          <span className="review-date">{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Flavor tag */}
                    <div className="review-flavor-tag">
                      <span>🍨 {rev.flavor}</span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="review-body">
                    {rev.title && <h4 className="review-headline">{rev.title}</h4>}
                    <p className="review-paragraph">{rev.comment}</p>

                    {/* Tags */}
                    {rev.tags && rev.tags.length > 0 && (
                      <div className="review-tags-list">
                        {rev.tags.map((tag) => (
                          <span key={tag} className="review-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions footer: Helpful button + Reply button */}
                  <div className="review-footer-actions">
                    <button
                      className={`helpful-btn ${isVoted ? 'is-voted' : ''}`}
                      onClick={(e) => handleToggleHelpful(rev.id, e)}
                    >
                      <span className="helpful-icon">👍</span>
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>

                    <button
                      className="reply-trigger-btn"
                      onClick={() => {
                        setReplyOpenId(isReplying ? null : rev.id)
                        setReplyText('')
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Reply ({rev.replies ? rev.replies.length : 0})</span>
                    </button>
                  </div>

                  {/* Nested Replies Thread */}
                  {rev.replies && rev.replies.length > 0 && (
                    <div className="replies-thread">
                      {rev.replies.map((reply) => (
                        <div key={reply.id} className="reply-item">
                          <div className="reply-avatar-sm">
                            {reply.isOwner ? '👑' : reply.author.charAt(0)}
                          </div>
                          <div className="reply-content">
                            <div className="reply-author-row">
                              <span className="reply-author-name">{reply.author}</span>
                              {reply.isOwner && (
                                <span className="owner-badge">Scoopy Creamery Team</span>
                              )}
                              <span className="reply-date">{reply.date}</span>
                            </div>
                            <p className="reply-text">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Reply Composer */}
                  {isReplying && (
                    <div className="inline-reply-composer">
                      <input
                        type="text"
                        placeholder="Write a response or question..."
                        className="reply-input"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(rev.id)
                        }}
                      />
                      <button
                        className="post-reply-btn"
                        onClick={() => handleAddReply(rev.id)}
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </article>
              )
            })
          ) : (
            <div className="no-reviews-box">
              <span className="no-reviews-icon">💬</span>
              <h4>No reviews match your selected filter</h4>
              <p>Be the first to review this selection!</p>
              <button
                className="clear-review-filters-btn"
                onClick={() => {
                  setStarFilter('all')
                  setFlavorFilter('all')
                  setSearchFilter('')
                }}
              >
                Show All Reviews
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
