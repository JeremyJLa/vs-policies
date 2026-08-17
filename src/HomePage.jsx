import { useState, useEffect } from 'react'

const RED = '#E5271E'
const FONT = "'Open Sans', system-ui, sans-serif"

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return w
}

function MobileMenu({ onClose, onNavigateToPolicies, onNavigateToVision }) {
  const [expanded, setExpanded] = useState(null)

  const toggle = (key) => setExpanded(prev => prev === key ? null : key)

  const navItemStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    color: '#fff', fontSize: 18, fontWeight: 600, fontFamily: FONT,
    cursor: 'pointer', userSelect: 'none', lineHeight: 1.2,
  }

  const subItemStyle = {
    display: 'block', color: '#fff', textDecoration: 'none',
    fontSize: 16, fontWeight: 500, fontFamily: FONT,
    paddingLeft: 32, paddingTop: 18, paddingBottom: 18,
  }

  const chevron = (open) => (
    <svg
      width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, opacity: 0.85, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: '#0f0f0f', zIndex: 200, overflowY: 'auto',
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 18, right: 22,
          background: 'none', border: 'none', color: '#fff',
          fontSize: 26, cursor: 'pointer', padding: 8, lineHeight: 1,
          fontFamily: FONT,
        }}
      >✕</button>

      <nav style={{ paddingTop: 72, paddingBottom: 48 }}>

        {/* Home */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ ...navItemStyle, cursor: 'default' }}>Home</span>
        </div>

        {/* State Election 2026 */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div
            style={{
              padding: '20px 28px',
              background: expanded === 'election' ? 'rgba(255,255,255,0.09)' : 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => toggle('election')}
          >
            <div style={navItemStyle}>
              <span>State Election 2026</span>
              {chevron(expanded === 'election')}
            </div>
          </div>
          {expanded === 'election' && (
            <div style={{ paddingBottom: 16, paddingLeft: 28 }}>
              {[
                { label: 'Candidates', onClick: null },
                { label: 'Our policies', onClick: () => { onNavigateToPolicies(); onClose() } },
                { label: 'Our vision', onClick: () => { onNavigateToVision(); onClose() } },
              ].map(item => (
                <a
                  key={item.label}
                  href="#"
                  onClick={e => { e.preventDefault(); item.onClick && item.onClick() }}
                  style={subItemStyle}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Campaigns — chevron shown, not expandable in this prototype */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={navItemStyle}>
            <span>Campaigns</span>
            {chevron(false)}
          </div>
        </div>

        {/* About */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div
            style={{
              padding: '20px 28px',
              background: expanded === 'about' ? 'rgba(255,255,255,0.09)' : 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => toggle('about')}
          >
            <div style={navItemStyle}>
              <span>About</span>
              {chevron(expanded === 'about')}
            </div>
          </div>
          {expanded === 'about' && (
            <div style={{ paddingBottom: 16, paddingLeft: 28 }}>
              {['What we stand for', 'Our aims', 'News'].map(label => (
                <a key={label} href="#" onClick={e => e.preventDefault()} style={subItemStyle}>
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Static items */}
        {['Events', 'News', 'Merch', 'Contact'].map(label => (
          <div key={label} style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <span style={{ ...navItemStyle, cursor: 'default' }}>{label}</span>
          </div>
        ))}

      </nav>
    </div>
  )
}

export default function HomePage({ onNavigateToPolicies, onNavigateToVision }) {
  const [open, setOpen] = useState(false)
  const [openCampaigns, setOpenCampaigns] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const w = useWindowWidth()
  const isMobile = w <= 640
  const src = isMobile ? '/Victorian-Socialists-home-MOBILE.jpg' : '/Victorian-Socialists-home.jpg'

  return (
    <div style={{ position: 'relative', lineHeight: 0 }}>
      {/* Full-page screenshot */}
      <img
        src={src}
        alt="Victorian Socialists homepage"
        style={{ width: '100%', display: 'block' }}
      />

      {/* Back to prototype bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#111', borderTop: '2px solid #333',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
        padding: '12px 24px',
      }}>
        <button
          onClick={onNavigateToPolicies}
          style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 4, color: '#fff', fontSize: 13, fontWeight: 600,
            fontFamily: FONT, padding: '7px 16px', cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
        >← Back to prototype</button>
      </div>

      {/* Hamburger hit area — mobile only */}
      {isMobile && (
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
          style={{
            position: 'absolute', top: '0%', right: '0%',
            width: '13%', height: '1.8%',
            background: 'transparent', border: 'none',
            cursor: 'pointer', zIndex: 10, padding: 0,
          }}
        />
      )}

      {/* Mobile menu overlay */}
      {isMobile && mobileMenuOpen && (
        <MobileMenu
          onClose={() => setMobileMenuOpen(false)}
          onNavigateToPolicies={onNavigateToPolicies}
          onNavigateToVision={onNavigateToVision}
        />
      )}

      {/* Nav dropdowns — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute', top: '0%', left: '41.5%',
            width: '12%', height: '2.6%', cursor: 'pointer', zIndex: 10,
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% - 30px)', left: '50%',
              transform: 'translateX(-50%)', background: '#1a1a1a',
              minWidth: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 20,
            }}>
              {[
                { label: 'Candidates', onClick: null },
                { label: 'Our policies', onClick: onNavigateToPolicies },
                { label: 'Our vision', onClick: onNavigateToVision },
              ].map(item => (
                <a key={item.label} href="#"
                  onClick={e => { e.preventDefault(); item.onClick && item.onClick() }}
                  style={{
                    display: 'block', padding: '13px 18px', color: '#fff',
                    textDecoration: 'none', fontSize: 14, fontWeight: 600,
                    fontFamily: FONT, borderBottom: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.15s', lineHeight: 1.4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#444'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{item.label}</a>
              ))}
            </div>
          )}
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            position: 'absolute', top: '0%', left: '55%',
            width: '7.5%', height: '2.6%', cursor: 'pointer', zIndex: 10,
          }}
          onMouseEnter={() => setOpenCampaigns(true)}
          onMouseLeave={() => setOpenCampaigns(false)}
        >
          {openCampaigns && (
            <div style={{
              position: 'absolute', top: 'calc(100% - 30px)', left: '50%',
              transform: 'translateX(-50%)', background: '#1a1a1a',
              minWidth: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 20,
            }}>
              {[
                'Opposing cuts to the N...', 'Save Cohealth', 'Socialists in schools',
                'Taking on the far right', "Council workers' strike ...", "Socialist Workers' Cauc...",
              ].map(label => (
                <a key={label} href="#" onClick={e => e.preventDefault()}
                  style={{
                    display: 'block', padding: '13px 18px', color: '#fff',
                    textDecoration: 'none', fontSize: 14, fontWeight: 600,
                    fontFamily: FONT, borderBottom: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.15s', lineHeight: 1.4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#444'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{label}</a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* "View all our policies" link — blank space below "We'll fight to" */}
      <div style={{
        position: 'absolute', top: isMobile ? '51%' : '53%',
        left: '50%', transform: 'translateX(-50%)', zIndex: 10,
      }}>
        <a
          href="#"
          onClick={e => { e.preventDefault(); onNavigateToPolicies() }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#111', textDecoration: 'none',
            fontSize: isMobile ? 14 : 'clamp(13px, 1.1vw, 17px)',
            fontWeight: 700, fontFamily: FONT,
            letterSpacing: '0.01em', whiteSpace: 'nowrap',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.55'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          View all our policies
          <span style={{ fontSize: '1.2em', lineHeight: 1 }}>›</span>
        </a>
      </div>

      {!isMobile && (
        <div
          style={{
            position: 'absolute', top: '0%', left: '64.5%',
            width: '4%', height: '2.6%', cursor: 'pointer', zIndex: 10,
          }}
          onMouseEnter={() => setOpenAbout(true)}
          onMouseLeave={() => setOpenAbout(false)}
        >
          {openAbout && (
            <div style={{
              position: 'absolute', top: 'calc(100% - 30px)', left: '50%',
              transform: 'translateX(-50%)', background: '#1a1a1a',
              minWidth: 180, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 20,
            }}>
              {['What we stand for', 'Our aims', 'News'].map(label => (
                <a key={label} href="#" onClick={e => e.preventDefault()}
                  style={{
                    display: 'block', padding: '13px 18px', color: '#fff',
                    textDecoration: 'none', fontSize: 14, fontWeight: 600,
                    fontFamily: FONT, borderBottom: '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.15s', lineHeight: 1.4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#444'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >{label}</a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
