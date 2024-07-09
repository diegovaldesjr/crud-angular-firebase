import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

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
  emptyText: string;

  employees: any[] = [];

  constructor(private _employeeService: EmployeesService, private toastr: ToastrService) {
    this.title = 'Listado de empleados';
    this.nameText = 'Nombre';
    this.lastnameText = 'Apellido';
    this.docText = 'Documento';
    this.salaryText = 'Salario';
    this.btnAddText = 'Agregar';
    this.emptyText = 'No hay empleados registrados.'
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(data => {
      this.employees = []
      this.employees = data.map((item:any) => ({id: item.payload.doc.id, ...item.payload.doc.data()}))
    })
  }

  deleteEmployee(id: string) {
    this._employeeService.deleteEmployee(id).then(() => {
      this.toastr.success('', 'Empleado eliminado exitosamente!', {positionClass: 'toast-bottom-right'});
    }).catch(error => {
      this.toastr.error(error, 'Error', {positionClass: 'toast-bottom-right'});
      console.log(error)
    })
  }
}
