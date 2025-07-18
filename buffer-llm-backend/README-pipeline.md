# Template Pipeline Trigger Script

This bash script automates the complete Buffer LLM template generation pipeline, removing the need for frontend controls.

## What it does

The script executes three steps in sequence:

1. **Crawl Instagram posts** - Fetches posts from Instagram API
2. **Analyze posts with AI** - Uses OpenAI to analyze post content, tone, and themes  
3. **Generate personalized templates** - Creates AI-powered templates based on the analysis

## Usage

### Basic usage (uses default account)
```bash
./trigger-pipeline.sh
```

### Specify Instagram username
```bash
./trigger-pipeline.sh funk_yuee
```

### Specify username and account theme
```bash
./trigger-pipeline.sh funk_yuee "Dance and movement content creator"
```

## Prerequisites

- Backend server must be running (`yarn docker:dev`)
- Valid Instagram API token in `.env` file
- OpenAI API key configured
- MongoDB accessible
- `curl` command available (standard on macOS/Linux)

## Configuration

You can override the API base URL:
```bash
API_BASE_URL=http://localhost:4000/api ./trigger-pipeline.sh
```

## Output

The script provides:
- ✅ Colored status messages for each step
- 📊 Summary of crawled posts, analyzed posts, and generated templates
- ⏱️ Total execution time
- 🔧 Troubleshooting guidance if errors occur

## Example Output

```
🚀 Buffer LLM Template Pipeline Starting...

Target Account: @funk_yuee
Account Theme: Dance and movement content creator focusing on community engagement and personal growth
API Base URL: http://localhost:4000/api

[16:02:15] STEP 1: Crawling Instagram posts...
[16:02:16] ✅ SUCCESS: Crawled 25 posts for @funk_yuee

[16:02:17] STEP 2: Analyzing posts with AI...
[16:02:19] ✅ SUCCESS: Analyzed 15 posts

[16:02:20] STEP 3: Generating personalized templates...
[16:02:23] ✅ SUCCESS: Generated 5 personalized templates

🎉 Pipeline completed successfully in 8s!

Summary:
  • Posts crawled: 25
  • Posts analyzed: 15
  • Templates generated: 5

Next Steps:
  • Visit the Templates page to view your personalized templates
  • Use the "Use Template" feature to generate content
  • Re-run this script anytime to refresh your templates
```

## Error Handling

The script includes:
- Health check before starting
- Validation of API responses
- Clear error messages with troubleshooting tips
- Exit on any step failure to prevent cascading issues

## Backend Control

This script enables full backend control of the template generation process, eliminating the need for frontend trigger buttons. You can:

- Run manually when needed
- Schedule with cron for automatic updates
- Integrate into CI/CD pipelines
- Call from other automation scripts

## Files Modified

To implement backend-only control, you would typically remove these frontend elements:

- Generate templates button from Templates page
- Crawl trigger from Instagram Analysis page  
- Related frontend state management for these operations

The templates will still be displayed and usable in the frontend - only the generation triggers are moved to backend control.
