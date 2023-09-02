const Api = async ( link ) => {
    const res = await fetch(link)
    const data = await res.json();
    return data;
}

export default Api;