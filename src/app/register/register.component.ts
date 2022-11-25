import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(){
  }

 register(){
   if(this.email == ''){
      alert('Metti la email');
      return;
    }

    if(this.password == ''){
      alert('Metti la password');
      return;
    }
    this.auth.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
 }
}
