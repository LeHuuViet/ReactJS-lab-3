export interface IObject {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    date: number;
  }
export  interface IData {
    isLoading: boolean;
    objects: IObject[];
  }