import { useState, useEffect } from 'react'
import './index.css'

// ── Data ────────────────────────────────────────────────────────────────────

const PLATFORM_CONTENT = [
  { type: 'heading', text: 'A Victoria run for working people, not billionaires' },
  { type: 'para', text: 'The billionaires have had it too good for too long. CEO salaries are up more than 40 percent in a year while living standards for everyone else are getting smashed.' },
  { type: 'para', text: 'Decade after decade, under both major parties, the rich have gotten richer while workers struggle with housing, bills and insecure work.' },
  { type: 'para', text: 'We need socialists in parliament who will fight to make workers richer and billionaires poorer — not the other way around.' },
  { type: 'heading', text: 'Billionaires are getting richer while everyone else struggles' },
  { type: 'para', text: 'CEO salaries are up more than 40 percent in a year while living standards for everyone else are getting smashed.' },
  { type: 'para', text: 'Decade after decade, under both major parties, the rich have gotten richer while workers struggle to pay rent, mortgages and bills.' },
  { type: 'heading', text: 'Melbourne has become a segregated city' },
  { type: 'para', text: 'Working-class areas are starved of resources while wealthy suburbs get the best of everything.' },
  { type: 'para', text: 'Housing has become a casino for speculators while an entire generation is locked out of home ownership.' },
  { type: 'heading', text: 'Public assets have been sold off' },
  { type: 'para', text: 'Our energy system has been privatised in the name of "efficiency".' },
  { type: 'para', text: 'Now energy corporations squeeze ordinary people for every cent while profits soar.' },
  { type: 'heading', text: 'Divide and conquer politics keeps people powerless' },
  { type: 'para', text: 'Whether it\'s attacks on trans people, racist panics about refugees or attacks on Aboriginal sovereignty — these divisions are used to distract from the transfer of wealth to the rich.' },
  { type: 'heading', text: 'We need socialists in parliament' },
  { type: 'para', text: 'Politicians should live on a worker\'s wage and fight to make workers richer and billionaires poorer — not the other way around.' },
]

const POLICIES = [
  {
    title: 'HOUSING\nFOR ALL',
    body: "Melbourne's housing market has become a casino for speculators. We will introduce rent controls, end negative gearing, build public housing at scale, and ensure every Victorian has a safe, secure and affordable home to call their own.",
    Icon: HousingIcon,
  },
  {
    title: 'FIX THE\nHEALTH CRISIS',
    body: "Our public health system is in permanent crisis from decades of deliberate underfunding. We will hire more nurses and doctors, fully fund our hospitals, cut waiting times, and guarantee free healthcare for all Victorians.",
    Icon: HealthIcon,
  },
  {
    title: 'CLIMATE\nCHANGE AND\nENVIRONMENT',
    body: "The climate emergency is getting worse every year. We will drive a rapid transition to 100% renewable energy, stop new fossil fuel projects, protect our forests and rivers, and create thousands of secure green jobs.",
    Icon: ClimateIcon,
  },
]

const WORKERS_POLICY = {
  title: 'WORKERS\nAND UNIONS',
  body: "Workers have the right to organise, to strike, and to win. We will repeal anti-union laws, defend the right to strike, fight for better wages and conditions, and put workers back in charge of their own unions.",
  Icon: WorkersIcon,
}

const ACCORDION_BASE = [WORKERS_POLICY, ...POLICIES]
const ACCORDION_POLICIES = Array.from({ length: 15 }, (_, i) => ACCORDION_BASE[i % ACCORDION_BASE.length])

const POLICY_GRID = Array.from({ length: 30 }, (_, i) => {
  const row = Math.floor(i / 3)
  const col = i % 3
  return POLICIES[(col + (row % 2)) % 3]
})

function buildIconsGrid(count) {
  const result = []
  let pi = 0
  for (let i = 0; i < count; i++) {
    result.push(i % 4 === 3 ? WORKERS_POLICY : POLICIES[pi++ % 3])
  }
  return result
}
const POLICY_GRID_ICONS = buildIconsGrid(28)

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
    height: 280,
    flexShrink: 0,
  },
  heroPurple: {
    position: 'absolute',
    inset: 0,
    background: [
      'linear-gradient(rgba(196, 178, 212, 0.15), rgba(196, 178, 212, 0.15))',
      'url("/imageA.jpeg") center / cover no-repeat',
    ].join(', '),
    clipPath: 'polygon(0 0, 100% 0, 100% 86%, 0 63%)',
  },
  pageTitleBox: {
    position: 'absolute',
    left: 290,
    top: 178,
    background: '#fff',
    padding: '4px 24px 16px',
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: '0.02em',
    color: '#000',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    textTransform: 'uppercase',
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
    padding: '64px 80px 80px 300px',
  },
  platformText: {
    maxWidth: 640,
  },
  platformHeading: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: '28px',
    color: '#000',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    marginTop: 36,
    marginBottom: 12,
  },
  para: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#111',
    marginBottom: 18,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 400,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 300px)',
    gap: 24,
  },
  card: {
    borderRadius: 3,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    cursor: 'pointer',
    height: 195,
    display: 'flex',
    flexDirection: 'column',
  },
  cardIcons: {
    borderRadius: 3,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    cursor: 'pointer',
    height: 262,
    display: 'flex',
    flexDirection: 'column',
  },
  cardExpanded: {
    borderRadius: 3,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 800,
    lineHeight: '24px',
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
  layoutBtn: (active) => ({
    background: 'none',
    border: '1px solid',
    borderColor: active ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.18)',
    borderRadius: 3,
    color: active ? '#000' : 'rgba(0,0,0,0.35)',
    fontSize: 11,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function WorkersIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 60 / 58)
  return (
    <svg width={width} height={height} viewBox="0 0 99 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <g clipPath="url(#wu-clip)">
        <mask id="wu-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="-5" y="-1" width="98" height="96">
          <path d="M92.8574 -0.0783691H-4.38086V94.0232H92.8574V-0.0783691Z" fill="white"/>
        </mask>
        <g mask="url(#wu-mask)">
          <path fillRule="evenodd" clipRule="evenodd" d="M46.575 1.30059C46.1162 1.1652 45.6088 1.23442 45.1954 1.4885C44.7744 1.74762 44.457 2.19614 44.3357 2.70272C44.2144 3.2093 44.2908 3.76751 44.5427 4.21451L44.9719 4.9998C41.3627 5.55158 38.4291 7.4798 36.0389 10.0174C33.6842 12.5174 31.7388 15.5725 29.7598 18.6805C29.2167 19.5337 28.6709 20.391 28.1133 21.2417C22.968 29.0938 17.2918 36.3564 4.20025 36.0705C2.44083 35.9544 1.4972 37.57 2.47968 39.2631L17.0849 65.9946C17.2267 66.3718 17.4801 66.699 17.7988 66.9164C17.8029 66.919 17.8069 66.9219 17.811 66.9247C17.8168 66.9286 17.8228 66.9325 17.8284 66.9363C17.8527 66.9528 17.8771 66.968 17.9019 66.983C18.2513 67.2001 18.6688 67.2865 19.0681 67.2244C33.4373 67.5032 40.6629 58.8067 45.9525 50.7267C46.5135 49.8697 47.058 49.0194 47.592 48.1855C49.5942 45.0589 51.4472 42.1653 53.4582 40.0322C55.8586 37.4859 58.318 35.9769 61.9028 35.9879L70.1518 51.086L73.2691 49.0658L47.6741 2.22004C47.4381 1.77425 47.0338 1.436 46.575 1.30059Z" fill={color}/>
          <path d="M75.9938 65.0609C76.5887 65.3639 77.2634 65.4563 78.0126 65.4207L79.7046 64.6478L82.4569 63.3776L86.5602 61.4789L90.1861 59.5169L90.3754 59.4126C91.3531 58.9099 92.9006 57.7959 92.0697 56.4988C91.3191 55.5052 90.6811 54.8342 89.5162 55.1424L74.6247 62.0365C74.346 63.0314 75.1107 64.5901 75.9938 65.0609Z" fill={color}/>
          <path d="M78.3253 67.8434C78.2373 67.9209 78.1495 67.9982 78.0617 68.0757C77.0048 69.3037 78.6334 70.8506 79.591 71.1931C81.2313 71.7615 83.2064 71.2389 85.109 70.5457C86.4681 70.0505 91.2616 67.9963 91.466 65.287C91.5784 63.7671 90.4302 62.4995 89.3162 62.7944L78.3253 67.8434Z" fill={color}/>
          <path d="M84.511 41.8754C81.7536 39.5435 78.1715 42.3879 75.542 43.8154L78.956 48.6286C81.8603 47.3182 87.7768 45.617 84.511 41.8754Z" fill={color}/>
          <path d="M80.3648 50.4879C80.6374 50.9035 80.8323 51.2312 81.0461 51.5268L81.6098 52.3259L82.3871 53.4206L81.62 54.0029C79.1752 55.9234 75.3646 57.3923 72.7346 54.6204C71.3605 55.8781 72.7322 56.7614 73.4642 57.7869C74.1395 58.3939 74.3196 59.4842 76.5821 58.6145L78.25 57.9563L82.3348 56.0896L87.5305 53.7123C88.2871 53.2953 88.8173 53.0466 89.3953 52.5685C90.7008 51.8708 91.3628 50.5847 90.2861 48.9732C89.605 47.9343 88.3851 47.0107 86.9248 47.5327L81.1482 50.1722L80.3648 50.4879Z" fill={color}/>
          <path d="M78.5397 72.6463C76.5195 71.2574 75.4837 70.3123 76.8585 67.7268C75.7916 67.2777 73.4011 66.2305 73.5421 63.9987C73.0535 65.4284 69.8247 73.1916 68.5387 72.5295C67.0205 71.6037 69.7074 67.4246 70.2526 66.4133C72.8937 61.6506 72.7099 57.9873 68.649 53.6976C69.6267 53.1949 69.8345 53.0588 72.3871 52.058C74.3612 54.7055 77.3101 54.7921 79.7155 53.2344L78.9702 52.1582L77.2337 49.6917L74.6106 46.0239L73.096 43.9863C72.8906 43.824 72.6715 43.611 72.434 43.43C71.4704 42.6554 65.1242 45.9063 63.5521 46.6203C61.0714 47.7916 57.888 49.5823 56.9405 50.9167C55.3148 53.2706 56.3392 57.5512 56.33 60.5881C56.3394 63.593 56.9289 67.6635 56.0419 70.147C54.4322 74.6099 45.1783 84.5392 42.1211 89.06C48.4483 92.7394 59.0409 87.7876 65.3681 91.4669C66.8725 88.1428 68.7732 84.0635 70.72 82.4103C72.4216 80.9575 73.7516 80.6599 76.4711 80.6987C78.239 80.8269 80.0978 79.2513 81.6022 77.7694C83.2689 76.0821 83.3754 75.9726 85.9677 72.7669C83.5826 73.4794 80.9709 74.3602 78.5397 72.6463Z" fill={color}/>
          <path d="M83.9502 75.3252L89.308 84.3153" stroke={color} strokeWidth="4.0757" strokeLinecap="round"/>
        </g>
      </g>
      <defs>
        <clipPath id="wu-clip">
          <rect width="98.8066" height="95.6699" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

function ClimateIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 64 / 58)
  return (
    <svg width={width} height={height} viewBox="0 0 65 59" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <g clipPath="url(#climate-clip)">
        <path d="M45.8989 50.3152C46.1691 50.7657 46.4395 51.216 46.7548 51.6215C40.8991 56.3059 33.4219 58.4681 25.9898 57.6572C18.5575 56.8465 11.711 53.1529 6.98145 47.3423C7.16164 47.4775 7.34183 47.6127 7.56699 47.6576L13.8731 48.9639C14.0533 48.9639 14.2784 48.9639 14.4587 48.9639C15.0442 48.9639 15.6297 48.7837 16.1252 48.4234C16.6208 48.063 16.9811 47.6125 17.1612 47.027C17.2063 46.8918 17.3415 46.8469 17.4316 46.8469L25.224 48.6036C26.1699 48.8288 27.1608 48.5585 27.8815 47.8829C28.6022 47.2073 28.8726 46.2162 28.6923 45.2703L28.5122 44.3243C28.377 43.5136 27.8815 42.838 27.2059 42.3876L21.4854 38.9193C21.4404 38.8742 21.3953 38.7841 21.3953 38.739C21.3953 38.6489 21.4404 38.604 21.4854 38.5589L28.9175 31.2619C29.4581 30.7213 29.7734 30.0006 29.7734 29.2349C29.7734 28.4692 29.4581 27.7485 28.9175 27.2079L26.7105 25.2711C26.26 24.8207 25.7195 24.5504 25.0888 24.4603C24.4583 24.3702 23.8728 24.4603 23.2872 24.7756L17.7918 27.7034C17.7018 27.7485 17.5666 27.7485 17.5215 27.7034L16.3055 26.3971C16.2604 26.3522 16.2154 26.3071 16.2154 26.217C16.2154 26.1719 16.2604 26.0818 16.3055 26.0369L20.6297 22.0729C21.6206 21.1721 22.161 19.9561 22.161 18.6046V15.767C22.161 15.3165 22.2962 14.9112 22.5664 14.5958L23.6024 13.1995C23.6925 13.0644 23.8277 13.0193 23.9628 13.0193C23.9628 13.0193 24.188 13.0193 24.3231 13.1995L25.1339 14.2354C26.0347 15.3615 27.3861 16.0371 28.8275 16.0371H32.6561C33.8724 16.0371 35.0885 15.5418 35.9443 14.6859C36.8001 13.83 37.2956 12.6139 37.2956 11.3977V8.42483C37.2956 8.24473 37.3858 8.10959 37.5209 8.01949L41.3946 6.03755C41.8449 5.8123 42.1153 5.36192 42.1153 4.86647C42.1153 4.37094 41.8449 3.92055 41.3946 3.69531C44.0072 5.00153 46.3944 6.66814 48.5114 8.69512V30.0456L45.5386 28.7394C45.4484 28.6944 45.4035 28.6042 45.4484 28.5142L45.5836 28.2439C45.8088 27.6584 45.8088 27.0278 45.6287 26.3971C45.4484 25.8116 45.0881 25.2711 44.5476 24.9108L42.2504 23.3342C41.8 23.0189 41.3045 22.8838 40.7639 22.8387C40.2234 22.8387 39.7279 22.9288 39.2326 23.1992L33.0616 26.7125C32.521 27.0278 32.1157 27.5232 31.8453 28.0638C31.6202 28.6493 31.5751 29.2799 31.7103 29.8655L32.8813 34.2798C33.0616 35.0905 33.6471 35.7663 34.3678 36.1265L34.9534 36.4419C34.9985 36.4419 35.0436 36.487 35.0436 36.5319C35.0436 36.577 35.0436 36.622 35.0436 36.6671L30.0436 45.0452C29.7734 45.4955 29.6382 45.991 29.6382 46.4866V52.2071C29.6382 52.7926 29.8185 53.3781 30.1337 53.8286C30.449 54.3241 30.9445 54.6394 31.485 54.8646C31.8003 54.9997 32.1157 55.0448 32.431 55.0448C32.9715 55.0448 33.512 54.9096 33.9624 54.5943C34.4128 54.3241 34.7732 53.9187 34.9985 53.4232L38.9623 44.9551C39.0073 44.865 39.0523 44.865 39.1424 44.865L43.7819 45.3604C44.0072 45.4055 44.1873 45.4055 44.4124 45.3604C44.5927 47.0721 45.0432 48.7837 45.8989 50.3152Z" fill={color}/>
        <path d="M14.4576 46.4431C14.5475 46.4431 14.6376 46.3981 14.6827 46.3079C14.8628 45.7224 15.2233 45.2719 15.7187 44.9116C16.2142 44.5512 16.7997 44.3711 17.3854 44.3711H17.7456L25.8985 46.2178C25.9887 46.2178 26.0336 46.1729 26.0787 46.1278C26.1237 46.0827 26.1237 45.9926 26.1237 45.9027L26.0336 45.0018C26.0336 44.9567 25.9887 44.8666 25.9436 44.8215L20.2231 41.3532C19.4574 40.9028 18.9618 40.1371 18.8266 39.2362C18.6916 38.3354 19.0069 37.4795 19.6374 36.8489L27.0247 29.4617C27.0697 29.4167 27.1146 29.3716 27.1146 29.2816C27.1146 29.1915 27.0697 29.1465 27.0247 29.1014L24.8625 26.9393C24.8175 26.9393 24.7724 26.9393 24.7274 26.9393H24.5922L19.1419 29.8672L18.4214 30.2275H17.7456C16.9349 30.2275 16.1692 29.8672 15.5835 29.2816L14.4125 27.9753C13.9169 27.4348 13.6467 26.7141 13.6467 25.9483C13.6467 25.1375 13.962 24.3718 14.5475 23.7863L18.8717 19.8225C19.2771 19.4621 19.5473 18.8766 19.5473 18.336V15.6335C19.5473 14.6424 19.8626 13.6515 20.4482 12.8858L21.4842 11.4895C22.0697 10.7237 22.9707 10.2282 23.9616 10.2282H24.6823L25.0427 10.4535C25.5832 10.6336 26.0336 10.9939 26.349 11.3994L27.1597 12.4354C27.52 12.9308 28.1055 13.2012 28.7363 13.2012H32.61C33.7361 13.2012 34.6368 12.3002 34.6368 11.1741V8.20131C34.6368 7.61569 34.8171 7.0752 35.1324 6.57975C35.4477 6.08423 35.8981 5.67888 36.3935 5.45364C37.2494 5.00315 37.9701 4.41762 38.5107 3.65189L39.2314 2.66092C35.6728 1.3547 31.7992 0.724115 27.8804 0.904221C21.7545 1.12946 15.8989 3.33656 11.1243 7.21034C6.34966 11.039 2.9714 16.3091 1.43994 22.2548C-0.0915208 28.2006 0.313825 34.4615 2.65614 40.137C3.91733 41.4884 5.26868 42.7946 6.71004 44.0108C7.20548 44.4162 7.83607 44.7315 8.46673 44.9116L14.4576 46.4431Z" fill={color}/>
        <path d="M32.3398 46.4432V52.1637C32.3398 52.2538 32.3398 52.2989 32.4749 52.3439C32.565 52.3439 32.6101 52.2989 32.655 52.2538L36.6189 43.7857C36.8442 43.2902 37.2496 42.8848 37.6999 42.5694C38.1504 42.2992 38.736 42.119 39.2765 42.1641H39.4567L44.2312 42.6594C44.2763 42.6594 44.3213 42.6145 44.3664 42.6145L44.9519 41.9838C45.5376 39.7768 46.7987 37.7948 48.5554 36.3084V32.8851L44.5916 31.1735C43.916 30.9032 43.3753 30.3627 43.0602 29.6871C42.7898 29.0115 42.7448 28.2457 43.0151 27.57L43.1053 27.2997C43.1502 27.2097 43.1053 27.1196 43.0602 27.0745L40.7629 25.498H40.6278L34.4117 29.0565C34.3217 29.1014 34.3217 29.1915 34.3217 29.2366L35.4929 33.6509L35.5829 33.786L36.1235 34.0563C36.8442 34.3716 37.3847 35.0021 37.6099 35.7679C37.8351 36.5337 37.745 37.3444 37.3396 38.02L32.3398 46.4432Z" fill={color}/>
        <path d="M64.3662 44.9576C64.4113 42.3901 63.2852 39.9578 61.3483 38.3362L60.4024 37.5254V7.70668C60.4024 6.49055 59.9069 5.31939 59.051 4.46356C58.1952 3.60774 57.0241 3.1123 55.808 3.1123C54.5918 3.1123 53.4206 3.60774 52.5649 4.46356C51.709 5.31939 51.2135 6.49055 51.2135 7.70668V37.5254L50.2676 38.3362C48.8263 39.5524 47.8353 41.1288 47.3848 42.9306C47.2046 43.6062 47.1597 44.282 47.1597 44.9576C47.1597 46.399 47.4749 47.7953 48.1055 49.0565C49.3217 51.3087 51.5288 52.8852 54.0512 53.3807C56.5736 53.8762 59.1862 53.2005 61.1682 51.5789C63.195 49.9574 64.3662 47.5251 64.3662 44.9576ZM54.5017 13.7875C54.5017 13.0668 55.0873 12.4813 55.808 12.4813C56.5287 12.4813 57.1142 13.0668 57.1142 13.7875V16.4451C57.1142 17.1658 56.5287 17.7513 55.808 17.7513C55.0873 17.7513 54.5017 17.1658 54.5017 16.4451V13.7875ZM57.7448 48.0656C56.6637 48.7412 55.3125 48.7862 54.1413 48.2007C53.0153 47.6151 52.2494 46.489 52.1595 45.2278C52.0694 43.9666 52.6098 42.7054 53.6459 41.9847C53.9161 41.8045 54.1864 41.6694 54.5017 41.5343V22.2557C54.5017 21.535 55.0873 20.9495 55.808 20.9495C56.5287 20.9495 57.1142 21.535 57.1142 22.2557V41.5343C57.4295 41.6244 57.6997 41.8045 57.9701 41.9847C58.9159 42.6603 59.4564 43.7864 59.4564 44.9576C59.4564 46.2188 58.8259 47.435 57.7448 48.0656Z" fill={color}/>
      </g>
      <defs>
        <clipPath id="climate-clip">
          <rect width="64.7738" height="58.6631" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

function HealthIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 66 / 58)
  return (
    <svg width={width} height={height} viewBox="0 0 67 59" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M59.6915 3.97511C52.3732 -2.07655 41.4427 -0.997547 34.7342 5.71086L33.233 7.21212L31.7318 5.71086C24.9296 -0.997547 13.999 -2.07655 6.68077 3.97511C2.69318 7.21212 0.300688 12.044 0.0191882 17.1574C-0.215307 22.2709 1.70802 27.2905 5.32027 30.9496L33.1392 58.7686L60.958 30.9496C64.5703 27.2905 66.5406 22.3177 66.2591 17.1574C66.0715 12.044 63.679 7.21212 59.6915 3.97511ZM45.0548 32.9668H37.0799V40.942H29.3862V32.9668H21.4112V25.2733H29.3862V17.2982H37.0799V25.2733H45.0548V32.9668Z" fill={color}/>
    </svg>
  )
}

function HousingIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 70 / 58)
  return (
    <svg width={width} height={height} viewBox="0 0 68 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <g clipPath="url(#housing-clip)">
        <path d="M34.4563 0.416992L1.19971 26.1248L3.01635 28.4746L34.4563 4.17208L65.8962 28.4746L67.7128 26.1248L34.4563 0.416992Z" fill={color}/>
        <path d="M60.0788 27.6774L34.4557 7.87109L8.8326 27.6774V51.319H5.86182V54.661H41.1399V43.3349C41.1399 40.1546 43.7157 37.579 46.8959 37.579C50.0731 37.579 52.6518 40.1546 52.6518 43.3349V54.661H63.0496V51.319H60.0788V27.6774Z" fill={color}/>
      </g>
      <defs>
        <clipPath id="housing-clip">
          <rect width="67.8356" height="55.2734" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

// ── Responsive hook ───────────────────────────────────────────────────────────

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

// ── Components ────────────────────────────────────────────────────────────────

const TILE_COLOURS = ['#F1ECF2', '#F7F7FF']
const TILE_HOVER_COLOURS = ['#DDD4E4', '#E8E8F6']

function PolicyCard({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.card, background: hovered ? TILE_HOVER_COLOURS[index % 2] : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon: waits for title to leave, then springs in; exits fast */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0.22 : 0,
        transition: hovered ? 'opacity 0.4s ease 0.14s' : 'opacity 0.18s ease',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          transition: hovered
            ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
            : 'transform 0.22s ease',
        }}>
          <Icon color="#000" height={90} />
        </div>
      </div>
      {/* Title + read more: snap out fast, ease back in after icon exits */}
      <h2 style={{
        ...S.cardTitle, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>
      <span style={{
        ...S.readMore, color: '#000', alignSelf: 'flex-end',
        position: 'relative', zIndex: 1,
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardGhost({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.card, background: hovered ? TILE_HOVER_COLOURS[index % 2] : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0.22 : 0.06,
        transition: hovered ? 'opacity 0.4s ease 0.14s' : 'opacity 0.18s ease',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          transition: hovered
            ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
            : 'transform 0.22s ease',
        }}>
          <Icon color="#000" height={90} />
        </div>
      </div>
      <h2 style={{
        ...S.cardTitle, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>
      <span style={{
        ...S.readMore, color: '#000', alignSelf: 'flex-end',
        position: 'relative', zIndex: 1,
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardExpanded({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.cardExpanded, background: hovered ? TILE_HOVER_COLOURS[index % 2] : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.2s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon: waits for text to leave, then springs in; exits fast */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0.22 : 0,
        transition: hovered ? 'opacity 0.4s ease 0.14s' : 'opacity 0.18s ease',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          transition: hovered
            ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
            : 'transform 0.22s ease',
        }}>
          <Icon color="#000" height={90} />
        </div>
      </div>
      {/* All text: snaps out fast, eases back in after icon exits */}
      <h2 style={{
        ...S.cardTitle, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>
      <p style={{
        ...S.cardBody, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.body}</p>
      <span style={{
        ...S.readMore, color: '#000', alignSelf: 'flex-end',
        position: 'relative', zIndex: 1,
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardRedDetails({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.cardExpanded, background: hovered ? '#FF4B33' : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.18s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 0.35 : 0,
        transition: hovered ? 'opacity 0.4s ease 0.14s' : 'opacity 0.18s ease',
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          transition: hovered
            ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
            : 'transform 0.22s ease',
        }}>
          <Icon color="#fff" height={90} />
        </div>
      </div>
      <h2 style={{
        ...S.cardTitle, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>
      <p style={{
        ...S.cardBody, color: '#000',
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
        position: 'relative', zIndex: 1,
      }}>{policy.body}</p>
      <span style={{
        ...S.readMore, color: '#000', alignSelf: 'flex-end',
        position: 'relative', zIndex: 1,
        opacity: hovered ? 0 : 1,
        transition: hovered ? 'opacity 0.12s ease' : 'opacity 0.2s ease 0.12s',
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function AccordionPolicies() {
  const [openIndex, setOpenIndex] = useState(null)
  const w = useWindowWidth()
  const isMobile = w <= 640
  return (
    <div style={{ maxWidth: isMobile ? '100%' : 700 }}>
      {ACCORDION_POLICIES.map((policy, i) => {
        const isOpen = openIndex === i
        const { Icon } = policy
        return (
          <div key={i} style={{ borderBottom: '1px solid #C4C4C4', ...(i === 0 ? { borderTop: '1px solid #C4C4C4' } : {}) }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 16,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: isMobile ? '16px 0' : '20px 0', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 20 }}>
                <Icon height={isMobile ? 22 : 28} color={isOpen ? '#FF4B33' : '#000'} />
                <h2 style={{
                  fontSize: isMobile ? 17 : 22, fontWeight: 800, lineHeight: 1,
                  fontFamily: "'Work Sans', system-ui, sans-serif",
                  textTransform: 'uppercase', letterSpacing: '0.02em',
                  color: isOpen ? '#FF4B33' : '#000',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'normal',
                }}>
                  {policy.title.replace(/\n/g, ' ')}
                </h2>
              </div>
              <span style={{
                fontSize: 26, lineHeight: 1, fontWeight: 300, flexShrink: 0,
                color: isOpen ? '#FF4B33' : '#000',
                transition: 'color 0.15s ease',
              }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div style={{ maxHeight: isOpen ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
              <p style={{ ...S.para, maxWidth: 580, marginBottom: 16 }}>{policy.body}</p>
              <p style={{ ...S.para, maxWidth: 580, marginBottom: 16 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              <p style={{ ...S.para, maxWidth: 580 }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
              <a href="#" style={{ display: 'inline-block', marginTop: 16, marginBottom: 24, fontSize: 14, fontWeight: 700, fontFamily: "'Open Sans', system-ui, sans-serif", color: '#000', textDecoration: 'underline', letterSpacing: '0.02em' }}>
                See full policy ›
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PolicyCardIcons({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const fg = hovered ? '#fff' : '#000'
  const { Icon } = policy
  return (
    <div
      className="policy-card"
      style={{ ...S.cardIcons, background: hovered ? '#FF4B33' : TILE_COLOURS[index % 2] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 92px zone: icon sits at bottom with 15px gap to heading */}
      <div style={{ height: 92, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 15 }}>
        <div style={{ transition: 'transform 0.18s ease', transform: hovered ? 'scale(1.15)' : 'scale(1)', transformOrigin: 'bottom left' }}>
          <Icon color={fg} />
        </div>
      </div>
      <h2 style={{ ...S.cardTitle, color: fg }}>{policy.title}</h2>
      <span style={{ ...S.readMore, color: fg, alignSelf: 'flex-end' }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('platform')
  const [cardView, setCardView] = useState('titles')
  const [policyLayout, setPolicyLayout] = useState('grid')

  const w = useWindowWidth()
  const isMobile = w <= 640
  const isTablet = w <= 1024

  const grid = cardView === 'icons' ? POLICY_GRID_ICONS : POLICY_GRID

  return (
    <div style={S.page}>

      <nav style={S.nav}>
        <div style={S.navViewToggle}>
          <button style={S.navViewBtn(cardView === 'titles')} onClick={() => setCardView('titles')}>Titles</button>
          <button style={S.navViewBtn(cardView === 'expanded')} onClick={() => setCardView('expanded')}>Details</button>
          <button style={S.navViewBtn(cardView === 'reddetails')} onClick={() => setCardView('reddetails')}>Red details hover</button>
          <button style={S.navViewBtn(cardView === 'icons')} onClick={() => setCardView('icons')}>Icons</button>
        </div>
      </nav>

      <div style={S.heroSection}>
        <div style={S.heroPurple} />
        <div style={S.pageTitleBox}>
          <h1 style={S.pageTitle}>What we'll fight for</h1>
        </div>
      </div>

      <div style={S.tabBar}>
        <button style={S.tabBtn(tab === 'platform')} onClick={() => setTab('platform')}>
          Our platform
        </button>
        <button style={S.tabBtn(tab === 'policies')} onClick={() => setTab('policies')}>
          Our policies
        </button>
      </div>

      <main style={S.content}>
        {tab === 'platform' ? (
          <div style={S.platformText}>
            <p style={{ fontSize: 15, color: '#FF4B33', marginBottom: 24, fontFamily: "'Open Sans', system-ui, sans-serif", fontStyle: 'normal' }}>
              (Rather than long blocks of text, as shown in the placeholder copy below, breaking the content into smaller sections like this would make it easier to scan and read, particularly on mobile.)
            </p>
            {PLATFORM_CONTENT.map((item, i) =>
              item.type === 'heading'
                ? <h2 key={i} style={{ ...S.platformHeading, ...(i === 0 ? { marginTop: 0, fontSize: 26 } : { fontWeight: 600, fontSize: 21 }) }}>{item.text}</h2>
                : <p key={i} style={S.para}>{item.text}</p>
            )}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32 }}>
              <p style={{ ...S.para, maxWidth: 500 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 24 }}>
                <button style={S.layoutBtn(policyLayout === 'grid')} onClick={() => setPolicyLayout('grid')}>Grid</button>
                <button style={S.layoutBtn(policyLayout === 'accordion')} onClick={() => setPolicyLayout('accordion')}>Accordion</button>
              </div>
            </div>
            {policyLayout === 'accordion' ? <AccordionPolicies /> : (
            <div style={S.grid}>
              {grid.map((policy, i) => {
                if (cardView === 'expanded') return <PolicyCardExpanded key={i} policy={policy} index={i} />
                if (cardView === 'reddetails') return <PolicyCardRedDetails key={i} policy={policy} index={i} />
                if (cardView === 'icons') return <PolicyCardIcons key={i} policy={policy} index={i} />
                return <PolicyCard key={i} policy={policy} index={i} />
              })}
            </div>
            )}
          </>
        )}
      </main>

      <footer style={S.footer} />
    </div>
  )
}
