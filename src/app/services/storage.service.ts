import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  
  // Método para salvar dados
  setDados(key: string, value: any): void {
    const jsonData = JSON.stringify(value);
    sessionStorage.setItem(key, jsonData);
  }

  // Método para recuperar dados
  getDados(key: string): any | null {
    const jsonData = sessionStorage.getItem(key)
    return jsonData ? JSON.parse(jsonData) : null;
  }

  // Método para remover dados
  removeDados(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Método para limpar todos os dados
  clear(): void {
    sessionStorage.clear();
  }
}
