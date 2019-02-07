export class Book {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public year: number,
        public publisher: string,
        public pages: number,
        public copies: number ) { }
}