# Immobilien KI Property Preview

A Next.js application for showcasing property image optimization results. Real estate agents receive personalized links to view before/after comparisons of their property images optimized by AI.

## Features

- **Interactive Before/After Comparisons**: Drag slider to compare original vs optimized images
- **Download Functionality**: Download individual before/after images
- **Responsive Design**: Works on desktop and mobile devices
- **Cloudflare Pages Ready**: Configured for static deployment
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage with service explanation
│   │   └── preview/
│   │       └── [propertyId]/
│   │           └── page.tsx    # Property preview page
│   ├── components/
│   │   └── ui/                 # Shadcn UI components
│   └── lib/
│       └── utils.ts            # Utility functions
├── next.config.ts              # Next.js configuration for static export
└── tailwind.config.ts          # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd immo-preview-page
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## URLs and Routing

- `/` - Homepage explaining the service
- `/preview/[propertyId]` - Property preview page (e.g., `/preview/123`)

## API Integration

The application fetches property image data from:
```
GET https://immo-scraper.davmro90.workers.dev/properties/{propertyId}/images
```

Response format:
```json
{
  "success": true,
  "data": {
    "propertyId": "123",
    "companyId": "company-456",
    "companyName": "Example Realty GmbH",
    "beforeAfterImagePairs": [
      {
        "pairIndex": 0,
        "beforeUrl": "https://...",
        "afterUrl": "https://..."
      }
    ]
  }
}
```

## Deployment to Cloudflare Pages

### Automatic Deployment (Recommended)

1. Connect your GitHub repository to Cloudflare Pages
2. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (leave empty)
   - **Environment variables**: None required

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. The build output will be in the `.next` directory

3. Deploy using Cloudflare Pages dashboard or Wrangler CLI

## Environment Variables

No environment variables are required for this application as it uses a public API endpoint.

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Framer Motion** - Animations
- **React Compare Slider** - Image comparison
- **Lucide React** - Icons

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (not used for static export)
- `npm run lint` - Run ESLint

### Code Quality

The project includes:
- ESLint configuration
- TypeScript strict mode
- Prettier code formatting (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary to Immobilien KI.
