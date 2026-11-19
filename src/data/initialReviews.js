export const initialReviews = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    avatarColor: '#7C55D6',
    rating: 5,
    date: '2 hours ago',
    flavor: 'Blueberry Lagoon',
    title: 'The blueberry flavor tastes genuinely freshly picked!',
    comment:
      'I was skeptical about ordering ice cream online because of melting fears, but the dry-ice package arrived rock solid. The blueberry swirl is not overly sweet—you can actually taste real wild bilberries with an earthy, creamy tang. Absolute heaven on a warm afternoon!',
    tags: ['Super Creamy', 'Authentic Fruit', 'Melt-Free Delivery'],
    helpfulCount: 42,
    verified: true,
    replies: [
      {
        id: 'rep-1-1',
        author: 'Scoopy Master Churner',
        isOwner: true,
        date: '1 hour ago',
        text: 'Thank you so much Elena! We forage our bilberries in small harvest batches to preserve that tangy punch. Thrilled the cold-chain package made it in peak form!'
      }
    ]
  },
  {
    id: 'rev-2',
    author: 'Marcus Chen',
    avatarColor: '#7A3B26',
    rating: 5,
    date: 'Yesterday',
    flavor: 'Choco Fudge',
    title: 'Best dark chocolate gelato on the market, period.',
    comment:
      'Rich, velvety, and intensely chocolatey without feeling heavy or artificial. The fudge ripples stay chewy even straight out of the freezer. Pro tip: sprinkle a pinch of coarse sea salt on top before digging in!',
    tags: ['Rich Indulgence', 'Fudge Ribbons', 'Repeat Customer'],
    helpfulCount: 29,
    verified: true,
    replies: []
  },
  {
    id: 'rev-3',
    author: 'Sophie & Liam',
    avatarColor: '#D62E68',
    rating: 5,
    date: '3 days ago',
    flavor: 'Strawberry Bliss',
    title: 'Kids and adults both begged for seconds!',
    comment:
      'We ordered the Party Cooler bundle for our twins’ 7th birthday. The Strawberry Bliss was gone within 10 minutes. It has that pink summer picnic nostalgia, but you can feel the quality of grass-fed dairy.',
    tags: ['Family Favorite', 'Smooth Texture', 'Fast Shipping'],
    helpfulCount: 18,
    verified: true,
    replies: [
      {
        id: 'rep-3-1',
        author: 'Liam Vance',
        isOwner: false,
        date: '2 days ago',
        text: 'Did you guys pair it with waffle cones or bowls? We loved the toasted waffle cones!'
      },
      {
        id: 'rep-3-2',
        author: 'Sophie & Liam',
        isOwner: false,
        date: '1 day ago',
        text: '@Liam Vance Both! The cones arrived crunchy and unbroken in their separate blister box.'
      }
    ]
  },
  {
    id: 'rev-4',
    author: 'Chef Matteo G.',
    avatarColor: '#79A036',
    rating: 5,
    date: '5 days ago',
    flavor: 'Pistachio Dream',
    title: 'Real Sicilian Bronte pistachios, no fake almond extract.',
    comment:
      'As a pastry chef, my pet peeve is green ice cream that relies on bitter almond aroma and green food coloring. Scoopy’s Pistachio Dream is naturally roasted, nutty, with subtle savory flecks of sea salt. Phenomenal execution.',
    tags: ['Artisan Grade', 'Authentic Nuts', 'Chef Approved'],
    helpfulCount: 56,
    verified: true,
    replies: []
  },
  {
    id: 'rev-5',
    author: 'Aaliyah Sharma',
    avatarColor: '#E2551B',
    rating: 4,
    date: '1 week ago',
    flavor: 'Mango Sunset',
    title: 'Tropical paradise in a scoop, wonderful texture',
    comment:
      'The Alphonso mango puree is top tier. Very smooth mouthfeel. Only giving 4 stars because my neighborhood courier had a 20-minute delay, though the ice cream stayed completely frozen thanks to the dry ice bricks!',
    tags: ['Tropical', 'Real Alphonso', 'Great Packaging'],
    helpfulCount: 12,
    verified: true,
    replies: [
      {
        id: 'rep-5-1',
        author: 'Scoopy Support',
        isOwner: true,
        date: '6 days ago',
        text: 'Thanks for the honest feedback Aaliyah! We are constantly tuning courier delivery windows in your zone to ensure 100% on-time arrivals. Glad the dry-ice kept it pristine!'
      }
    ]
  }
]
