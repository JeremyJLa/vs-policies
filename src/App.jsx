import { useState } from 'react'
import './index.css'

// ── Data ────────────────────────────────────────────────────────────────────

const PLATFORM_PARAS = [
  "The billionaires have had it too good for too long. CEO salaries are up more than 40 percent in a year while living standards for everyone else are getting smashed. Decade after decade, under both major parties, the rich have gotten richer while everyone else struggles. And the politicians run Victoria like it's their own private cash machine.",
  "We have to change things. We've got to put politicians on a worker's wage so they live like the rest of us. And we've got to get socialists into parliament who will fight to make workers richer and billionaires poorer, not the other way around.",
  "Under the business-as-usual politics of Liberal and Labor, Melbourne has become a segregated city — working-class areas are starved of resources while the wealthy suburbs get the best of everything.",
  "The property market has become a casino for speculators interested only in profits, while homes are priced out of reach of an entire generation.",
  'Our gas and electricity infrastructure and services have been sold in the name of "efficiency". Now we\'re paying for it as the energy barons squeeze us for every cent.',
  "Our natural resources — from the minerals beneath the ground, to the arable land, to the forests, to the water in our rivers — have been handed to the highest bidder.",
  "The climate emergency gets worse every year as mass extinction events and irreversible losses of biodiversity put our future in jeopardy.",
  "Our public schools are the most underfunded in the country and our public health system is in permanent crisis.",
  'Under business-as-usual politics, it\'s divide and conquer. Whether it\'s the relentless attacks on trans people, the racist panics about "boat people" or "African gangs" or the attacks on Aboriginal sovereignty—all of it is there to divide us and to distract us from the great robbery going on right in front of our eyes.',
]

const POLICIES = [
  {
    title: 'HOUSING\nFOR ALL',
    body: "Melbourne's housing market has become a casino for speculators. We will introduce rent controls, end negative gearing, build public housing at scale, and ensure every Victorian has a safe, secure and affordable home to call their own.",
  },
  {
    title: 'FIX THE\nHEALTH CRISIS',
    body: "Our public health system is in permanent crisis from decades of deliberate underfunding. We will hire more nurses and doctors, fully fund our hospitals, cut waiting times, and guarantee free healthcare for all Victorians.",
  },
  {
    title: 'CLIMATE\nCHANGE AND\nENVIRONMENT',
    body: "The climate emergency is getting worse every year. We will drive a rapid transition to 100% renewable energy, stop new fossil fuel projects, protect our forests and rivers, and create thousands of secure green jobs.",
  },
]

const POLICY_GRID = Array.from({ length: 30 }, (_, i) => {
  const row = Math.floor(i / 3)
  const col = i % 3
  return POLICIES[(col + (row % 2)) % 3]
})

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  page: {
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
  },
  nav: {
    background: '#111',
    height: 82,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 24px',
  },
  navViewBtn: (active) => ({
    background: 'none',
    border: '1px solid',
    borderColor: active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
    fontSize: 11,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  navViewToggle: {
    display: 'flex',
    gap: 6,
  },
  heroSection: {
    position: 'relative',
    height: 220,
    flexShrink: 0,
  },
  heroPurple: {
    position: 'absolute',
    inset: 0,
    background: '#e4dded',
    clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 35%)',
  },
  pageTitleBox: {
    position: 'absolute',
    left: 300,
    top: 80,
    background: '#fff',
    padding: '4px 24px 16px',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: '-0.01em',
    color: '#000',
    fontFamily: "'Work Sans', system-ui, sans-serif",
  },
  tabBar: {
    padding: '0 300px',
    display: 'flex',
    gap: 24,
    background: '#fff',
    position: 'relative',
    zIndex: 1,
  },
  tabBtn: (active) => ({
    background: 'none',
    border: 'none',
    padding: '16px 0',
    fontSize: 18,
    fontWeight: active ? 800 : 600,
    cursor: 'pointer',
    color: '#000',
    borderBottom: active ? '2px solid #000' : '2px solid transparent',
    marginBottom: -1,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    transition: 'border-color 0.15s',
  }),
  content: {
    flex: 1,
    padding: '48px 80px 80px 300px',
  },
  platformText: {
    maxWidth: 540,
  },
  para: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#111',
    marginBottom: 18,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 400,
  },
  viewToggle: {
    display: 'flex',
    gap: 8,
    marginBottom: 32,
  },
  viewBtn: (active) => ({
    background: active ? '#111' : 'transparent',
    border: '1px solid #111',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    color: active ? '#fff' : '#111',
    padding: '6px 14px',
    transition: 'all 0.15s',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 300px)',
    gap: 24,
  },
  card: {
    borderRadius: 3,
    padding: '16px',
    cursor: 'pointer',
    height: 195,
  },
  cardExpanded: {
    borderRadius: 3,
    padding: '16px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 800,
    lineHeight: '28px',
    whiteSpace: 'pre-line',
    letterSpacing: '0.02em',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    textTransform: 'uppercase',
    margin: 0,
  },
  cardBody: {
    fontSize: 16,
    lineHeight: '20px',
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 400,
    marginTop: 12,
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  readMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    marginTop: 'auto',
    paddingTop: 12,
    cursor: 'pointer',
  },
  footer: {
    background: '#000',
    height: 120,
    flexShrink: 0,
  },
}

// ── Components ────────────────────────────────────────────────────────────────

const TILE_COLOURS = ['#F1ECF2', '#F7F7FF']

function PolicyCard({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const fg = hovered ? '#fff' : '#000'
  return (
    <div
      style={{ ...S.card, background: hovered ? '#FF4B33' : TILE_COLOURS[index % 2], display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ ...S.cardTitle, color: fg }}>{policy.title}</h2>
      <span style={{ ...S.readMore, color: fg, marginTop: 'auto', alignSelf: 'flex-end' }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardExpanded({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const fg = hovered ? '#fff' : '#000'
  return (
    <div
      style={{ ...S.cardExpanded, background: hovered ? '#FF4B33' : TILE_COLOURS[index % 2] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ ...S.cardTitle, color: fg }}>{policy.title}</h2>
      <p style={{ ...S.cardBody, color: fg }}>{policy.body}</p>
      <span style={{ ...S.readMore, color: fg, marginTop: 'auto', alignSelf: 'flex-end' }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('platform')
  const [cardView, setCardView] = useState('titles')

  return (
    <div style={S.page}>

      <nav style={S.nav}>
        <div style={S.navViewToggle}>
          <button style={S.navViewBtn(cardView === 'titles')} onClick={() => setCardView('titles')}>Titles</button>
          <button style={S.navViewBtn(cardView === 'expanded')} onClick={() => setCardView('expanded')}>Details</button>
        </div>
      </nav>

      <div style={S.heroSection}>
        <div style={S.heroPurple} />
        <div style={S.pageTitleBox}>
          <h1 style={S.pageTitle}>Policies</h1>
        </div>
      </div>

      <div style={S.tabBar}>
        <button style={S.tabBtn(tab === 'platform')} onClick={() => setTab('platform')}>
          Our policy platform
        </button>
        <button style={S.tabBtn(tab === 'policies')} onClick={() => setTab('policies')}>
          Our policies
        </button>
      </div>

      <main style={S.content}>
        {tab === 'platform' ? (
          <div style={S.platformText}>
            {PLATFORM_PARAS.map((p, i) => (
              <p key={i} style={S.para}>{p}</p>
            ))}
          </div>
        ) : (
          <>
            <div style={S.grid}>
              {POLICY_GRID.map((policy, i) =>
                cardView === 'titles'
                  ? <PolicyCard key={i} policy={policy} index={i} />
                  : <PolicyCardExpanded key={i} policy={policy} index={i} />
              )}
            </div>
          </>
        )}
      </main>

      <footer style={S.footer} />
    </div>
  )
}
