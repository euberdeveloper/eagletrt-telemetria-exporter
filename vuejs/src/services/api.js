import axios from 'axios';

const HOST = 'localhost:8000';

export async function getDatabaseSchema () {
    const response = await axios.get(`http://${HOST}/api/database-schema`);
    return response.data;
}

export async function exportJson (selectedItems) {
    const body = { collectionsToExport: selectedItems };
    const response = await axios.post(`http://${HOST}/api/export/json`, body, { responseType: 'blob' });
    console.log(response.data);
    return response.data;
}
