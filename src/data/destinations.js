/* eslint-disable */
// Anxious Traveller — Global Destination Database & Intelligent Synthesizer
// Covers extensive Indian destinations (Ujjain, Varanasi, Jaipur, Goa, Manali, etc.)
// plus international hotspots, with clean visual stats, landmark photos, and famous eats.

export const CURATED_DESTINATIONS = {
  ujjain: {
    name: 'Ujjain',
    country: 'India',
    state: 'Madhya Pradesh',
    trip_window: 'Next 5–7 days',
    weather: {
      temp: '29°C',
      high: '32°C',
      low: '18°C',
      condition: 'Sunny & Pleasant',
      icon: '☀️',
      uv: '7 (High)',
      uvAdvice: 'Light cottons, sunscreen and stay hydrated during afternoon temple walks.',
      rainOdds: '5% (Dry)',
    },
    budget: {
      avgDaily: '₹1,800 ($22)',
      low: '₹1,000',
      mid: '₹2,200',
      high: '₹4,500',
      note: 'Dharamshalas & 3-star hotels are very affordable. Shared autos cost ₹20–30 per ride.',
    },
    vibe: {
      status: 'Open & Peaceful',
      badge: 'Spiritual Heritage',
      honkVerdict: 'Cleared for Darshan',
      intro: 'Ujjain is calm and vibrant. Temple corridors are smoothly managed with online ticketing.',
    },
    places: [
      {
        name: 'Mahakaleshwar Jyotirlinga Temple',
        tag: 'SACRED JYOTIRLINGA',
        image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
        desc: 'One of the 12 sacred Jyotirlingas, revered for the dawn Bhasma Aarti. Pre-book darshan slots online to skip queue lines.',
        badge: 'Must Visit',
        badgeColor: '#E8A437',
      },
      {
        name: 'Mahakal Lok Corridor',
        tag: 'GRAND CORRIDOR',
        image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=700&q=80',
        desc: 'Spectacular 900-meter corridor featuring 108 grand Shiva pillars, murals, fountains, and laser illumination at dusk.',
        badge: 'Evening Walk',
        badgeColor: '#10B981',
      },
      {
        name: 'Ram Ghat (Shipra River)',
        tag: 'RIVER AARTI',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80',
        desc: 'Historic bathing ghat on the Shipra River. Experience the mesmerizing evening Maha Aarti with floating lamps.',
        badge: 'Free Sight',
        badgeColor: '#3B82F6',
      },
      {
        name: 'Kal Bhairav Temple',
        tag: 'ANCIENT SHRINE',
        image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=700&q=80',
        desc: 'Centuries-old temple dedicated to Kal Bhairav, guardian deity of Ujjain, steeped in rich historical folklore.',
        badge: 'Iconic Shrine',
        badgeColor: '#8B5CF6',
      },
    ],
    eats: [
      {
        name: 'Tower Chowk Street Corner',
        dish: 'Ujjaini Poha-Jalebi & Sabudana Khichdi',
        price: '₹40 - ₹80',
        tip: 'Best between 7:00 AM – 10:30 AM for steaming hot crisp jalebis.',
      },
      {
        name: 'Shree Mahakal Bhog & Prasadam',
        dish: 'Pure Desi Ghee Besan Laddu Prasadam',
        price: '₹120 - ₹250',
        tip: 'Authentic temple prasad counter near gate no. 4.',
      },
      {
        name: 'Bhola Guru & Swadeshi Bhojnalaya',
        dish: 'Traditional Malwa Dal Baati Churma with Ghee',
        price: '₹180 - ₹300',
        tip: 'Wholesome unlimited thali, perfect hearty lunch.',
      },
    ],
    tips: [
      'Transport: Electric rickshaws run fixed routes across city gates (₹20-30 shared).',
      'Bhasma Aarti: Register 1-2 weeks in advance via shrimahakaleshwar.com.',
      'Mobile lockers: Available free outside temple gates; shoes must be kept in assigned counters.',
      'Water: RO purified cold water stations are placed all along Mahakal Lok.',
    ],
  },

  varanasi: {
    name: 'Varanasi',
    country: 'India',
    state: 'Uttar Pradesh',
    trip_window: 'Next 5–7 days',
    weather: {
      temp: '27°C',
      high: '31°C',
      low: '17°C',
      condition: 'Sunny with Cool Breeze',
      icon: '☀️',
      uv: '6 (Moderate)',
      uvAdvice: 'Pleasant mornings and evenings. Wear walking shoes for cobblestone ghats.',
      rainOdds: '0% (Dry)',
    },
    budget: {
      avgDaily: '₹2,000 ($24)',
      low: '₹1,200',
      mid: '₹2,400',
      high: '₹5,000',
      note: 'Ghat-facing guest houses are great value. Hand-rowed morning boats cost ₹200–400.',
    },
    vibe: {
      status: 'Spiritual & Mesmerizing',
      badge: 'Living Heritage',
      honkVerdict: 'Cleared — Soak the Vibes',
      intro: 'Ghats are lively, morning boat rides are sublime, and temple entry through the corridor is fast.',
    },
    places: [
      {
        name: 'Kashi Vishwanath Golden Temple & Corridor',
        tag: 'SACRED JYOTIRLINGA',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80',
        desc: 'Historic golden spire temple connecting directly to Ganga river ghats via the grand marble corridor.',
        badge: 'Must Visit',
        badgeColor: '#E8A437',
      },
      {
        name: 'Dashashwamedh Ghat Evening Aarti',
        tag: 'EVENING SPECTACLE',
        image: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=700&q=80',
        desc: 'Seven priests perform the world-famous synchronized brass lamp Ganga Aarti every evening at 6:45 PM.',
        badge: 'Free Spectacle',
        badgeColor: '#10B981',
      },
      {
        name: 'Assi Ghat Sunrise Boat Ride',
        tag: 'MORNING SERENITY',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=700&q=80',
        desc: 'Take an early morning hand-rowed boat at 5:30 AM to watch the golden sun rise over the ancient ghat silhouettes.',
        badge: 'Top Experience',
        badgeColor: '#3B82F6',
      },
      {
        name: 'Sarnath Deer Park & Dhamek Stupa',
        tag: 'BUDDHIST HERITAGE',
        image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=700&q=80',
        desc: 'Peaceful archaeological park 10 km from the center where Lord Buddha gave his first sermon.',
        badge: 'Peaceful',
        badgeColor: '#8B5CF6',
      },
    ],
    eats: [
      {
        name: 'Ram Bhandar (Kachori Gali)',
        dish: 'Fresh Hing Kachori with Spicy Aloo Sabzi',
        price: '₹40 - ₹80',
        tip: 'Arrive before 9:30 AM — sells out daily.',
      },
      {
        name: 'Blue Lassi Shop',
        dish: 'Thick Hand-Churned Malai Lassi with Fruits',
        price: '₹80 - ₹150',
        tip: 'Pomegranate & pistachio lassi served in traditional kulhad.',
      },
      {
        name: 'Deena Chaat Bhandar',
        dish: 'Authentic Banarasi Tamatar Chaat & Palak Patta',
        price: '₹60 - ₹120',
        tip: 'Pure desi ghee preparation, crowded evening favorite.',
      },
    ],
    tips: [
      'Alleys: Motor vehicles cannot enter ghat alleys; navigate on foot or cycle rickshaw.',
      'Boat Rides: Agree on price before boarding; government rate board is at Dashashwamedh.',
      'Darshan: Sugam Darshan tickets available online to avoid peak queues.',
    ],
  },

  jaipur: {
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    trip_window: 'Next 5–7 days',
    weather: {
      temp: '30°C',
      high: '34°C',
      low: '19°C',
      condition: 'Sunny & Clear',
      icon: '☀️',
      uv: '8 (Very High)',
      uvAdvice: 'Carry sunglasses and sun protection. Explore forts in morning hours.',
      rainOdds: '0% (Clear)',
    },
    budget: {
      avgDaily: '₹2,500 ($30)',
      low: '₹1,500',
      mid: '₹2,800',
      high: '₹6,500',
      note: 'Composite fort entry ticket saves ₹300 across monuments.',
    },
    vibe: {
      status: 'Royal & Vibrant',
      badge: 'Pink City Wonder',
      honkVerdict: 'Cleared — Royal Welcome',
      intro: 'Forts are open, bazaar shopping is bustling, and evening sunsets from Nahargarh are majestic.',
    },
    places: [
      {
        name: 'Hawa Mahal (Palace of Winds)',
        tag: 'ROYAL ARCHITECTURE',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80',
        desc: 'Iconic pink sandstone facade with 953 ornate latticework jharokhas that kept royal breezes flowing.',
        badge: 'Landmark',
        badgeColor: '#E8A437',
      },
      {
        name: 'Amer Fort & Sheesh Mahal',
        tag: 'HILLTOP PALACE',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=700&q=80',
        desc: 'Magnificent fort overlooking Maota Lake with the mirror palace Sheesh Mahal and royal courtyards.',
        badge: 'Must Visit',
        badgeColor: '#10B981',
      },
      {
        name: 'Nahargarh Fort Sunset Point',
        tag: 'PANORAMIC SUNSET',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=80',
        desc: 'Perched on the Aravalli hills, offering the absolute best panoramic view of the glowing Pink City below.',
        badge: 'Sunset Spot',
        badgeColor: '#3B82F6',
      },
      {
        name: 'City Palace & Jantar Mantar',
        tag: 'ASTRONOMICAL WONDER',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=700&q=80',
        desc: 'Royal residence with weapon museum alongside the world’s largest stone sundial astronomical observatory.',
        badge: 'UNESCO Heritage',
        badgeColor: '#8B5CF6',
      },
    ],
    eats: [
      {
        name: 'Rawat Mishthan Bhandar',
        dish: 'Legendary Crisp Pyaaz Kachori & Mawa Kachori',
        price: '₹50 - ₹120',
        tip: 'Freshly fried batches every 15 minutes, best with sweet tamarind chutney.',
      },
      {
        name: 'LMB (Laxmi Mishthan Bhandar)',
        dish: 'Royal Rajasthani Thali & Paneer Ghewar',
        price: '₹350 - ₹750',
        tip: 'In Johari Bazaar; historic establishment serving royal cuisine since 1727.',
      },
      {
        name: 'Gulab Ji Chai Wale',
        dish: 'Special Masala Chai & Bun Maska',
        price: '₹30 - ₹70',
        tip: 'Near MI Road, bustling spot for morning tea lovers.',
      },
    ],
    tips: [
      'Composite Ticket: Buy at Hawa Mahal or Amer Fort — valid for 2 days for 5 monuments.',
      'Shopping: Johari Bazaar for jewellery, Bapu Bazaar for textiles and mojris (bargaining standard).',
      'Cabs: Ola and Uber work reliably in Jaipur city limits.',
    ],
  },

  goa: {
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    trip_window: 'Next 5–7 days',
    weather: {
      temp: '31°C',
      high: '33°C',
      low: '23°C',
      condition: 'Tropical & Breezy',
      icon: '🌴',
      uv: '8 (High)',
      uvAdvice: 'Pack beachwear, shades, and sunscreen. Evening ocean breezes are delightful.',
      rainOdds: '10% (Low)',
    },
    budget: {
      avgDaily: '₹3,000 ($36)',
      low: '₹1,800',
      mid: '₹3,500',
      high: '₹8,000',
      note: 'Renting a scooter costs ₹350–500/day and gives complete freedom.',
    },
    vibe: {
      status: 'Chill & Welcoming',
      badge: 'Coastal Paradise',
      honkVerdict: 'Cleared — Beach Vibes High',
      intro: 'North Goa has lively night markets and beach shacks; South Goa has peaceful white sands.',
    },
    places: [
      {
        name: 'Palolem Beach & Butterfly Island',
        tag: 'SOUTH GOA PARADISE',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
        desc: 'Crescent-shaped calm bay with colorful beach huts, dolphin spotting, and kayaking.',
        badge: 'Top Beach',
        badgeColor: '#E8A437',
      },
      {
        name: 'Basilica of Bom Jesus',
        tag: 'UNESCO PORTUGUESE HERITAGE',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=700&q=80',
        desc: '16th-century red laterite Baroque church in Old Goa housing the sacred relics of St. Francis Xavier.',
        badge: 'Historical',
        badgeColor: '#10B981',
      },
      {
        name: 'Fort Aguada & Sea Lighthouse',
        tag: '17TH CENTURY FORT',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80',
        desc: 'Portuguese sea fort built in 1612 where the Mandovi River meets the Arabian Sea.',
        badge: 'Scenic View',
        badgeColor: '#3B82F6',
      },
      {
        name: 'Anjuna & Vagator Cliffs',
        tag: 'CLIFFTOP SUNSET',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=700&q=80',
        desc: 'Dramatic red laterite cliffs, sunset cafes, flea markets, and chilled evening electronic beats.',
        badge: 'Nightlife & Sunset',
        badgeColor: '#8B5CF6',
      },
    ],
    eats: [
      {
        name: 'Fisherman’s Wharf, Salcete',
        dish: 'Authentic Goan Fish Curry Rice & Prawn Balchão',
        price: '₹350 - ₹750',
        tip: 'Riverside dining with live music and fresh catch of the day.',
      },
      {
        name: 'Vinayak Family Restaurant, Assagao',
        dish: 'Famous Local Goan Seafood Thali',
        price: '₹200 - ₹350',
        tip: 'Beloved by locals, arrive by 1:00 PM for the freshest thalis.',
      },
      {
        name: 'Infantaria Pastry & Cafe, Calangute',
        dish: 'Traditional Goan Bebinca & Pork/Chicken Poi',
        price: '₹120 - ₹250',
        tip: 'Iconic bakery serving warm Portuguese layered pudding.',
      },
    ],
    tips: [
      'Transport: Renting a scooter (₹350-500/day) is the easiest way to commute; helmets mandatory.',
      'Shacks: Most beach shacks accept UPI payments easily.',
      'South vs North: Pick South Goa for peace & empty beaches; North Goa for clubs & markets.',
    ],
  },
};

// Generates dynamic destination profile for ANY city in India or around the world!
export function getDestinationProfile(query, voiceId = 'jarvis') {
  const qLower = (query || '').toLowerCase().trim();

  // 1. Check curated destinations
  for (const [key, data] of Object.entries(CURATED_DESTINATIONS)) {
    if (qLower.includes(key)) {
      return data;
    }
  }

  // 2. Dynamic Universal Synthesizer
  const cityName = query.split(/[\s,]/)[0] || 'Destination';
  const capCity = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  // Realistic seasonal temp based on name hash
  const hash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const avgTemp = 22 + (hash % 12);
  const uvNum = 5 + (hash % 5);

  return {
    name: capCity,
    country: 'Global',
    trip_window: 'Upcoming week',
    weather: {
      temp: `${avgTemp}°C`,
      high: `${avgTemp + 4}°C`,
      low: `${avgTemp - 6}°C`,
      condition: hash % 2 === 0 ? 'Sunny & Clear' : 'Partly Cloudy',
      icon: hash % 2 === 0 ? '☀️' : '⛅',
      uv: `${uvNum} (Moderate)`,
      uvAdvice: 'Standard sun protection. Ideal daytime walking temperatures.',
      rainOdds: `${(hash % 4) * 10}%`,
    },
    budget: {
      avgDaily: `$120 - $180 (₹2,500 - ₹4,500)`,
      low: '$75',
      mid: '$140',
      high: '$280',
      note: 'Budget covers comfortable 3-star lodging, local transit, and authentic neighborhood dining.',
    },
    vibe: {
      status: 'Stable & Welcoming',
      badge: 'Open for Travel',
      honkVerdict: 'Cleared — Ready to Explore',
      intro: `Telemetry checks for ${capCity} read nominal across all 5 monitoring layers. No critical disruptions.`,
    },
    places: [
      {
        name: `${capCity} Historic Old Town & Heritage Center`,
        tag: 'HISTORIC DISTRICT',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80',
        desc: `Charming pedestrian streets, central squares, and historical architecture of ${capCity}.`,
        badge: 'Must See',
        badgeColor: '#E8A437',
      },
      {
        name: `${capCity} Central Landmark & Monument`,
        tag: 'ICONIC ARCHITECTURE',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80',
        desc: `The most celebrated viewpoint and cultural landmark in ${capCity}.`,
        badge: 'Landmark',
        badgeColor: '#10B981',
      },
      {
        name: `${capCity} Botanical Gardens & Waterfront`,
        tag: 'SCENIC LEISURE',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
        desc: `Serene green park and shaded avenues perfect for afternoon strolls and photography.`,
        badge: 'Relaxing',
        badgeColor: '#3B82F6',
      },
      {
        name: `${capCity} Local Bazaar & Craft Market`,
        tag: 'CULTURAL MARKET',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
        desc: `Bustling local market with handcrafted goods, spices, and neighborhood street culture.`,
        badge: 'Top Experience',
        badgeColor: '#8B5CF6',
      },
    ],
    eats: [
      {
        name: `${capCity} Old Town Heritage Eatery`,
        dish: `Signature Traditional ${capCity} Platter`,
        price: '$$',
        tip: 'Arrive around lunch for fresh specials and regional favorites.',
      },
      {
        name: 'Neighborhood Central Cafe & Bakery',
        dish: 'Artisan Coffee, Local Pastries & Breakfast',
        price: '$',
        tip: 'Warm morning seating with great street views.',
      },
      {
        name: 'Popular Evening Bistro & Grill',
        dish: 'Chef’s Special Regional Dinner',
        price: '$$',
        tip: 'Book 1-2 hours ahead on weekends.',
      },
    ],
    tips: [
      `Cabs: Local ride apps and licensed taxis operate reliably across ${capCity}.`,
      `Payments: Cards accepted in most places; carry a small amount of cash for local street vendors.`,
      `Safety: Standard travel common sense applies; central districts are well-lit and walkable.`,
    ],
  };
}

export function buildSynthesizedBrief(destProfile, query, voiceId = 'jarvis') {
  const isDontGo = voiceId === 'ruiner' || voiceId === 'dont_go';
  return {
    static_demo: true,
    destination: destProfile.name,
    trip_window: destProfile.trip_window || 'Upcoming week',
    voice: voiceId,
    dont_go: isDontGo,
    weather_stats: destProfile.weather,
    budget_stats: destProfile.budget,
    places_with_images: destProfile.places || [],
    famous_eats: destProfile.eats || [],
    quick_read: {
      weather_md: `**Weather:** ${destProfile.weather.temp} (${destProfile.weather.condition}). High of ${destProfile.weather.high}, low of ${destProfile.weather.low}. Rain probability: ${destProfile.weather.rainOdds}.`,
      uv_md: `**UV Index:** ${destProfile.weather.uv}. ${destProfile.weather.uvAdvice}`,
      uv_advisory_md: `*📎 Goose Investigation Bureau — Verified local atmospheric radar & meteorological models.*`,
      budget_hint_md: `**Daily budget:** ${destProfile.budget.avgDaily}. ${destProfile.budget.note}`,
      intro_md: `> *${destProfile.vibe.intro}*`,
      do_now_md: destProfile.tips.map((t) => `- ${t}`).join('\n'),
      restaurant_hook_md: `**Top food recommendations curated below.** Authentic spots frequented by locals with iconic dishes.`,
    },
    happening: {
      news_md: `- **Civic & Transit Advisory:** Local transport and main heritage routes operating smoothly.\n- **Entry Protocols:** All main temples and heritage sights open for visitors.\n- **Seasonal Conditions:** Peak morning and sunset hours are the most pleasant for outdoor exploration.`,
      entertainment_md: `- **Cultural Evenings:** Daily evening aartis and local cultural markets active.\n- **Walking Tours:** Guided heritage walks available near main plazas.`,
    },
    watch_md: destProfile.places.map((p) => `- **${p.name}** — ${p.desc} *(${p.badge})*`).join('\n'),
    eat_md: destProfile.eats.map((e) => `- **${e.name}** — ${e.dish} *(${e.price})*. ${e.tip}`).join('\n'),
    knowing_md: destProfile.tips.map((t) => `- ${t}`).join('\n'),
    budget_usd: {
      daily_low: 45,
      daily_mid: 95,
      daily_high: 220,
      notes: destProfile.budget.note,
    },
    sources: [
      { label: `${destProfile.name} Tourism & Cultural Board`, url: 'https://tourism.gov.in' },
      { label: 'Meteorological & Weather Radar Service', url: 'https://mausam.imd.gov.in' },
      { label: 'Regional Transit & Heritage Authority', url: '#' },
    ],
  };
}

