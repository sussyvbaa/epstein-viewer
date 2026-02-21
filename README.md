# Epstein Files Viewer

A web-based viewer for the DOJ Epstein Files Disclosure, released starting December 19, 2025, pursuant to the **Epstein Files Transparency Act (H.R. 4405)**.

## Overview

This viewer provides organized access to all **12 official DOJ disclosure datasets** containing **2.7 million+ pages** and **1.38 million PDF documents** (194.5 GB total) related to the Jeffrey Epstein investigation. View PDFs and documents directly in your browser.

**Last Updated:** February 2026 (includes January 30, 2026 release of 3.5 million pages)

## Features

- **Embedded Document Viewer**: View PDFs, images, and documents directly in your browser
- **Full Text Search**: Search across all 2.7M+ pages for names, dates, locations, and keywords via Internet Archive or Google
- **Dataset Browser**: Browse all 12 DOJ disclosure datasets with file counts, sizes, and document ID ranges
- **Document ID Lookup**: Search for any EFTA document ID to find which dataset contains it
- **Navigation Controls**: Use arrow keys or buttons to navigate between documents
- **Quick Search Buttons**: One-click searches for popular queries (Flight Logs, FBI, Palm Beach, etc.)
- **Searchable Resources**: Links to Internet Archive, DocumentCloud, and FBI Vault for full-text searching
- **Filter & Search**: Filter by dataset or search across all content
- **Quick Access Links**: Direct links to official DOJ pages and additional resources
- **Document Categories**: Overview of document types including court records, photos, flight logs, videos, and transcripts
- **Responsive Design**: Works on desktop and mobile devices

## Datasets

| Dataset | Files | Size | EFTA Range | Description |
|---------|-------|------|------------|-------------|
| Dataset 1 | 3,158 | 1.23 GB | 00000001 - 00003158 | FBI interviews, Palm Beach police reports |
| Dataset 2 | 699 | 629 MB | 00003159 - 00003857 | Photos of Epstein travels, prominent figures |
| Dataset 3 | 1,729 | 598 MB | 00003858 - 00005586 | Photo inventories from CDs, DVDs, scrapbooks |
| Dataset 4 | 2,616 | 356 MB | 00005705 - 00008320 | Call logs, phone records, police files |
| Dataset 5 | 120 | 61 MB | 00008409 - 00008528 | Images of hard drives, evidence boxes |
| Dataset 6 | 470 | ~200 MB | 00008529 - 00008998 | Additional FBI materials |
| Dataset 7 | 649 | ~250 MB | 00009016 - 00009664 | Additional documentation |
| Dataset 8 | 29,348 | ~5 GB | 00009676 - 00039023 | Court records, emails, videos |
| Dataset 9 | 1,223,757 | 103.6 GB | 00039025 - 01262781 | Email evidence, 2008 NPA correspondence |
| Dataset 10 | 942,873 | 78.6 GB | 01262782 - 02205654 | 180K images, 2K videos from properties |
| Dataset 11 | 524,610 | 25.6 GB | 02205655 - 02730264 | Flight manifests, financial records |
| Dataset 12 | 1,519 | ~150 MB | 02730265 - 02731783 | Late productions, supplemental items |

**Note:** There are gaps between some datasets (e.g., 5587-5704, 8321-8408). Files in gap ranges may exist in adjacent datasets.

**Dataset 9** is the largest release, containing email correspondence including internal DOJ communications about the controversial 2008 non-prosecution agreement.

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
1. Use the "Full Text Search" section to search across all 2.7M+ pages
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

- [DOJ Epstein Library](https://www.justice.gov/epstein) - Official DOJ homepage (194.5 GB, 12 datasets)
- [DOJ Disclosures](https://www.justice.gov/epstein/doj-disclosures) - All disclosure categories
- [House Oversight Committee](https://oversight.house.gov/release/oversight-committee-releases-epstein-records-provided-by-the-department-of-justice/) - Estate documents
- [FBI Vault](https://vault.fbi.gov/jeffrey-epstein) - FBI records
- [Internet Archive](https://archive.org/details/combined-all-epstein-files) - Complete searchable archive
- [Epstein Research Data](https://github.com/rhowardstone/Epstein-research-data) - Forensic analysis, EFTA mapping
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
