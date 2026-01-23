import { makeAutoObservable } from 'mobx';

export class AddAccountViewModel {
  name = '';
  isCredit = false;
  amount = '';
  currency = 'USD';
  creditLimit = '';
  paymentDate: string | null = null;
  remindText = "Don't remind";
  iconText = 'Choose an icon';
  accountTypeText = 'Master Card';
  categoryText = 'My Accounts';
  color = '#B0005B';
  notes = '';
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setName = (v: string) => (this.name = v);
  setIsCredit = (v: boolean) => (this.isCredit = v);
  setAmount = (v: string) => (this.amount = v);
  setCreditLimit = (v: string) => (this.creditLimit = v);
  setNotes = (v: string) => (this.notes = v);

  openCurrencyPicker = () => {
    // TODO: Implement currency picker
  };
  openPaymentDatePicker = () => {
    // TODO: Implement date picker
  };
  openRemindPicker = () => {
    // TODO: Implement remind picker
  };
  openIconPicker = () => {
    // TODO: Implement icon picker
  };
  openAccountTypePicker = () => {
    // TODO: Implement account type picker
  };
  openCategoryPicker = () => {
    // TODO: Implement category picker
  };
  openColorPicker = () => {
    // TODO: Implement color picker
  };

  addAccount = async () => {
    this.loading = true;
    // TODO: Implement add account logic
    setTimeout(() => {
      this.loading = false;
      // TODO: Navigate back or show success
    }, 1000);
  };
}
