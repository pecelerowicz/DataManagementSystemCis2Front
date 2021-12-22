import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {

  @Input() dataSource: MatTableDataSource<Row>;
  @Output() filteredDataEmit = new EventEmitter();
  formGroup: FormGroup = getFormGroup()
  slicedData: MatTableDataSource<Row> = new MatTableDataSource();

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroup.setValue({dataType: '', typedText: ''});
  }

  onAny() {
    this.slicedData.data = this.dataSource.data;
    let typedText: string = this.formGroup.get('typedText').value;
    this.slicedData.data = this.slicedData.data.filter(d => d.name.includes(typedText));
    this.filteredDataEmit.emit({"sliced": this.slicedData});
  }

  onStorage() {
    this.slicedData.data = this.dataSource.data.filter(d => d.hasStorage === true && !d.hasMetadata);
    let typedText: string = this.formGroup.get('typedText').value;
    this.slicedData.data = this.slicedData.data.filter(d => d.name.includes(typedText));
    this.filteredDataEmit.emit({"sliced": this.slicedData});
  }

  onMetadata() {
    this.slicedData.data = this.dataSource.data.filter(d => d.hasMetadata);
    let typedText: string = this.formGroup.get('typedText').value;
    this.slicedData.data = this.slicedData.data.filter(d => d.name.includes(typedText));
    this.filteredDataEmit.emit({"sliced": this.slicedData});
  }

  onKeyUp() {
    let typedText: string = this.formGroup.get('typedText').value;
    this.slicedData.data = this.dataSource.data.filter(d => d.name.includes(typedText) ||
    (d.localDate !== null && d.localDate.includes(typedText)));

    if(this.formGroup.get('dataType').value === 'metadata') {
      this.slicedData.data = this.slicedData.data.filter(d => d.hasMetadata);
    } else if(this.formGroup.get('dataType').value === 'storage') {
      this.slicedData.data = this.slicedData.data.filter(d => d.hasStorage === true && !d.hasMetadata);
    }
    this.filteredDataEmit.emit({"sliced": this.slicedData});
  }

}

function getFormGroup(): FormGroup {
    let fb: FormBuilder = new FormBuilder();
    return fb.group({
      dataType: [''],
      typedText: ['']
    })
}

interface Row {
  name: string, 
  position: number, 
  hasStorage: boolean, 
  hasMetadata: boolean,
  localDate: string
}
