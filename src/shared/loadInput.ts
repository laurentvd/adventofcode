async function loadInput(path: string) {
    const response = await fetch(path);

    return (await response.text()).split("\n");
}

export default loadInput;