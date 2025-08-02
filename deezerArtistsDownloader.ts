async function fetchJSON<T>(url: string): Promise<T> {
	console.log(`fetch: ${url}`);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Erreur lors de la récupération de ${url}`);
	return res.json();
}

async function getArtistsByGenre(allArtistNames: Set<string>) {
	const genresUrl = 'https://api.deezer.com/genre';
	const genresData = await fetchJSON<{ data: { id: number; name: string }[] }>(genresUrl);
	for (const genre of genresData.data) {
		console.log(`Genre: ${genre.name} (${genre.id})`);
		// L'API retourne parfois un genre "Podcasts" sans artistes
		if (genre.id === 0) continue;
		const artistsUrl = `https://api.deezer.com/genre/${genre.id}/artists`;
		try {
			const artistsData = await fetchJSON<{ data: { name: string }[] }>(artistsUrl);
			if (!artistsData.data.length) continue;
			artistsData.data.forEach((a) => allArtistNames.add(a.name.toUpperCase()));
		} catch (e) {
			console.error(e);
		}
	}
}

async function getArtistsFromChart(allArtistNames: Set<string>) {
	const chartLimit = 100;
	const chartTotal = 300; // only 300 artists available in the chart
	for (let index = 0; index < chartTotal; index += chartLimit) {
		const chartUrl = `https://api.deezer.com/chart/0/artists?limit=${chartLimit}&index=${index}`;
		try {
			const chartData = await fetchJSON<{ data: { name: string }[] }>(chartUrl);
			chartData.data.forEach((a) => allArtistNames.add(a.name.toUpperCase()));
		} catch (e) {
			console.error(`Erreur lors de la récupération du top artistes Deezer (index ${index})`, e);
		}
	}
}

async function addArtistsFromPlaylist(
	userId: number,
	allArtistNames: Set<string>
) {
const playlistTotal = 10000;
const playlistLimit = 100;
for (let index = 0; index < playlistTotal; index += playlistLimit) {
	const userPlaylistsUrl = `https://api.deezer.com/user/${userId}/playlists?limit=${playlistLimit}&index=${index}`;
	try {
		const userPlaylistsData = await fetchJSON<{ data: { id: number; title: string }[] }>(
			userPlaylistsUrl
		);
		if (!userPlaylistsData.data || !userPlaylistsData.data.length) break;
		for (const playlist of userPlaylistsData.data) {
			const tracksLimit = 100;
			const tracksTotal = 1000;
			for (let trackIndex = 0; trackIndex < tracksTotal; trackIndex += tracksLimit) {
				const playlistTracksUrl = `https://api.deezer.com/playlist/${playlist.id}/tracks?limit=${tracksLimit}&index=${trackIndex}`;
				try {
					const tracksData = await fetchJSON<{ data: { artist: { name: string } }[] }>(
						playlistTracksUrl
					);
					if (!tracksData.data || !tracksData.data.length) break;
					tracksData.data.forEach((track) => {
						if (track.artist && track.artist.name) {
							allArtistNames.add(track.artist.name.toUpperCase());
						}
					});
					if (tracksData.data.length < tracksLimit) break;
				} catch (e) {
					console.error(
						`Erreur lors de la récupération des morceaux de la playlist utilisateur ${playlist.id} (index ${trackIndex})`,
						e
					);
					break;
				}
			}
		}
	} catch (e) {
		console.error(
			`Erreur lors de la récupération des playlists utilisateur Deezer (index ${index})`,
			e
		);
		break;
	}
}
}

async function getArtistsFromPlaylists(allArtistNames: Set<string>) {
	const playlistLimit = 100;
	const playlistTotal = 10000;
	for (let index = 0; index < playlistTotal; index += playlistLimit) {
		const playlistsUrl = `https://api.deezer.com/chart/0/playlists?limit=${playlistLimit}&index=${index}`;
		try {
			const playlistsData = await fetchJSON<{ data: { id: number; title: string }[] }>(
				playlistsUrl
			);
			if (!playlistsData.data || !playlistsData.data.length) break;
			for (const playlist of playlistsData.data) {
				const tracksLimit = 100;
				const tracksTotal = 1000;
				for (let trackIndex = 0; trackIndex < tracksTotal; trackIndex += tracksLimit) {
					const playlistTracksUrl = `https://api.deezer.com/playlist/${playlist.id}/tracks?limit=${tracksLimit}&index=${trackIndex}`;
					try {
						const tracksData = await fetchJSON<{ data: { artist: { name: string } }[] }>(
							playlistTracksUrl
						);
						if (!tracksData.data || !tracksData.data.length) break;
						tracksData.data.forEach((track) => {
							if (track.artist && track.artist.name) {
								allArtistNames.add(track.artist.name.toUpperCase());
							}
						});
						// Si moins de tracks que la limite, on a atteint la fin
						if (tracksData.data.length < tracksLimit) break;
					} catch (e) {
						console.error(
							`Erreur lors de la récupération des morceaux de la playlist ${playlist.id} (index ${trackIndex})`,
							e
						);
						break;
					}
				}
			}
		} catch (e) {
			console.error(`Erreur lors de la récupération des playlists Deezer (index ${index})`, e);
		}
	}

}

export async function downloadAllDeezerArtists() {
	const allArtistNames: Set<string> = new Set();
	await getArtistsByGenre(allArtistNames);
	await getArtistsFromChart(allArtistNames);
	await getArtistsFromPlaylists(allArtistNames);

	// section 26
	await addArtistsFromPlaylist( 2146582862, allArtistNames);
	//fnac
	await addArtistsFromPlaylist( 218713165, allArtistNames);
	await addArtistsFromPlaylist( 17513185, allArtistNames);
	await addArtistsFromPlaylist( 489155361, allArtistNames);
	await addArtistsFromPlaylist( 19654354, allArtistNames);
	await addArtistsFromPlaylist( 5283688544, allArtistNames);

	const artistsArray = Array.from(allArtistNames).toSorted((a, b) => a.localeCompare(b));
	const fs = await import('fs/promises');
	await fs.writeFile('static/artists.txt', artistsArray.join('\n') || '(aucun artiste)', 'utf-8');
	console.log(`Fichier deezer_artists.txt écrit avec ${artistsArray.length} artistes.`);
}

// Pour exécuter directement ce script :
downloadAllDeezerArtists().catch(console.error);
