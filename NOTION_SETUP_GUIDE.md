# Notion + Google Drive + Make.com Integration Setup Guide

This guide will help you set up the complete automation workflow for your beat store.

## Overview

The integration workflow:
1. **Google Drive** → Beats uploaded to a specific folder
2. **Make.com** → Detects new files and extracts metadata
3. **Notion** → Stores beat data in a database
4. **Website** → Fetches beats from Notion API
5. **Purchase** → Triggers Make.com to send beat files to customers

---

## Part 1: Notion Database Setup

### Step 1: Create Notion Database

1. Go to [Notion](https://notion.so) and create a new page
2. Add a **Database - Full Page**
3. Name it "Beats Database"

### Step 2: Configure Database Properties

Add the following properties to your database:

| Property Name | Type | Description |
|--------------|------|-------------|
| **Title** | Title | Beat name (e.g., "Midnight Drive") |
| **Artist** | Text | Producer name (default: "One time") |
| **Price** | Number | Beat price in dollars |
| **Image** | Files & Media | Beat cover art image |
| **BPM** | Number | Beats per minute |
| **Key** | Select | Musical key (C, D, E, F, G, A, B + minor/major) |
| **Genres** | Multi-select | Genre tags (Hip Hop, Trap, R&B, etc.) |
| **Tags** | Multi-select | Descriptive tags (dark, melodic, hard, etc.) |
| **TypeBeat** | Select | Type beat artist (Drake, Kanye West, etc.) |
| **Moods** | Multi-select | Mood tags (aggressive, chill, emotional, etc.) |
| **IsFree** | Checkbox | Whether beat is free |
| **AudioURL** | URL | Link to audio preview file |
| **DriveFileId** | Text | Google Drive file ID for full beat |
| **Created** | Created time | Auto-populated creation date |

### Step 3: Get Notion API Key

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click **+ New integration**
3. Name it "Beat Store Integration"
4. Select your workspace
5. Copy the **Internal Integration Token** (starts with `secret_`)
6. Click **Submit**

### Step 4: Share Database with Integration

1. Open your Beats Database in Notion
2. Click **Share** in the top right
3. Click **Invite**
4. Search for your integration name ("Beat Store Integration")
5. Click **Invite**

### Step 5: Get Database ID

1. Open your Beats Database
2. Copy the URL from your browser
3. The database ID is the string between the workspace name and the `?v=`
   - Example: `https://notion.so/workspace/DATABASE_ID?v=...`
4. Copy this DATABASE_ID

---

## Part 2: Google Drive Setup

### Step 1: Create Beats Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder called "Beats - One time"
3. Right-click the folder → **Share** → **Get link**
4. Set to "Anyone with the link can view"
5. Copy the folder ID from the URL

### Step 2: Organize Beat Files

Structure your beats folder like this:
\`\`\`
Beats - One time/
├── Midnight Drive.mp3
├── West Coast Vibes.wav
├── Trap Anthem.mp3
└── ...
\`\`\`

**File Naming Convention:**
- Use descriptive names
- Include BPM if desired: "Midnight Drive - 140 BPM.mp3"
- Supported formats: MP3, WAV

---

## Part 3: Make.com Automation Setup

### Scenario 1: Google Drive → Notion (New Beat Upload)

1. Go to [Make.com](https://make.com) and create a new scenario
2. Add **Google Drive - Watch Files** module
   - Connect your Google Drive account
   - Select your "Beats - One time" folder
   - Set to watch for new files

3. Add **HTTP - Make a Request** module (for audio metadata extraction)
   - URL: Use a service like [AudioTag.info API] or custom script
   - Method: GET
   - Purpose: Extract BPM, key, duration from audio file

4. Add **Notion - Create a Database Item** module
   - Connect your Notion account
   - Select your "Beats Database"
   - Map fields:
     - Title: File name (without extension)
     - AudioURL: Google Drive shareable link
     - DriveFileId: File ID from Google Drive
     - BPM: From audio metadata (or manual input)
     - Price: Default value (e.g., 30)
     - Artist: "One time"
     - IsFree: false
     - Image: Upload default cover or extract from metadata

5. **Save and activate** the scenario

### Scenario 2: Purchase → Email Delivery

1. Create a new scenario in Make.com
2. Add **Webhooks - Custom Webhook** module
   - Copy the webhook URL (you'll need this for environment variables)

3. Add **Notion - Search Objects** module
   - Database: Beats Database
   - Filter: DriveFileId equals beatId from webhook

4. Add **Google Drive - Download a File** module
   - File ID: DriveFileId from Notion

5. Add **Email - Send an Email** module
   - To: customerEmail from webhook
   - Subject: "Your Beat Purchase - {{beatTitle}}"
   - Attachments: Downloaded beat file from Google Drive
   - Body: Include license information and download link

6. **Save and activate** the scenario
7. **Copy the webhook URL** for your environment variables

---

## Part 4: Website Environment Variables

Add these environment variables to your Vercel project:

\`\`\`env
# Notion Integration
NOTION_API_KEY=secret_your_notion_integration_token
NOTION_BEATS_DATABASE_ID=your_database_id_here

# Make.com Webhook
MAKE_WEBHOOK_URL=https://hook.us1.make.com/your_webhook_url
\`\`\`

### How to Add Environment Variables in Vercel:

1. Go to your project in [Vercel Dashboard](https://vercel.com)
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Key: `NOTION_API_KEY`
   - Value: Your Notion integration token
   - Environment: Production, Preview, Development
4. Click **Save**
5. Repeat for `NOTION_BEATS_DATABASE_ID` and `MAKE_WEBHOOK_URL`
6. **Redeploy** your project for changes to take effect

---

## Part 5: Testing the Integration

### Test 1: Upload a Beat

1. Upload a beat file to your Google Drive folder
2. Wait 1-2 minutes for Make.com to process
3. Check your Notion database - new entry should appear
4. Check your website /beats page - beat should be visible

### Test 2: Purchase Flow

1. Go to your website and click Buy on a beat
2. Select a license and complete checkout
3. Check Make.com execution history
4. Verify email was sent with beat file

---

## Part 6: Notion Database Template

Here's a sample entry to get you started:

| Field | Example Value |
|-------|---------------|
| Title | Midnight Drive |
| Artist | One time |
| Price | 30 |
| BPM | 140 |
| Key | C Minor |
| Genres | R&B, Trap |
| Tags | dark, melodic, emotional |
| TypeBeat | Drake |
| Moods | Emotional, Dark |
| IsFree | ☐ |
| AudioURL | https://drive.google.com/file/d/... |
| DriveFileId | 1abc123def456... |

---

## Troubleshooting

### Beats not showing on website
- Check Notion API key is correct
- Verify database is shared with integration
- Check browser console for API errors

### Make.com not triggering
- Verify Google Drive folder permissions
- Check Make.com scenario is active
- Review execution history for errors

### Purchase emails not sending
- Verify Make.com webhook URL is correct
- Check webhook scenario is active
- Test webhook manually in Make.com

---

## Next Steps

1. **Populate Initial Beats**: Add 10-20 beats manually to Notion to start
2. **Customize Email Template**: Design professional email for beat delivery
3. **Add License PDFs**: Create license agreement PDFs for each tier
4. **Set Up Analytics**: Track which beats sell best
5. **Marketing**: Use Type Beat SEO to drive traffic

---

## Support

For issues with:
- **Notion**: [Notion Help Center](https://notion.so/help)
- **Make.com**: [Make.com Support](https://make.com/help)
- **Google Drive**: [Google Drive Help](https://support.google.com/drive)
