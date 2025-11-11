# ARRAY Trading Platform - Design Guidelines

## Design Approach

**Selected System**: Material Design Dark Theme with influences from TradingView (data visualization), Linear (typography/spacing), and Bloomberg Terminal (professional density)

**Core Principles**: Information hierarchy over decoration, instant data readability, professional restraint, purposeful animation for state changes only

---

## Typography System

**Fonts**: 
- Primary: Inter (via Google Fonts CDN) - all weights 400, 500, 600, 700
- Monospace: JetBrains Mono - for numerical data, tickers, prices

**Scale**:
- Hero Headlines: 48px/56px (font-semibold)
- Section Headers: 32px/40px (font-semibold)
- Dashboard Titles: 24px/32px (font-medium)
- Body Text: 16px/24px (font-normal)
- Data Labels: 14px/20px (font-medium)
- Numerical Data: 16px/20px mono (font-semibold)
- Small Caps for ticker symbols: 12px tracking-wider uppercase

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-6, mt-8)

**Grid Structure**:
- Marketing pages: max-w-7xl centered containers
- Dashboard: Full-width with 16-column grid system
- Sidebar navigation: Fixed 280px width
- Content padding: px-6 lg:px-12

---

## Component Library

### Navigation
**Top Bar** (Fixed, glass-morphism effect):
- Logo left, primary navigation center, CTA + user profile right
- Height: 72px with backdrop-blur
- Active state: Subtle bottom border indicator

**Sidebar** (Dashboard only):
- Collapsible 280px → 72px (icon-only)
- Nested menu structures for watchlists, portfolios
- Real-time notification badges

### Data Display
**Trading Cards**:
- Elevated surface with subtle border
- Header: Ticker + Current Price (large mono font)
- Sparkline chart integration
- Percentage change with directional arrows
- Padding: p-6, rounded-xl

**Dashboard Widgets**:
- Drag-and-drop grid system
- Resize handles on hover
- Chart containers with toolbar overlays
- Data tables with alternating row treatments
- Real-time update pulse indicators (subtle glow)

**Price Ticker Ribbon**:
- Horizontal auto-scroll across top
- Monospace numbers with color-coded changes
- Height: 48px

### Forms & Registration
**Multi-Step Registration**:
- Progress indicator: Stepped dots with connecting lines
- Card-based form container (max-w-md centered)
- Input fields: Outlined style with floating labels
- Primary CTA: Full-width elevated button
- Padding: p-8, form spacing gap-6

**Input Styling**:
- Height: 48px with 16px padding
- Border: 1.5px solid with focus ring
- Error states: Red accent with icon + message below

### Video Call Components
**Video Grid**:
- Responsive 2x2 or 3x3 depending on participant count
- Active speaker highlight: Thicker border treatment
- Control bar overlay: Blurred background, bottom-fixed
- Corner name tags with status indicators
- Aspect ratio maintained: 16:9

**Mini Video Pip**:
- Draggable floating window (320x180px)
- Positioned bottom-right with 24px margin
- Expand/collapse controls

### Interactive Elements
**Buttons**:
- Primary: Elevated with 48px height, px-6 padding
- Secondary: Outlined variant
- Icon buttons: 40px square
- Blurred backgrounds when over images (backdrop-blur-md)

**Charts**:
- Candlestick, line, and area chart types
- Time range selectors: Pills (1D, 1W, 1M, 1Y, All)
- Crosshair on hover with data tooltip
- Zoom/pan controls

---

## Animations

**Subtle Motion Only**:
- Page transitions: 200ms ease-out
- Data updates: 150ms fade-in for new values
- Card hover: Slight lift (2px translate) + shadow increase
- Number changes: Color flash (300ms) for up/down movement
- Loading states: Skeleton shimmer effect
- Modal/drawer entry: Slide + fade (250ms)

**Prohibited**: Auto-playing carousels, parallax, excessive scroll effects

---

## Page Structures

### Landing Page (Marketing)
1. **Hero Section** (70vh):
   - Large hero image showing trading dashboard
   - Headline + subheading overlay (left-aligned)
   - Dual CTA buttons with blurred backgrounds
   
2. **Features Showcase** (3-column grid):
   - Icon + Title + Description cards
   - Screenshots/mockups in alternating sections
   
3. **Live Dashboard Preview**:
   - Interactive demo embed or high-fidelity screenshot
   - "Try Demo" CTA overlay
   
4. **Video Call Feature** (2-column):
   - Video interface mockup right, feature list left
   
5. **Community Highlights**:
   - User testimonials with profile images
   - 3-column grid layout
   
6. **Registration CTA**:
   - Centered full-width section with gradient background
   - Single focused CTA button

### Dashboard Application
**Layout**: Sidebar (left) + Top Bar + Main Content Area (customizable widget grid)

**Widget Grid**:
- 12-column responsive grid
- Minimum widget size: 3 columns × 2 rows
- Gap: gap-4
- Widgets: Charts, watchlists, news feed, portfolio summary, market overview

---

## Images Section

**Hero Image**: 
- Large, high-quality screenshot of the trading dashboard in action
- Shows multiple monitors, charts, real-time data
- Subtle gradient overlay (dark to transparent top-to-bottom)
- Dimensions: 1920×1080 minimum, positioned background cover

**Feature Section Images**:
- Video call interface mockup (showing 4-person grid)
- Customizable dashboard screenshot (drag-drop in action)
- Mobile app interface (responsive trading on-the-go)
- Real-time alert notification example

**Community Section**:
- Professional headshots for testimonials (circular crop, 80×80px)
- Trading community event photos (optional, rectangular cards)

**Trust Indicators**:
- Security badges/certifications (SVG icons preferred)
- Financial regulatory logos (if applicable)

---

## Icon Library
**Use**: Heroicons (via CDN) - outline style for primary navigation, solid for data indicators

---

This design creates a professional, data-first trading platform that prioritizes information density and usability while maintaining modern aesthetics through restrained animation and thoughtful spacing.