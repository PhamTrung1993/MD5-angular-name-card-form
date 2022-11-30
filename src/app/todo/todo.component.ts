import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../todo';
import {TodoService} from "../service/todo.service";

let _id = 1;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];
  content = new FormControl();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(next => {
      this.todos = next;
    }, error => {
      console.log(error)
    }, () => {
      console.log('complete');
    })
  }

  toggleTodo(i: any) {
    const todo = this.todos[i];
    const todoData = {
      ...todo,
      complete: !todo.complete
    };
    this.todoService.updateTodo(todoData).subscribe(next => {
      this.todos[i].complete = !this.todos[i].complete;
    })
  }

  change() {
    const value = this.content.value;
    if (value) {
      // @ts-ignore
      const todo: Todo = {
        id: _id++,
        title: value,
        complete: false
      };
      this.todos.push(todo);
      this.content.reset();
    }
  }
  addTodo() {

    const todo: Partial<Todo> = {
      // @ts-ignore
      title: this.inputControl.value,
      complete: false
    };
    this.todoService.createTodo(todo).subscribe(next => {
      this.todos.unshift(next);
      this.content.setValue('');
    });
  }

  deleteTodo(i:any) {
    const todo = this.todos[i];
    // @ts-ignore
    this.todoService.deleteTodo(todo.id).subscribe(() =>{
      this.todos = this.todos.filter(t => t.id!== todo.id
      );
    });
  }
}
