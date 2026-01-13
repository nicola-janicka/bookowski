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
  score: number = 0;
  description: string = '';
  readStart?: Date;
  readOn?: Date;
  read: ReadStatus = ReadStatus.New;
  pages: number = 0;

  constructor(title: string) {
    this.title = title;
  }
}
