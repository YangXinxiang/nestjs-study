export interface ITeacher {
    id: string | number;
    name: string;
    birthYear: number;
    age: number;
    pageURL: string;
    isDetermined: boolean;
    updateTime ?: string;
    infoFrom ?: string;
    status?: number;
}