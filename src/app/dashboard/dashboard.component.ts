import { SessionStorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { PoBreadcrumb, PoChartOptions, PoChartSerie, PoChartType } from '@po-ui/ng-components';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
  };
  
  retornoDados:any
  escondeTimer = true

  
  filtros: any = {
    Periodo: ""
  }

  informa: any = {
    "totalNfMesAnterior":0, 
    "totalNfMesAtual":0,
    "percentualTotalNf":0.00,
    "qtdeNfRetornoSip":0,
    "nfEstab":["percentualNf",
               "totalNfAnterior", 
               "estabelecimento",
               "totalNfAtual"
              ], 
    "totalRpaBaixada":0,
    "totalRpaPendente":0,
    "totalEmailPendente":0,
    "totalEmailReenvio":0,
    "totalEmailEnviado":0,
  }

  //grafiscos utilizados
  TipoChartEmail: PoChartType = PoChartType.Column;
  TipoChartEstab: PoChartType = PoChartType.Column;
  TipoChartNota: PoChartType = PoChartType.Column;
  TipoChartRPA: PoChartType = PoChartType.Column;

  ListaEstab: Array<string> = []
  TotalEmail: Array<any> = []
  FatEstab: Array<any> = []
  
  qtdeEmail: number = 0
  qtdeNota: number = 0
  qtdeRPA: number = 0

  emailSeries: Array<any> = []
  NotaSeries: Array<any> = []
  RPASeries: Array<any> = []
 
  /*
  emailSeries: Array<PoChartSerie> = [
    {label: 'Enviado', data: [100] },  
    {label: 'Reenviado', data: [150] }, 
    {label: 'Pendente',  data: [140] }
  ]
    */

  emailCategories:any
  NotaCategories:any
  RPACategories:any
  
  EstabOptions: PoChartOptions = {
    axis: {maxRange: 100, gridLines: 5}
  };

  EmailOptions: PoChartOptions = {};
  NotaOptions: PoChartOptions = {};
  RPAOptions: PoChartOptions = {};



  poAlert: any;

  constructor(private service: DashboardService,
              private storageService:SessionStorageService) {}

  ngOnInit(): void {
    this.setPeriodo();
    this.atualizarDados();
  }

  setPeriodo() {
    const today = new Date();
    this.filtros.Periodo = ''
    const pastDateI = new Date(today.setDate(today.getDate()));
    const yearI = pastDateI.getFullYear();
    const monthI = ('0' + (pastDateI.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const dayI = ('0' + pastDateI.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    this.filtros.Periodo = `${monthI}/${yearI}`;
  }  

  atualizarDados() {
    //let dataAtual:number[] = []
    //let dataAnterior:number[] = []
    let percentFatEstab:number[] = []
    this.escondeTimer = false
    this.ListaEstab = []
    this.FatEstab = []
    this.emailSeries = []
    this.NotaSeries = []
    this.RPASeries = []
    this.qtdeEmail = 0
    this.qtdeNota = 0
    this.qtdeRPA = 0

    this.service.getAll(this.filtros).subscribe(
      result => {
        this.informa = result
        this.qtdeEmail = result.totalEmailEnviado + result.totalEmailReenvio + result.totalEmailPendente
        this.qtdeNota = result.totalNfMesAnterior + result.totalNfMesAtual + result.qtdeNfRetornoSip
        this.qtdeRPA = result.totalNfMesAnterior + result.totalNfMesAtual + result.qtdeNfRetornoSip
        result.nfEstab.forEach((item:any) => {
          this.ListaEstab.push(item.estabelecimento)
          percentFatEstab.push(item.percentualNf)
          //dataAnterior.push(item.totalNfAnterior)
          //dataAtual.push(item.totalNfAtual)
        })
 
        this.emailSeries.push(
          {label: 'Enviado',   data: [result.totalEmailEnviado]  },  
          {label: 'Reenviado', data: [result.totalEmailReenvio] }, 
          {label: 'Pendente',  data: [result.totalEmailPendente] }
        ) 

        this.NotaSeries.push(
          {label: 'Mês Anterior', data: [result.totalNfMesAnterior]  },  
          {label: 'Mês Atual',    data: [result.totalNfMesAtual] }, 
          {label: 'Retorno SIP',  data: [result.qtdeNfRetornoSip] }
        )  

        this.RPASeries.push(
          {label: 'RPA Baixada',  data: [result.totalRpaBaixada]  },  
          {label: 'RPA Pendente', data: [result.totalRpaPendente] }
        )
 
        this.FatEstab.push({label:"% Nf.Estab", data:percentFatEstab})
        
        this.escondeTimer = true  

      }
    ) 
  }




}
