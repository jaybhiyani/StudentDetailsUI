import { Student } from './student.model';

export class Department {
        id : number;
        dep : string;
        students? : Array<Student>;
}
