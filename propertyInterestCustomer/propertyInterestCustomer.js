import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import conObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conEmail from '@salesforce/schema/Contact.Email';
import conAccount from '@salesforce/schema/Contact.AccountId';
import conPhone from '@salesforce/schema/Contact.Phone';
import conSqft from '@salesforce/schema/Contact.Interest_SqFT__c';
import conSpend from '@salesforce/schema/Contact.Spend__c';
import conState from '@salesforce/schema/Contact.MailingState';
import conRecordType from '@salesforce/schema/Contact.RecordTypeId'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class PropertyInterestCustomer extends NavigationMixin(LightningElement){
    firstName = '';
    lastName = '';
    emailId='';
    phone='';
    selectedAccount;
    sqft = 'Select Interest Range';
    spend ='';

    get options() {
        return [
            { label: '500 - 1000', value: '500 - 1000' },
            { label: '1000 - 2000', value: '1000 - 2000' },
            { label: '2000 - 3000', value: '2000 - 3000' },
            { label: '3000 - 4000', value: '3000 - 4000' },
            { label: '4000+', value: '4000+' },
        ];
    }

    get radiooptions() {
        return [
            { label: 'Texas', value: 'Texas' },
            { label: 'New York', value: 'New York' },
            { label: 'North Carolina', value: 'North Carolina' },
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

        if(event.target.label=='SqFT'){
            this.sqft = event.target.value;
        }
        if(event.target.label=='How much would you like to spend Monthly?'){
            this.spend = event.target.value;
        }
        if(event.target.label=='State'){
            this.state = event.target.value;
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
        fields[conRecordType.fieldApiName] = '0128W000000Bw8zQAC'
        fields[conSqft.fieldApiName] = this.sqft;
        fields[conSpend.fieldApiName] = this.spend;
        fields[conState.fieldApiName] = this.state;
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