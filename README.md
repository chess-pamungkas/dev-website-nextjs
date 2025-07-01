# Website - Next.js Migration

This is the Next.js version of your Gatsby website, providing improved performance, better SEO, and modern React features.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the migration script:**

   ```bash
   node migration-script.js
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nextjs-migration/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/            # Styles and other assets
│   ├── components/        # React components
│   ├── context/          # React context providers
│   ├── enums/            # Enum definitions
│   ├── helpers/          # Utility functions and hooks
│   ├── lib/              # Library configurations (i18n, etc.)
│   ├── locales/          # Translation files
│   ├── pages/            # Next.js pages
│   ├── scripts/          # Build and utility scripts
│   └── validations/      # Form validation schemas
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── MIGRATION_GUIDE.md    # Detailed migration instructions
└── migration-script.js   # Automated migration script
```

## 🌍 Internationalization

The project supports 13 languages:

- English (en)
- French (fr)
- Portuguese (br)
- Vietnamese (vn)
- Thai (th)
- Spanish (es)
- Italian (it)
- Chinese Simplified (cn)
- Chinese Traditional (zh)
- Indonesian (id)
- Japanese (jp)
- Malay (my)
- Arabic (ar)

### Usage

```javascript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t("welcome")}</h1>;
};
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files (if needed)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.tld
NEXT_PUBLIC_GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

### Next.js Configuration

The `next.config.js` includes:

- Internationalization setup
- Image optimization
- SASS support
- Security headers
- Webpack configuration for legacy dependencies

## 📱 Key Features

- **Performance**: Automatic image optimization, code splitting, and static generation
- **SEO**: Built-in meta tags, Open Graph, and structured data support
- **Internationalization**: Multi-language support with automatic locale detection
- **Responsive Design**: Mobile-first approach with modern CSS
- **Type Safety**: JavaScript with ESLint for code quality
- **Analytics**: Google Tag Manager integration

## 🔄 Migration Status

### ✅ Completed

- [x] Project structure setup
- [x] Next.js configuration
- [x] Internationalization setup
- [x] Core components migration
- [x] SEO component conversion
- [x] Asset copying script

### 🔄 In Progress

- [ ] Component import updates
- [ ] Image path updates
- [ ] Page component migration
- [ ] Testing and optimization

### 📋 Todo

- [ ] Update all component imports
- [ ] Replace Gatsby-specific code
- [ ] Test all pages and functionality
- [ ] Performance optimization
- [ ] Deployment setup

## 🐛 Common Issues

### Images Not Loading

- Ensure images are in the `public/` directory
- Update image paths to start with `/` (e.g., `/images/hero.jpg`)

### Styling Issues

- Check that SCSS files are properly imported
- Verify `sass` dependency is installed

### Translation Issues

- Ensure locale files are in the correct format
- Check that translation keys exist in all language files

## 📚 Documentation

- [Migration Guide](./MIGRATION_GUIDE.md) - Detailed migration instructions
- [Next.js Documentation](https://nextjs.org/docs) - Official Next.js docs
- [React i18next](https://react.i18next.com/) - Internationalization docs

## 🤝 Support

If you encounter any issues during migration:

1. Check the [Migration Guide](./MIGRATION_GUIDE.md)
2. Review the [Common Issues](#-common-issues) section
3. Check the Next.js documentation
4. Create an issue with detailed error information

## 📈 Performance

The Next.js version provides several performance improvements:

- Automatic image optimization
- Code splitting and lazy loading
- Static generation where possible
- Improved caching strategies
- Better Core Web Vitals scores

---

**Note**: This is a migration from Gatsby to Next.js. For detailed migration instructions, see [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md).
