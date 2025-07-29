# Project Canary Emissions - Take-Home Assignment UI

## Notes

I created this project using NextJs. Given more time, I would add more error handling and make it work with dark mode properly in the browser. For now, it at least fits the brief. I would also make the chart responsively change size with browser resizing.

## Setup

1. Create a .env.local file in the main folder. Its contents should point to the dotnet default port. Mine is set up for 5134 so the file would contain a single line "NEXT_PUBLIC_API_URL=http://localhost:5134".

2. run "npm install"

3. run "npm run dev". I have only tested this in dev mode because this is a take home assignment.

4. Navigate in a browser to http://localhost:3000. The graph should populate with data assuming that the dotnet backend is set up correctly and data has been loaded.