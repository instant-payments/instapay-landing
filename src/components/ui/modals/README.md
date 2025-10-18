# Sign-Up Modal Component

## Overview
A reusable modal component that displays when users click the "Sign Up" button in the header. It includes the Instagram handle input form from the hero section.

## Features

✨ **Clean & Modern Design**
- Centered modal with backdrop blur
- Smooth animations (fade-in, zoom-in)
- Professional styling with purple accent

🎯 **User Experience**
- ESC key to close
- Click outside to dismiss
- Body scroll lock when open
- Responsive design

♿ **Accessibility**
- Keyboard navigation support
- ARIA labels
- Focus management

## Files Created

```
src/
├── components/ui/modals/
│   ├── SignUpModal.tsx       # Main modal component
│   └── index.ts              # Export file
└── hooks/
    └── useSignUpModal.ts     # Reusable modal state hook
```

## Usage

### Basic Implementation (Already Done in Header)

```tsx
import { useSignUpModal } from '@/hooks/useSignUpModal';
import SignUpModal from '@/components/ui/modals/SignUpModal';

function YourComponent() {
  const { isOpen, openModal, closeModal } = useSignUpModal();

  return (
    <>
      <button onClick={openModal}>
        Sign Up
      </button>

      <SignUpModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
```

### Using the Hook Elsewhere

You can use the `useSignUpModal` hook in any component that needs to trigger the sign-up modal:

```tsx
import { useSignUpModal } from '@/hooks/useSignUpModal';

function CTAButton() {
  const { openModal } = useSignUpModal();
  
  return (
    <button onClick={openModal}>
      Get Started Free
    </button>
  );
}
```

## Component Props

### SignUpModal

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Callback when modal closes |

## Hook API

### useSignUpModal()

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Current modal state |
| `openModal` | `() => void` | Function to open modal |
| `closeModal` | `() => void` | Function to close modal |
| `toggleModal` | `() => void` | Function to toggle modal |

## Styling & Customization

The modal uses:
- Tailwind CSS classes
- Purple accent color (`purple-600`, `purple-700`)
- Backdrop blur effect
- Smooth transitions

To customize colors, update the classes in `SignUpModal.tsx`:

```tsx
// Current purple accent
className="bg-purple-100 text-purple-700"

// Change to blue
className="bg-blue-100 text-blue-700"
```

## Features Included

1. **Close Mechanisms**
   - X button in top-right
   - ESC key press
   - Click outside modal

2. **Body Scroll Lock**
   - Prevents background scrolling when modal is open
   - Automatically restored on close

3. **Instagram Form Integration**
   - Uses existing `EarlyAccessForm` component
   - Same validation and submission logic
   - Success states and error handling

4. **Visual Indicators**
   - Three checkmarks at bottom showing benefits:
     - No credit card
     - 5 min setup
     - Free plan

## Testing

To test the modal:

1. Visit the homepage
2. Click "Sign Up" button in header
3. Modal should appear with smooth animation
4. Try:
   - Entering an Instagram handle
   - Submitting the form
   - Closing with X button
   - Closing with ESC key
   - Clicking outside

## Mobile Responsive

The modal is fully responsive:
- `max-w-2xl` on desktop
- Padding on mobile for edge spacing
- `max-h-[90vh]` prevents overflow
- Scrollable content if needed

## Future Enhancements

Possible improvements:
- [ ] Add analytics tracking
- [ ] A/B test different copy
- [ ] Add social proof (testimonials)
- [ ] Multi-step form option
- [ ] Email field addition
- [ ] Success redirect options

## Integration Points

The modal is currently integrated in:
- ✅ Header navigation (desktop)
- ⏳ Mobile menu (to be added)
- ⏳ Pricing section CTAs (optional)
- ⏳ Footer CTAs (optional)

## Related Components

- `EarlyAccessForm` - The form used inside the modal
- `Header` - Main integration point
- `Button` - UI component for CTAs

