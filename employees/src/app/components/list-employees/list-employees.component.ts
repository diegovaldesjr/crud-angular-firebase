import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  title: string;
  nameText: string;
  lastnameText: string;
  docText: string;
  salaryText: string;
  btnAddText: string;

  constructor() {
    this.title = 'Listado de empleados';
    this.nameText = 'Nombre';
    this.lastnameText = 'Apellido';
    this.docText = 'Documento';
    this.salaryText = 'Salario';
    this.btnAddText = 'Agregar';
  }

  ngOnInit(): void {
  }

}
