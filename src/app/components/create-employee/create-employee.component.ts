import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/services/employees.service';

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
  btnActionText: string;
  btnBackText: string;
  errorMessage: string;

  createEmployee: FormGroup;
  submitted = false;
  loading = false;

  id: string | null;

  constructor(
    private formBuilder: FormBuilder, 
    private _employeeService: EmployeesService, 
    private router: Router, 
    private toastr: ToastrService, 
    private aRoute: ActivatedRoute
  ) {
    this.title = 'Agregar empleado';
    this.nameText = 'Nombre';
    this.lastnameText = 'Apellido';
    this.docText = 'Documento';
    this.salaryText = 'Salario';
    this.btnActionText = 'Agregar';
    this.btnBackText = 'Volver';
    this.errorMessage = '*todos los campos son obligatorios'

    this.createEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      doc: ['', Validators.required],
      salary: ['', Validators.required],
    })

    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getEmployee()
  }

  submitForm() {
    this.submitted = true
    if(this.createEmployee.invalid) return;
    
    const employee: any = {
      name: this.createEmployee.value.name,
      lastname: this.createEmployee.value.lastname,
      doc: this.createEmployee.value.doc,
      salary: this.createEmployee.value.salary,
      createdDate: new Date(),
      updateDate: new Date()
    }

    this.loading = true

    if( this.id) this.updateEmployee(this.id, employee)
    else this.addEmployee(employee)
  }

  addEmployee(employee: any) {
    this._employeeService.addEmployee(employee).then(() => {
      this.toastr.success('', 'Empleado registrado exitosamente!', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/employees'])
    }).catch(error => {
      this.toastr.error(error, 'Error', {positionClass: 'toast-bottom-right'});
      this.loading = false
    })
  }

  updateEmployee(id:string, employee: any) {
    this._employeeService.updateEmployee(id, employee).then(() => {
      this.toastr.success('', 'Empleado modificado', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/employees'])
    }).catch(error => {
      this.toastr.error(error, 'Error', {positionClass: 'toast-bottom-right'});
      this.loading = false
    })
  }

  getEmployee() {
    if (!this.id) return

    this.title = 'Editar empleado'
    this.btnActionText = 'Editar'
    this.loading = true

    this._employeeService.getEmployee(this.id).subscribe(data => {
      this.createEmployee.setValue({
        name: data.payload.data()['name'],
        lastname: data.payload.data()['lastname'],
        doc: data.payload.data()['doc'],
        salary: data.payload.data()['salary'],
      })
      this.loading = false
    })
  }

}
