import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  title: string;
  nameText: string;
  lastnameText: string;
  docText: string;
  salaryText: string;
  btnAddText: string;
  btnBackText: string;

  constructor() {
    this.title = 'Agregar empleado';
    this.nameText = 'Nombre';
    this.lastnameText = 'Apellido';
    this.docText = 'Documento';
    this.salaryText = 'Salario';
    this.btnAddText = 'Agregar';
    this.btnBackText = 'Volver';
  }

  ngOnInit(): void {
  }

}
