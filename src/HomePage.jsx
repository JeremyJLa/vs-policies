import { useState, useEffect } from 'react'

const RED = '#E5271E'

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth)
  useEffect(() => {
    const handler = () => setW(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return w
}

// Image: 3294 × 7687px
// Nav bar spans top 2.5% of image height
// "State Election 2026" sits at ~35–47% from left, 0–2.5% from top

export default function HomePage({ onNavigateToPolicies }) {
  const [open, setOpen] = useState(false)
  const [openCampaigns, setOpenCampaigns] = useState(false)
  const [openAbout, setOpenAbout] = useState(false)
  const w = useWindowWidth()
  const isMobile = w <= 640
  const src = isMobile ? '/Victorian-Socialists-home-MOBILE.png' : '/Victorian-Socialists-home.png'

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
            fontFamily: "'Open Sans', system-ui, sans-serif",
            padding: '7px 16px', cursor: 'pointer', transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
        >← Back to prototype</button>
      </div>

      {/* Invisible hit area over "State Election 2026" nav item */}
      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '41.5%',
          width: '12%',
          height: '2.6%',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {open && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% - 30px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a1a',
              minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 20,
            }}
          >
            {[
              { label: 'Candidates', onClick: null },
              { label: 'Policies', onClick: onNavigateToPolicies },
            ].map(item => (
              <a
                key={item.label}
                href="#"
                onClick={e => { e.preventDefault(); if (item.onClick) item.onClick() }}
                style={{
                  display: 'block',
                  padding: '13px 18px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.15s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#444'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Invisible hit area over "Campaigns" nav item */}
      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '55%',
          width: '7.5%',
          height: '2.6%',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onMouseEnter={() => setOpenCampaigns(true)}
        onMouseLeave={() => setOpenCampaigns(false)}
      >
        {openCampaigns && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% - 30px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a1a',
              minWidth: 220,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 20,
            }}
          >
            {[
              'Opposing cuts to the N...',
              'Save Cohealth',
              'Socialists in schools',
              'Taking on the far right',
              'Council workers\' strike ...',
              'Socialist Workers\' Cauc...',
            ].map(label => (
              <a
                key={label}
                href="#"
                onClick={e => e.preventDefault()}
                style={{
                  display: 'block',
                  padding: '13px 18px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.15s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#444'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* "View all our policies" link under "We'll fight to" section */}
      <div
        style={{
          position: 'absolute',
          top: '50.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <a
          href="#"
          onClick={e => { e.preventDefault(); onNavigateToPolicies() }}
          style={{
            display: 'inline-block',
            color: RED,
            textDecoration: 'none',
            fontSize: 'clamp(11px, 1.1vw, 16px)',
            fontWeight: 700,
            fontFamily: "'Open Sans', system-ui, sans-serif",
            letterSpacing: '0.02em',
            borderBottom: `2px solid ${RED}`,
            paddingBottom: 2,
            transition: 'opacity 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          View all our policies
        </a>
      </div>

      {/* Invisible hit area over "About" nav item */}
      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '64.5%',
          width: '4%',
          height: '2.6%',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onMouseEnter={() => setOpenAbout(true)}
        onMouseLeave={() => setOpenAbout(false)}
      >
        {openAbout && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% - 30px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a1a',
              minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              zIndex: 20,
            }}
          >
            {[
              'What we stand for',
              'Our aims',
              'News',
            ].map(label => (
              <a
                key={label}
                href="#"
                onClick={e => e.preventDefault()}
                style={{
                  display: 'block',
                  padding: '13px 18px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.15s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#444'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
