export interface StatusData {
    online: boolean;
    type: string | null;
}

export interface MusicData {
    name: string | null;
    artist: string | null;
    playing: boolean | null;
    url: string | null;
    albumArtUrl: string | null;
    position: number | null;
    duration: number | null;
}