import { LightningElement, track } from 'lwc';


export default class ToDoList extends LightningElement {

   TodoId = 2;
   @track todos = [
    { id: 1, taskDetails: 'Write Story' },
    { id: 2, taskDetails: 'Build Framework' }
];

    @track taskDetails;

    handlechange(event){
        this.taskDetails = event.target.value;
        //console.log('New Task:' + this.taskDetails);
    }

    addClick() {

            this.TodoId = this.TodoId + 1;
              this.todos = [
                  ...this.todos,
                  {
                      id: this.TodoId,
                      taskDetails: this.taskDetails,
                  }
              ];
          }
        
       



}