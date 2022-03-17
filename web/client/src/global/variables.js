var url = "http://localhost:8080";

const setGlobalUrl = (newUrl) => {
    url = newUrl;
}

export { url, setGlobalUrl };