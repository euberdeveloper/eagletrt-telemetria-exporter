export function downloadFile (data) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'zip.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
