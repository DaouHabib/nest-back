import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Sondagedto } from './dto/createSondagedto';
import { Sondage } from './interfaces/Sondage.interface';

@Injectable()
export class SondageService {
    private readonly sondages: Sondagedto[];

    constructor(@InjectModel('Sondage') private  sondageModel: Model<Sondage>,
    private userService : UsersService) {
      
    } 
    async insertSondage(sondagedto: Sondagedto) {
      
        let result:any;
        let date = Date.now();
        const oui =0;
        const non =0;
        const voted = false;
        let s: [any];
        const { question,userId } = sondagedto;
        const  newSondage=new this.sondageModel ({question,voted,oui,non,date,userId});
         result =  newSondage.save();
        if (result){
          return result;
        }else return "Error"
    }



    async getSondages() {
        const Sondages = await this.sondageModel.find().exec();
        return Sondages.map(Sondage => ({
          id: Sondage.id,
          question:Sondage.question,
          voted:Sondage.voted,
         oui:Sondage.oui,
         non:Sondage.non,
         userId:Sondage.userId
        }));
      }
     
      
      private async findSondage(SondageId: string): Promise<Sondage> {
        let Sondage;
        try {
          Sondage = await this.sondageModel.findById(SondageId).exec();
        } catch (error) {
          throw new NotFoundException('Could not find Sondage.');
        }
        if (!Sondage) {
          throw new NotFoundException('Could not find Sondage.');
        }
        return Sondage;
      }

      async totalevoteBysondage(SondageId: string) {
        const Sondage = await this.findSondage(SondageId);
        return Sondage.oui+Sondage.non;
      }
      async getSondagebyID(SondageId: string) {
        const Sondage = await this.findSondage(SondageId);
        return {
            id: Sondage.id,
          question:Sondage.question,
          voted:Sondage.voted,
         oui:Sondage.oui,
         non:Sondage.non
        };
      }
      async updatequestionSondage(
        id: string,
        question: string,
      ) {
        const updatedSondage = await this.findSondage(id);
        updatedSondage.question=question;
        updatedSondage.save();
        return updatedSondage;
      }
      async setvoteNullSondage(
        id: string,
      ) {
        const updatedSondage = await this.findSondage(id);
        updatedSondage.oui=0;
        updatedSondage.non=0;
        updatedSondage.voted=false;
        updatedSondage.save();
        return updatedSondage;
      }

      async updateSondage(
        id: string,
        oui: number,
         non: number,
         userId:string
      ) {
        const updatedSondage = await this.findSondage(id);
       let vote = true;
    updatedSondage.usersVoted.forEach(res=>{
      if(res==userId){
        vote=false;
      }

    })
        if(vote){
       if (oui){
        updatedSondage.oui =updatedSondage.oui+1 ;
        updatedSondage.voted = true;
        updatedSondage.usersVoted.push(userId);
       }
       if (non){
        updatedSondage.non = updatedSondage.non+1;
        updatedSondage.voted = true;
        updatedSondage.usersVoted.push(userId);
       }  
        updatedSondage.save();
        return updatedSondage;
      }
      else{
        return false;
      }
      }
      
    
      async deleteSondage(Id: string) {
        const result = await this.sondageModel.deleteOne({_id: Id}).exec();
        if (result.n === 0) {
          throw new NotFoundException('Could not find Sondage.');
        }
      }



}
