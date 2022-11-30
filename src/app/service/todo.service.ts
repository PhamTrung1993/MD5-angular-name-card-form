import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Todo} from "../todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly API_URL = 'http://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {
  }

  getTodos(count = 10): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      map(data => data.filter((todo, i) => i < count))
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.API_URL}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<any>{
    return this.http.delete(`${this.API_URL}/${id}`)
  }

  // Partial là built-in class của TypeScript, cho
  // phép convert tất cả các property của
  // class/interface về optional
  createTodo(todo: Partial<Todo>){
    return this.http.post<Todo>(this.API_URL,todo);
  }
}
