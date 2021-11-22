import { CustomerServiceFirebaseService } from './../../shared/service/customer-service/customer-service-firebase';
import { Technician } from './../../shared/model/technician.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Address } from 'src/app/shared/model/address.model';
import { Client } from 'src/app/shared/model/client.model';
import { CustomerService } from 'src/app/shared/model/customer-service.model';
import { AppState } from 'src/app/state';
import * as fromCustomerService from '../../state/customer-service';

@Component({
  selector: 'app-edit-customer-service',
  templateUrl: './edit-customer-service.component.html',
  styleUrls: ['./edit-customer-service.component.scss'],
})
export class EditCustomerServiceComponent implements OnInit, OnDestroy {
  public formEditCustomerService: FormGroup;
  public subscription: Subscription = new Subscription();
  public selectedCustomerService: CustomerService;
  public totalCustomesServices = 0;
  public clients: Client[] = [
    {
      name: 'José Souza',
      id: '1',
      address: null,
      phone: '',
    },
    {
      name: 'Leticia Vieira',
      id: '2',
      address: null,
      phone: '',
    },
    {
      name: 'João Lima',
      id: '3',
      address: null,
      phone: '',
    },
  ];

  public technicians: Technician[] = [
    {
      name: 'Diego Silva',
      id: '1',
    },
    {
      name: 'Manoel de Lima',
      id: '2',
    },
    {
      name: 'Ricardo Almeida',
      id: '3',
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<EditCustomerServiceComponent>,
    private store$: Store<AppState>,
    private customerService: CustomerServiceFirebaseService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.subscribeToSelectedCustomerService();
    this.subscribeCustomersService();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public subscribeToSelectedCustomerService() {
    this.subscription.add(
      this.store$
        .pipe(
          select(fromCustomerService.selectors.selectSelectedCustomerService)
        )
        .subscribe((state) => {
          this.selectedCustomerService = state;
          if (this.selectedCustomerService) {
            this.updateForm();
          }
        })
    );
  }

  public subscribeCustomersService() {
    this.subscription.add(
      this.store$
        .pipe(select(fromCustomerService.selectors.selectCustomersServices))
        .subscribe((state) => (this.totalCustomesServices = state?.length))
    );
  }

  public createForm() {
    this.formEditCustomerService = new FormGroup({
      clientId: new FormControl(null, [Validators.required]),
      technicianId: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
    });
  }

  public updateForm() {
    this.formEditCustomerService
      .get('clientId')
      .setValue(this.selectedCustomerService?.client?.id);
    this.formEditCustomerService
      .get('technicianId')
      .setValue(this.selectedCustomerService?.technician?.id);

    this.formEditCustomerService
      .get('cep')
      .setValue(this.selectedCustomerService?.address?.cep);
    this.formEditCustomerService
      .get('city')
      .setValue(this.selectedCustomerService.address.city);
    this.formEditCustomerService
      .get('street')
      .setValue(this.selectedCustomerService.address.street);
    this.formEditCustomerService
      .get('number')
      .setValue(this.selectedCustomerService.address.number);
    this.formEditCustomerService
      .get('district')
      .setValue(this.selectedCustomerService.address.district);
  }

  public edit(): void {
    if (this.selectedCustomerService) {
      this.updateSelectedCustomerService();
      this.store$.dispatch(
        new fromCustomerService.actions.EditCustomerService(
          this.selectedCustomerService
        )
      );
    } else {
      this.store$.dispatch(
        new fromCustomerService.actions.AddCustomerService(
          this.buildCustomerService()
        )
      );
    }
    this.formEditCustomerService.reset();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private updateSelectedCustomerService(): void {
    this.selectedCustomerService.client.id =
      this.formEditCustomerService.get('clientId').value;
    this.selectedCustomerService.address.cep =
      this.formEditCustomerService.get('cep').value;
    this.selectedCustomerService.address.city =
      this.formEditCustomerService.get('city').value;
    this.selectedCustomerService.address.district =
      this.formEditCustomerService.get('district').value;
    this.selectedCustomerService.address.street =
      this.formEditCustomerService.get('street').value;
    this.selectedCustomerService.address.number =
      this.formEditCustomerService.get('number').value;
  }

  public buildCustomerService(): CustomerService {
    const address: Address = {
      cep: this.formEditCustomerService.get('cep').value,
      city: this.formEditCustomerService.get('city').value,
      district: this.formEditCustomerService.get('district').value,
      number: this.formEditCustomerService.get('number').value,
      street: this.formEditCustomerService.get('street').value,
    };
    const client: Client = this.clients.find(
      (cl) => cl.id === this.formEditCustomerService.get('clientId').value
    );

    const technician: Technician = this.technicians.find(
      (te) => te.id === this.formEditCustomerService.get('technicianId').value
    );

    const customerService: CustomerService = {
      id: this.customerService.createNumberCustomerService(
        this.totalCustomesServices
      ),
      client,
      address,
      dateStart: this.getDateNow(),
      dateEnd: null,
      technician,
    };
    return customerService;
  }

  private getDateNow(): string {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const updatedDate = day + '/' + month + '/' + year;
    return updatedDate;
  }
}
