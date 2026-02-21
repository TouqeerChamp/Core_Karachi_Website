# Hero Slider Images

The Hero component expects 3 high-quality gym images for the slider:

- `hero-1.jpg` - Main hero image
- `hero-2.jpg` - Secondary gym equipment/image
- `hero-3.jpg` - Third gym/training image

These images should be high-resolution, properly optimized for web, and showcase the gym facilities.

## Implementation Notes

The Hero component uses Swiper.js for the slider functionality with the following features:

- Auto-play: Images change every 5 seconds
- Fade transition effect
- Dark overlay (bg-black/50) for readability
- Pagination dots at bottom center
- Core Karachi branding with orange accents
- Fixed content (heading and CTA buttons) that stays in place during transitions

## Dependencies

- Swiper.js (v11+)
- Swiper CSS files
- Next.js Image component
- Custom Button component