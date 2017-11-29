import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

import {
  CdkTableModule,
  DataSource
} from '@angular/cdk/table';

import {of as observableOf} from 'rxjs/observable/of';

@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.html',
  styleUrls: ['./kitchen-sink.css'],
})
export class KitchenSink {

  /** List of columns for the CDK and Material table. */
  tableColumns = ['userId'];

  /** Data source for the CDK and Material table. */
  tableDataSource: DataSource<any> = {
    connect: () => observableOf([{userId: 1}, {userId: 2}]),
    disconnect: () => {}
  };

  constructor(snackBar: MatSnackBar) {
    // Open a snack bar to do a basic sanity check of the overlays.
    snackBar.open('Hello there');
	
  }

}

