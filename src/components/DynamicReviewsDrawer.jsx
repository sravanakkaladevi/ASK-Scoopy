import { useState, useMemo, useEffect } from 'react'
import { animate } from 'animejs'
import { initialReviews } from '../data/initialReviews'
import { flavors } from '../data/flavors'
import { useCart } from '../context/CartContext'
import './DynamicReviewsDrawer.css'

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

export default function DynamicReviewsDrawer() {
  const { isReviewsOpen, setIsReviewsOpen, activeFlavor, addToast } = useCart()

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : initialReviews
    } catch {
      return initialReviews
    }
  })

  const [helpfulVoted, setHelpfulVoted] = useState(() => {
    try {
      const saved = localStorage.getItem(HELPFUL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formRating, setFormRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [formAuthor, setFormAuthor] = useState('')
  const [formFlavor, setFormFlavor] = useState(activeFlavor?.name?.replace('\n', ' ') || flavors[0].name.replace('\n', ' '))
  const [formTitle, setFormTitle] = useState('')
  const [formComment, setFormComment] = useState('')
  const [formTags, setFormTags] = useState(['Super Creamy'])

  const [starFilter, setStarFilter] = useState('all')
  const [flavorFilter, setFlavorFilter] = useState('all')

  const [replyOpenId, setReplyOpenId] = useState(null)
  const [replyText, setReplyText] = useState('')

  // Update default form flavor when active flavor changes
  useEffect(() => {
    if (activeFlavor?.name) {
      setFormFlavor(activeFlavor.name.replace('\n', ' '))
    }
  }, [activeFlavor])

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews))
    } catch {
      // ignore
    }
  }, [reviews])

  useEffect(() => {
    try {
      localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(helpfulVoted))
    } catch {
      // ignore
    }
  }, [helpfulVoted])

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

  const visibleReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (starFilter !== 'all' && r.rating !== Number(starFilter)) return false
      if (flavorFilter !== 'all' && r.flavor !== flavorFilter) return false
      return true
    })
  }, [reviews, starFilter, flavorFilter])

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

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!formAuthor.trim() || !formComment.trim()) {
      addToast('Please fill in your name and review', 'error')
      return
    }

    const AVATAR_COLORS = ['#7C55D6', '#E2551B', '#D62E68', '#79A036', '#7A3B26']
    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]

    const newReview = {
      id: `rev-${Date.now()}`,
      author: formAuthor.trim(),
      avatarColor: color,
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
    addToast('🎉 Your review was posted! Thank you!', 'success')
  }

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

  if (!isReviewsOpen) return null

  return (
    <div className="reviews-drawer-overlay" onClick={() => setIsReviewsOpen(false)}>
      <aside className="reviews-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="reviews-drawer-header">
          <div className="header-info">
            <h3 className="drawer-title">Community Reviews</h3>
            <span className="drawer-count-badge">★ {averageRating} ({totalReviewsCount} reviews)</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsReviewsOpen(false)}
            aria-label="Close reviews"
          >
            ×
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="reviews-drawer-scroll">
          {/* Quick Score Card */}
          <div className="drawer-rating-card">
            <div className="rating-card-top">
              <div className="rating-score-box">
                <span className="rating-big-num">{averageRating}</span>
                <span className="rating-stars">★★★★★</span>
                <span className="rating-sub">100% verified reviews</span>
              </div>
              <button
                className="drawer-write-cta"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? 'Cancel' : 'Write a Review ✍️'}
              </button>
            </div>

            {/* Breakdown bars */}
            <div className="rating-bars-mini">
              {[5, 4, 3, 2, 1].map((s) => {
                const count = starBreakdown[s] || 0
                const pct = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0
                return (
                  <div
                    key={s}
                    className="bar-row-mini"
                    onClick={() => setStarFilter(starFilter === String(s) ? 'all' : String(s))}
                  >
                    <span>{s}★</span>
                    <div className="bar-track-mini">
                      <div className="bar-fill-mini" style={{ width: `${pct}%` }} />
                    </div>
                    <span>{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form */}
          {isFormOpen && (
            <form onSubmit={handleReviewSubmit} className="drawer-review-form">
              <h4 className="form-title">Write Your Review</h4>

              {/* Star selector */}
              <div className="form-group">
                <label className="field-label">Your Rating</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      className={`star-pick-btn ${(hoverRating || formRating) >= val ? 'is-active' : ''}`}
                      onMouseEnter={() => setHoverRating(val)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={(e) => handleStarClick(val, e)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="star-sentiment">{RATING_LABELS[hoverRating || formRating]}</span>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="field-label">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya L."
                    className="drawer-input"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="field-label">Flavor</label>
                  <select
                    className="drawer-input"
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
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="field-label">Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Silky, rich and refreshing"
                  className="drawer-input"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="field-label">Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what you loved about the creaminess, flavor and delivery..."
                  className="drawer-input"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                />
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="field-label">Taste Highlights</label>
                <div className="tags-row">
                  {TASTE_TAG_PRESETS.map((tag) => {
                    const isSel = formTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`tag-chip ${isSel ? 'is-active' : ''}`}
                        onClick={() => toggleFormTag(tag)}
                      >
                        {isSel ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Publish Review ✨
              </button>
            </form>
          )}

          {/* Filter Bar */}
          <div className="drawer-filter-chips">
            <button
              className={`chip ${starFilter === 'all' && flavorFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => {
                setStarFilter('all')
                setFlavorFilter('all')
              }}
            >
              All
            </button>
            {activeFlavor && (
              <button
                className={`chip ${flavorFilter === activeFlavor.name.replace('\n', ' ') ? 'is-active' : ''}`}
                onClick={() =>
                  setFlavorFilter(
                    flavorFilter === activeFlavor.name.replace('\n', ' ')
                      ? 'all'
                      : activeFlavor.name.replace('\n', ' ')
                  )
                }
              >
                Current Flavor ({activeFlavor.name.replace('\n', ' ')})
              </button>
            )}
            <button
              className={`chip ${starFilter === '5' ? 'is-active' : ''}`}
              onClick={() => setStarFilter(starFilter === '5' ? 'all' : '5')}
            >
              5★ ({starBreakdown[5] || 0})
            </button>
          </div>

          {/* Comment Cards */}
          <div className="drawer-comments-list">
            {visibleReviews.map((rev) => {
              const isVoted = helpfulVoted.includes(rev.id)
              const isReplying = replyOpenId === rev.id

              return (
                <div key={rev.id} className="comment-card">
                  <div className="comment-header">
                    <div
                      className="comment-avatar"
                      style={{ backgroundColor: rev.avatarColor || '#7C55D6' }}
                    >
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-meta">
                      <div className="comment-name-row">
                        <span className="comment-author">{rev.author}</span>
                        {rev.verified && <span className="verified-badge">✓ Verified</span>}
                      </div>
                      <div className="comment-sub-row">
                        <span className="comment-stars">{'★'.repeat(rev.rating)}</span>
                        <span>•</span>
                        <span className="comment-date">{rev.date}</span>
                        <span>•</span>
                        <span className="comment-flavor-name">{rev.flavor}</span>
                      </div>
                    </div>
                  </div>

                  {rev.title && <h5 className="comment-headline">{rev.title}</h5>}
                  <p className="comment-body">{rev.comment}</p>

                  {rev.tags?.length > 0 && (
                    <div className="comment-tags">
                      {rev.tags.map((t) => (
                        <span key={t} className="t-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions: Helpful & Reply */}
                  <div className="comment-actions">
                    <button
                      className={`action-btn ${isVoted ? 'is-voted' : ''}`}
                      onClick={(e) => handleToggleHelpful(rev.id, e)}
                    >
                      👍 Helpful ({rev.helpfulCount})
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => {
                        setReplyOpenId(isReplying ? null : rev.id)
                        setReplyText('')
                      }}
                    >
                      💬 Reply ({rev.replies?.length || 0})
                    </button>
                  </div>

                  {/* Replies thread */}
                  {rev.replies?.length > 0 && (
                    <div className="replies-list">
                      {rev.replies.map((rep) => (
                        <div key={rep.id} className="reply-bubble">
                          <div className="reply-top">
                            <span className="reply-author">{rep.author}</span>
                            {rep.isOwner && <span className="team-badge">Scoopy Team</span>}
                            <span className="reply-date">{rep.date}</span>
                          </div>
                          <p className="reply-msg">{rep.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply composer */}
                  {isReplying && (
                    <div className="reply-composer">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        className="reply-box"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(rev.id)
                        }}
                      />
                      <button className="reply-send-btn" onClick={() => handleAddReply(rev.id)}>
                        Post
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}
