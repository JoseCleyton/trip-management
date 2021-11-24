import { Router } from '@angular/router';
import { CustomerServiceFirebaseService } from './../shared/service/customer-service/customer-service-firebase';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DialogViewComponent } from '../shared/components/ui/dialog-view/dialog-view.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state';
import * as fromCustomerService from '../state/customer-service';
import { Subscription } from 'rxjs';
import { Pageable } from '../shared/model/pageable.model';
import { PageInfo } from '../shared/model/page-info.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EditCustomerServiceComponent } from './edit-customer-service/edit-customer-service.component';
import { DeleteComponent } from '../shared/components/ui/delete/delete.component';
@Component({
  selector: 'app-customer-service-container',
  templateUrl: './customer-service-container.component.html',
})
export class CustomerServiceContainerComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
