import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import conObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conEmail from '@salesforce/schema/Contact.Email';
import conAccount from '@salesforce/schema/Contact.AccountId';
import conPhone from '@salesforce/schema/Contact.Phone';
import conAge from '@salesforce/schema/Contact.Age__c';
import conSpend from '@salesforce/schema/Contact.Spend__c';
import conRecordType from '@salesforce/schema/Contact.RecordTypeId'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ContactForm extends NavigationMixin(LightningElement){
    firstName = '';
    lastName = '';
    emailId='';
    phone='';
    selectedAccount;
    age = 'Select Age Range';
    spend ='';

    get options() {
        return [
            { label: '10 - 20', value: '10 - 20' },
            { label: '20 - 30', value: '20 - 30' },
            { label: '30 - 40', value: '30 - 40' },
            { label: '40 - 50', value: '40 - 50' },
            { label: '50 - 60', value: '50 - 60' },
            { label: '60+', value: '60+' },
        ];
    }

    contactChangeVal(event) {
        console.log("event target label " + event.target.label);
        console.log("event target value " + event.target.value);
        console.log("event target field name " + event.target.field-name);
        console.log("event target ===== " + event.target)
        if(event.target.label=='First Name'){
            this.firstName = event.target.value;
        }
        if(event.target.label=='Last Name'){
            this.lastName = event.target.value;
        }
        if(event.target.label=='Email'){
            this.emailId = event.target.value;
        }
        if(event.target.label=='Phone'){
            this.phone = event.target.value;
        }
       /* if(event.target.label == "Account Name"){
            this.selectedRecordId = event.target.value;
            var name = e.target.getAttribute('name'); 
            console.log("Account Name", this.selectedRecordId);
            console.log("Account event " + event.target.value);
        }*/
        
       // alert("The selected Accout id is"+this.selectedAccount);

        if(event.target.label=='Age'){
            this.age = event.target.value;
        }
        if(event.target.label=='Spend $$$'){
            this.spend = event.target.value;
        }
        
    }

    handleAccountSelection(event){
        this.selectedAccount = event.target.value;
        //alert("The selected Accout id is"+this.selectedAccount);
    }

    insertContactAction(){
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conPhone.fieldApiName] = this.phone;
       //fields[conAccount.fieldApiName] = '0011I000019UFHuQAO';
        fields[conAccount.fieldApiName] = this.selectedAccount;
        fields[conRecordType.fieldApiName] = '0128W000000euCZ'
        fields[conAge.fieldApiName] = this.age;
        fields[conSpend.fieldApiName] = this.spend;
        const recordInput = { apiName: conObject.objectApiName, fields };
        createRecord(recordInput)
            .then(contactobj=> {
                this.contactId = contactobj.id;
               this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    })  
                )
                
                ;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });

             
    }

    navigateToContactPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
 }
}