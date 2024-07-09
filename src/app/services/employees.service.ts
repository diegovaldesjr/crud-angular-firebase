import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firestore: AngularFirestore) { }

  addEmployee(employee:any): Promise<any> {
    return this.firestore.collection('employees').add(employee);
  }

  getEmployees(): Observable<any> {
    return this.firestore.collection('employees', ref => ref.orderBy('createdDate', 'asc')).snapshotChanges();
  }

  deleteEmployee(id: string): Promise<any> {
    return this.firestore.collection('employees').doc(id).delete();
  }

  getEmployee(id: string): Observable<any>{
    return this.firestore.collection('employees').doc(id).snapshotChanges();
  }

  updateEmployee(id: string, data: any): Promise<any> {
    return this.firestore.collection('employees').doc(id).update(data);
  }
}
