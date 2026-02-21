// Epstein Files Viewer - JavaScript Application
// Updated: February 2026 - All 12 datasets with exact EFTA ranges

// DOJ Base URL for files
const DOJ_BASE_URL = 'https://www.justice.gov/epstein/files';

// Dataset ranges for document ID lookup (exact ranges from forensic analysis)
// Source: https://github.com/rhowardstone/Epstein-research-data
// Total: 194.5 GB, 1,380,937 PDFs, 2,731,785 pages, 3.5 million responsive pages
const DATASETS = [
    {
        id: 1,
        name: 'Dataset 1',
        startId: 1,
        endId: 3158,
        files: 3158,
        size: '1.23 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-1-files',
        folder: 'DataSet 1',
        description: 'FBI interview summaries and Palm Beach police reports (2005-2008)'
    },
    {
        id: 2,
        name: 'Dataset 2',
        startId: 3159,
        endId: 3857,
        files: 699,
        size: '629 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-2-files',
        folder: 'DataSet 2',
        description: 'Photos of Epstein travels and prominent figures'
    },
    {
        id: 3,
        name: 'Dataset 3',
        startId: 3858,
        endId: 5586,
        files: 1729,
        size: '598 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-3-files',
        folder: 'DataSet 3',
        description: 'Photo inventories from CDs, DVDs, and scrapbooks'
    },
    {
        id: 4,
        name: 'Dataset 4',
        startId: 5705,
        endId: 8320,
        files: 2616,
        size: '356 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-4-files',
        folder: 'DataSet 4',
        description: 'Call logs, phone records, handwritten notes, police files'
    },
    {
        id: 5,
        name: 'Dataset 5',
        startId: 8409,
        endId: 8528,
        files: 120,
        size: '61 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-5-files',
        folder: 'DataSet 5',
        description: 'Images of hard drives, folders, and boxes from investigators'
    },
    {
        id: 6,
        name: 'Dataset 6',
        startId: 8529,
        endId: 8998,
        files: 470,
        size: '~200 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-6-files',
        folder: 'DataSet 6',
        description: 'Rolling release - additional FBI materials'
    },
    {
        id: 7,
        name: 'Dataset 7',
        startId: 9016,
        endId: 9664,
        files: 649,
        size: '~250 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-7-files',
        folder: 'DataSet 7',
        description: 'Rolling release - additional documentation'
    },
    {
        id: 8,
        name: 'Dataset 8',
        startId: 9676,
        endId: 39023,
        files: 29348,
        size: '~5 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-8-files',
        folder: 'DataSet 8',
        description: 'Court records, emails, videos, FBI/DOJ documents'
    },
    {
        id: 9,
        name: 'Dataset 9',
        startId: 39025,
        endId: 1262781,
        files: 1223757,
        size: '103.6 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-9-files',
        folder: 'DataSet 9',
        description: 'Email evidence, DOJ correspondence on 2008 non-prosecution agreement'
    },
    {
        id: 10,
        name: 'Dataset 10',
        startId: 1262782,
        endId: 2205654,
        files: 942873,
        size: '78.6 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-10-files',
        folder: 'DataSet 10',
        description: '180,000+ images and 2,000+ videos from Epstein properties'
    },
    {
        id: 11,
        name: 'Dataset 11',
        startId: 2205655,
        endId: 2730264,
        files: 524610,
        size: '25.6 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-11-files',
        folder: 'DataSet 11',
        description: 'Financial ledgers, flight manifests, property seizure records'
    },
    {
        id: 12,
        name: 'Dataset 12',
        startId: 2730265,
        endId: 2731783,
        files: 1519,
        size: '~150 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-12-files',
        folder: 'DataSet 12',
        description: 'Late productions and supplemental items'
    }
];

// Gap ranges where files exist in adjacent datasets
const GAP_RANGES = [
    { start: 5587, end: 5704, tryDatasets: [3, 4] },
    { start: 8321, end: 8408, tryDatasets: [4, 5] },
    { start: 8999, end: 9015, tryDatasets: [6, 7] },
    { start: 9665, end: 9675, tryDatasets: [7, 8] }
];

// Current document being viewed
let currentDocId = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const datasetsGrid = document.getElementById('datasetsGrid');
const datasetCards = document.querySelectorAll('.dataset-card');
const docIdInput = document.getElementById('docIdInput');
const lookupBtn = document.getElementById('lookupBtn');
const lookupResult = document.getElementById('lookupResult');

// Document Viewer Elements
const viewDocInput = document.getElementById('viewDocInput');
const viewDocBtn = document.getElementById('viewDocBtn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const datasetViewBtns = document.querySelectorAll('.dataset-view-btn');

// Viewer Modal Elements
const viewerModal = document.getElementById('viewerModal');
const viewerFrame = document.getElementById('viewerFrame');
const viewerDocId = document.getElementById('viewerDocId');
const viewerDataset = document.getElementById('viewerDataset');
const viewerLoading = document.getElementById('viewerLoading');
const viewerError = document.getElementById('viewerError');
const viewerErrorLink = document.getElementById('viewerErrorLink');
const openExternalBtn = document.getElementById('openExternalBtn');
const closeViewerBtn = document.getElementById('closeViewerBtn');
const prevDocBtn = document.getElementById('prevDocBtn');
const nextDocBtn = document.getElementById('nextDocBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initFilterTabs();
    initSearch();
    initLookup();
    initDocumentViewer();
});

// Filter Tabs functionality
function initFilterTabs() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter datasets
            const filter = tab.dataset.filter;
            filterDatasets(filter);
        });
    });
}

function filterDatasets(filter) {
    datasetCards.forEach(card => {
        if (filter === 'all') {
            card.classList.remove('hidden');
        } else {
            const datasetId = card.dataset.dataset;
            if (datasetId === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// Search functionality
function initSearch() {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        // Reset all cards to visible
        filterTabs[0].click();
        return;
    }

    // Check if it's a document ID
    const docId = parseDocumentId(query);
    if (docId !== null) {
        // Find which dataset contains this document
        const dataset = findDatasetForDocument(docId);
        if (dataset) {
            // Highlight the relevant dataset
            filterTabs.forEach(t => t.classList.remove('active'));
            filterTabs[dataset.id].classList.add('active');
            filterDatasets(dataset.id.toString());

            // Show the lookup result
            showLookupResult(docId, dataset);
            return;
        }
    }

    // General text search across dataset descriptions and tags
    datasetCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Update filter tabs to show 'All' is no longer active
    filterTabs.forEach(t => t.classList.remove('active'));
}

// Document ID Lookup functionality
function initLookup() {
    lookupBtn.addEventListener('click', performLookup);
    docIdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performLookup();
        }
    });
}

function performLookup() {
    const input = docIdInput.value.trim();

    if (!input) {
        lookupResult.classList.add('hidden');
        return;
    }

    const docId = parseDocumentId(input);

    if (docId === null) {
        lookupResult.classList.remove('hidden');
        lookupResult.classList.remove('success');
        lookupResult.classList.add('error');
        lookupResult.innerHTML = `Invalid document ID format. Please enter a number or EFTA format (e.g., EFTA00001234 or 1234).`;
        return;
    }

    const dataset = findDatasetForDocument(docId);

    if (dataset) {
        showLookupResult(docId, dataset);
    } else {
        lookupResult.classList.remove('hidden');
        lookupResult.classList.remove('success');
        lookupResult.classList.add('error');

        // Check if it's in a gap between datasets
        const gapInfo = GAP_RANGES.find(g => docId >= g.start && docId <= g.end);
        if (gapInfo) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} is in a gap range. Try checking Datasets ${gapInfo.tryDatasets.join(' or ')} - <a href="#" onclick="openDocumentViewer(${docId}); return false;">Try viewing anyway</a>`;
        } else if (docId > 2731783) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} exceeds the maximum document ID (EFTA02731783) in the released files.`;
        } else {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} was not found in any dataset.`;
        }
    }
}

function parseDocumentId(input) {
    // Handle EFTA format
    const eftaMatch = input.match(/efta0*(\d+)/i);
    if (eftaMatch) {
        return parseInt(eftaMatch[1], 10);
    }

    // Handle plain number
    const numMatch = input.match(/^\d+$/);
    if (numMatch) {
        return parseInt(input, 10);
    }

    return null;
}

function findDatasetForDocument(docId) {
    // First check standard dataset ranges
    for (const dataset of DATASETS) {
        if (docId >= dataset.startId && docId <= dataset.endId) {
            return dataset;
        }
    }

    // Check gap ranges - files may exist in adjacent datasets
    for (const gap of GAP_RANGES) {
        if (docId >= gap.start && docId <= gap.end) {
            // Return the first adjacent dataset to try
            return DATASETS.find(d => d.id === gap.tryDatasets[0]);
        }
    }

    return null;
}

function showLookupResult(docId, dataset) {
    const formattedId = `EFTA${String(docId).padStart(8, '0')}`;

    lookupResult.classList.remove('hidden');
    lookupResult.classList.remove('error');
    lookupResult.classList.add('success');
    lookupResult.innerHTML = `
        <strong>${formattedId}</strong> is located in <strong>${dataset.name}</strong><br>
        Range: EFTA${String(dataset.startId).padStart(8, '0')} - EFTA${String(dataset.endId).padStart(8, '0')} (${dataset.files} files, ${dataset.size})<br>
        <a href="${dataset.url}" target="_blank" rel="noopener">View ${dataset.name} on DOJ Website →</a>
        <span style="margin-left: 1rem;">|</span>
        <a href="#" onclick="openDocumentViewer(${docId}); return false;" style="margin-left: 1rem;">View Document Directly →</a>
    `;

    // Scroll result into view
    lookupResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Document Viewer functionality
function initDocumentViewer() {
    // View document button
    viewDocBtn.addEventListener('click', () => {
        const input = viewDocInput.value.trim();
        const docId = parseDocumentId(input);
        if (docId !== null) {
            openDocumentViewer(docId);
        }
    });

    viewDocInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const input = viewDocInput.value.trim();
            const docId = parseDocumentId(input);
            if (docId !== null) {
                openDocumentViewer(docId);
            }
        }
    });

    // Quick view buttons
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const docId = parseInt(btn.dataset.id, 10);
            openDocumentViewer(docId);
        });
    });

    // Dataset browse buttons
    datasetViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const startId = parseInt(btn.dataset.start, 10);
            openDocumentViewer(startId);
        });
    });

    // Viewer controls
    closeViewerBtn.addEventListener('click', closeDocumentViewer);
    prevDocBtn.addEventListener('click', () => navigateDocument(-1));
    nextDocBtn.addEventListener('click', () => navigateDocument(1));

    // Handle iframe load events
    viewerFrame.addEventListener('load', () => {
        viewerLoading.classList.add('hidden');
    });

    viewerFrame.addEventListener('error', () => {
        showViewerError();
    });
}

// Supported file extensions (order matters - most common first)
const FILE_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'wav', 'xlsx', 'docx', 'txt'];

// Current extension being tried
let currentExtensionIndex = 0;

function getDocumentUrl(docId, extension = 'pdf') {
    const formattedId = `EFTA${String(docId).padStart(8, '0')}`;
    const dataset = findDatasetForDocument(docId);

    if (!dataset) {
        return null;
    }

    // Construct the URL based on the DOJ file structure
    // URL pattern: https://www.justice.gov/epstein/files/DataSet%20X/EFTA00000000.pdf
    const folderEncoded = encodeURIComponent(dataset.folder);
    return `${DOJ_BASE_URL}/${folderEncoded}/${formattedId}.${extension}`;
}

function getDatasetPageUrl(docId) {
    const dataset = findDatasetForDocument(docId);
    if (!dataset) return null;
    return dataset.url;
}

function openDocumentViewer(docId, extensionIndex = 0) {
    currentDocId = docId;
    currentExtensionIndex = extensionIndex;
    const formattedId = `EFTA${String(docId).padStart(8, '0')}`;
    const dataset = findDatasetForDocument(docId);
    const extension = FILE_EXTENSIONS[extensionIndex] || 'pdf';
    const docUrl = getDocumentUrl(docId, extension);

    if (!docUrl || !dataset) {
        alert(`Document ${formattedId} was not found in any dataset.`);
        return;
    }

    // Update viewer UI
    viewerDocId.textContent = formattedId;
    viewerDataset.textContent = dataset.name;
    openExternalBtn.href = docUrl;
    viewerErrorLink.href = dataset.url; // Link to dataset page instead of direct file

    // Show modal and loading state
    viewerModal.classList.remove('hidden');
    viewerLoading.classList.remove('hidden');
    viewerError.classList.add('hidden');
    document.body.style.overflow = 'hidden';

    // Load the document in iframe
    viewerFrame.src = docUrl;

    // Set a timeout to try next extension if loading fails
    setTimeout(() => {
        if (!viewerLoading.classList.contains('hidden')) {
            // Still loading after 8 seconds, might be blocked or wrong extension
            tryNextExtension();
        }
    }, 8000);
}

function tryNextExtension() {
    if (currentDocId === null) return;

    currentExtensionIndex++;
    if (currentExtensionIndex < FILE_EXTENSIONS.length) {
        const extension = FILE_EXTENSIONS[currentExtensionIndex];
        const docUrl = getDocumentUrl(currentDocId, extension);

        if (docUrl) {
            viewerFrame.src = docUrl;
            openExternalBtn.href = docUrl;

            // Try again with timeout
            setTimeout(() => {
                if (!viewerLoading.classList.contains('hidden')) {
                    tryNextExtension();
                }
            }, 3000);
        }
    } else {
        // All extensions tried, show error
        showViewerError();
    }
}

function closeDocumentViewer() {
    viewerModal.classList.add('hidden');
    viewerFrame.src = 'about:blank';
    document.body.style.overflow = '';
    currentDocId = null;
}

function navigateDocument(direction) {
    if (currentDocId === null) return;

    let newDocId = currentDocId + direction;
    const dataset = findDatasetForDocument(newDocId);

    // If we're moving to a gap, skip to the next valid document
    if (!dataset) {
        // Find the next valid dataset
        if (direction > 0) {
            // Moving forward
            for (const ds of DATASETS) {
                if (ds.startId > currentDocId) {
                    newDocId = ds.startId;
                    break;
                }
            }
        } else {
            // Moving backward
            for (let i = DATASETS.length - 1; i >= 0; i--) {
                if (DATASETS[i].endId < currentDocId) {
                    newDocId = DATASETS[i].endId;
                    break;
                }
            }
        }
    }

    // Validate the new document ID is within bounds
    const newDataset = findDatasetForDocument(newDocId);
    if (newDataset) {
        openDocumentViewer(newDocId);
    }
}

function showViewerError() {
    viewerLoading.classList.add('hidden');
    viewerError.classList.remove('hidden');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Viewer keyboard controls
    if (!viewerModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeDocumentViewer();
        } else if (e.key === 'ArrowLeft') {
            navigateDocument(-1);
        } else if (e.key === 'ArrowRight') {
            navigateDocument(1);
        }
        return;
    }

    // Focus search on '/' key
    if (e.key === '/' && document.activeElement !== searchInput &&
        document.activeElement !== docIdInput && document.activeElement !== viewDocInput) {
        e.preventDefault();
        searchInput.focus();
    }

    // Clear search on Escape
    if (e.key === 'Escape') {
        if (document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
            filterTabs[0].click();
        } else if (document.activeElement === docIdInput) {
            docIdInput.value = '';
            docIdInput.blur();
            lookupResult.classList.add('hidden');
        } else if (document.activeElement === viewDocInput) {
            viewDocInput.value = '';
            viewDocInput.blur();
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Make openDocumentViewer globally accessible for inline onclick handlers
window.openDocumentViewer = openDocumentViewer;

// Full Text Search Functionality
const fulltextSearchInput = document.getElementById('fulltextSearchInput');
const fulltextSearchBtn = document.getElementById('fulltextSearchBtn');
const quickSearchBtns = document.querySelectorAll('.quick-search-btn');
const viewerSearchInput = document.getElementById('viewerSearchInput');

// Search URLs
const SEARCH_URLS = {
    archive: (query) => `https://archive.org/search?query=${encodeURIComponent(query + ' epstein files')}&and[]=mediatype%3A%22texts%22`,
    google: (query) => `https://www.google.com/search?q=site%3Ajustice.gov%2Fepstein+${encodeURIComponent(query)}`
};

function getSelectedSearchSource() {
    const selected = document.querySelector('input[name="searchSource"]:checked');
    return selected ? selected.value : 'archive';
}

function performFulltextSearch(query) {
    if (!query || !query.trim()) return;

    const source = getSelectedSearchSource();
    const searchUrl = SEARCH_URLS[source](query.trim());
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
}

// Full-text search button click
if (fulltextSearchBtn) {
    fulltextSearchBtn.addEventListener('click', () => {
        performFulltextSearch(fulltextSearchInput.value);
    });
}

// Full-text search input enter key
if (fulltextSearchInput) {
    fulltextSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performFulltextSearch(fulltextSearchInput.value);
        }
    });
}

// Quick search buttons
quickSearchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        if (query) {
            fulltextSearchInput.value = query;
            performFulltextSearch(query);
        }
    });
});

// Viewer search - show tip about using Ctrl+F
if (viewerSearchInput) {
    viewerSearchInput.addEventListener('focus', () => {
        // Show tip that browser's Ctrl+F works for PDF search
        viewerSearchInput.placeholder = 'Use Ctrl+F or Cmd+F for PDF search';
    });

    viewerSearchInput.addEventListener('blur', () => {
        viewerSearchInput.placeholder = 'Search in document... (Ctrl+F)';
    });

    viewerSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Alert user to use browser's find feature
            alert('Tip: Use your browser\'s Find feature (Ctrl+F or Cmd+F) to search within the PDF document.\n\nFor searching across ALL documents, close this viewer and use the Full Text Search section on the main page.');
        }
    });
}

// Console info
console.log(`
╔══════════════════════════════════════════════════════════════╗
║           EPSTEIN FILES VIEWER - DOJ DISCLOSURE              ║
╠══════════════════════════════════════════════════════════════╣
║  This viewer provides access to DOJ disclosure datasets      ║
║  released December 19, 2025 under H.R. 4405                  ║
║                                                              ║
║  Total Documents: 15,500+                                    ║
║  Datasets: 8                                                 ║
║  Document ID Range: EFTA00000001 - EFTA00020700              ║
║                                                              ║
║  Keyboard Shortcuts:                                         ║
║  - '/' : Focus search                                        ║
║  - 'Escape' : Close viewer / Clear search                    ║
║  - '←' / '→' : Navigate documents (in viewer)                ║
╚══════════════════════════════════════════════════════════════╝
`);
