// Epstein Files Viewer - JavaScript Application

// Dataset ranges for document ID lookup
const DATASETS = [
    {
        id: 1,
        name: 'Dataset 1',
        startId: 1,
        endId: 3158,
        files: 3142,
        size: '1.26 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-1-files'
    },
    {
        id: 2,
        name: 'Dataset 2',
        startId: 3159,
        endId: 3857,
        files: 574,
        size: '629 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-2-files'
    },
    {
        id: 3,
        name: 'Dataset 3',
        startId: 3858,
        endId: 5586,
        files: 67,
        size: '598 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-3-files'
    },
    {
        id: 4,
        name: 'Dataset 4',
        startId: 5705,
        endId: 8320,
        files: 152,
        size: '356 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-4-files'
    },
    {
        id: 5,
        name: 'Dataset 5',
        startId: 8409,
        endId: 8528,
        files: 120,
        size: '61 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-5-files'
    }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const datasetsGrid = document.getElementById('datasetsGrid');
const datasetCards = document.querySelectorAll('.dataset-card');
const docIdInput = document.getElementById('docIdInput');
const lookupBtn = document.getElementById('lookupBtn');
const lookupResult = document.getElementById('lookupResult');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initFilterTabs();
    initSearch();
    initLookup();
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
        if (docId > 5586 && docId < 5705) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} is in a gap between Dataset 3 and Dataset 4. This document ID may not exist in the released files.`;
        } else if (docId > 8320 && docId < 8409) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} is in a gap between Dataset 4 and Dataset 5. This document ID may not exist in the released files.`;
        } else if (docId > 8528) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} exceeds the maximum document ID (8528) in the released files.`;
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
    for (const dataset of DATASETS) {
        if (docId >= dataset.startId && docId <= dataset.endId) {
            return dataset;
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
    `;

    // Scroll result into view
    lookupResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Focus search on '/' key
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== docIdInput) {
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

// Console info
console.log(`
╔══════════════════════════════════════════════════════════════╗
║           EPSTEIN FILES VIEWER - DOJ DISCLOSURE              ║
╠══════════════════════════════════════════════════════════════╣
║  This viewer provides access to DOJ disclosure datasets      ║
║  released December 19, 2025 under H.R. 4405                  ║
║                                                              ║
║  Total Documents: 4,055+                                     ║
║  Datasets: 5                                                 ║
║  Document ID Range: EFTA00000001 - EFTA00008528              ║
║                                                              ║
║  Press '/' to focus search                                   ║
║  Press 'Escape' to clear search                              ║
╚══════════════════════════════════════════════════════════════╝
`);
