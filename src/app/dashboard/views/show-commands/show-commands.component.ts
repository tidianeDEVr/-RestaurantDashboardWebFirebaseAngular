import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Command } from 'src/app/models/command';
import { CommandsService } from 'src/app/services/commands.service';

@Component({
  selector: 'app-show-commands',
  templateUrl: './show-commands.component.html',
  styleUrls: ['./show-commands.component.css']
})
export class ShowCommandsComponent implements OnInit {
  commands :Command[]=[]
  constructor(
    private comServ:CommandsService,
    private toast:HotToastService
    ){}
  ngOnInit(): void {
    this.getCommands();
  }
  getCommands(){
    this.comServ.getCommands().subscribe(result => {
      this.commands = result.map((e : any) => {
        const command = e.payload.doc.data();
        command.id = e.payload.doc.id;
        return command
      })
    })
  }

  markAsPayedCom(command:Command){
    command.payed = true;
    this.comServ.updatecommand(command);
    this.toast.success('L\'etat de la commande a ete change !');
  }
  markAsReadyCom(command:Command){
    command.ready = true;
    this.comServ.updatecommand(command);
    this.toast.success('L\'etat de la commande a ete change !');
  }
  cancelCom(command:Command){
    this.comServ.deletecommand(command);
    this.toast.success('La commande a ete annuler !');
  }
}
  
