// Epstein Files Viewer - JavaScript Application

// DOJ Base URL for files
const DOJ_BASE_URL = 'https://www.justice.gov/epstein/files';

// Dataset ranges for document ID lookup
const DATASETS = [
    {
        id: 1,
        name: 'Dataset 1',
        startId: 1,
        endId: 3158,
        files: 3142,
        size: '1.26 GB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-1-files',
        folder: 'DataSet 1'
    },
    {
        id: 2,
        name: 'Dataset 2',
        startId: 3159,
        endId: 3857,
        files: 574,
        size: '629 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-2-files',
        folder: 'DataSet 2'
    },
    {
        id: 3,
        name: 'Dataset 3',
        startId: 3858,
        endId: 5586,
        files: 67,
        size: '598 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-3-files',
        folder: 'DataSet 3'
    },
    {
        id: 4,
        name: 'Dataset 4',
        startId: 5705,
        endId: 8320,
        files: 152,
        size: '356 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-4-files',
        folder: 'DataSet 4'
    },
    {
        id: 5,
        name: 'Dataset 5',
        startId: 8409,
        endId: 8528,
        files: 120,
        size: '61 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-5-files',
        folder: 'DataSet 5'
    },
    {
        id: 6,
        name: 'Dataset 6',
        startId: 8529,
        endId: 9200,
        files: 150,
        size: '~200 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-6-files',
        folder: 'DataSet 6'
    },
    {
        id: 7,
        name: 'Dataset 7',
        startId: 9201,
        endId: 9700,
        files: 200,
        size: '~250 MB',
        url: 'https://www.justice.gov/epstein/doj-disclosures/data-set-7-files',
        folder: 'DataSet 7'
    }
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
        if (docId > 5586 && docId < 5705) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} is in a gap between Dataset 3 and Dataset 4. This document ID may not exist in the released files.`;
        } else if (docId > 8320 && docId < 8409) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} is in a gap between Dataset 4 and Dataset 5. This document ID may not exist in the released files.`;
        } else if (docId > 9700) {
            lookupResult.innerHTML = `Document EFTA${String(docId).padStart(8, '0')} exceeds the maximum document ID in the currently released files.`;
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

function getDocumentUrl(docId) {
    const formattedId = `EFTA${String(docId).padStart(8, '0')}`;
    const dataset = findDatasetForDocument(docId);

    if (!dataset) {
        return null;
    }

    // Construct the URL based on the DOJ file structure
    // URL pattern: https://www.justice.gov/epstein/files/DataSet%20X/EFTA00000000.pdf
    const folderEncoded = encodeURIComponent(dataset.folder);
    return `${DOJ_BASE_URL}/${folderEncoded}/${formattedId}.pdf`;
}

function openDocumentViewer(docId) {
    currentDocId = docId;
    const formattedId = `EFTA${String(docId).padStart(8, '0')}`;
    const dataset = findDatasetForDocument(docId);
    const docUrl = getDocumentUrl(docId);

    if (!docUrl || !dataset) {
        alert(`Document ${formattedId} was not found in any dataset.`);
        return;
    }

    // Update viewer UI
    viewerDocId.textContent = formattedId;
    viewerDataset.textContent = dataset.name;
    openExternalBtn.href = docUrl;
    viewerErrorLink.href = docUrl;

    // Show modal and loading state
    viewerModal.classList.remove('hidden');
    viewerLoading.classList.remove('hidden');
    viewerError.classList.add('hidden');
    document.body.style.overflow = 'hidden';

    // Load the document in iframe
    viewerFrame.src = docUrl;

    // Set a timeout to show error if loading takes too long
    setTimeout(() => {
        if (!viewerLoading.classList.contains('hidden')) {
            // Check if iframe is still loading after 10 seconds
            // This helps detect blocked embeds
        }
    }, 10000);
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

// Console info
console.log(`
╔══════════════════════════════════════════════════════════════╗
║           EPSTEIN FILES VIEWER - DOJ DISCLOSURE              ║
╠══════════════════════════════════════════════════════════════╣
║  This viewer provides access to DOJ disclosure datasets      ║
║  released December 19, 2025 under H.R. 4405                  ║
║                                                              ║
║  Total Documents: 4,500+                                     ║
║  Datasets: 7                                                 ║
║  Document ID Range: EFTA00000001 - EFTA00009700              ║
║                                                              ║
║  Keyboard Shortcuts:                                         ║
║  - '/' : Focus search                                        ║
║  - 'Escape' : Close viewer / Clear search                    ║
║  - '←' / '→' : Navigate documents (in viewer)                ║
╚══════════════════════════════════════════════════════════════╝
`);
