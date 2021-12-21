import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update((list) => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        finished: false,
        ...rest,
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update((list) => {
      return list.filter((x) => x.bookId !== id);
    });
  }

  async markAsFinished(id: string): Promise<void> {
    this.storage.update((list) => {
      return list.map((book) => {
        if (book.bookId === id) {
          return {
            ...book,
            finished: true,
            finishedDate: new Date().toISOString(),
          };
        }
        return book;
      });
    });
  }
}
