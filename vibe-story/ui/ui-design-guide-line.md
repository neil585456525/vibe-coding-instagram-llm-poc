# UI Design Guideline

![UI Screenshot](./vibe-story/screenshots/ui-2025-07-17.png)

## 1. Feature Overview

The Buffer LLM Template Prototype is a content creation and analysis platform that allows users to:

- **Instagram Content Analysis**: Analyze Instagram posts to understand content patterns and generate personalized templates
- **Template Management**: Browse, filter, and utilize pre-built content templates across different categories
- **Multi-Channel Integration**: Connect and manage content across various social media platforms (Instagram, LinkedIn, Threads, Bluesky)

The primary user behavior targets content creators and social media managers who need efficient, data-driven content creation workflows.

## 2. Design Principles

**Tone & Aesthetics:**
- **Clean and Professional**: Minimalist interface with generous white space
- **Friendly & Approachable**: Liberal use of emojis to make features feel accessible
- **Data-Driven**: Emphasis on analytics and insights-driven content creation
- **Action-Oriented**: Clear call-to-action buttons and guided workflows

**Guiding Principles:**
- **Clarity over complexity**: Simple, scannable layouts
- **Progressive disclosure**: Advanced features revealed when needed
- **Consistent visual hierarchy**: Clear information architecture
- **Accessibility-first**: High contrast and keyboard navigation support

## 3. Layout Structure

**Primary Layout:**
- **Header Navigation**: Global navigation bar with Buffer branding and main sections (Create, Publish, Engage, Analyze, Start Page)
- **Left Sidebar**: Context-specific navigation with collapsible sections
- **Main Content Area**: Primary workspace with clear headings and action items
- **User Actions Bar**: Top-right corner with notifications, help, and user profile

**Spacing Rules:**
- **16px base unit** for consistent spacing rhythm
- **24px margins** around main content sections
- **8px internal padding** for buttons and interactive elements
- **32px vertical spacing** between major content sections

**Responsive Behavior:**
- **Desktop-first design** with primary focus on productivity workflows
- **Collapsible sidebar** for smaller screens
- **Flexible grid system** that adapts to content width

## 4. Component Guidelines

### Buttons
- **Primary Action**: Blue background (`#4285F4`), white text, emoji prefix
  - Example: "🔍 Crawl My Instagram Posts"
- **Secondary Action**: Light gray background, dark text, emoji prefix
  - Example: "📋 View All Posts"
- **Navigation Items**: Clean text with emoji icons, hover states
- **Size**: Consistent padding (12px vertical, 20px horizontal)
- **Border Radius**: 6px for modern, approachable feel

### Cards / Lists
- **Template Cards**: Clean white background, subtle drop shadow
- **Content Structure**: Icon, title, description, consistent spacing
- **Interactive States**: Hover effects with slight elevation
- **Grid Layout**: Responsive grid with consistent aspect ratios

### Inputs
- **Form Elements**: Clean borders, focus states with blue accent
- **Search/Filter**: Integrated with category buttons
- **Consistent Styling**: Matches overall design language

### Navigation
- **Sidebar Navigation**: Hierarchical structure with sections
- **Active States**: Blue accent color and bold text
- **Badge System**: Numbers and "New" indicators for status
- **Icon-Text Pairing**: Emojis for visual recognition + text labels

## 5. Typography

**Font Family**: System fonts (likely Segoe UI, Roboto, or similar)

**Scale & Hierarchy:**
- **H1 (Page Titles)**: 32px, bold weight - "Instagram Content Analysis"
- **H2 (Section Headers)**: 24px, semibold - "Start Instagram Analysis"
- **H3 (Card Titles)**: 18px, medium weight - Template titles
- **Body Text**: 16px, regular weight - Descriptions and explanations
- **Small Text**: 14px, regular weight - Secondary information
- **Navigation**: 16px, medium weight for main items

**Usage Rules:**
- **Single font family** throughout the interface for consistency
- **Color contrast** meets WCAG AA standards
- **Line height**: 1.5 for body text, 1.2 for headings
- **Text alignment**: Left-aligned for readability

## 6. Color System

**Primary Palette:**
- **Blue Primary**: `#4285F4` - Primary actions, active states, links
- **Background**: `#FFFFFF` - Main content areas
- **Subtle Gray**: `#F8F9FA` - Sidebar and secondary backgrounds
- **Text Primary**: `#1A1A1A` - Main text content
- **Text Secondary**: `#6B7280` - Supporting text and descriptions

**Status & Feedback:**
- **Success**: Green tones for completed actions
- **Warning**: Orange for attention-needed states
- **New Badge**: Green with "New" text for fresh content
- **Active Navigation**: Blue background with white text

**Usage Rules:**
- **High contrast** for accessibility compliance
- **Consistent semantic meaning** across color usage
- **Limited palette** to maintain visual coherence

## 7. Interactions & Feedback

**Hover States:**
- **Buttons**: Slight darkening of background color
- **Cards**: Subtle elevation with shadow increase
- **Navigation Items**: Background color change with smooth transition
- **Links**: Underline appearance on hover

**Click/Active States:**
- **Buttons**: Brief pressed effect with darker shade
- **Navigation**: Persistent active state with blue background
- **Form Elements**: Blue border focus state

**Loading & Feedback:**
- **Progressive disclosure** for complex workflows
- **Clear success/error messaging** for user actions
- **Visual feedback** for state changes (connected accounts, analysis progress)

**Transitions:**
- **Smooth animations** (200-300ms duration)
- **Ease-out curves** for natural feel
- **Minimal motion** to avoid distraction

## 8. Accessibility Practices

**Contrast & Visibility:**
- **High contrast ratios** for all text (minimum 4.5:1 for normal text)
- **Clear visual hierarchy** with size and weight differences
- **Sufficient color differences** for state changes

**Keyboard Support:**
- **Tab navigation** through all interactive elements
- **Focus indicators** visible and consistent
- **Logical tab order** following visual layout

**Content Structure:**
- **Semantic HTML** with proper heading hierarchy
- **Alt text** for meaningful images and icons
- **Screen reader friendly** navigation labels
- **Clear error messages** with actionable guidance

## 9. Open Questions / Suggestions

**Design Enhancements:**
- **Dark mode support** - Consider implementing for user preference
- **Advanced filtering** - More sophisticated template categorization
- **Visual template previews** - Show actual content examples in template cards
- **Progress indicators** - For multi-step analysis workflows

**User Experience:**
- **Onboarding flow** - Guided setup for first-time users
- **Bulk operations** - Select multiple templates or posts for batch actions
- **Template customization** - In-app editing capabilities
- **Performance optimization** - Lazy loading for large template collections

**Technical Considerations:**
- **Responsive mobile experience** - Currently optimized for desktop
- **Offline capabilities** - Cache templates for offline access
- **Real-time updates** - Live sync for connected social accounts
- **Analytics dashboard** - Visual metrics for content performance

**Future Features:**
- **AI-generated content suggestions** based on analysis results
- **Collaborative features** - Team sharing and feedback on templates
- **Advanced scheduling** - Integrated posting calendar
- **Cross-platform analytics** - Unified insights across all connected channels

---

This design guideline documents the current state of the Buffer LLM Template Prototype interface as of July 17, 2025. The design emphasizes clarity, accessibility, and user-friendly workflows for content creators and social media managers.
