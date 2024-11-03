import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-shorten-url',
  standalone: true,
  templateUrl: './shorten-url.component.html',
  styleUrls: ['./shorten-url.component.css'],
  imports: [FormsModule, CommonModule, ToastModule],
  providers: [MessageService]
})
export class ShortenUrlComponent {
  urlInput: string = '';
  shortenedUrl: string = '';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  shorten() {
    const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    const token = '5c7bdb75a12f31a9b00fe70dab9ffa1a28f7a051';
  
    // Trim and check if the URL starts with http or https
    const trimmedUrl = this.urlInput.trim();
    
    if (!/^https?:\/\/.+/.test(trimmedUrl)) {
      console.log("Wrong Input");
      this.messageService.add({ severity: 'error', summary: 'Invalid URL', detail: 'Please enter a valid URL starting with http:// or https://' });
      return;
    }
  
    const body = {
      long_url: trimmedUrl
    };
  
    this.http.post<any>(bitlyApiUrl, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        this.shortenedUrl = response.link;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'URL shortened successfully!' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to shorten the URL!' });
      }
    });
  }
  

  copyToClipboard() {
    navigator.clipboard.writeText(this.shortenedUrl).then(() => {
      this.messageService.add({ severity: 'info', summary: 'Copied', detail: 'Shortened URL copied to clipboard!' });
    });
  }
}
