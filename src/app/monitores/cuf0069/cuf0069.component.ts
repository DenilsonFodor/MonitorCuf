import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableColumn, PoCheckboxGroupOption, PoNotificationService, PoTableAction, PoTableColumnLabel  } from '@po-ui/ng-components';
import { Cuf0069Service } from 'src/app/services/cuf0069.service';
import { SessionStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cuf0069',
  templateUrl: './cuf0069.component.html',
  styleUrls: ['./cuf0069.component.css'],
})
export class Cuf0069Component implements OnInit {

    filtros: any = {
    PeriodoIni: '',
    PeriodoFim: '',
    PageSize: '50' ,
    Page: '1',
    Executado: '',
    Reenvio: '',
    Pendente: '',
    SemEmail: '',
    Enfileirado: '',
    Erro: '',
    Estabelec: '',
    Serie: '',
    NotaFiscal: '',
  };

  cuf0069Colunas: Array<PoTableColumn> = [
    { property: 'Situacao',   label: 'Situação' ,    
      labels: <Array<PoTableColumnLabel>>[
        { value: 'PENDENTE',
          color: 'color-02',
          textColor: 'white',
          tooltip: 'Email Pendente'
        } ,
        { value: 'EXECUTADO',
          color: 'color-12',
          textColor: 'white',
          tooltip: 'Email enviado'
        } ,
        { value: 'ERRO',
          color: 'color-07',
          textColor: 'white',
          tooltip: 'Erro no envio do Email'
        } ,
        { value: 'ENFILEIRADO',
          color: 'color-09',
          textColor: 'white',
          tooltip: 'Enfileirado'
        } ,
        { value: 'REENVIO',
          color: 'color-08',
          textColor: 'white',
          tooltip: 'Email reenviado'
        } ,
        { value: 'SEMEMAIL',
          color: 'color-05',
          textColor: 'white',
          tooltip: 'Sem email para envio'
        } 
      ]
    },
    { property: 'Estab',      label: 'Estab'},
    { property: 'Serie',      label: 'Série'},
    { property: 'NotaFiscal', label: 'Nota Fiscal'},
    { property: 'EmissaoNF',  label: 'Emissão'},
    { property: 'Cliente',    label: 'Cliente'},
    { property: 'CNPJ',       label: 'CNPJ'},
    { property: 'SitNota',    label: 'Sit.Nota'},
    { property: 'PdfNota',    label: 'PDF Nota'},
    { property: 'PdfBoleto',  label: 'PDF Boleto'},
    { property: 'PdfExtrato', label: 'PDF Extrato'},
  ];

  maisOpcoes: Array<PoTableAction> = [
    { label: 'API E-mail',
      icon: 'po-icon-mail',
    },

    { label: 'Consulta RPA', 
      icon: 'po-icon-layers',  
    },

    { label: 'Reenvio', 
      icon: 'po-icon-export',
    },
  ]

  retornoCUF: any
  cuf0069Itens: any
  escondeTimer = true;
  
  readonly Acao69: Array<PoPageAction> = [
    {label: 'Atualiza'} 
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'CUF0069' }]
  };


  constructor(private service: Cuf0069Service,
              private storageService : SessionStorageService, 
              private router: Router,
              private poNotification: PoNotificationService) {}

  ngOnInit(): void {
    this.setPeriodoIni()
    this.setPeriodoFim()
    //this.atualizarDados()
    this.filtros.Pendente = true
    this.filtros.Reenvio = true
    throw new Error('Metodo não implementado.');
  }

  atualizarDados() {
    this.escondeTimer = false
    this.filtros.Page = 1;
      this.service.getAll(this.filtros).subscribe({
      next:result => {
        this.escondeTimer = true
        this.cuf0069Itens = result.items,
        this.storageService.setDados('DadosCuf0069', this.cuf0069Itens)
      },
      error:erro => {
        this.escondeTimer = true
        console.log(erro)
      },
    })
  }

  setPeriodoIni() {
    const today = new Date();
    this.filtros.PeriodoIni = ''
    const pastDateI = new Date(today.setDate(today.getDate() - 30));
    const yearI = pastDateI.getFullYear();
    const monthI = ('0' + (pastDateI.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const dayI = ('0' + pastDateI.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    this.filtros.PeriodoIni = `${yearI}-${monthI}-${dayI}`;
  }

  setPeriodoFim() {
    const today = new Date();
    this.filtros.PeriodoFim = ''
    const pastDateF = new Date(today.setDate(today.getDate()));
    const yearF = pastDateF.getFullYear();
    const monthF = ('0' + (pastDateF.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const dayF = ('0' + pastDateF.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    this.filtros.PeriodoFim = `${yearF}-${monthF}-${dayF}`;
  } 

  aDefinir() {

  }

}
