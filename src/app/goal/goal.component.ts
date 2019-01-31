import { Component, OnInit } from '@angular/core';
import {Goals} from '../goals';
import {Goal} from '../goal';
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {HttpClient} from '@angular/common/http';
import {Quote} from '../quote-class/quote';
import {QuoteRequestService} from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  providers:[GoalService,QuoteRequestService],
  styleUrls: ['./goal.component.css']
})

  export class GoalComponent implements OnInit {

     goals:Goal[];
     alertService:AlertsService;
     quote:Quote;

   constructor(goalService:GoalService,alertService:AlertsService,private http:HttpClient,private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;//make the service available to the class
   }
   
   toogleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
    
    deleteGoal(isComplete,index){
      if (isComplete){
          let toDelete=confirm(`Are you sure you want to delete ${this.goals[index].name}`)
          
          if(toDelete){
              this.goals.splice(index,1)
              this.alertService.alertMe("Goal has been deleted")
          }
        }
      }

      ngOnInit() {
        this.quoteService.quoteRequest()
        this.quote=this.quoteService.quote
      }
    
    }
    
    