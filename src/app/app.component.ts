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

  constructor(private afs: AngularFirestore) {
    this.collection = afs.collection<Todo[]>('tasks');

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
  }



}
