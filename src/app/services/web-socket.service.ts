import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket = io('https://192.168.191.7:3000'); // Ajusta la URL si es necesario

    onNewRecord(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('new-record', (data) => {
        observer.next(data);
      });
    });
  }

  // private socket: WebSocket;
  // private subject = new Subject<any>();

  constructor() {
    // this.socket = new WebSocket('ws://127.0.0.1:3000/reverb/notifications');
    // this.socket.onmessage = (event) => this.subject.next(JSON.parse(event.data));
    // this.socket.onerror = (err) => console.error("Error en WebSocket: ", err);
    // console.log(this.socket);

   }

}
