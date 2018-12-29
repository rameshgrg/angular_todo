import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// export interface Item { name: string; }

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Todo App';

  todos: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.todos = db.collection('tasks').valueChanges();
  }
  
  todo = {
      "key" : 0,
      "description" : "",
      "done" : 0,
      "name" : ""
  };

  todos = [
      {
        "key" : 1,
    		"description" : "description1",
    		"done" : 0,
    		"name" : "n1"
    	},
      {
        "key" : 2,
    		"description" : "description2",
    		"done" : 1,
    		"name" : "n2"
    	},
      {
        "key" : 3,
        "description" : "description3",
        "done" : 0,
        "name" : "n3"
      }

    ];

  	todo_save(){
      if(this.todo.key){
        console.log('update')
        //this.todos.
      }else{
        this.todos.push(this.todo);
        console.log('add');      
      }
      // reset todo
      this._reset_todo();
  	}

  	todo_edit(todo){
      this.todo = todo;
  	}

  	todo_done(todo){
      this.todo = todo;
      this.todo.done = 1;
      console.log('done: ', this.todo);
      // reset todo
      this._reset_todo();
  	}

  	todo_delete(todo_key){
      this.todos = this._find(todo_key);
      // reset todo
      this._reset_todo();
  	}

    _find(todo_key){
      return this.todos.filter(function(currentValue){
        return currentValue.key != todo_key;
      },todo_key); 
    }

    _reset_todo(){
      this.todo = {
          "key" : 0,
          "description" : "",
          "done" : 0,
          "name" : ""
      };
    }

  }
