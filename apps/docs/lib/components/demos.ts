import type { ComponentType } from 'react';
import { ButtonDemo, ButtonPreviewCompact } from '@/components/demos/button-demo';
import { InputDemo, InputPreviewCompact } from '@/components/demos/input-demo';
import {
  NumberTickerDemo,
  NumberTickerPreviewCompact,
} from '@/components/demos/number-ticker-demo';
import { BadgeDemo, BadgePreviewCompact } from '@/components/demos/badge-demo';
import { CardDemo, CardPreviewCompact } from '@/components/demos/card-demo';
import { SwitchDemo, SwitchPreviewCompact } from '@/components/demos/switch-demo';
import { TabsDemo, TabsPreviewCompact } from '@/components/demos/tabs-demo';
import { AccordionDemo, AccordionPreviewCompact } from '@/components/demos/accordion-demo';
import { DialogDemo, DialogPreviewCompact } from '@/components/demos/dialog-demo';
import {
  DropdownMenuDemo,
  DropdownMenuPreviewCompact,
} from '@/components/demos/dropdown-menu-demo';
import { TooltipDemo, TooltipPreviewCompact } from '@/components/demos/tooltip-demo';
import { SelectDemo, SelectPreviewCompact } from '@/components/demos/select-demo';
import { CheckboxDemo, CheckboxPreviewCompact } from '@/components/demos/checkbox-demo';
import { RadioGroupDemo, RadioGroupPreviewCompact } from '@/components/demos/radio-group-demo';
import { ToastDemo, ToastPreviewCompact } from '@/components/demos/toast-demo';
import { ButtonCopyDemo, ButtonCopyPreviewCompact } from '@/components/demos/button-copy-demo';
import {
  MagneticButtonDemo,
  MagneticButtonPreviewCompact,
} from '@/components/demos/magnetic-button-demo';
import { TextareaDemo, TextareaPreviewCompact } from '@/components/demos/textarea-demo';
import {
  SkeletonLoaderDemo,
  SkeletonLoaderPreviewCompact,
} from '@/components/demos/skeleton-loader-demo';
import { AvatarDemo, AvatarPreviewCompact } from '@/components/demos/avatar-demo';
import { SliderDemo, SliderPreviewCompact } from '@/components/demos/slider-demo';
import { ToggleDemo, TogglePreviewCompact } from '@/components/demos/toggle-demo';
import {
  ToggleGroupDemo,
  ToggleGroupPreviewCompact,
} from '@/components/demos/toggle-group-demo';
import { PopoverDemo, PopoverPreviewCompact } from '@/components/demos/popover-demo';
import { BreadcrumbDemo, BreadcrumbPreviewCompact } from '@/components/demos/breadcrumb-demo';
import {
  AlertDialogDemo,
  AlertDialogPreviewCompact,
} from '@/components/demos/alert-dialog-demo';
import { DrawerDemo, DrawerPreviewCompact } from '@/components/demos/drawer-demo';
import { TableDemo, TablePreviewCompact } from '@/components/demos/table-demo';
import { PaginationDemo, PaginationPreviewCompact } from '@/components/demos/pagination-demo';
import { MarqueeDemo, MarqueePreviewCompact } from '@/components/demos/marquee-demo';
import { BorderBeamDemo, BorderBeamPreviewCompact } from '@/components/demos/border-beam-demo';
import {
  ShimmerButtonDemo,
  ShimmerButtonPreviewCompact,
} from '@/components/demos/shimmer-button-demo';
import {
  MeteorShowerDemo,
  MeteorShowerPreviewCompact,
} from '@/components/demos/meteor-shower-demo';
import { SpotlightDemo, SpotlightPreviewCompact } from '@/components/demos/spotlight-demo';
import { BlurFadeDemo, BlurFadePreviewCompact } from '@/components/demos/blur-fade-demo';
import { TextRevealDemo, TextRevealPreviewCompact } from '@/components/demos/text-reveal-demo';
import { WordRotateDemo, WordRotatePreviewCompact } from '@/components/demos/word-rotate-demo';
import {
  TypewriterTextDemo,
  TypewriterTextPreviewCompact,
} from '@/components/demos/typewriter-text-demo';
import { FlipWordsDemo, FlipWordsPreviewCompact } from '@/components/demos/flip-words-demo';
import {
  GradientTextDemo,
  GradientTextPreviewCompact,
} from '@/components/demos/gradient-text-demo';
import {
  ConfettiBurstDemo,
  ConfettiBurstPreviewCompact,
} from '@/components/demos/confetti-burst-demo';
import {
  RippleButtonDemo,
  RippleButtonPreviewCompact,
} from '@/components/demos/ripple-button-demo';
import {
  AnimatedProgressRingDemo,
  AnimatedProgressRingPreviewCompact,
} from '@/components/demos/animated-progress-ring-demo';
import {
  AuroraBackgroundDemo,
  AuroraBackgroundPreviewCompact,
} from '@/components/demos/aurora-background-demo';
import {
  WavyBackgroundDemo,
  WavyBackgroundPreviewCompact,
} from '@/components/demos/wavy-background-demo';
import { SparklesDemo, SparklesPreviewCompact } from '@/components/demos/sparkles-demo';
import {
  AnimatedBeamDemo,
  AnimatedBeamPreviewCompact,
} from '@/components/demos/animated-beam-demo';
import { OrbitDemo, OrbitPreviewCompact } from '@/components/demos/orbit-demo';
import { ParticlesDemo, ParticlesPreviewCompact } from '@/components/demos/particles-demo';
import {
  GridPatternDemo,
  GridPatternPreviewCompact,
} from '@/components/demos/grid-pattern-demo';
import { DotPatternDemo, DotPatternPreviewCompact } from '@/components/demos/dot-pattern-demo';
import {
  CursorSpotlightDemo,
  CursorSpotlightPreviewCompact,
} from '@/components/demos/cursor-spotlight-demo';
import {
  FloatingNavbarDemo,
  FloatingNavbarPreviewCompact,
} from '@/components/demos/floating-navbar-demo';
import {
  ScrollProgressBarDemo,
  ScrollProgressBarPreviewCompact,
} from '@/components/demos/scroll-progress-bar-demo';
import { BentoGridDemo, BentoGridPreviewCompact } from '@/components/demos/bento-grid-demo';
import {
  TiltCardWallDemo,
  TiltCardWallPreviewCompact,
} from '@/components/demos/tilt-card-wall-demo';
import { HeroDemo, HeroPreviewCompact } from '@/components/demos/hero-demo';
import { CtaDemo, CtaPreviewCompact } from '@/components/demos/cta-demo';
import { FeaturesDemo, FeaturesPreviewCompact } from '@/components/demos/features-demo';
import { PricingDemo, PricingPreviewCompact } from '@/components/demos/pricing-demo';
import { FaqDemo, FaqPreviewCompact } from '@/components/demos/faq-demo';
import { FooterDemo, FooterPreviewCompact } from '@/components/demos/footer-demo';
import { TiltCardDemo, TiltCardPreviewCompact } from '@/components/demos/tilt-card-demo';
import { GlobeDemo, GlobePreviewCompact } from '@/components/demos/globe-demo';
import { NavbarDemo, NavbarPreviewCompact } from '@/components/demos/navbar-demo';
import { LogoCloudDemo, LogoCloudPreviewCompact } from '@/components/demos/logo-cloud-demo';
import { StatsBandDemo, StatsBandPreviewCompact } from '@/components/demos/stats-band-demo';
import {
  TestimonialsDemo,
  TestimonialsPreviewCompact,
} from '@/components/demos/testimonials-demo';
import { TeamGridDemo, TeamGridPreviewCompact } from '@/components/demos/team-grid-demo';
import { BlogGridDemo, BlogGridPreviewCompact } from '@/components/demos/blog-grid-demo';
import {
  NewsletterSignupDemo,
  NewsletterSignupPreviewCompact,
} from '@/components/demos/newsletter-signup-demo';
import {
  ContactFormDemo,
  ContactFormPreviewCompact,
} from '@/components/demos/contact-form-demo';
import {
  ComparisonTableDemo,
  ComparisonTablePreviewCompact,
} from '@/components/demos/comparison-table-demo';
import {
  BentoFeaturesDemo,
  BentoFeaturesPreviewCompact,
} from '@/components/demos/bento-features-demo';
import { TimelineDemo, TimelinePreviewCompact } from '@/components/demos/timeline-demo';
import {
  IntegrationGridDemo,
  IntegrationGridPreviewCompact,
} from '@/components/demos/integration-grid-demo';
import { ChangelogDemo, ChangelogPreviewCompact } from '@/components/demos/changelog-demo';
import {
  NotFoundPageDemo,
  NotFoundPagePreviewCompact,
} from '@/components/demos/404-page-demo';
import { LineDrawDemo, LineDrawPreviewCompact } from '@/components/demos/line-draw-demo';
import {
  AnimatedListDemo,
  AnimatedListPreviewCompact,
} from '@/components/demos/animated-list-demo';
import { RetroGridDemo, RetroGridPreviewCompact } from '@/components/demos/retro-grid-demo';
import {
  BentoShowcaseDemo,
  BentoShowcasePreviewCompact,
} from '@/components/demos/bento-showcase-demo';
import {
  HeroSpotlightDemo,
  HeroSpotlightPreviewCompact,
} from '@/components/demos/hero-spotlight-demo';
import { HeroGridDemo, HeroGridPreviewCompact } from '@/components/demos/hero-grid-demo';
import {
  HeroShowcaseDemo,
  HeroShowcasePreviewCompact,
} from '@/components/demos/hero-showcase-demo';
import { SidebarDemo, SidebarPreviewCompact } from '@/components/demos/sidebar-demo';
import { DockDemo, DockPreviewCompact } from '@/components/demos/dock-demo';
import {
  BackgroundBeamsDemo,
  BackgroundBeamsPreviewCompact,
} from '@/components/demos/background-beams-demo';
import { LampDemo, LampPreviewCompact } from '@/components/demos/lamp-demo';
import {
  MovingBorderDemo,
  MovingBorderPreviewCompact,
} from '@/components/demos/moving-border-demo';
import {
  HeroHighlightDemo,
  HeroHighlightPreviewCompact,
} from '@/components/demos/hero-highlight-demo';
import { AuthPageDemo, AuthPagePreviewCompact } from '@/components/demos/auth-page-demo';
import {
  AnnouncementBannerDemo,
  AnnouncementBannerPreviewCompact,
} from '@/components/demos/announcement-banner-demo';
import {
  CommandPaletteDemo,
  CommandPalettePreviewCompact,
} from '@/components/demos/command-palette-demo';
import { InputOTPDemo, InputOTPPreviewCompact } from '@/components/demos/input-otp-demo';
import { ProgressDemo, ProgressPreviewCompact } from '@/components/demos/progress-demo';
import { KbdDemo, KbdPreviewCompact } from '@/components/demos/kbd-demo';
import { SeparatorDemo, SeparatorPreviewCompact } from '@/components/demos/separator-demo';
import {
  AvatarCirclesDemo,
  AvatarCirclesPreviewCompact,
} from '@/components/demos/avatar-circles-demo';
import {
  BrowserFrameDemo,
  BrowserFramePreviewCompact,
} from '@/components/demos/browser-frame-demo';
import {
  MorphingTextDemo,
  MorphingTextPreviewCompact,
} from '@/components/demos/morphing-text-demo';
import { TerminalDemo, TerminalPreviewCompact } from '@/components/demos/terminal-demo';

export const componentDemos: Record<string, ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
  'number-ticker': NumberTickerDemo,
  badge: BadgeDemo,
  card: CardDemo,
  switch: SwitchDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  dialog: DialogDemo,
  'dropdown-menu': DropdownMenuDemo,
  tooltip: TooltipDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  toast: ToastDemo,
  'button-copy': ButtonCopyDemo,
  'magnetic-button': MagneticButtonDemo,
  textarea: TextareaDemo,
  'skeleton-loader': SkeletonLoaderDemo,
  avatar: AvatarDemo,
  slider: SliderDemo,
  toggle: ToggleDemo,
  'toggle-group': ToggleGroupDemo,
  popover: PopoverDemo,
  breadcrumb: BreadcrumbDemo,
  'alert-dialog': AlertDialogDemo,
  drawer: DrawerDemo,
  table: TableDemo,
  pagination: PaginationDemo,
  marquee: MarqueeDemo,
  'border-beam': BorderBeamDemo,
  'shimmer-button': ShimmerButtonDemo,
  'meteor-shower': MeteorShowerDemo,
  spotlight: SpotlightDemo,
  'blur-fade': BlurFadeDemo,
  'text-reveal': TextRevealDemo,
  'word-rotate': WordRotateDemo,
  'typewriter-text': TypewriterTextDemo,
  'flip-words': FlipWordsDemo,
  'gradient-text': GradientTextDemo,
  'confetti-burst': ConfettiBurstDemo,
  'ripple-button': RippleButtonDemo,
  'animated-progress-ring': AnimatedProgressRingDemo,
  'aurora-background': AuroraBackgroundDemo,
  'wavy-background': WavyBackgroundDemo,
  sparkles: SparklesDemo,
  'animated-beam': AnimatedBeamDemo,
  orbit: OrbitDemo,
  particles: ParticlesDemo,
  'grid-pattern': GridPatternDemo,
  'dot-pattern': DotPatternDemo,
  'cursor-spotlight': CursorSpotlightDemo,
  'floating-navbar': FloatingNavbarDemo,
  'scroll-progress-bar': ScrollProgressBarDemo,
  'bento-grid': BentoGridDemo,
  'tilt-card-wall': TiltCardWallDemo,
  hero: HeroDemo,
  cta: CtaDemo,
  features: FeaturesDemo,
  pricing: PricingDemo,
  faq: FaqDemo,
  footer: FooterDemo,
  'tilt-card': TiltCardDemo,
  globe: GlobeDemo,
  navbar: NavbarDemo,
  'logo-cloud': LogoCloudDemo,
  'stats-band': StatsBandDemo,
  testimonials: TestimonialsDemo,
  'team-grid': TeamGridDemo,
  'blog-grid': BlogGridDemo,
  'newsletter-signup': NewsletterSignupDemo,
  'contact-form': ContactFormDemo,
  'comparison-table': ComparisonTableDemo,
  'bento-features': BentoFeaturesDemo,
  timeline: TimelineDemo,
  'integration-grid': IntegrationGridDemo,
  changelog: ChangelogDemo,
  '404-page': NotFoundPageDemo,
  'line-draw': LineDrawDemo,
  'animated-list': AnimatedListDemo,
  'retro-grid': RetroGridDemo,
  'bento-showcase': BentoShowcaseDemo,
  'hero-spotlight': HeroSpotlightDemo,
  'hero-grid': HeroGridDemo,
  'hero-showcase': HeroShowcaseDemo,
  sidebar: SidebarDemo,
  dock: DockDemo,
  'background-beams': BackgroundBeamsDemo,
  lamp: LampDemo,
  'moving-border': MovingBorderDemo,
  'hero-highlight': HeroHighlightDemo,
  'auth-page': AuthPageDemo,
  'announcement-banner': AnnouncementBannerDemo,
  'command-palette': CommandPaletteDemo,
  'input-otp': InputOTPDemo,
  progress: ProgressDemo,
  kbd: KbdDemo,
  separator: SeparatorDemo,
  'avatar-circles': AvatarCirclesDemo,
  'browser-frame': BrowserFrameDemo,
  'morphing-text': MorphingTextDemo,
  terminal: TerminalDemo,
};

export const componentCompactDemos: Record<string, ComponentType> = {
  button: ButtonPreviewCompact,
  input: InputPreviewCompact,
  'number-ticker': NumberTickerPreviewCompact,
  badge: BadgePreviewCompact,
  card: CardPreviewCompact,
  switch: SwitchPreviewCompact,
  tabs: TabsPreviewCompact,
  accordion: AccordionPreviewCompact,
  dialog: DialogPreviewCompact,
  'dropdown-menu': DropdownMenuPreviewCompact,
  tooltip: TooltipPreviewCompact,
  select: SelectPreviewCompact,
  checkbox: CheckboxPreviewCompact,
  'radio-group': RadioGroupPreviewCompact,
  toast: ToastPreviewCompact,
  'button-copy': ButtonCopyPreviewCompact,
  'magnetic-button': MagneticButtonPreviewCompact,
  textarea: TextareaPreviewCompact,
  'skeleton-loader': SkeletonLoaderPreviewCompact,
  avatar: AvatarPreviewCompact,
  slider: SliderPreviewCompact,
  toggle: TogglePreviewCompact,
  'toggle-group': ToggleGroupPreviewCompact,
  popover: PopoverPreviewCompact,
  breadcrumb: BreadcrumbPreviewCompact,
  'alert-dialog': AlertDialogPreviewCompact,
  drawer: DrawerPreviewCompact,
  table: TablePreviewCompact,
  pagination: PaginationPreviewCompact,
  marquee: MarqueePreviewCompact,
  'border-beam': BorderBeamPreviewCompact,
  'shimmer-button': ShimmerButtonPreviewCompact,
  'meteor-shower': MeteorShowerPreviewCompact,
  spotlight: SpotlightPreviewCompact,
  'blur-fade': BlurFadePreviewCompact,
  'text-reveal': TextRevealPreviewCompact,
  'word-rotate': WordRotatePreviewCompact,
  'typewriter-text': TypewriterTextPreviewCompact,
  'flip-words': FlipWordsPreviewCompact,
  'gradient-text': GradientTextPreviewCompact,
  'confetti-burst': ConfettiBurstPreviewCompact,
  'ripple-button': RippleButtonPreviewCompact,
  'animated-progress-ring': AnimatedProgressRingPreviewCompact,
  'aurora-background': AuroraBackgroundPreviewCompact,
  'wavy-background': WavyBackgroundPreviewCompact,
  sparkles: SparklesPreviewCompact,
  'animated-beam': AnimatedBeamPreviewCompact,
  orbit: OrbitPreviewCompact,
  particles: ParticlesPreviewCompact,
  'grid-pattern': GridPatternPreviewCompact,
  'dot-pattern': DotPatternPreviewCompact,
  'cursor-spotlight': CursorSpotlightPreviewCompact,
  'floating-navbar': FloatingNavbarPreviewCompact,
  'scroll-progress-bar': ScrollProgressBarPreviewCompact,
  'bento-grid': BentoGridPreviewCompact,
  'tilt-card-wall': TiltCardWallPreviewCompact,
  hero: HeroPreviewCompact,
  cta: CtaPreviewCompact,
  features: FeaturesPreviewCompact,
  pricing: PricingPreviewCompact,
  faq: FaqPreviewCompact,
  footer: FooterPreviewCompact,
  'tilt-card': TiltCardPreviewCompact,
  globe: GlobePreviewCompact,
  navbar: NavbarPreviewCompact,
  'logo-cloud': LogoCloudPreviewCompact,
  'stats-band': StatsBandPreviewCompact,
  testimonials: TestimonialsPreviewCompact,
  'team-grid': TeamGridPreviewCompact,
  'blog-grid': BlogGridPreviewCompact,
  'newsletter-signup': NewsletterSignupPreviewCompact,
  'contact-form': ContactFormPreviewCompact,
  'comparison-table': ComparisonTablePreviewCompact,
  'bento-features': BentoFeaturesPreviewCompact,
  timeline: TimelinePreviewCompact,
  'integration-grid': IntegrationGridPreviewCompact,
  changelog: ChangelogPreviewCompact,
  '404-page': NotFoundPagePreviewCompact,
  'line-draw': LineDrawPreviewCompact,
  'animated-list': AnimatedListPreviewCompact,
  'retro-grid': RetroGridPreviewCompact,
  'bento-showcase': BentoShowcasePreviewCompact,
  'hero-spotlight': HeroSpotlightPreviewCompact,
  'hero-grid': HeroGridPreviewCompact,
  'hero-showcase': HeroShowcasePreviewCompact,
  sidebar: SidebarPreviewCompact,
  dock: DockPreviewCompact,
  'background-beams': BackgroundBeamsPreviewCompact,
  lamp: LampPreviewCompact,
  'moving-border': MovingBorderPreviewCompact,
  'hero-highlight': HeroHighlightPreviewCompact,
  'auth-page': AuthPagePreviewCompact,
  'announcement-banner': AnnouncementBannerPreviewCompact,
  'command-palette': CommandPalettePreviewCompact,
  'input-otp': InputOTPPreviewCompact,
  progress: ProgressPreviewCompact,
  kbd: KbdPreviewCompact,
  separator: SeparatorPreviewCompact,
  'avatar-circles': AvatarCirclesPreviewCompact,
  'browser-frame': BrowserFramePreviewCompact,
  'morphing-text': MorphingTextPreviewCompact,
  terminal: TerminalPreviewCompact,
};

export function getDemo(slug: string, compact = false): ComponentType | null {
  const map = compact ? componentCompactDemos : componentDemos;
  return map[slug] ?? null;
}
