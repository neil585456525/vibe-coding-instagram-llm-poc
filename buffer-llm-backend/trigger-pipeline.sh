#!/bin/bash

# Buffer LLM Template Pipeline Trigger Script
# 
# This script automates the complete pipeline:
# 1. Crawl Instagram posts
# 2. Analyze posts with AI  
# 3. Generate personalized templates
#
# Usage:
#   ./trigger-pipeline.sh [username] [accountTheme]
#
# Examples:
#   ./trigger-pipeline.sh
#   ./trigger-pipeline.sh funk_yuee
#   ./trigger-pipeline.sh funk_yuee "Dance and movement content creator"

set -e  # Exit on any error

# Configuration
API_BASE_URL="${API_BASE_URL:-http://localhost:4000/api}"
DEFAULT_USERNAME="funk_yuee"
DEFAULT_THEME="Dance and movement content creator focusing on community engagement and personal growth"

# Parse arguments
USERNAME="${1:-$DEFAULT_USERNAME}"
ACCOUNT_THEME="${2:-$DEFAULT_THEME}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Utility functions
log_step() {
    echo -e "\n[$(date +'%H:%M:%S')] ${CYAN}STEP $1:${NC} $2"
}

log_success() {
    echo -e "[$(date +'%H:%M:%S')] ${GREEN}✅ SUCCESS:${NC} $1"
}

log_error() {
    echo -e "[$(date +'%H:%M:%S')] ${RED}❌ ERROR:${NC} $1"
}

log_info() {
    echo -e "[$(date +'%H:%M:%S')] ${YELLOW}ℹ️  INFO:${NC} $1"
}

# Health check function
check_health() {
    log_info "Checking backend health..."
    if curl -s "${API_BASE_URL/\/api/}/health" > /dev/null 2>&1; then
        log_success "Backend is healthy and ready"
    else
        log_error "Backend health check failed - make sure the server is running"
        echo -e "\n${YELLOW}To start the backend:${NC}"
        echo "yarn docker:dev"
        exit 1
    fi
}

# API call function
api_call() {
    local method="$1"
    local endpoint="$2"
    local data="$3"
    local description="$4"
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$API_BASE_URL$endpoint")
    else
        response=$(curl -s "$API_BASE_URL$endpoint")
    fi
    
    # Check if response contains error
    if echo "$response" | grep -q '"success":false'; then
        error_msg=$(echo "$response" | grep -o '"error":"[^"]*"' | cut -d'"' -f4)
        log_error "$description failed: $error_msg"
        return 1
    fi
    
    echo "$response"
}

# Pipeline functions
crawl_instagram() {
    log_step 1 "Crawling Instagram posts..."
    
    local data="{\"instagramUsername\":\"$USERNAME\"}"
    local response
    
    if response=$(api_call "POST" "/crawl" "$data" "Crawl"); then
        local crawled_count=$(echo "$response" | grep -o '"crawledCount":[0-9]*' | cut -d':' -f2)
        log_success "Crawled $crawled_count posts for @$USERNAME"
        echo "$response"
    else
        return 1
    fi
}

analyze_posts() {
    log_step 2 "Analyzing posts with AI..."
    
    local data="{\"instagramUsername\":\"$USERNAME\"}"
    local response
    
    if response=$(api_call "POST" "/analyze" "$data" "Analysis"); then
        local analyzed_count=$(echo "$response" | grep -o '"analyzedCount":[0-9]*' | cut -d':' -f2)
        log_success "Analyzed $analyzed_count posts"
        echo "$response"
    else
        return 1
    fi
}

generate_templates() {
    log_step 3 "Generating personalized templates..."
    
    local data="{\"instagramUsername\":\"$USERNAME\",\"accountTheme\":\"$ACCOUNT_THEME\"}"
    local response
    
    if response=$(api_call "POST" "/generate-templates" "$data" "Template generation"); then
        # Count templates (simplified - count occurrences of "title")
        local template_count=$(echo "$response" | grep -o '"title"' | wc -l | tr -d ' ')
        log_success "Generated $template_count personalized templates"
        echo "$response"
    else
        return 1
    fi
}

# Main pipeline function
run_pipeline() {
    echo -e "\n${BLUE}🚀 Buffer LLM Template Pipeline Starting...${NC}\n"
    echo -e "${YELLOW}Target Account:${NC} @$USERNAME"
    echo -e "${YELLOW}Account Theme:${NC} $ACCOUNT_THEME"
    echo -e "${YELLOW}API Base URL:${NC} $API_BASE_URL\n"
    
    local start_time=$(date +%s)
    
    # Step 1: Crawl Instagram posts
    if ! crawl_result=$(crawl_instagram); then
        exit 1
    fi
    sleep 1
    
    # Step 2: Analyze posts
    if ! analyze_result=$(analyze_posts); then
        exit 1
    fi
    sleep 1
    
    # Step 3: Generate templates
    if ! template_result=$(generate_templates); then
        exit 1
    fi
    
    # Final summary
    local end_time=$(date +%s)
    local total_time=$((end_time - start_time))
    
    echo -e "\n${GREEN}🎉 Pipeline completed successfully in ${total_time}s!${NC}"
    
    local crawled_count=$(echo "$crawl_result" | grep -o '"crawledCount":[0-9]*' | cut -d':' -f2)
    local analyzed_count=$(echo "$analyze_result" | grep -o '"analyzedCount":[0-9]*' | cut -d':' -f2)
    local template_count=$(echo "$template_result" | grep -o '"title"' | wc -l | tr -d ' ')
    
    echo -e "\n${YELLOW}Summary:${NC}"
    echo -e "  • ${CYAN}Posts crawled:${NC} $crawled_count"
    echo -e "  • ${CYAN}Posts analyzed:${NC} $analyzed_count" 
    echo -e "  • ${CYAN}Templates generated:${NC} $template_count"
    
    echo -e "\n${YELLOW}Next Steps:${NC}"
    echo "  • Visit the Templates page to view your personalized templates"
    echo "  • Use the \"Use Template\" feature to generate content"
    echo "  • Re-run this script anytime to refresh your templates"
}

# Script entry point
main() {
    # Check if curl is available
    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed"
        exit 1
    fi
    
    # Perform health check first
    check_health
    
    # Run the pipeline
    run_pipeline
}

# Handle script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
