export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NewDiary = Omit<Diary, 'id'>;
