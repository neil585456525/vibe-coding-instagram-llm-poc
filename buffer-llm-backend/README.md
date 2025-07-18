# Instagram Post Analyzer & Template Generator

A Node.js TypeScript application that retrieves Instagram posts using Instagram Basic Display API, stores them in MongoDB, and performs tone/style analysis using OpenAI to generate reusable post templates.

## Features

- **Instagram API Integration**: Fetch posts from your Instagram account using Instagram Basic Display API
- **AI-Powered Analysis**: Analyze post tone, structure, and themes using OpenAI
- **Template Generation**: Create reusable post templates based on analyzed content
- **MongoDB Storage**: Persistent storage for accounts, posts, and templates
- **Docker Support**: Containerized deployment with Docker Compose
- **REST API**: Clean API endpoints for crawling, analyzing, and template generation

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: OpenAI GPT API
- **Instagram API**: Instagram Basic Display API
- **HTTP Client**: Axios
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+
- MongoDB (or use Docker Compose)
- OpenAI API key
- **Instagram Basic Display API Access Token**

## Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd buffer-llm-template-prototype
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
   MONGO_URL=mongodb://localhost:27017/instagram-analyzer
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=4000
   NODE_ENV=development
   ```

## Instagram API Setup

To use this application, you need to set up Instagram Basic Display API access:

### Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" and select "Consumer" type
3. Fill in your app details

### Step 2: Add Instagram Basic Display Product

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display → Basic Display

### Step 3: Create an Instagram App

1. Click "Create New App" in Instagram Basic Display
2. Fill in the required fields:
   - **Display Name**: Your app name
   - **Valid OAuth Redirect URIs**: `https://localhost:3000/auth/instagram/callback`
   - **Deauthorize Callback URL**: `https://localhost:3000/auth/instagram/deauthorize`
   - **Data Deletion Request URL**: `https://localhost:3000/auth/instagram/delete`

### Step 4: Add Test Users

1. Go to Instagram Basic Display → Basic Display
2. Scroll down to "User Token Generator"
3. Click "Add or Remove Instagram Testers"
4. Add your Instagram account as a test user
5. Accept the invitation in your Instagram app

### Step 5: Generate Access Token

1. In "User Token Generator", click "Generate Token" next to your test user
2. Authorize the app in the popup
3. Copy the generated access token
4. Add it to your `.env` file as `INSTAGRAM_ACCESS_TOKEN`

### Important Notes

- **Instagram Basic Display API** only allows access to your own Instagram content
- The access token expires after 60 days (you can refresh it programmatically)
- For production use with other users' content, you'd need Instagram Graph API with business verification

## Usage

### Development

1. **Start MongoDB locally** (if not using Docker):
   ```bash
   mongod
   ```

2. **Run the development server**:
   ```bash
   yarn dev
   ```

### Docker Development

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f app
```

### Production

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f app
```

## API Endpoints

### 1. Crawl Instagram Posts

**POST** `/api/crawl`

Fetches recent posts from your authenticated Instagram account and stores them in the database.

**Request Body**: Empty (uses authenticated user's account)

**Response**:
```json
{
  "success": true,
  "data": {
    "accountId": "...",
    "instagramAccountId": "...",
    "username": "...",
    "totalPostsFetched": 25,
    "newPostsAdded": 20,
    "skippedDuplicates": 5,
    "lastCrawledAt": "2024-01-15T10:30:00Z"
  }
}
```

### 1.1. Demo Crawl (No Instagram API Required)

**POST** `/api/test-crawl`

Uses mock Instagram data for testing and development purposes.

**Request Body**: Empty

**Response**: Same format as regular crawl endpoint with mock data

### 2. Analyze Posts

**POST** `/api/analyze`

Analyzes unprocessed posts using OpenAI to extract tone, structure, and themes.

```json
{
  "instagramUsername": "instagram_username_here"
}
```
or
```json
{
  "instagramAccountId": "instagram_account_id_here"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accountId": "...",
    "instagramAccountId": "...",
    "totalPostsToAnalyze": 20,
    "analyzedCount": 18,
    "errorCount": 2,
    "lastAnalyzedAt": "2024-01-15T11:00:00Z"
  }
}
```

### 3. Generate Templates

**POST** `/api/generate-templates`

Generates reusable post templates based on analyzed posts.

```json
{
  "instagramUsername": "instagram_username_here",
  "accountTheme": "fitness brand" // optional
}
```
or
```json
{
  "instagramAccountId": "instagram_account_id_here",
  "accountTheme": "fitness brand" // optional
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accountId": "...",
    "instagramAccountId": "...",
    "templatesGenerated": 12,
    "templates": [
      {
        "id": "...",
        "title": "Motivational Monday Post",
        "tone": "inspirational",
        "structure": "hook-story-CTA",
        "tags": ["motivation", "monday", "inspiration"],
        "examplePostCount": 3
      }
    ],
    "basedOnPosts": 18
  }
}
```

### 4. Get Templates

**GET** `/api/templates/:identifier`

Retrieves all generated templates for an account. The identifier can be either the Instagram username or account ID.

## Data Models

### Account
- `instagramAccountId`: Unique Instagram account identifier
- `username`: Instagram username
- `lastCrawledAt`: Last crawl timestamp
- `lastAnalyzedAt`: Last analysis timestamp

### Post
- `instagramMediaId`: Unique Instagram media ID
- `accountId`: Reference to Account
- `caption`: Post caption text
- `mediaUrl`: Media file URL
- `analyzed`: Analysis status
- `analysisResult`: AI analysis results (tone, structure, themes, etc.)

### Template
- `accountId`: Reference to Account
- `title`: Template title
- `promptTemplate`: Reusable prompt with placeholders
- `tone`: Content tone
- `structure`: Content structure
- `tags`: Categorization tags
- `examplePostIds`: References to example posts

## Development Scripts

```bash
# Development with hot reload
yarn dev

# Build TypeScript
yarn build

# Start production server
yarn start

# Lint code
yarn lint

# Run tests
yarn test

# Install dependencies
yarn install

# Clean build and dependencies
yarn clean

# Docker commands
yarn docker:build
yarn docker:up
yarn docker:down
yarn docker:dev
yarn docker:dev-down

# API testing
yarn test:api

# Full pipeline (crawl → analyze → generate templates)
yarn pipeline
```

## Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── models/
│   ├── Account.ts           # Account schema
│   ├── Post.ts              # Post schema
│   └── Template.ts          # Template schema
├── routes/
│   ├── crawl.ts             # Crawling endpoints
│   ├── analyze.ts           # Analysis endpoints
│   └── templates.ts         # Template endpoints
├── services/
│   ├── instagramService.ts  # Instagram API client
│   └── openaiService.ts     # OpenAI integration
├── middleware/
│   └── errorHandler.ts      # Error handling
└── server.ts                # Main application entry
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `INSTAGRAM_ACCESS_TOKEN` | Instagram Basic Display API access token | Yes |
| `MONGO_URL` | MongoDB connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `PORT` | Server port (default: 4000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Testing Without Instagram API

For development and testing purposes, you can use the demo endpoint:

**POST** `/api/test-crawl`

This endpoint uses mock Instagram data and doesn't require an Instagram access token. It's perfect for:

1. **Development**: Test the application flow without API setup
2. **Demos**: Show functionality without Instagram credentials
3. **CI/CD**: Run tests without external API dependencies
4. **Onboarding**: Get started quickly before setting up Instagram API

**Response**: Same format as the regular crawl endpoint, but with mock data.

## Error Handling

The API includes comprehensive error handling:
- Input validation
- MongoDB connection errors
- Instagram API authentication errors
- Instagram API rate limiting
- OpenAI API errors
- Duplicate post detection
- Access token expiration handling

## Limitations

- **Instagram Basic Display API**: Only works with your own Instagram content
- **Token Expiry**: Access tokens expire every 60 days and need to be refreshed
- **Rate Limits**: Subject to Instagram's API rate limits
- **Content Access**: Cannot access other users' content without Graph API and business verification

## Quick Start Guide

1. **For Development/Testing**: Use the `/api/test-crawl` endpoint with mock data
2. **For Production**: Set up Instagram Basic Display API following the setup guide above
3. **Demo Mode**: Great for showcasing the application without Instagram credentials
4. **Full Pipeline**: Run `yarn pipeline` to execute the complete workflow (crawl → analyze → generate templates)

## Pipeline Automation

The project includes a convenient pipeline script that automates the entire workflow:

```bash
# Run the full pipeline for the configured Instagram account
yarn pipeline
```

This command will:
1. **Crawl** Instagram posts using the configured access token
2. **Analyze** posts using OpenAI to extract patterns and themes
3. **Generate** reusable templates based on the analysis
4. **Report** the results with detailed statistics

The pipeline uses the Instagram username configured in the `trigger-pipeline.sh` script. To modify the target account, edit the script or run it directly:

```bash
# Run pipeline for a specific account (requires script modification)
./trigger-pipeline.sh your_instagram_username
```

**Note**: The pipeline requires proper Instagram API setup and OpenAI API credentials to function correctly.

## Future Enhancements

- [ ] Frontend UI for template editing
- [ ] LangChain integration for advanced analysis
- [ ] Instagram Graph API integration for business accounts
- [ ] Automatic token refresh mechanism
- [ ] Template versioning
- [ ] Analytics dashboard
- [ ] Webhook integration
- [ ] Content scheduling
- [ ] Support for analyzing other users' content (requires Graph API)
- [ ] Batch processing for large accounts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
