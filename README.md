# Epstein Files Viewer

A web-based viewer for the DOJ Epstein Files Disclosure released December 19, 2025, pursuant to the **Epstein Files Transparency Act (H.R. 4405)**.

## Overview

This viewer provides organized access to the 8 official DOJ disclosure datasets containing 15,500+ documents related to the Jeffrey Epstein investigation. View PDFs and documents directly in your browser.

## Features

- **Embedded Document Viewer**: View PDFs, images, and documents directly in your browser
- **Full Text Search**: Search across all 15,500+ documents for names, dates, locations, and keywords via Internet Archive or Google
- **Dataset Browser**: Browse all 8 DOJ disclosure datasets with file counts, sizes, and document ID ranges
- **Document ID Lookup**: Search for any EFTA document ID to find which dataset contains it
- **Navigation Controls**: Use arrow keys or buttons to navigate between documents
- **Quick Search Buttons**: One-click searches for popular queries (Flight Logs, FBI, Palm Beach, etc.)
- **Searchable Resources**: Links to Internet Archive, DocumentCloud, and FBI Vault for full-text searching
- **Filter & Search**: Filter by dataset or search across all content
- **Quick Access Links**: Direct links to official DOJ pages and additional resources
- **Document Categories**: Overview of document types including court records, photos, flight logs, videos, and transcripts
- **Responsive Design**: Works on desktop and mobile devices

## Datasets

| Dataset | Files | Size | Document ID Range |
|---------|-------|------|-------------------|
| Dataset 1 | 3,142 | 1.26 GB | EFTA00000001 - EFTA00003158 |
| Dataset 2 | 574 | 629 MB | EFTA00003159 - EFTA00003857 |
| Dataset 3 | 67 | 598 MB | EFTA00003858 - EFTA00005586 |
| Dataset 4 | 152 | 356 MB | EFTA00005705 - EFTA00008320 |
| Dataset 5 | 120 | 61 MB | EFTA00008409 - EFTA00008528 |
| Dataset 6 | ~150 | ~200 MB | EFTA00008529 - EFTA00009200 |
| Dataset 7 | ~200 | ~250 MB | EFTA00009201 - EFTA00009700 |
| Dataset 8 | 11,000+ | ~5 GB | EFTA00009701 - EFTA00020700 |

**Dataset 8** is the largest release to date, containing court records, emails, photos, spreadsheets, audio files, hundreds of video files, FBI documents, and internal DOJ communications.

## Usage

Simply open `index.html` in a web browser. No build process or server required.

### Viewing Documents

1. Enter a document ID in the "View Documents" section (e.g., `EFTA00001234` or just `1234`)
2. Click "View Document" or press Enter
3. The document will load in a full-screen viewer
4. Use arrow keys (← →) or navigation buttons to browse adjacent documents
5. Press Escape or click X to close the viewer

### Searching Documents

**Full Text Search:**
1. Use the "Full Text Search" section to search across all 15,500+ documents
2. Enter your search query (names, dates, locations, keywords)
3. Choose your search source: Internet Archive (recommended) or Google
4. Click "Search Archive" or press Enter
5. Results open in a new tab

**Quick Searches:**
- Click any of the popular search buttons (Flight Logs, FBI, Palm Beach, etc.) for one-click searches
- These pre-fill the search and immediately open results

**In-Document Search:**
- When viewing a PDF, use `Ctrl+F` (or `Cmd+F` on Mac) to search within that specific document

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search input |
| `Escape` | Close viewer / Clear search |
| `←` | Previous document (in viewer) |
| `→` | Next document (in viewer) |
| `Ctrl+F` | Search within current PDF |

## Data Sources

- [DOJ Epstein Library](https://www.justice.gov/epstein) - Official DOJ homepage
- [DOJ Disclosures](https://www.justice.gov/epstein/doj-disclosures) - All disclosure categories
- [House Oversight Committee](https://oversight.house.gov/release/oversight-committee-releases-epstein-records-provided-by-the-department-of-justice/) - 33,000+ pages
- [FBI Vault](https://vault.fbi.gov/jeffrey-epstein) - FBI records
- [Internet Archive](https://archive.org/details/combined-all-epstein-files) - Complete searchable archive
- [H.R. 4405](https://www.congress.gov/bill/119th-congress/house-bill/4405/text) - Epstein Files Transparency Act

## Document Categories

- **Court Records**: Legal filings from 50+ cases
- **Photographs**: Evidence photos from properties and investigations
- **Flight Logs**: Travel records from Virgin Islands to Palm Beach
- **Video Evidence**: Including prison surveillance footage
- **FOIA Releases**: Freedom of Information Act materials
- **Interview Transcripts**: Including Maxwell interview with DAG Todd Blanche

## Technical Notes

- Documents are loaded directly from the official DOJ servers
- Some documents may not load due to DOJ server restrictions on embedded content
- If a document fails to load, use the "Open External" link to view it directly on the DOJ website

## Disclaimer

This is an independent viewer for publicly released DOJ documents. All files are hosted on official government websites. This site is not affiliated with the U.S. Department of Justice.

## License

This viewer is open source. The underlying documents are public records released by the U.S. Department of Justice.
