import { Injectable } from '@angular/core';


import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, User } from "firebase/auth";

import { firebaseConfig } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private app;
  private auth;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app)
   }

  signInAcount(email: string, senha: string){
   return  signInWithEmailAndPassword(this.auth, email, senha)
  }

  signUpUser(email: string, senha: string){
    return createUserWithEmailAndPassword(this.auth, email, senha)
  }

  sendVerification(user:User){
    return sendEmailVerification(user)
  }

  

}
