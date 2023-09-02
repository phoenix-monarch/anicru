export default async function fetchHomeData() {
    const resp = await fetch("http://localhost:5500/anime/home");
    const data = await resp.json();
    return data;
}

export async function latestEpisodeAnimes() {
    const data = await fetchHomeData();
    return data.latestEpisodeAnimes;
}

export async function spotlightAnimes() {
    const data = await fetchHomeData();
    return data.spotlightAnimes;
}

export async function trendingAnimes() {
    const data = await fetchHomeData();
    return data.trendingAnimes;
}

export async function topUpcomingAnimes() {
    const data = await fetchHomeData();
    return data.topUpcomingAnimes;
}

export async function top10Animes() {
    const data = await fetchHomeData();
    return data.top10Animes;
}

export async function topAiringAnimes() {
    const data = await fetchHomeData();
    return data.topAiringAnimes;
}
