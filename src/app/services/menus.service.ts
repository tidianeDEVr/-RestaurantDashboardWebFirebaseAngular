import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage'
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  url:string = ''
  constructor(private afs:AngularFirestore, private storage: Storage) { }

  getMenus(){
    return this.afs.collection('/menus').snapshotChanges();
  }
  
  createMenus(menu:Menu, image?:File){
    if(image) {
      const imageRef = ref(this.storage, 'menus/' + image.name)
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on('state_changed',
      (snapshot)=>{},
      (error) => {
        console.log(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          menu.image = downloadURL
          menu.id = this.afs.createId()
          this.afs.collection('/menus').add(menu)     
        })
      })
    }
  }

  deleteMenus(menu:Menu){
    return this.afs.doc('/menus/'+menu.id).delete();
  }

  updateMenus(menu:Menu){
    this.deleteMenus(menu);
    return this.createMenus(menu)
  }
}
