import { useState, useEffect, useRef } from 'react'
import './index.css'
import HomePage from './HomePage'

// ── Data ────────────────────────────────────────────────────────────────────

const CANDIDATES_BREAKOUT = {
  type: 'breakout',
  heading: 'Our candidates',
  imageSrc: '/candidates.png',
  imageAlt: 'Victorian Socialists candidates',
  paragraphs: [
    'Victorian Socialists candidates aren’t professional politicians. They’re working-class people with a track record of organising and fighting for real change both locally, in their workplaces and communities, and globally, through their participation in the Palestine solidarity campaign, the fight for climate justice, anti-racist and anti-fascist movements and more. They don’t want to get into parliament to make friends with the elites. They want to get in there to fight like hell against the major party politicians and the billionaire and corporate interests they serve.',
  ],
}

const VISION_CONTENT = [
  { type: 'heading', level: 1, text: 'Our vision for a better, fairer Victoria' },
  { type: 'para', text: 'A vote for Victorian Socialists is a vote for something radically different to the major parties. Our vision is summed up by our slogan: “People before profit”. We want to pull the emergency brake on capitalism’s out of control drive to private profit and instead move towards a socialist economy and society in which working-class people, our communities and the environment we all depend on for survival come first.' },
  { type: 'para', text: 'At the centre of our election campaign is the push for a system of lifelong support, a Universal Living Guarantee to ensure that everyone, no matter their circumstances, has the things they need to live a good life. In one of the wealthiest countries on Earth, blessed with an abundance of land, resources and technology, and with a highly educated and skilled workforce, no-one should have to struggle to keep a roof over their head and food on the table. No-one should be denied a quality education, health care, aged care or other public services.' },
  { type: 'para', text: 'The main reason people are struggling today is that more and more of the wealth produced by workers is being hoarded by the class of capitalists and their hangers-on. And much of what does flow to the government in the form of taxes is spent on things like subsidies for fossil fuel companies and funding for elite private schools, the military, police and prisons and so on.' },
  { type: 'para', text: 'The right-wing media complains about the “socialist” policies of Labor in Victoria. That’s a joke. Big businesses are getting richer and workers are getting poorer—that’s Labor’s capitalist policies at work. Socialists have totally different priorities. We would increase taxes on the billionaires, big corporations, property investors and other elites. We would cut back all the tax breaks, subsidies and other forms of government support currently flowing to the wealthiest sections of society. And we would devote all our efforts to improving the lives of workers, the poor and oppressed. That’s what socialism is really about: for the many, not the few.' },
  CANDIDATES_BREAKOUT,
  { type: 'heading', level: 2, matchIntro: true, text: 'Building a movement for real change\n(in this election and beyond)' },
  { type: 'para', text: 'Amid the darkness of the global far-right surge, there are glimmers of hope. In many countries, socialists are gaining ground. Millions of people in recent years have voted for parties like the Victorian Socialists—parties that want to break from the status quo of capitalism. And many of those people are joining those socialist parties and committing themselves to our movement.' },
  { type: 'para', text: 'More and more people are recognising that the big social problems aren’t accidents, and that they’re not going to be fixed with a bit of tinkering. Whether it’s growing inequality, social dislocation, loneliness and mental ill-health, the destruction of the environment or the genocide in Gaza and the growing threat of global war—the multiplying crises of our society are crises of capitalism.' },
  { type: 'para', text: 'No other Australian political party is prepared to point out this reality. Labor, the Liberals and One Nation are unabashed servants of the capitalist class. But even the Greens, who have at times adopted some radical-sounding rhetoric, have never gone beyond arguing for this or that progressive change within the existing system. Victorian Socialists is the only anti-capitalist party running in this election. Our entire approach to politics is informed by that. Running in elections on a left-wing policy program is just one part of the broader project of building a mass socialist movement with the power to overcome the entire rotten system and replace it with a socialist society.' },
  { type: 'para', text: 'Elections are of course important. But the idiotic circus that passes for political debate in parliament means that most people think that there’s little point following it closely. That every few years we’re expected to play our part in the democratic process by voting, however, provides a small opening. People stop to think about what sort of society they’d like to live in and which parties best reflect their values, their wants and their needs. It’s at this moment that a socialist message of hope, solidarity and collective struggle for a better world can get a hearing that we are regularly denied in the corporate media.' },
  { type: 'para', text: 'Even if we don’t succeed in getting any socialists elected to parliament, the exercise is worthwhile. The more people we can inspire with and win to a socialist vision of society, the more we can increase the number of organised socialists in our party, the better placed we’ll be to continue to fight and build the power of our movement in the years ahead.' },
  {
    type: 'breakout',
    heading: 'A people-powered campaign',
    angledBottom: true,
    extraMarginTop: 30,
    extraPadY: 30,
    paragraphs: [
      'The challenge for the Victorian Socialists is to make our voice heard above the clamour of propaganda from more established parties and the right-wing media. Unlike the major parties, we can’t spend millions on paid advertising to get our message out. We depend on people power—on the time and energy of our members and supporters.',
      'We need an army of people to deliver letters, knock on doors and have discussions with tens of thousands of voters, put up yard signs, staff community outreach stalls and phone banks, and hand out how to vote cards at polling booths. We’ll win people to vote for us, and to embrace the socialist vision of society we’re putting forward, only if they know we exist!',
      'In areas where we do all these things, we always find people who will not only vote for us but who will join our movement. Many people are politically inactive not because they like and accept the way things are. They just lack the confidence to get involved or think that real change is impossible.',
      'Every letter we deliver, every conversation we have and every vote we win, challenges that sentiment. On election day, if we achieve the kind of breakthrough result we believe is possible, we will shake up the entire political setup in Victoria by showing that when you fight, you can win.',
    ],
  },
  { type: 'para', text: 'How does this election fit within the struggle for a socialist society? Parliament is just one of many institutions that help the capitalists dominate our economy and society. To break with the capitalist system, we need to take back control from the capitalist class not only via the “official channels” of parliamentary democracy, but also through organising real democracy in workplaces, local communities and on the streets.' },
  { type: 'para', text: 'The US socialist historian Howard Zinn wrote: “What matters most is not who is sitting in the White House, but ‘who is sitting in’—and who is marching outside the White House, pushing for change”. Australian history shows this to be true, too. It’s no accident that the most progressive period of politics in Australia, the early 1970s, coincided with a high-point of working-class organisation and union militancy (for example, the Builders Labourers’ Federation’s Green Bans) and of mass social movements like the campaign against the war in Vietnam.' },
  { type: 'para', text: 'The capitalist class own and control the most important sections of our economy—the banks, the supermarkets, the telecommunications and transport infrastructure, the factories and mines and office towers, most of the farmland and so on. They own the media and they buy the politicians. As long as their power is left undisturbed, we will never win the kind of change we need.' },
  { type: 'para', text: 'A socialist MP would, from day one, face a barrage of criticism from the major parties and the corporate media. Their work would be hampered, at every turn, by the state bureaucracy. Our solution to this isn’t merely to elect socialist parliamentarians who will fight the establishment no matter what. It’s to have those parliamentarians do everything they can to build the socialist movement outside the parliament to back up their efforts within it.' },
  { type: 'para', text: 'That’s why the Victorian Socialists don’t focus just on elections. We’re also active—year in, year out—rebuilding cultures of resistance in our trade unions, helping to organise progressive campaigns like the Palestine solidarity movement, organising our local communities to take on greedy developers and polluters and much more. An example is the work that socialist public school teachers and support staff—organised in the VS-backed Socialists in Schools rank-and-file union group—have been doing to fight for a fair contract from the Labor government.' },
  { type: 'para', text: 'Winning the change we need requires much more of this kind of action and activism, particularly within the workers’ movement. So a big part of the job of a socialist MP would be to encourage and help organise it. They would use their public profile and the resources that come with their office to provide support to striking workers and others fighting for progressive change. Not only because it’s the right thing to do, but because building more powerful movements for change outside parliament is the only way change can be won inside parliament.' },
  { type: 'para', text: 'This kind of work is also necessary because it’s the key to building a socialist society: a society run by and for working-class people. Truly revolutionary change cannot be handed down from on high. It must be built from below. Every strike, every protest, every small act of resistance is like a school in which people learn to lead, learn to organise, learn to fight collectively—and learn how to win.' },
  { type: 'heading', level: 2, matchIntro: true, text: 'Join us and get involved!' },
  { type: 'para', link: 'https://www.victoriansocialists.org.au/join', linkText: 'join us and get involved', text: 'If you agree with the vision outlined in this manifesto and you’re not yet a Victorian Socialists member, join us and get involved. A regular membership is $84 annually (that’s just $1.60 a week). Once you’ve joined and your membership application has been approved, a local coordinator in your area will get in touch.' },
  { type: 'para', text: 'As a member, you can participate in party discussions, preselections and other internal elections from the local level to statewide and national levels. You can help shape the party’s policies, campaigns and future directions.' },
  { type: 'para', text: 'There are local branches in many areas of Melbourne and regional Victoria, many of which have regular monthly in-person branch meetings. At these meetings, members discuss current issues in Australian and international politics and the campaigns we’re involved in. We also discuss the organising and planning of branch activities. In areas where we’re only just becoming established, members are connected through WhatsApp chats and other channels.' },
  { type: 'para', text: 'Between now and November, much of this local work will be devoted to campaigning for the state election. We’ll be doing a lot of letterboxing, door knocking, phone banking and delivering yard signs. We’ll be organising campaign meetings and volunteer training sessions. And once polling opens—during the week and a half of pre-polling and on election day, Saturday, 28 November—we will be handing out how-to-vote cards and talking to voters at polling stations across the state.' },
  { type: 'para', text: 'No matter what your background, experience or level of confidence, everyone is welcome. There’s a wide range of activities in which you can make a valuable contribution to our campaign. Unlike the major parties, which get big donations from corporations and other wealthy backers, we depend on our members and supporters to get the message out. And the bigger the base of active members we can build, the stronger we’ll become!' },
  { type: 'para', emphasis: true, text: 'Capitalism is killing our future.\nFor real change, vote socialist.' },
]

// Groups consecutive heading/para items into single blocks, keeping each
// breakout as its own group — lets breakouts render full-bleed as siblings
// instead of nesting inside the padded text column.
function groupContent(content) {
  const groups = []
  for (const item of content) {
    if (item.type === 'breakout') {
      groups.push({ kind: 'breakout', item })
    } else {
      const last = groups[groups.length - 1]
      if (last && last.kind === 'text') last.items.push(item)
      else groups.push({ kind: 'text', items: [item] })
    }
  }
  return groups
}
const VISION_GROUPS = groupContent(VISION_CONTENT)

const MANIFESTO_INTRO = [
  'We are building a movement of working people who refuse to accept a society run for billionaires. Decade after decade, under both major parties, wealth has flowed upward while housing, healthcare and the climate have been left to rot.',
  'We believe another Victoria is possible — one where the economy works for everyone, not just the few at the top.',
]

const MANIFESTO_PRINCIPLES = [
  { label: 'Housing as a human right', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.' },
  { label: 'Healthcare free at the point of need', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { label: 'A rapid transition to renewables', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { label: 'Workers have the right to organise', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.' },
  { label: 'Solidarity over division', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.' },
  { label: 'Democratic control of the economy', text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam.' },
]

const ULG_INTRO = 'Nobody should have to choose between eating or paying the bills. In Victoria, thousands of parents skip meals so they can feed their kids and keep the lights on. Victorian Socialists will fight for a Universal Living Guarantee—a set of economic and social supports at all stages of life to ensure everyone in the state can live comfortably.'

const ULG_LEAD = 'The following are some of the key planks of the guarantee.'

const ULG_BULLETS = [
  'Free, publicly owned and operated child care, five days a week',
  '150,000 new public housing units over ten years',
  'A 25 percent rent cut for all residential tenancies, followed by a rent freeze for five years',
  'Free public transport with increased services and availability across Melbourne and regional Victoria',
  '$100 price-cap trolleys at supermarkets and local cost-price food hubs in every community',
  'Expanded and publicly run aged care with increased places and in-home services',
]

const FUNDING_INTRO = "Creating an economy and society that work for everyone will cost a lot. Fortunately, as we’re reminded every year in the latest Australian Financial Review Rich List, there’s no shortage of wealth in our society. Were it not being hoarded by the wealthy few, wasted on handouts to big businesses and drained through the massive salaries of politicians and high-level bureaucrats, all that wealth could be used to benefit everyone."

const FUNDING_LEAD = "We'll implement a range of new measures targeting billionaires, big corporations and the super-rich to raise the funds we need to realise our vision:"

const FUNDING_BULLETS = [
  'Applying a luxury properties tax on the top 1 percent of most valuable residences in Victoria, charged at 5 percent of their last sale price per year',
  'Applying a 10 percent wealth tax on billionaires and 10 percent tax on assets owned by foreign billionaires in Australia',
  'Doubling the payroll tax for large companies and trusts',
  'Increasing and properly enforcing taxes for land banking',
  'Imposing a levy on private jets landing at Essendon airport—$5,000 landing fee for planes valued at more than $500,000.',
]

const FUNDING_CLOSING = "In addition, many of the policies in our platform would, if implemented, add new revenue streams to make those policies largely self-funding. This includes, most notably, the expansion of public housing, the re-nationalisation of energy production and distribution and the establishment of a state bank."

const POLICIES = [
  {
    title: 'HOMES\nFOR ALL',
    heading: 'Homes for all',
    body: "Melbourne's housing market has become a casino for speculators. We'll build 150,000 new public housing units over ten years, cut rents by 25 percent and then freeze them for five years, so every Victorian has a safe, secure and affordable home.",
    Icon: HousingIcon,
    sections: [
      {
        heading: 'A 25 percent rent cut for all residential tenancies followed by a rent freeze for five years',
        text: 'Landlords have increased rents and squeezed everything they can out of tenants who have no other housing options. Australian rents increased by 44 percent on average in the five years to September 2025. During the same period, average wages grew by just 18 percent. To bring relief to renters, we would mandate a 25 percent rent cut in all residential tenancies—bringing rents back into line with wage growth—and freeze rents at that level for the next five years.',
      },
      {
        heading: 'A publicly owned and run construction firm to build energy-efficient public housing—150,000 units in ten years',
        text: 'A massive expansion of public housing is at the centre of our plan to transform the housing system from a profit-driven one to a needs-based one. We would set up a publicly owned and run construction firm to build 150,000 sustainable public homes over the next ten years. Adding more housing supply for people who need it most would also act as a lever to bring down rents and reduce the cost of homes for everyone.',
      },
      {
        heading: 'A state bank offering low interest rates to working-class households',
        text: 'A State Bank of Victoria will offer to take over existing owner-occupier mortgages at below-market rates and provide below-market home loans while refusing to lend to residential property investors. Any profits would be invested in socially useful and necessary projects such as public housing and sustainability infrastructure.',
      },
      {
        heading: 'Statewide audit and redistribution of empty and under-used property',
        text: "Audit existing properties to identify those that are empty or underutilised. We'll bring into public ownership and redistribute homes that are fit for habitation but have been left empty and fix those that need fixing. We'll also ban property hoarding (more than five properties owned by one person) and bring properties vacant for more than two years without a legitimate reason into public ownership without compensation.",
      },
    ],
  },
  {
    title: 'MAKING\nEVERYDAY LIFE\nBETTER',
    heading: 'Making everyday life easier and better',
    body: "From free, publicly owned child care five days a week, to free public transport and $100 price-cap trolleys and cost-price food hubs in every community, we want to make the basics of daily life easier and more affordable for everyone.",
    Icon: EverydayIcon,
    sections: [
      {
        heading: 'Free, publicly owned and operated child care, five days a week',
        text: 'Childcare centres should not be run by private capitalists who view babies and preschoolers as a way to make a profit. The safety of children should be the highest priority. Their needs will be put first only in a system run to support families and to educate children. Socialists would establish a public childcare and early education system for children from six months until primary school, with enough places for everyone.',
      },
      {
        heading: 'Free school lunches for all government primary school students',
        text: 'Free, nutritious school lunches to every Victorian government primary school student. As well as providing much needed relief to working-class families, this measure would create thousands of new, stable and well-paid catering jobs. We would also end all "voluntary" parent contributions for things like uniforms, devices, camps and excursions, which should be paid for out of the state’s general revenues to ensure that no child is left disadvantaged and no family is humiliated for lack of money.',
      },
      {
        heading: '$100 price-cap trolleys at the supermarket and cost-price food hubs in every community',
        text: "Supermarket profits continue to surge as working-class people struggle to put food on the table. We will introduce a $100 price-cap trolley scheme where households can fill up with a range of staples for meals and other necessities for their weekly household needs. We'll also establish distribution hubs in local communities across the state to supply grocery essentials at cost price.",
      },
      {
        heading: 'Free public transport with increased services and availability',
        text: "We saw earlier this year how easy it was for the government to make public transport free. This should be permanent—it reduces road congestion and reduces the cost of getting around. Transport infrastructure should be a public good, not a source of private profit. That means free, frequent, publicly owned public transport, safe and connected pedestrian and cycling infrastructure, and roads free of private tolls.",
      },
      {
        heading: 'Free-to-air sports coverage including all AFL games',
        text: "Sports shouldn’t be a luxury reserved for people who can afford expensive subscriptions to streaming services like Kayo. We'll fight for a federal government mandate to guarantee the ABC and SBS have default free-to-air broadcasting rights to every AFL, NRL or other sports games or events held in Australia that are not otherwise covered by a free-to-air channel. We'll also bring back free three-quarter time entry to all AFL games played in Victoria.",
      },
      {
        heading: 'Moving to a four-day work week',
        text: "Gains in productivity always go to profits, not to workers. Further increases are expected to result from the increased use of artificial intelligence. We'll push to move toward a four-day week with an equivalent reduced workload at full pay, starting in the public sector and expanding from there.",
      },
    ],
  },
  {
    title: 'INVESTING IN\nBETTER SERVICES',
    heading: 'Investing in better services',
    body: "Everyone deserves quality education, health care, aged care and other public services—not a system run down by decades of underfunding. We'll expand publicly run aged care with more places and in-home support as part of our Universal Living Guarantee.",
    Icon: HealthIcon,
    sections: [
      {
        heading: 'Increase funding for government schools and health services',
        text: "Hire 12,000 additional teachers and support staff across Victoria's 1,600 public schools, boost salaries and cut class sizes to a maximum of 15 (smaller in specialist schools). We'll also increase public hospital beds to at least three per 1,000 Victorians alongside an immediate 2.5 percent-above-inflation pay rise for nurses, paramedics and allied health workers, with another rise in 2028.",
      },
      {
        heading: 'Expand publicly run aged care with increased places and in-home services',
        text: "Aged care, like child care, should not be run for profit. We'll expand public and community-based facilities, mandate registered nurses on-site 24/7, and fully fund public home care services including nursing and domestic assistance for seniors who want to stay in their own homes.",
      },
      {
        heading: 'Expanded disability services including specialist provision and services for young people',
        text: "We'll progressively bring private disability services into public hands, restore funding cuts and build a disability-community-designed alternative to the NDIS in Victoria.",
      },
      {
        heading: 'Putting energy production back in public hands',
        text: "The price of power in Victoria has risen at three times the rate of inflation since privatisation 30 years ago. We'll cap household electricity and gas bills at an affordable level (funded by taxes on energy companies), wipe existing household utility debts and take the energy grid back into public ownership. A new publicly owned energy operator will drive the transition to a 100 percent renewable grid, including offshore wind, battery storage and free rooftop solar and efficiency upgrades for public housing, schools and low-income households.",
      },
    ],
  },
  {
    title: 'IMPROVING\nLIVABILITY AND\nSUSTAINABILITY',
    heading: 'Improving livability and sustainability',
    body: "The climate emergency is getting worse every year. We'll drive a rapid transition to renewable energy, stop new fossil fuel projects, and build a Victoria that's more liveable and sustainable for everyone—including through our energy policy.",
    Icon: ClimateIcon,
    sections: [
      {
        heading: 'Planning for livable cities',
        text: "Melbourne's outer suburbs and regional Victoria get a fraction of the health care, education and transport access that the city's wealthier suburbs enjoy. We'll invest what's needed to ensure residents of these areas are no longer left behind. We'll also end public-private partnerships and land sell-offs, mandate at least 30 percent low-cost and public housing in all new residential developments, require 30 percent canopy tree coverage and give councils additional powers to put social equity ahead of developer profit in planning decisions.",
      },
      {
        heading: 'Urgent action on climate change',
        text: "Victoria's emissions are still rising while the state government opens new offshore gas exploration. We'll cut emissions 75 percent below 2005 levels by 2030, hit a zero-carbon economy by 2035 and be net negative by 2040. We'll bring forward the closure of Loy Yang A to 2030 with guaranteed support for affected workers, ban new fossil fuel projects effective immediately and commit to 100 percent electric new car sales by 2035.",
      },
    ],
  },
  {
    title: 'FIGHTING\nOPPRESSION &\nSOLIDARITY',
    heading: 'Fighting oppression and building solidarity',
    body: "Victorian Socialists stand with the Palestine solidarity movement, the fight for climate justice, and anti-racist and anti-fascist campaigns. We're building solidarity between everyone fighting oppression, at home and around the world.",
    Icon: WorkersIcon,
    sections: [
      {
        heading: 'Support First Nations self-determination and sovereignty',
        text: "The crimes of invasion and occupation, many of which are ongoing, perpetrated against First Nations people must be addressed. We'll establish a reparations tax on commercial and investment properties to help fund land theft reparations, work to limit the removal of First Nations’ children into out-of-home care and implement all recommendations of the Royal Commission into Aboriginal Deaths in Custody, the Bringing Them Home Report and the Yoorrook Justice Commission.",
      },
      {
        heading: 'Standing against homophobia and transphobia',
        text: '"Culture war" attacks on LGBTI+ people have increased as Trump-style right-wing politics has spread internationally. We’ll remove the religious exemptions in Victorian law that allow discrimination, strengthen Victoria’s conversion practices ban and fully fund free and timely gender-affirming care, including for young people. We will oppose any attempt from One Nation or anyone else to codify bigotry in law.',
      },
      {
        heading: 'Oppose racism and the criminal injustice system',
        text: "Racist scapegoating of migrants is used to distract from the real causes of the cost-of-living crisis. We'll raise the age of criminal responsibility to 16 and increase funding to the Victorian Aboriginal Legal Service, Melbourne Activist Legal Support, the Human Rights Law Centre and other community legal services that cater to marginalised, oppressed or economically disadvantaged communities. We'll also declare Victoria a sanctuary state for those at risk of being deported to danger, fund legal support for migrant workers and refugees, and boost funding for multicultural community organisations, particularly in the outer suburbs.",
      },
      {
        heading: "Fight for women's liberation",
        text: "Women earn on average 79 cents for every dollar men earn and do a disproportionate amount of unpaid care work in society. We'll expand paid parental leave to twelve months for the primary carer and six months for a secondary carer, close the gender pay gap in majority-women industries like teaching, nursing and aged care, make abortion freely available in all public hospitals and significantly boost funding for family violence and crisis support services.",
      },
    ],
  },
]

const ACCORDION_POLICIES = POLICIES
const POLICY_GRID = POLICIES
const POLICY_GRID_ICONS = POLICIES

// Design-exploration grid: placeholder cards (not real policy content) used
// to preview the card style variations at scale on the "Policies" nav link.
const PLACEHOLDER_ICONS = [HousingIcon, HealthIcon, ClimateIcon, WorkersUnionsIcon, CivilRightsIcon]
const PLACEHOLDER_POLICY_GRID = Array.from({ length: 22 }, (_, i) => ({
  title: `POLICY\nHEADING ${i + 1}`,
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  Icon: PLACEHOLDER_ICONS[i % PLACEHOLDER_ICONS.length],
}))

// "Red details hover" and "Details" only: first 3 cards swapped in with
// real content (each view keeps its own existing hover/colour style).
// Every card sharing the same icon as one of the first 3 gets that same
// real title/body too, instead of the generic lorem-ipsum placeholder.
const PLACEHOLDER_POLICY_GRID_WITH_CONTENT = PLACEHOLDER_POLICY_GRID.map((policy, i) => {
  const cyclePos = i % PLACEHOLDER_ICONS.length
  // Card 2 keeps its dedicated Workers' power icon/text even though its
  // natural cycle position (icon index 1) would otherwise be HealthIcon.
  if (i === 1) return { ...policy, title: "WORKERS'\nPOWER", body: 'Workers deserve secure jobs, fair wages and safe conditions, with the collective power to improve their working lives.', Icon: WorkersUnionsIcon }
  if (cyclePos === 0) return { ...policy, title: 'HOUSING\nFOR ALL', body: "Everyone deserves a safe, affordable home. We believe housing should serve people, not investors, developers or property speculation." }
  if (cyclePos === 3) return { ...policy, title: "WORKERS'\nPOWER", body: 'Workers deserve secure jobs, fair wages and safe conditions, with the collective power to improve their working lives.' }
  if (cyclePos === 2) return { ...policy, title: 'ARTS AND\nCULTURE FOR\nTHE ENJOYMENT', body: 'Art and culture should reflect working-class life and be accessible to everyone, not controlled by wealth or corporate power.' }
  return policy
})

// "No icon" / "Titles (icon hover)" / "Icons": these views never show body
// text, so just the first 3 headings are swapped in (no body needed).
const PLACEHOLDER_POLICY_GRID_TITLES = PLACEHOLDER_POLICY_GRID.map((policy, i) => {
  if (i === 0) return { ...policy, title: 'HOUSING\nFOR ALL' }
  if (i === 1) return { ...policy, title: 'HEALTH\nFOR ALL' }
  if (i === 2) return { ...policy, title: "WORKERS'\nPOWER" }
  return policy
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
    padding: '16px 0 4px',
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
  },
  platformText: {
    maxWidth: 760,
  },
  platformHeading: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: '28px',
    color: '#000',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    marginTop: 36,
    marginBottom: 12,
    whiteSpace: 'pre-line',
  },
  para: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#111',
    marginBottom: 18,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    fontWeight: 400,
  },
  paraEmphasis: {
    fontSize: 50,
    lineHeight: 1.15,
    color: '#FF4B33',
    marginTop: 8,
    marginBottom: 0,
    fontFamily: "'Work Sans', system-ui, sans-serif",
    fontWeight: 800,
    whiteSpace: 'pre-line',
  },
  breakoutPanel: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#E9533A',
    margin: '40px 0',
  },
  breakoutInner: {
    maxWidth: 760,
  },
  breakoutHeading: {
    fontSize: '1.5em',
    fontWeight: 700,
    color: '#000',
    fontFamily: "'Work Sans', system-ui, sans-serif",
    textTransform: 'none',
    letterSpacing: '0.01em',
    marginTop: 0,
    marginBottom: 14,
  },
  breakoutImagePlaceholder: {
    height: 200,
    border: '1px dashed rgba(0,0,0,0.25)',
    borderRadius: 3,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    fontFamily: "'Open Sans', system-ui, sans-serif",
    marginBottom: 18,
    padding: '0 24px',
  },
  bulletList: {
    margin: '0 0 18px',
    paddingLeft: 20,
  },
  bulletItem: {
    fontSize: 16,
    lineHeight: '22px',
    color: '#111',
    marginBottom: 8,
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
    fontSize: 28,
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

function EverydayIcon({ color = '#000', height = 58 }) {
  return (
    <svg width={height} height={height} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="29" cy="34" r="20" fill={color} />
      <rect x="27" y="6" width="4" height="10" rx="2" fill={color} />
      <path d="M31 10c6-4 12-2 14 4-6 2-11 0-14-4z" fill={color} />
    </svg>
  )
}

function CivilRightsIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 79 / 62)
  return (
    <span
      style={{
        display: 'inline-block', flexShrink: 0, width, height,
        backgroundColor: color,
        WebkitMaskImage: 'url(/civil-rights-icon.svg)',
        maskImage: 'url(/civil-rights-icon.svg)',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
  )
}

function WorkersUnionsIcon({ color = '#000', height = 58 }) {
  const width = Math.round(height * 99 / 96)
  return (
    <span
      style={{
        display: 'inline-block', flexShrink: 0, width, height,
        backgroundColor: color,
        WebkitMaskImage: 'url(/workers-unions.png)',
        maskImage: 'url(/workers-unions.png)',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
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

const TILE_DARK = ['#111111', '#1a1a1a']

// Torn paper edge — matches reference: thin warm-coral strip, near-straight outer edge,
// wildly torn inner edge, wispy fibres, spatter dots, strong multi-scale displacement
function TornEdge({ side, index, hovered }) {
  const uid = `te-${side}-${index}`
  const seed = index * 7 + (side === 'right' ? 17 : 0)

  // Strip is narrow on average (2–6 px) with infrequent wider bulges (up to 15 px)
  // and sections that almost vanish (1 px). Left boundary stays at x=0.
  const mainPath =
    'M0,0 L6,0' +
    ' L4,6 L9,13 L2,21 L12,29 L3,37' +
    ' L7,44 L1,52 L13,60 L4,68 L8,75' +
    ' L2,82 L14,90 L3,98 L6,105 L1,113' +
    ' L11,121 L4,129 L15,137 L2,145 L7,152' +
    ' L1,159 L12,167 L3,175 L9,182 L2,190' +
    ' L13,198 L4,206 L6,213 L1,220 L14,228' +
    ' L3,236 L8,243 L2,250 L11,258 L4,265' +
    ' L15,273 L1,281 L9,288 L3,295 L13,303' +
    ' L2,310 L7,317 L1,325 L12,333 L4,340' +
    ' L14,348 L2,355 L8,362 L1,369 L11,377' +
    ' L3,384 L13,392 L2,400' +
    ' L0,400 Z'

  // Wispy inner fibres — even thinner (0–8 px), different phase
  const fibrePath =
    'M0,0 L3,0' +
    ' L6,9 L1,19 L7,29 L2,39 L5,49' +
    ' L1,59 L8,69 L2,79 L5,89 L1,99' +
    ' L7,109 L2,119 L6,129 L1,139 L8,149' +
    ' L2,159 L5,169 L1,179 L7,189 L2,199' +
    ' L6,209 L1,219 L8,229 L2,239 L5,249' +
    ' L1,259 L7,269 L2,279 L6,289 L1,299' +
    ' L8,309 L2,319 L5,329 L1,339 L7,349' +
    ' L2,359 L6,369 L1,379 L7,389 L3,400' +
    ' L0,400 Z'

  // Deterministic spatter dots — 5 dots, y positions seeded per strip
  const dots = [
    { cx: 10 + (seed % 5),      cy: 55  + (seed % 38), r: 1.4 },
    { cx: 14 + ((seed*3) % 4),  cy: 128 + (seed % 42), r: 0.9 },
    { cx: 9  + ((seed*2) % 6),  cy: 205 + (seed % 36), r: 1.8 },
    { cx: 12 + (seed % 4),      cy: 288 + (seed % 44), r: 1.1 },
    { cx: 16 + ((seed*4) % 5),  cy: 355 + (seed % 30), r: 0.7 },
  ]

  return (
    <div style={{
      position: 'absolute', top: 0, bottom: 0,
      [side]: 0, width: 34,
      zIndex: 2, pointerEvents: 'none',
      opacity: hovered ? 1 : 0.88,
      transition: 'opacity 0.25s ease',
    }}>
      <svg
        width="100%" height="100%"
        viewBox="0 0 34 400"
        preserveAspectRatio="none"
        style={{ display: 'block', ...(side === 'right' ? { transform: 'scaleX(-1)' } : {}) }}
      >
        <defs>
          {/* Primary organic displacement — large slow waves (torn paper macro shape) */}
          <filter id={`${uid}-a`} x="-120%" y="-2%" width="340%" height="104%">
            <feTurbulence type="fractalNoise"
              baseFrequency="0.011 0.05" numOctaves="5"
              result="n1" seed={seed} />
            <feDisplacementMap in="SourceGraphic" in2="n1"
              scale="17" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Secondary fine displacement — micro fibre roughness */}
          <filter id={`${uid}-b`} x="-100%" y="-2%" width="300%" height="104%">
            <feTurbulence type="fractalNoise"
              baseFrequency="0.06 0.3" numOctaves="3"
              result="n2" seed={seed + 4} />
            <feDisplacementMap in="SourceGraphic" in2="n2"
              scale="5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Main torn body — warm coral matching reference */}
        <path d={mainPath} fill="#D94535" filter={`url(#${uid}-a)`} />

        {/* Wispy translucent fibres on inner edge */}
        <path d={fibrePath} fill="#F07060" opacity="0.55" filter={`url(#${uid}-b)`} />

        {/* Paint spatter dots */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#C93C2C" opacity="0.65" />
        ))}
      </svg>
    </div>
  )
}

// ── Brush stroke variant ─────────────────────────────────────────────────────
// Large angled paint brush stroke across dark card background
// viewBox 0 0 300 220 ≈ actual card proportions; slice keeps coverage at all sizes
function PolicyCardBrush({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const uid = `brush-${index}`

  // Diagonal band: centerline from (-50,280)→(350,−60), ~100px perp-width
  // Extends beyond all four edges so filter displacement never reveals a gap
  const mainStroke = 'M -20,320 L -88,238 L 314,-102 L 382,-20 Z'
  // Thin companion stroke alongside — lighter, adds bristle layering
  const thinStroke = 'M -55,258 L -78,228 L 308,-92 L 331,-62 Z'

  const accent = hovered ? '#CC1F1F' : '#9E1515'

  return (
    <div
      style={{
        ...S.card,
        backgroundColor: '#0c0c0c',
        position: 'relative', overflow: 'hidden',
        transition: 'background-color 0.28s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Paint brush stroke SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none', zIndex: 0 }}
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Large-scale organic displacement — brush edge roughness */}
          <filter id={`${uid}-a`} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.013 0.048"
              numOctaves="5" result="t1" seed={index * 6 + 2} />
            <feDisplacementMap in="SourceGraphic" in2="t1"
              scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Fine bristle displacement for companion layer */}
          <filter id={`${uid}-b`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.2"
              numOctaves="3" result="t2" seed={index * 4 + 9} />
            <feDisplacementMap in="SourceGraphic" in2="t2"
              scale="9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Paint texture — feColorMatrix desaturates to vary shade within stroke */}
          <filter id={`${uid}-c`} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.06"
              numOctaves="4" result="t3" seed={index * 5 + 14} />
            <feDisplacementMap in="SourceGraphic" in2="t3"
              scale="28" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feColorMatrix type="saturate" values="0.8" in="displaced" />
          </filter>
        </defs>

        {/* Main bold stroke — dark red, strong rough edges */}
        <path d={mainStroke} fill={accent} opacity="0.92" filter={`url(#${uid}-c)`} />

        {/* Thin companion stroke — slightly brighter, fine bristle roughness */}
        <path d={thinStroke} fill="#E03030" opacity="0.45" filter={`url(#${uid}-b)`} />
      </svg>

      <h2 style={{
        ...S.cardTitle, color: '#fff',
        position: 'relative', zIndex: 1,
        textShadow: '0 1px 8px rgba(0,0,0,0.8)',
      }}>{policy.title}</h2>

      <span style={{
        ...S.readMore, color: 'rgba(255,255,255,0.45)',
        alignSelf: 'flex-end', position: 'relative', zIndex: 1,
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardEdgy({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        ...S.card,
        backgroundColor: hovered ? '#1c0300' : TILE_DARK[index % 2],
        position: 'relative', overflow: 'hidden',
        transition: 'background-color 0.28s ease',
        boxShadow: 'inset 18px 0 22px -10px rgba(0,0,0,0.55), inset -18px 0 22px -10px rgba(0,0,0,0.55)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TornEdge side="left" index={index} hovered={hovered} />
      <TornEdge side="right" index={index} hovered={hovered} />

      <h2 style={{
        ...S.cardTitle, color: '#fff',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>

      <span style={{
        ...S.readMore, color: 'rgba(255,255,255,0.4)',
        alignSelf: 'flex-end', position: 'relative', zIndex: 1,
      }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCard({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.card, height: 155, background: hovered ? TILE_HOVER_COLOURS[index % 2] : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.2s ease' }}
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
            ? 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
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
            ? 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
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

function PolicyCardExpanded({ policy, index, height }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.cardExpanded, ...(height ? { height } : {}), background: hovered ? TILE_HOVER_COLOURS[index % 2] : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.2s ease' }}
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
            ? 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
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

function PolicyCardExpandedNoIcon({ policy, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ ...S.card, height: 155, background: hovered ? '#fff' : TILE_COLOURS[index % 2], boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.14)' : 'none', position: 'relative', overflow: 'hidden', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{
        ...S.cardTitle,
        color: hovered ? '#FF4B33' : '#000',
        fontSize: hovered ? 31 : 30,
        transition: hovered ? 'font-size 0.25s ease, color 0.25s ease' : 'font-size 0.6s ease, color 0.6s ease',
        position: 'relative', zIndex: 1,
      }}>{policy.title}</h2>
      <span style={{ ...S.readMore, color: hovered ? '#FF4B33' : '#000', fontSize: hovered ? 15 : 14, alignSelf: 'flex-end', position: 'relative', zIndex: 1, transition: hovered ? 'color 0.25s ease, font-size 0.25s ease' : 'color 0.6s ease, font-size 0.6s ease' }}>
        Read more <span style={{ fontSize: 16 }}>›</span>
      </span>
    </div>
  )
}

function PolicyCardRedDetails({ policy, index, height }) {
  const [hovered, setHovered] = useState(false)
  const { Icon } = policy
  return (
    <div
      style={{ ...S.cardExpanded, ...(height ? { height } : {}), background: hovered ? '#FF4B33' : TILE_COLOURS[index % 2], position: 'relative', overflow: 'hidden', transition: 'background-color 0.18s ease' }}
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
            ? 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) 0.14s'
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
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const w = useWindowWidth()
  const isMobile = w <= 640
  return (
    <div style={{ maxWidth: isMobile ? '100%' : 700 }}>
      {ACCORDION_POLICIES.map((policy, i) => {
        const isOpen = openIndex === i
        const isHovered = hoveredIndex === i
        const isRed = isOpen || isHovered
        const { Icon } = policy
        return (
          <div key={i} style={{ borderBottom: '1px solid #C4C4C4', ...(i === 0 ? { borderTop: '1px solid #C4C4C4' } : {}) }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 16,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: isMobile ? '16px 0' : '20px 0', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 20 }}>
                <Icon height={isMobile ? 22 : 28} color={isRed ? '#FF4B33' : '#000'} />
                <h2 style={{
                  fontSize: isMobile ? 17 : 22, fontWeight: 800, lineHeight: 1,
                  fontFamily: "'Work Sans', system-ui, sans-serif",
                  textTransform: 'uppercase', letterSpacing: '0.02em',
                  color: isRed ? '#FF4B33' : '#000',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'normal',
                }}>
                  {policy.title.replace(/\n/g, ' ')}
                </h2>
              </div>
              <span style={{
                fontSize: 26, lineHeight: 1, fontWeight: 300, flexShrink: 0,
                color: isRed ? '#FF4B33' : '#000',
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
        <div style={{ transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.15)' : 'scale(1)', transformOrigin: 'bottom left' }}>
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

// Horizontal inset matching the page's text column at each breakpoint —
// used both for padded text sections and for breakout-box padding, so
// everything lines up without nesting a full-bleed panel inside a padded
// ancestor (which breaks percentage/vw-based full-bleed tricks).
function hPad(isMobile, isTablet) {
  if (isMobile) return { left: 16, right: 16 }
  if (isTablet) return { left: 40, right: 40 }
  return { left: 300, right: 80 }
}

// Scales up slowly as the image scrolls through the viewport (desktop only),
// clipped by an overflow:hidden wrapper so the zoom never breaks layout.
function ZoomImage({ src, alt, wrapperStyle }) {
  const imgRef = useRef(null)
  const wrapRef = useRef(null)
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const wrap = wrapRef.current
        const img = imgRef.current
        if (!wrap || !img) return
        const rect = wrap.getBoundingClientRect()
        const vh = window.innerHeight || 1
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)))
        img.style.transform = `scale(${1 + progress * 0.25})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
  return (
    // Fixed aspect-ratio + overflow:hidden guarantees this box never
    // resizes — only the <img> inside (object-fit: cover) scales up.
    <div ref={wrapRef} style={{ position: 'relative', overflow: 'hidden', aspectRatio: '2702 / 810', ...wrapperStyle }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transform: 'scale(1)',
          transition: 'transform 0.1s linear', willChange: 'transform',
        }}
      />
    </div>
  )
}

function BreakoutBox({ heading, imagePlaceholder, imageSrc, imageAlt, paragraphs, paragraphColor, headingColor, headingStyle, bg, angledBottom, imageGap, extraMarginTop, zoomOnScroll, children, isMobile, isTablet, flushBottom, padY }) {
  const { left, right } = hPad(isMobile, isTablet)
  const vPad = padY ?? (isMobile ? 24 : isTablet ? 32 : 36)
  return (
    <div style={{
      ...S.breakoutPanel,
      background: bg || S.breakoutPanel.background,
      padding: `${vPad}px ${right}px ${vPad + (angledBottom ? (isMobile ? 90 : 130) : 0)}px ${left}px`,
      // Fixed pixel drop (not a %) so the diagonal's slope stays constant
      // no matter how tall the box grows with content — only the box's
      // height changes, never the angle.
      ...(angledBottom && { clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${isMobile ? 70 : 100}px), 0 100%)` }),
      ...(extraMarginTop && { marginTop: 40 + extraMarginTop }),
      ...(flushBottom && { marginBottom: 0 }),
    }}>
      {imageSrc && (zoomOnScroll ? (
        <ZoomImage
          src={imageSrc}
          alt={imageAlt || ''}
          wrapperStyle={{
            width: `calc(100% + ${left + right}px)`,
            marginLeft: -left, marginRight: -right,
            marginBottom: imageGap ?? 16, marginTop: -vPad,
          }}
        />
      ) : (
        <img
          src={imageSrc}
          alt={imageAlt || ''}
          style={{
            display: 'block', width: `calc(100% + ${left + right}px)`,
            marginLeft: -left, marginRight: -right, maxWidth: 'none',
            marginBottom: imageGap ?? 16, marginTop: -vPad,
          }}
        />
      ))}
      <div style={S.breakoutInner}>
        <h3 style={{ ...S.breakoutHeading, color: headingColor || '#fff', ...headingStyle }}>{heading}</h3>
        {imagePlaceholder && !imageSrc && (
          <div style={S.breakoutImagePlaceholder}>
            Candidates group photo + montage of action shots
          </div>
        )}
        {paragraphs && paragraphs.map((text, i) => (
          <p key={i} style={{ ...S.para, fontSize: isMobile ? 15 : 16, marginBottom: i === paragraphs.length - 1 ? 0 : 18, color: paragraphColor || '#fff', fontWeight: paragraphColor === '#000' ? 600 : 400 }}>{text}</p>
        ))}
        {children}
      </div>
    </div>
  )
}

function HoverLink({ style, children, ...props }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...style, color: hovered ? '#FF4B33' : style.color, transition: 'color 0.15s ease' }}
    >
      {children}
    </a>
  )
}

function ManifestoSidebar({ isMobile }) {
  const [imgHovered, setImgHovered] = useState(false)
  const linkStyle = {
    display: 'block', fontSize: 14, fontWeight: 700,
    color: '#000', textDecoration: 'underline', letterSpacing: '0.02em',
    fontFamily: "'Open Sans', system-ui, sans-serif",
  }
  return (
    <div style={{
      width: isMobile ? '100%' : 240, maxWidth: isMobile ? '100%' : 240, flexShrink: 0,
      display: 'flex', flexDirection: isMobile ? 'row' : 'column',
      gap: isMobile ? 16 : 10, alignItems: isMobile ? 'flex-start' : 'stretch',
    }}>
      <a
        href="/manifesto-booklet.pdf"
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', flexShrink: 0, width: isMobile ? 108 : '100%', overflow: 'hidden', borderRadius: 3 }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img
          src="/manifesto.jpeg"
          alt="A Socialist Manifesto for real change"
          style={{
            width: '100%', display: 'block', borderRadius: 3,
            transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
        />
      </a>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <HoverLink href="/manifesto-booklet.pdf" target="_blank" rel="noreferrer" style={linkStyle}>
          View or download manifesto booklet (PDF 18 MB)
        </HoverLink>
        <HoverLink href="#" style={linkStyle}>
          Purchase printed booklet ($10)
        </HoverLink>
      </div>
    </div>
  )
}

function VisionContent({ isMobile, isTablet, skipCandidates, groups, showSidebar = true, noPaddingTop, noPaddingBottom }) {
  const list = groups || VISION_GROUPS
  return (
    <div style={{ paddingTop: noPaddingTop ? 0 : isMobile ? 28 : isTablet ? 48 : 64, paddingBottom: noPaddingBottom ? 0 : isMobile ? 60 : isTablet ? 60 : 80 }}>
      {list.map((g, gi) => {
        if (g.kind === 'breakout') {
          if (skipCandidates && g.item.heading === 'Our candidates') return null
          return <BreakoutBox key={gi} heading={g.item.heading} imagePlaceholder={g.item.imagePlaceholder} imageSrc={g.item.imageSrc} imageAlt={g.item.imageAlt} paragraphs={g.item.paragraphs} paragraphColor={g.item.paragraphColor} headingColor={g.item.headingColor} headingStyle={{ fontSize: isMobile ? 20 : 26, fontWeight: 800 }} angledBottom={g.item.angledBottom} extraMarginTop={g.item.extraMarginTop} padY={g.item.extraPadY ? (isMobile ? 24 : isTablet ? 32 : 36) + g.item.extraPadY : undefined} zoomOnScroll={!!g.item.imageSrc} isMobile={isMobile} isTablet={isTablet} />
        }
        const { left, right } = hPad(isMobile, isTablet)
        const renderItem = (item, i) => {
          if (item.type === 'heading') {
            return (
              <h2 key={i} style={{ ...S.platformHeading, ...(item.level === 1 ? { marginTop: 0, fontSize: isMobile ? 20 : 26 } : item.matchIntro ? { fontSize: isMobile ? 20 : 26 } : { fontWeight: 600, fontSize: isMobile ? 17 : 21 }) }}>{item.text}</h2>
            )
          }
          if (item.emphasis) {
            const text = isMobile ? 'Capitalism is killing\nour future. For real change,\nvote socialist.' : item.text
            return <p key={i} style={{ ...S.paraEmphasis, fontSize: isMobile ? 24 : 38, marginTop: isMobile ? 8 : 38 }}>{text}</p>
          }
          if (item.link) {
            const idx = item.linkText ? item.text.indexOf(item.linkText) : -1
            if (idx === -1) {
              return (
                <a key={i} href={item.link} target="_blank" rel="noreferrer" style={{ ...S.para, fontSize: isMobile ? 15 : 16, textDecoration: 'underline', textUnderlineOffset: '2px', color: '#000', display: 'block' }}>
                  {item.text}
                </a>
              )
            }
            const before = item.text.slice(0, idx)
            const after = item.text.slice(idx + item.linkText.length)
            return (
              <p key={i} style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>
                {before}
                <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>{item.linkText}</a>
                {after}
              </p>
            )
          }
          return <p key={i} style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{item.text}</p>
        }
        return (
          <div key={gi} style={{ paddingLeft: left, paddingRight: right }}>
            {gi === 0 && showSidebar ? (
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 48, alignItems: 'flex-start' }}>
                <div style={{ ...S.platformText, maxWidth: isMobile ? '100%' : 760, minWidth: 0 }}>
                  {g.items.map(renderItem)}
                </div>
                <ManifestoSidebar isMobile={isMobile} />
              </div>
            ) : (
              <div style={{ ...S.platformText, maxWidth: isMobile ? '100%' : 760 }}>
                {g.items.map(renderItem)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Collapsed-by-default dropdown list — underlined heading, chevron on the
// right that rotates open, full multi-section policy text revealed on click.
function PolicyAccordionChevron({ policies, isMobile }) {
  const [openIndex, setOpenIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const headingRefs = useRef([])
  const [headerWidth, setHeaderWidth] = useState(null)

  useEffect(() => {
    const widths = headingRefs.current.map(el => el ? el.scrollWidth : 0)
    const max = Math.max(...widths, 0)
    const chevronW = isMobile ? 13 : 17
    setHeaderWidth(max > 0 ? max + 20 + chevronW : null)
  }, [isMobile, policies])

  return (
    <div style={{ maxWidth: 760 }}>
      {policies.map((policy, i) => {
        const isOpen = openIndex === i
        const isRed = isOpen || hoveredIndex === i
        return (
          <div key={i}>
            {/* Header row shrinks to fit the longest heading (desktop/tablet
                only — mobile keeps full-width wrapping so long headings
                can't overflow the viewport). Border only spans that width. */}
            <div style={{ width: isMobile ? '100%' : (headerWidth || 'fit-content'), maxWidth: '100%', borderBottom: '1px solid #C4C4C4', ...(i === 0 ? { borderTop: '1px solid #C4C4C4' } : {}) }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 20,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: isMobile ? '16px 0' : '20px 0', textAlign: 'left',
                }}
              >
                <span style={{
                  flexShrink: 0, display: 'inline-block',
                  width: isMobile ? 13 : 17, height: isMobile ? 7 : 9,
                  backgroundColor: isRed ? '#FF4B33' : '#000',
                  WebkitMaskImage: 'url(/accordion-chevron.png)',
                  maskImage: 'url(/accordion-chevron.png)',
                  WebkitMaskSize: 'contain', maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center', maskPosition: 'center',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease, background-color 0.15s ease',
                }} />
                <h3
                  ref={el => { headingRefs.current[i] = el }}
                  style={{
                    fontSize: isMobile ? 17 : 22, fontWeight: 800, lineHeight: 1.2,
                    fontFamily: "'Work Sans', system-ui, sans-serif",
                    color: isRed ? '#FF4B33' : '#000', transition: 'color 0.15s ease',
                    margin: 0, whiteSpace: isMobile ? 'normal' : 'nowrap',
                  }}
                >
                  {policy.heading}
                </h3>
              </button>
            </div>
            <div style={{ maxHeight: isOpen ? 2600 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
              <div style={{ paddingBottom: isMobile ? 16 : 24 }}>
                {policy.sections.map((s, si) => (
                  <div key={si} style={{ marginBottom: si === policy.sections.length - 1 ? 0 : 20 }}>
                    <p style={{ ...S.para, fontWeight: 700, marginBottom: 4, fontSize: isMobile ? 15 : 16 }}>{s.heading}</p>
                    <p style={{ ...S.para, marginBottom: 0, fontSize: isMobile ? 15 : 16 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PoliciesPage({ version, initialTab = 'policies', initialPlainView = 'vision', onVersionChange, onNavigateHome }) {
  // Default view is the clean "No icon" style with no variations picker.
  // ?clean=1 in the URL shows the full "Card design variations" picker and
  // all the in-progress style options, for internal review.
  const [showVariations] = useState(() => new URLSearchParams(window.location.search).get('clean') === '1')
  // Plain-URL only: lets you flip between the finished single-page layout
  // ("Vision") and a placeholder card grid for previewing card styles
  // ("Policies"), without needing ?clean=1.
  const [plainView, setPlainView] = useState(initialPlainView)
  const [tab, setTab] = useState(initialTab)
  const [cardView, setCardView] = useState(showVariations ? 'titles' : 'detailsnoicon')
  const [policyLayout, setPolicyLayout] = useState('grid')
  const [menuOpen, setMenuOpen] = useState(false)
  const [manifestoExpanded, setManifestoExpanded] = useState(false)
  const tabBarRef = useRef(null)
  const policiesRef = useRef(null)
  const heroImgRef = useRef(null)

  const w = useWindowWidth()
  const isMobile = w <= 640
  const isTablet = w <= 1024

  // Hero background photo slowly zooms in as the page scrolls away from it.
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const el = heroImgRef.current
        if (!el) return
        const progress = Math.min(1, Math.max(0, window.scrollY / 500))
        el.style.transform = `scale(${1 + progress * 0.12})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Single continuous page, no tab bar: the default (plain-URL) experience,
  // and always for Option B. Only ?clean=1's Option A keeps the old tabbed
  // view with the card design-variation picker for internal review.
  const combined = version === 'C' || !showVariations

  const grid = cardView === 'icons' ? POLICY_GRID_ICONS : POLICY_GRID

  return (
    <div style={{ ...S.page, ...(isMobile && { paddingTop: 30 }) }}>

      {/* Fixed black top strip — mobile only */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 30, background: '#111', zIndex: 50,
        }} />
      )}

      <nav style={{ ...S.nav, padding: isMobile ? '0 16px' : '0 24px', position: 'relative', justifyContent: 'space-between' }}>
        {/* Version toggle — left */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(showVariations
            ? [{ key: 'B', label: 'Option A' }, { key: 'C', label: 'Option B' }, { key: 'home', label: 'Start from home' }]
            : [{ key: 'home', label: 'Start from home' }]
          ).map(v => (
            <button key={v.key} onClick={() => onVersionChange(v.key)} style={{
              background: version === v.key ? 'rgba(255,255,255,0.18)' : 'none',
              border: '2px solid',
              borderColor: version === v.key ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
              borderRadius: 4, color: version === v.key ? '#fff' : 'rgba(255,255,255,0.4)',
              fontSize: isMobile ? 10 : 14, fontFamily: "'Work Sans', system-ui, sans-serif",
              fontWeight: 800, letterSpacing: '0.04em',
              padding: isMobile ? '3px 7px' : '4px 12px', cursor: 'pointer', transition: 'all 0.15s',
              textTransform: 'uppercase',
            }}>{v.label}</button>
          ))}
          {!showVariations && version === 'B' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16, marginLeft: isMobile ? 4 : 10 }}>
              {[{ key: 'vision', label: 'Vision' }, { key: 'policies', label: 'Policies' }].map(v => (
                <button
                  key={v.key}
                  onClick={() => setPlainView(v.key)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontSize: isMobile ? 12 : 14, fontFamily: "'Open Sans', system-ui, sans-serif",
                    fontWeight: plainView === v.key ? 700 : 400,
                    color: plainView === v.key ? '#fff' : 'rgba(255,255,255,0.6)',
                    textDecoration: 'underline', textUnderlineOffset: '3px',
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Card design buttons — right */}
        {((showVariations && tab === 'policies') || (!showVariations && plainView === 'policies')) && version === 'B' && (isMobile ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: '1px solid',
              borderColor: menuOpen ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
              borderRadius: 3, color: '#fff', fontSize: 20, lineHeight: 1,
              width: 36, height: 36, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="View options"
          >⋮</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 400, color: '#fff', fontFamily: "'Open Sans', system-ui, sans-serif" }}>Card design variations</span>
            <div className="nav-toggle" style={S.navViewToggle}>
              <button style={S.navViewBtn(cardView === 'detailsnoicon')} onClick={() => setCardView('detailsnoicon')}>No icon</button>
              <button style={S.navViewBtn(cardView === 'titles')} onClick={() => setCardView('titles')}>Titles (icon hover)</button>
              <button style={S.navViewBtn(cardView === 'icons')} onClick={() => setCardView('icons')}>Icons</button>
              <button style={S.navViewBtn(cardView === 'expanded')} onClick={() => setCardView('expanded')}>Details</button>
              <button style={S.navViewBtn(cardView === 'reddetails')} onClick={() => setCardView('reddetails')}>Red details hover</button>
            </div>
          </div>
        ))}
      </nav>

      {/* Kebab dropdown — mobile only */}
      {((showVariations && tab === 'policies') || (!showVariations && plainView === 'policies')) && version === 'B' && isMobile && menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
          <div style={{
            position: 'fixed', top: 82, right: 0, zIndex: 99,
            background: '#fff', borderLeft: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8',
            minWidth: 230, boxShadow: '-4px 8px 24px rgba(0,0,0,0.12)',
          }}>
            {/* Accordion option */}
            <div style={{ padding: '6px 0' }}>
              {[{ label: 'Accordion', action: () => { setPolicyLayout('accordion'); setMenuOpen(false) }, active: policyLayout === 'accordion' }].map(item => (
                <button key="acc" onClick={item.action} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '13px 20px', background: 'none', border: 'none',
                  fontSize: 15, fontWeight: item.active ? 700 : 400, cursor: 'pointer',
                  fontFamily: "'Open Sans', system-ui, sans-serif",
                  color: item.active ? '#FF4B33' : '#000', textAlign: 'left',
                }}>
                  {item.label}
                  {item.active && <span style={{ fontSize: 13 }}>✓</span>}
                </button>
              ))}
            </div>

            <div style={{ height: 1, background: '#EBEBEB', margin: '0 20px' }} />

            {/* Tile options */}
            <div style={{ padding: '6px 20px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', fontFamily: "'Open Sans', system-ui, sans-serif" }}>Tiles</div>
            <div style={{ paddingBottom: 6 }}>
              {[
                { label: 'No icon', view: 'detailsnoicon' },
                { label: 'Titles (icon hover)', view: 'titles' },
                { label: 'Icons', view: 'icons' },
                { label: 'Details', view: 'expanded' },
                { label: 'Red details hover', view: 'reddetails' },
              ].map(({ label, view }) => {
                const active = policyLayout === 'grid' && cardView === view
                return (
                  <button key={view} onClick={() => { setPolicyLayout('grid'); setCardView(view); setMenuOpen(false) }} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '13px 20px', background: 'none', border: 'none',
                    fontSize: 15, fontWeight: active ? 700 : 400, cursor: 'pointer',
                    fontFamily: "'Open Sans', system-ui, sans-serif",
                    color: active ? '#FF4B33' : '#000', textAlign: 'left',
                  }}>
                    {label}
                    {active && <span style={{ fontSize: 13 }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      <div style={{ ...S.heroSection, height: isMobile ? 190 : 280 }}>
        {/* Fixed frame: the diagonal clip shape never changes size. */}
        <div
          style={{
            position: 'absolute', inset: 0, overflow: 'hidden',
            clipPath: isMobile ? 'polygon(0 0, 100% 0, 100% 90%, 0 70%)' : 'polygon(0 0, 100% 0, 100% 86%, 0 63%)',
          }}
        >
          {/* Only this image layer zooms, clipped to the fixed frame above. */}
          <div
            ref={heroImgRef}
            style={{
              ...S.heroPurple,
              transform: 'scale(1)', transition: 'transform 0.1s linear', willChange: 'transform',
            }}
          />
        </div>
        <div style={{ ...S.pageTitleBox, left: isMobile ? 20 : isTablet ? 40 : 276, top: isMobile ? 127 : 178, ...(isMobile && { padding: '4px 7px 16px' }) }}>
          <h1 style={{ ...S.pageTitle, fontSize: isMobile ? 22 : 36 }}>{(!showVariations && version === 'B' && plainView === 'policies') ? 'Our policies' : "What we'll fight for"}</h1>
        </div>
      </div>

      {combined && isMobile && (
        <div style={{ padding: '14px 16px 0' }}>
          <button
            onClick={() => policiesRef.current && window.scrollTo({ top: policiesRef.current.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' })}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'none', border: '1px solid rgba(0,0,0,0.25)', borderRadius: 20,
              padding: '8px 14px', fontSize: 13, fontWeight: 700,
              color: '#000', fontFamily: "'Open Sans', system-ui, sans-serif",
              cursor: 'pointer',
            }}
          >
            Jump to our key policies <span style={{ fontSize: 14 }}>↓</span>
          </button>
        </div>
      )}

      {!combined && (
        <div ref={tabBarRef} style={{ ...S.tabBar, padding: isMobile ? '0 16px' : isTablet ? '0 40px' : '0 300px', gap: isMobile ? 16 : 24, ...(isMobile && { position: 'sticky', top: 30, zIndex: 40, boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }) }}>
          <button style={{ ...S.tabBtn(tab === 'platform'), fontSize: isMobile ? 15 : 18 }} onClick={() => { setTab('platform'); isMobile && tabBarRef.current && window.scrollTo(0, tabBarRef.current.offsetTop - 30) }}>
            Our vision
          </button>
          <button style={{ ...S.tabBtn(tab === 'policies'), fontSize: isMobile ? 15 : 18 }} onClick={() => { setTab('policies'); isMobile && tabBarRef.current && window.scrollTo(0, tabBarRef.current.offsetTop - 30) }}>
            Our policies
          </button>
        </div>
      )}

      <main style={S.content}>
        {(!showVariations && version === 'B' && plainView === 'policies') ? (
          <div style={{ paddingTop: 15, paddingBottom: isMobile ? 60 : isTablet ? 60 : 80 }}>
            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, marginBottom: 32 }}>
              <p style={{ ...S.para, maxWidth: isMobile ? '100%' : 660, fontSize: isMobile ? 15 : 16 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
              </p>
              <p style={{ ...S.para, maxWidth: isMobile ? '100%' : 660, fontSize: isMobile ? 15 : 16, marginBottom: 0 }}>
                Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right }}>
              <div style={{ ...S.grid, gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 300px)', gap: isMobile ? 12 : 24 }}>
                {((cardView === 'reddetails' || cardView === 'expanded') ? PLACEHOLDER_POLICY_GRID_WITH_CONTENT
                  : (cardView === 'detailsnoicon' || cardView === 'titles' || cardView === 'icons') ? PLACEHOLDER_POLICY_GRID_TITLES
                  : PLACEHOLDER_POLICY_GRID).map((policy, i) => {
                  if (cardView === 'edgy') return <PolicyCardEdgy key={i} policy={policy} index={i} />
                  if (cardView === 'brush') return <PolicyCardBrush key={i} policy={policy} index={i} />
                  if (cardView === 'expanded') return <PolicyCardExpanded key={i} policy={policy} index={i} height={258} />
                  if (cardView === 'detailsnoicon') return <PolicyCardExpandedNoIcon key={i} policy={policy} index={i} />
                  if (cardView === 'reddetails') return <PolicyCardRedDetails key={i} policy={policy} index={i} height={258} />
                  if (cardView === 'icons') return <PolicyCardIcons key={i} policy={policy} index={i} />
                  return <PolicyCard key={i} policy={policy} index={i} />
                })}
              </div>
            </div>
          </div>
        ) : combined ? (
          <>
            <VisionContent isMobile={isMobile} isTablet={isTablet} groups={VISION_GROUPS.slice(0, 1)} noPaddingBottom />

            <div ref={policiesRef} style={{ paddingTop: isMobile ? 24 : 32 }}>
              <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, marginBottom: 40 }}>
                <h2 style={{ ...S.platformHeading, marginTop: 0, fontSize: isMobile ? 20 : 26 }}>Our key policies</h2>
                <p style={{ ...S.para, maxWidth: isMobile ? '100%' : 660, fontSize: isMobile ? 15 : 16, marginBottom: 0 }}>
                  Below are some of the key policies we're taking to this election. They form part of a broader and more detailed platform developed in recent months with input from Victorian Socialists members.
                </p>
              </div>

              <BreakoutBox heading="Universal Living Guarantee" bg="#F1ECF2" headingColor="#000" headingStyle={{ fontWeight: 400 }} isMobile={isMobile} isTablet={isTablet}>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{ULG_INTRO}</p>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{ULG_LEAD}</p>
                <ul style={S.bulletList}>
                  {ULG_BULLETS.map((text, i) => (
                    <li key={i} style={{ ...S.bulletItem, fontSize: isMobile ? 15 : 16 }}>{text}</li>
                  ))}
                </ul>
              </BreakoutBox>

              <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right }}>
                <PolicyAccordionChevron policies={POLICIES} isMobile={isMobile} />
              </div>
            </div>

            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, marginTop: 90, marginBottom: 40 }}>
              <h2 style={{ ...S.breakoutHeading, fontSize: isMobile ? 20 : 26, fontWeight: 800, marginBottom: 16 }}>How we'll pay for it</h2>
              <div style={{ maxWidth: isMobile ? '100%' : 760 }}>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{FUNDING_INTRO}</p>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{FUNDING_LEAD}</p>
                <ul style={S.bulletList}>
                  {FUNDING_BULLETS.map((text, i) => (
                    <li key={i} style={{ ...S.bulletItem, fontSize: isMobile ? 15 : 16 }}>{text}</li>
                  ))}
                </ul>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16, marginBottom: 0 }}>{FUNDING_CLOSING}</p>
              </div>
            </div>

            <BreakoutBox heading={CANDIDATES_BREAKOUT.heading} imageSrc={CANDIDATES_BREAKOUT.imageSrc} imageAlt={CANDIDATES_BREAKOUT.imageAlt} paragraphs={CANDIDATES_BREAKOUT.paragraphs} headingStyle={{ fontSize: isMobile ? 20 : 26, fontWeight: 800 }} imageGap={60} padY={60} zoomOnScroll isMobile={isMobile} isTablet={isTablet} />

            <div style={{ marginTop: -50 }}>
              <VisionContent isMobile={isMobile} isTablet={isTablet} groups={VISION_GROUPS.slice(1)} skipCandidates showSidebar={false} />
            </div>
          </>
        ) : version === 'A' ? (
          <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, paddingTop: isMobile ? 28 : isTablet ? 48 : 64, paddingBottom: isMobile ? 60 : isTablet ? 60 : 80 }}>
            <div style={{ maxWidth: isMobile ? '100%' : 640, marginBottom: 48 }}>
              <h2 style={{
                fontSize: isMobile ? 20 : 28, fontWeight: 900, lineHeight: 1.1,
                fontFamily: "'Work Sans', system-ui, sans-serif",
                letterSpacing: '0.02em', color: '#000', marginBottom: 20, marginTop: 0,
              }}>
                A Victoria run for working people,<br />not billionaires.
              </h2>
              {MANIFESTO_INTRO.map((text, i) => (
                <p key={i} style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{text}</p>
              ))}
              <div style={{ maxHeight: manifestoExpanded ? 1000 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{ ...S.para, fontWeight: 700, marginTop: 8, marginBottom: 16, fontSize: isMobile ? 15 : 16 }}>Our commitments:</p>
                {MANIFESTO_PRINCIPLES.map((p, i) => (
                  <div key={i} style={{ marginBottom: 18 }}>
                    <p style={{ ...S.para, fontWeight: 700, marginBottom: 4, fontSize: isMobile ? 15 : 16 }}>{p.label}</p>
                    <p style={{ ...S.para, marginBottom: 0, fontSize: isMobile ? 14 : 15 }}>{p.text}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setManifestoExpanded(e => !e)} style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontSize: isMobile ? 13 : 14, fontWeight: 700,
                fontFamily: "'Open Sans', system-ui, sans-serif",
                color: '#FF4B33', marginTop: 8, letterSpacing: '0.02em',
              }}>
                {manifestoExpanded ? 'Show less ↑' : 'Read our commitments ↓'}
              </button>
            </div>
            <p style={{ ...S.para, fontSize: isMobile ? 13 : 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999', marginBottom: 24 }}>Our policies</p>
            <div style={{ ...S.grid, gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 300px)', gap: isMobile ? 12 : 24 }}>
              {grid.map((policy, i) => {
                if (cardView === 'expanded') return <PolicyCardExpanded key={i} policy={policy} index={i} />
                if (cardView === 'detailsnoicon') return <PolicyCardExpandedNoIcon key={i} policy={policy} index={i} />
                if (cardView === 'reddetails') return <PolicyCardRedDetails key={i} policy={policy} index={i} />
                if (cardView === 'icons') return <PolicyCardIcons key={i} policy={policy} index={i} />
                return <PolicyCard key={i} policy={policy} index={i} />
              })}
            </div>
          </div>
        ) : tab === 'platform' ? (
          <VisionContent isMobile={isMobile} isTablet={isTablet} />
        ) : (
          <div style={{ paddingTop: isMobile ? 28 : isTablet ? 48 : 64, paddingBottom: isMobile ? 60 : isTablet ? 60 : 80 }}>
            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, marginBottom: 32 }}>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', marginBottom: 16, gap: isMobile ? 12 : 0 }}>
                <h2 style={{ ...S.breakoutHeading, marginBottom: 0 }}>Universal Living Guarantee</h2>
                {!isMobile && (
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginLeft: 24 }}>
                    <button style={S.layoutBtn(policyLayout === 'grid')} onClick={() => setPolicyLayout('grid')}>Grid</button>
                    <button style={S.layoutBtn(policyLayout === 'accordion')} onClick={() => setPolicyLayout('accordion')}>Accordion</button>
                  </div>
                )}
              </div>
              <div style={{ maxWidth: isMobile ? '100%' : 760 }}>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{ULG_INTRO}</p>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{ULG_LEAD}</p>
                <ul style={S.bulletList}>
                  {ULG_BULLETS.map((text, i) => (
                    <li key={i} style={{ ...S.bulletItem, fontSize: isMobile ? 15 : 16 }}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right }}>
              {policyLayout === 'accordion' ? <AccordionPolicies /> : (
              <div style={{ ...S.grid, gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 300px)', gap: isMobile ? 12 : 24 }}>
                {grid.map((policy, i) => {
                  if (cardView === 'edgy') return <PolicyCardEdgy key={i} policy={policy} index={i} />
                  if (cardView === 'brush') return <PolicyCardBrush key={i} policy={policy} index={i} />
                  if (cardView === 'expanded') return <PolicyCardExpanded key={i} policy={policy} index={i} />
                  if (cardView === 'detailsnoicon') return <PolicyCardExpandedNoIcon key={i} policy={policy} index={i} />
                  if (cardView === 'reddetails') return <PolicyCardRedDetails key={i} policy={policy} index={i} />
                  if (cardView === 'icons') return <PolicyCardIcons key={i} policy={policy} index={i} />
                  return <PolicyCard key={i} policy={policy} index={i} />
                })}
              </div>
              )}
            </div>

            <div style={{ paddingLeft: hPad(isMobile, isTablet).left, paddingRight: hPad(isMobile, isTablet).right, marginTop: 90 }}>
              <h2 style={{ ...S.breakoutHeading, fontSize: isMobile ? 20 : 26, fontWeight: 800, marginBottom: 16 }}>How we'll pay for it</h2>
              <div style={{ maxWidth: isMobile ? '100%' : 760 }}>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{FUNDING_INTRO}</p>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16 }}>{FUNDING_LEAD}</p>
                <ul style={S.bulletList}>
                  {FUNDING_BULLETS.map((text, i) => (
                    <li key={i} style={{ ...S.bulletItem, fontSize: isMobile ? 15 : 16 }}>{text}</li>
                  ))}
                </ul>
                <p style={{ ...S.para, fontSize: isMobile ? 15 : 16, marginBottom: 0 }}>{FUNDING_CLOSING}</p>
              </div>
            </div>
          </div>
        )}
      </main>


      <footer style={S.footer} />
    </div>
  )
}

export default function App() {
  const [version, setVersion] = useState('B')
  const [initialTab, setInitialTab] = useState('policies')
  const [initialPlainView, setInitialPlainView] = useState('vision')

  if (version === 'home') {
    return (
      <HomePage
        onNavigateToPolicies={() => { setInitialTab('policies'); setInitialPlainView('policies'); setVersion('B'); window.scrollTo(0, 0) }}
        onNavigateToVision={() => { setInitialTab('platform'); setInitialPlainView('vision'); setVersion('B'); window.scrollTo(0, 0) }}
      />
    )
  }
  return (
    <PoliciesPage
      version={version}
      initialTab={initialTab}
      initialPlainView={initialPlainView}
      onVersionChange={setVersion}
      onNavigateHome={() => setVersion('home')}
    />
  )
}
