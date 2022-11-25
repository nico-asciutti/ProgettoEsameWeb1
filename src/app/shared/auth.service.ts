import { Injectable} from '@angular/core';
import { GoogleAuthProvider} from '@angular/fire/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
constructor(private fireauth : AngularFireAuth, private router : Router, public fireservices : AngularFirestore){}

signIn(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res =>{
        localStorage.setItem('token', 'true');

        if(res.user?.emailVerified == true){
            this.router.navigate(['/prenota']);
        }else{
            this.router.navigate(['/verify-email']);
        }

    }, err =>{
        alert(err.message);
        this.router.navigate(['/signIn']);
    })
}

loggedIn(){
    return !!localStorage.getItem('token')
}


createNewRecord(Record: any){
    return this.fireservices.collection('Prenotazioni Tavoli').add(Record);
}


signUp(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res =>{
        alert('Registrazione effettuata');
        this.router.navigate(['/signIn']);
        this.sendEmailForVerification(res.user);
    }, err =>{
        alert(err.message);
        this.router.navigate(['/signUp']);
    })

}

logout(){
    this.fireauth.signOut().then(()=> {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    })
}

forgotPassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then(() =>{
        this.router.navigate(['/verify-email']);
    },err =>{
        alert('Qualcosa è andato storto');
    })
}

sendEmailForVerification(user : any){
    user.sendEmailVerification().then((res : any) =>{
        this.router.navigate(['/verify-email']);
    }, (err : any) =>{
        alert('Qualcosa è andato storto. Non siamo riusciti ad inviarti il link');
    })
}

googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

        this.router.navigate(['/prenota']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
        
    }, err =>{
        alert(err.message);
    })
}

}
