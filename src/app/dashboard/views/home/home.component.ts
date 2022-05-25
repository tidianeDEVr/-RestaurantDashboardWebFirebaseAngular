import { Component, OnInit } from '@angular/core';
import { Command } from 'src/app/models/command';
import { CommandsService } from 'src/app/services/commands.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  commands :Command[]=[]
  nbrComValides:number=0;
  nbrComInvalides:number=0;
  recettes:number=0;
  constructor(private comServ:CommandsService,) { }

  ngOnInit(): void {
    this.getCommands();
  }
  getCommands(){
    this.comServ.getCommands().subscribe(result => {
      this.commands = result.map((e : any) => {
        const command = e.payload.doc.data();
        if(command.ready==true) this.nbrComValides++;
        if(command.state==false) this.nbrComInvalides++;
        this.recettes+=command.amount;
        command.id = e.payload.doc.id;
        return command
      })
    })
  }
}
