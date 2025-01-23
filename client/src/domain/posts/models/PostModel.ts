export class PostModel {
  constructor(
      readonly id: string,
      readonly caption: string,
      readonly permalink: string,
      readonly date: string,
      readonly likes: number,
      readonly comments: number,
      readonly userId: string,
  ) {}
}
