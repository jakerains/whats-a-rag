# Deployment Guide

## Prerequisites
- Node.js 18+
- npm 9+
- GitHub Personal Access Token
- Netlify account (for deployment)

## Local Development
1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Add your GitHub token to `.env`:
```env
GITHUB_TOKEN=your_token_here
VITE_API_URL=/api
```

4. Start development servers:
```bash
npm run dev
```

## Production Deployment

### Frontend (Netlify)
1. Build the application:
```bash
npm run build
```

2. Deploy to Netlify:
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables in Netlify dashboard

### Environment Variables
Required environment variables:
- `GITHUB_TOKEN`: Your GitHub Personal Access Token
- `VITE_API_URL`: API URL (default: /api)

### Post-Deployment
1. Verify the deployment
2. Test all features
3. Monitor error logs
4. Check API connectivity

## Maintenance
- Regularly update dependencies
- Monitor GitHub token expiration
- Check server logs for issues
- Update documentation as needed