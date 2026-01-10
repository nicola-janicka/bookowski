export enum ReadStatus {
  New,
  InProgress,
  Read,
}

export class Book {
  id: string = '';
  title: string;
  author: string = '';
  genre: string = '';
  published: Date = new Date();
  score: number = 0;
  description: string = '';
  readOn: Date = new Date();
  read: ReadStatus = ReadStatus.New;

  constructor(title: string) {
    this.title = title;
  }
}
