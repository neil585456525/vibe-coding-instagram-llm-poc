#!/bin/bash

# API Testing Script for Instagram Analyzer
# This script tests all the API endpoints

BASE_URL="http://localhost:4000/api"
INSTAGRAM_USERNAME="funk_yuee"  # Using existing test account

echo "🧪 Testing Instagram Analyzer API"
echo "=================================="

# Test 1: Health Check
echo "1. Testing health check..."
curl -s "$BASE_URL/../health" | jq '.' || echo "❌ Health check failed"
echo ""

# Test 2: Crawl Instagram Posts
echo "2. Testing crawl endpoint..."
curl -s -X POST "$BASE_URL/crawl" \
  -H "Content-Type: application/json" \
  -d "{\"instagramUsername\": \"$INSTAGRAM_USERNAME\"}" | jq '.' || echo "❌ Crawl failed"
echo ""

# Test 3: Analyze Posts
echo "3. Testing analyze endpoint..."
curl -s -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d "{\"instagramUsername\": \"$INSTAGRAM_USERNAME\"}" | jq '.' || echo "❌ Analysis failed"
echo ""

# Test 4: Generate Templates
echo "4. Testing template generation..."
curl -s -X POST "$BASE_URL/generate-templates" \
  -H "Content-Type: application/json" \
  -d "{\"instagramUsername\": \"$INSTAGRAM_USERNAME\", \"accountTheme\": \"dance and personal growth\"}" | jq '.' || echo "❌ Template generation failed"
echo ""

# Test 5: Get Templates
echo "5. Testing get templates..."
TEMPLATES_RESPONSE=$(curl -s "$BASE_URL/templates/$INSTAGRAM_USERNAME")
echo "$TEMPLATES_RESPONSE" | jq '.' || echo "❌ Get templates failed"

# Extract first template ID for content generation test
TEMPLATE_ID=$(echo "$TEMPLATES_RESPONSE" | jq -r '.data.templates[0]._id // empty')

if [ ! -z "$TEMPLATE_ID" ]; then
  echo ""
  echo "6. Testing content generation with template..."
  curl -s -X POST "$BASE_URL/generate-content-with-template" \
    -H "Content-Type: application/json" \
    -d "{\"templateId\": \"$TEMPLATE_ID\", \"baseText\": \"Today I learned a new dance move and it reminded me of the importance of practice\", \"additionalContext\": \"Sharing a personal growth moment from dance practice\"}" | jq '.' || echo "❌ Content generation failed"
else
  echo "⚠️  Skipping content generation test - no templates found"
fi
echo ""

echo "✅ All tests completed!"
