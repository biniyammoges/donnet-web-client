export class Paginate<E> {
     data: E[];
     total: number;

     constructor(dt: Paginate<E>) {
          this.data = dt.data
          this.total = dt.total
     }
}