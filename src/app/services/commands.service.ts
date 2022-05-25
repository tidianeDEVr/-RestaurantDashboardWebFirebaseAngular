import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Command } from '../models/command';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private afs:AngularFirestore) { }
  getCommands(){
    return this.afs.collection('/commands').snapshotChanges();
  }
  createCommand(command:Command){
    command.id = this.afs.createId()
    return this.afs.collection('/commands').add(command)
  }

  deletecommand(command:Command){
    return this.afs.doc('/commands/'+command.id).delete();
  }

  updatecommand(command:Command){
    this.deletecommand(command);
    return this.createCommand(command)
  }
}
