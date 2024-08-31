import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BillsService } from 'src/app/services/bills.service';
import { GetBills } from 'src/app/types';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss', '../util.scss'],
})
export class BillsPage implements OnInit {

  id: string = '';
  customerId: string = '';
  bill = {};
  bills: GetBills[] = [];
  form: FormGroup = new FormGroup({});
  useForm = false;
  status = [
    { label: 'Aberto', value: 'open' },
    { label: 'Pago', value: 'paid' }
  ]

  constructor(
    private readonly activate: ActivatedRoute,
    private readonly alertService: AlertService,
    private readonly billService: BillsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.setup();
  }

  ngOnInit() {
    const { id, customerId } = this.activate.snapshot.params;
    this.customerId = customerId;
    this.id = id;
    this.populateBill();
  }

  private populateBill() {
    if (this.id) {
      this.useForm = true;
      this.bills = [];

      if (!/new/.test(this.id)) {
        this.getBill(this.id);
      }
    }
    else if (this.customerId) {
      this.getBills();
    }
  }

  ionViewWillEnter() {
    this.populateBill();
  }

  goBack() {
    history.back();
  }

  cancel() {
    this.form.reset();
    this.goBack();
  }

  setup() {
    this.form = this.formBuilder.group({
      description: [ '', [Validators.required]],
      dueDate: [ '', [Validators.required]],
      value: [ '', [Validators.required]],
      status: [ 'open', []],
    });
  }

  async getBill(id: string) {
    this.bills = [];

    const loading = await this.alertService.loading();

    this.billService.find(id, { customerId: this.customerId }).subscribe({
      next: (res: any) => {
        this.bill = res;

        const date = new Date(res.dueDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const dueDate = `${year}-${month}-${day}`;

        this.form.patchValue({
          description: res.description,
          dueDate,
          value: res.value,
          status: res.status,
        });
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar cliente');
        loading.dismiss();
      }
    });
    
    
  }
  async getBills() {
    const loading = await this.alertService.loading();
    // this.customerId
    this.billService.getBills(this.customerId).subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.bills = res;
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar clientes');
        loading.dismiss();
      }
    });    
  }
  async createBill(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();

    this.billService.store(this.form.value, { customerId: this.customerId }).subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.alertService.toast('Cobrança criada com sucesso');
        this.router.navigateByUrl(`/bills/${this.customerId}`);
      },
      error: (err) => {
        this.alertService.toast('Erro ao criar cobrança');
        loading.dismiss();
      }
    });
  }
  async editBill(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();
  
    this.billService.update(id, this.form.value, { customerId: this.customerId }).subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.alertService.toast('Cobrança editada com sucesso');
        this.router.navigateByUrl(`/bills/${this.customerId}`);
      },
      error: (err) => {
        this.alertService.toast(`Erro ao editar cobrança\n${err.error}`);
        loading.dismiss();
      }
    });
  }
  async deleteBill(id: string) {
    this.alertService.confirm('Tem certeza que deseja excluir esse cliente e todas as suas faturas ?', async () => {
      await this.delete(id);
    });
  }
  async delete(id: string) {
    const loading = await this.alertService.loading();

    this.billService.remove(id, { customerId: this.customerId }).subscribe(
      (res) => {
        this.alertService.toast('Cobrança excluido com sucesso');
        loading.dismiss();
        this.getBills();
      },
      (err) => {
        loading.dismiss();
        this.alertService.toast('Erro ao excluir cliente');
      }
    );
  }

  async submit() {
    if(!/new/.test(this.id)) {
      this.editBill(this.id);
    }
    else {
      this.createBill(this.id);
    }
  }

  async goToBill(billId: string) {
    this.router.navigate(['bills', this.customerId, billId]);  
  }
  

}
