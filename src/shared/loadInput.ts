async function loadInput(path: string) {
    const response = Bun.file(path);

    return (await response.text()).split('\n');
}

export default loadInput;
