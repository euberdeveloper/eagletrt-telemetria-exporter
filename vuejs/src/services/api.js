import axios from 'axios';
import options from '@/config';

function getHostname () {
    const url = new URL(window.location.href);
    const hostname = url.searchParams.get('hostname');
    const host = url.searchParams.get('host') || options.host;
    const port = url.searchParams.get('port') || options.port;
    return hostname || `${host}:${port}`;
}

const HOSTNAME = getHostname();
const PROTOCOL = options.protocol;

export async function getDatabaseSchema () {
    const response = await axios.get(`${PROTOCOL}://${HOSTNAME}/api/database-schema`);
    return response.data;
}

export async function exportJson (selectedItems) {
    const body = { collectionsToExport: selectedItems };
    const response = await axios.post(`${PROTOCOL}://${HOSTNAME}/api/export/json`, body, { responseType: 'blob' });
    return response.data;
}

export async function exportCsv (selectedItems) {
    const body = { collectionsToExport: selectedItems };
    const response = await axios.post(`${PROTOCOL}://${HOSTNAME}/api/export/csv`, body, { responseType: 'blob' });
    return response.data;
}
