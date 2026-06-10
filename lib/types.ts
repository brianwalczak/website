export interface StatusData {
    header: string;
    label: string;
    color: string;
    pulse?: boolean;
    updatedAt?: string;
}

export interface DeviceStatus {
    priority: number;
    status: StatusData | Record<string, never>; // StatusData or empty {} if no status
}

export interface StatusStore {
    [deviceId: string]: DeviceStatus;
}

export const DEFAULT_STATUS: StatusData = {
    header: "Offline",
    label: "I'm currently away from my computer, probably sleeping or just chilling.",
    color: "gray",
    pulse: false
};

export interface MusicData {
    name: string | null;
    artist: string | null;
    playing: boolean | null;
    url: string | null;
    albumArtUrl: string | null;
    position: number | null;
    duration: number | null;
}