async function loadInputAsString(path: string) {
    const response = Bun.file(path);

    return await response.text();
}

export default loadInputAsString;
