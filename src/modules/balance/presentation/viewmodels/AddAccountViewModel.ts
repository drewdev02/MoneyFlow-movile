import { makeAutoObservable } from 'mobx';
import { AddAccountUseCase } from '../../domain/usecases/AddAccountUseCase';
import { LoggerFactory } from '@/core/logger';

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
    private readonly logger = LoggerFactory.createLogger(AddAccountViewModel.name)

    constructor(
        private readonly addAccountUseCase: AddAccountUseCase
    ) {
        makeAutoObservable(this);
    }

    setName(v: string): void {
        this.name = v
    };
    setIsCredit(v: boolean): void {
        this.isCredit = v
    }
    setAmount(v: string): void {
        this.amount = v
    }
    setCreditLimit(v: string): void {
        this.creditLimit = v
    }
    setNotes(v: string): void {
        this.notes = v
    }

    openCurrencyPicker() {
        // TODO: Implement currency picker
    };
    openPaymentDatePicker() {
        // TODO: Implement date picker
    };
    openRemindPicker() {
        // TODO: Implement remind picker
    };
    openIconPicker() {
        // TODO: Implement icon picker
    };
    openAccountTypePicker() {
        // TODO: Implement account type picker
    };
    openCategoryPicker() {
        // TODO: Implement category picker
    };
    openColorPicker() {
        // TODO: Implement color picker
    };

    async addAccount(): Promise<void> {
        this.loading = true;
        try {
            await this.addAccountUseCase.execute({
                id: Math.random().toString(36).substring(2, 15),
                name: this.name,
                balance: parseFloat(this.amount) || 0,
                currency: this.currency,
                color: this.color,
                icon: this.iconText,
                type: this.isCredit ? 'card' : 'other',
            })
        } catch (e) {
            this.logger.error('Error adding account', e);
        } finally {
            this.loading = false;
        }
    };
}
