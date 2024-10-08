import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [FooterComponent, FormsModule, CommonModule]
})
export class RegisterComponent {
    @ViewChild('registerForm') registerForm!: NgForm;
    //Khai báo các biến tương ứng với các trường dữ liệu trong form (register.component.html)
    phone: string;
    password: string;
    retypePassword: string;
    fullName: string;
    address: string;
    isAccepted: boolean;
    dateOfBirth: Date;

    constructor(private http: HttpClient, private router: Router){
        this.phone = '';
        this.password = '';
        this.retypePassword = '';
        this.fullName = '';
        this.address = '';
        this.isAccepted = false;
        this.dateOfBirth = new Date();
        this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
        //Inject
    }

    onPhoneChange(){
        console.log(`Phone typed: ${this.phone}`);
    }

    register(){
        // const message = `phone: ${this.phone}` +
        //                 `password: ${this.password}`+
        //                 `retypePassword: ${this.retypePassword}`+
        //                 `fullName: ${this.fullName}`+
        //                 `dateOfBirth: ${this.dateOfBirth}`+
        //                 `address: ${this.address}`+
        //                 `isAccepted: ${this.isAccepted}`;
        console.log("start register!");
       //alert(message)
        const apiUrl = "localhost:8088/api/v1/users/register";
        const registerData = {
            "fullname": this.fullName,
            "phone_number": this.phone,
            "address": this.address,
            "password": this.password,
            "retype_password": this.retypePassword,
            "date_of_birth": this.dateOfBirth,
            "facebook_account_id": 0,
            "google_account_id": 0,
            "role_id": 2
        }

        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post(apiUrl, registerData, {headers})
        .subscribe({
            next: (response : any) => {
                debugger
                //Xử lý kết quả trả về khi đăng ký thành công
                this.router.navigate(['/login']);
            },
            complete() {
                debugger
            },
            error: (err: any) => {
                //Xử lý lỗi nếu có
                alert(`Cannot register, error: ${err.error}`);
                debugger
                console.error("Đăng ký không thành công!", err);
            },
        });

    }

    checkPasswordsMatch(){
        if(this.password !== this.retypePassword){
            this.registerForm.form.controls['retypePassword'].setErrors({"passwordMismatch":true});
        }else{
            this.registerForm.form.controls['retypePassword'].setErrors(null);
        }
    }

    checkAge(){
        if(this.dateOfBirth){
            const today = new Date();
            const birthDate = new Date(this.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
                age--;
            }
            if(age < 18){
                this.registerForm.form.controls['dateOfBirth'].setErrors({'InvalidAge':true});
            }else{
                this.registerForm.form.controls['dateOfBirth'].setErrors(null);
            }
        }
    }
}
