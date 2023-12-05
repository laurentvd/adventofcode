async function loadInputAsLines(path: string) {
    const response = Bun.file(path);

    return (await response.text()).split('\n');
}

export default loadInputAsLines;
