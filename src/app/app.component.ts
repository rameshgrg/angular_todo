import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo { name: string; description: string; done: boolean; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo App';

  private collection: AngularFirestoreCollection<Todo[]>;
  todos: Observable<Todo[]>;

  private doc: AngularFirestoreDocument<Todo>;
  todo: Observable<Todo>;

  todo = {
    'id': '',
    'name' : '',
    'description' : '',
    'done' : 0
  };
  
  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection('tasks');

    this.todos = this.collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          //Get document data
          const data = a.payload.doc.data() as Todo[];
          //Get document id
          data.id = a.payload.doc.id;
          return data;
        });
      }));

    /*
    // crud
    console.log('crud');

    // create
    // Persist a document id
    const id = this.afs.createId();
    console.log('id', id);
    const todo: Todo = { 'name': 'name_tes', 'description': 'description_tes', 'done': 0 };
    this.collection.doc(id).set(todo);

    // read
    // all
    // this.todos = this.collection.valueChanges();
    this.todos = this.collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          //Get document data
          const data = a.payload.doc.data() as Todo[];
          //Get document id
          data.id = a.payload.doc.id;
          return data;
        });
      }));

    // one
    this.doc = afs.doc<Todo>('tasks/O9KqBizzju6nq7gtjYDD');
    this.doc.ref.get().then(doc => {
      if (doc.exists) {
        const data = doc.data() as Todo;
        this.todo = data;
        this.todo.name = "new name";

        // update
        this.doc.update(this.todo);
        console.log(this.todo);

        // delete
        //this.doc.delete(this.todo);
      }
    });

    // update
    // this.doc.update(this.todo);

    // delete
    // this.doc.delete(this.todo);
  */

  }

  on_save(todo) {
    console.log('on_save', todo);
    if(todo.id){
      console.log('update')
      this.doc = this.afs.doc<Todo>('tasks/'+this.todo.id);
      this.doc.update(this.todo);
    }else{
      console.log('create')
      const id = this.afs.createId();
      this.collection.doc(id).set(todo);
    }
    // reset todo
    this._reset_todo();
  }

  on_edit(id: String, todo) {
    console.log('on_edit', id);
    this.todo = todo;
  }

  on_done(id: String, todo) {
    console.log('on_done', id);
    todo.done = 1;
    this.doc = this.afs.doc<Todo>('tasks/'+id);
    this.doc.update(todo);
  }

  on_delete(id: String) {
      console.log('on_delete', id);
      this.doc = this.afs.doc<Todo>('tasks/'+id);
      this.doc.delete(this.todo);
  }

  _reset_todo(){
    this.todo = {
        "id" : 0,
        "name" : "",
        "description" : "",
        "done" : 0,
    };
  }

}
