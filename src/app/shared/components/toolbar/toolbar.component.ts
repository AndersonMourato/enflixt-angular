import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {

  searchForm!: FormGroup
  @Output() searchData: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router, 
    private tokenService: TokenService
  ) {
    
  }
  
  ngOnInit(){
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onSair(){
    this.tokenService.cleanToken();
    this.router.navigateByUrl("login");
  }

  onSearch(){
    const value = this.searchForm.value.search;
    this.router.navigateByUrl('filmes');
  }

  onHome(){
    this.router.navigateByUrl("home");
  }

  get isLoged(): boolean {
    return this.tokenService.isToken();
  }

}
