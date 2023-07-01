import {LightningElement} from 'lwc';

export default class myAccountLook extends LightningElement {

    selectedAccount;

    handleAccountSelection(event){
        this.selectedAccount = event.target.value;
        alert("The selected Accout id is"+this.selectedAccount);
    }
}