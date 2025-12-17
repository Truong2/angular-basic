import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TranslateModule, LanguageSwitcherComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class AppPublicLayout {}
