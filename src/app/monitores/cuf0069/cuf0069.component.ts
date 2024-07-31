import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { PoBreadcrumb, PoPageAction, PoTableColumn, PoNotificationService, PoTableAction, PoDialogService, PoModalComponent, PoTableComponent  } from '@po-ui/ng-components';
import { Cuf0069Service } from 'src/app/services/cuf0069.service';
import { SessionStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cuf0069',
  templateUrl: './cuf0069.component.html',
  styleUrls: ['./cuf0069.component.css'],
})
export class Cuf0069Component implements OnInit {
  @ViewChild('ModalRPA', { static: true }) poModalRPA!: PoModalComponent;
  @ViewChild("ModalAPI", { static: true }) poModalAPI!: PoModalComponent;
  @ViewChild("IdTable", { static: true }) IdTable!: PoTableComponent;

    filtros: any = {
    PeriodoIni: '',
    PeriodoFim: '',
    PageSize: '100' ,
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

  colunasRPA: Array<PoTableColumn> = [
    {property: "DtTransacao", label: "Transação", type: 'date'},
    {property: "Situacao" ,   label: "Situação"},
    {property: "Estab" ,      label: "Estab"},
    {property: "NrNotaPref",  label: "Nota Fiscal"},
    {property: "Mensagem",    label: "Mensagem"},
    {property: "IdIris" ,     label: "Id.Iris"},
  ]

  colunasAPI: Array<PoTableColumn> = [
    {property: "Situacao",  label: "Situacao"},
    {property: "ErroAtual", label: "Erro"},
    {property: "HoraAtu",   label: "Horario"},
    {property: "DataAtual", label: "Estab", type: 'date'},
    {property: "Nome",      label: "Nome"},
    {property: "Estab",     label: "Estab"},
    {property: "NrNota",    label: "Nota Fiscal"},
    {property: "Serie",     label: "Serie"},
    {property: "Email",     label: "E-Mail"},
    {property: "IDApi",     label: "ID API"},
  ]

  cuf0069Colunas: Array<PoTableColumn> = [
    { property: 'Situacao',   label: 'Situação', type: 'label',
      labels: [
        {value: 'ENVIADO',     color: '#149664',  label: 'Enviado'},
        {value: 'PENDENTE',    color: '#808080',  label: 'Pendente'},
        {value: 'ERRO',        color: 'red',      label: 'ERRO'},
        {value: 'SEM E-MAIL',  color: '#FFB43D',  label: 'Sem E-mail'},
        {value: 'REENVIO',     color: '#9B44DE',  label: 'Reenviado'},
        {value: 'ENFILEIRADO', color: '#00FFFF',  label: 'Enfileirado'},
      ]
    },    
    { property: 'Estab',      label: 'Estab'},
    { property: 'Serie',      label: 'Série'},
    { property: 'NotaFiscal', label: 'Nota Fiscal'},
    { property: 'EmissaoNF',  label: 'Emissão', type: 'date'},
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
      action: this.apiEmail.bind(this)
    },

    { label: 'Consulta RPA', 
      icon: 'po-icon-layers',  
      action: this.consultaRPA.bind(this)
    },
  ]

  
  cuf0069Itens: any
  itensRPA: any;
  itensAPI: any;
  escondeTimer = true
  
  retornoReenv: any
  retornoRPA: any
  retornoCUF: any
  retornoAPI: any

  regsReenvio: any = []
  itensSelecionados: Array<any> = [] 
  
  readonly Acao69: Array<PoPageAction> = [
    {label: 'Atualiza'} 
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'CUF0069' }]
  };

  constructor(private service: Cuf0069Service,
              private storageService : SessionStorageService,
              private poDialog: PoDialogService, 
              private poNotification: PoNotificationService) {}

  ngOnInit(): void {
    this.setPeriodoIni()
    this.setPeriodoFim()
    //this.atualizarDados()
    this.filtros.Pendente = true
    this.filtros.Reenvio = true
    //this.filtros.Enfileirado = true
    //this.filtros.Executado = true
    //this.filtros.Erro = true
    //this.filtros.SemEmail = true
    

    throw new Error('Metodo não implementado.');
  }

  atualizarDados() {
    this.escondeTimer = false
    this.filtros.Page = 1;
      this.service.getAll(this.filtros).subscribe({
      next:result => {
        this.escondeTimer = true
        this.cuf0069Itens = result.items
        //this.storageService.setDados('DadosCuf0069', this.cuf0069Itens) 
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
    const pastDateI = new Date(today.setDate(today.getDate()));  //- 30 ));
    const yearI = pastDateI.getFullYear();
    const monthI = ('0' + (pastDateI.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const dayI = ('0' + pastDateI.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    this.filtros.PeriodoIni = `${yearI}-${monthI}-${dayI}`;
    //this.filtros.PeriodoIni = '2024-01-01';
  }

  setPeriodoFim() {
    const today = new Date();
    this.filtros.PeriodoFim = ''
    const pastDateF = new Date(today.setDate(today.getDate()));
    const yearF = pastDateF.getFullYear();
    const monthF = ('0' + (pastDateF.getMonth() + 1)).slice(-2); // Adiciona zero à esquerda se necessário
    const dayF = ('0' + pastDateF.getDate()).slice(-2); // Adiciona zero à esquerda se necessário
    this.filtros.PeriodoFim = `${yearF}-${monthF}-${dayF}`;
    //this.filtros.PeriodoFim = '2024-01-05'
  } 

  selecaoReenvio(event:any, type:any): void {
    
    if (type == 'new') {
      if (event.Situacao == 'REENVIO')   {
        this.poNotification.error(`NF ja foi enviada`)
        this.atualizarDados() 
      }
      else if (event.Situacao == 'ENVIADO')   {
        this.poNotification.error(`NF ja foi enviada`)
        this.atualizarDados() 
      }
      else { 
        this.itensSelecionados = [
            ...this.itensSelecionados,
          {rowid:event.rowid},
        ]
      }  
    } 
    else {
      if (this.itensSelecionados.length > 0) {
        this.itensSelecionados = this.itensSelecionados.filter(
          itensSelecionados => itensSelecionados.rowid != event.rowid)
      }
    }
    
  }

  selecaoReenvioAll(): void {
    this.itensSelecionados = this.cuf0069Itens.filter((x:any) => x.Situacao && x.Situacao != 'ENVIADO' && x.Situacao != 'REENVIO')
    
  }

  selecaoReenvioUnSelectAll(): void {
    this.itensSelecionados = []
    
  }


  aDefinir() {}

  apiEmail(args: any) {
    this.escondeTimer = false
    this.service.getAPIEmail(args.rowid).subscribe(
      resultAPI => {
        this.escondeTimer = true
        this.retornoAPI = resultAPI
        this.itensAPI = resultAPI.items
        this.storageService.setDados('ResultAPI', this.retornoAPI)
        if (resultAPI.hasError) {
          this.poNotification.error(`${resultAPI.mensagem}`)
        }
        else {
          this.poModalAPI.open()  
        }
      }
    ) 
  }

  consultaRPA(args: any) {
    this.escondeTimer = false
    this.service.getRPA(args.rowid).subscribe(
      resultRPA => { 
        this.escondeTimer = true
        this.retornoRPA = resultRPA
        this.storageService.setDados('RetornoRPA', this.retornoRPA)
        if (resultRPA.hasError) {
          this.poNotification.error(`${resultRPA.mensagem}`)
        }
        else {
          this.poModalRPA.open() 
        }
      }
    ) 
  } 
  
  reenviaEmail(): void {
    this.poDialog.confirm({
      title: 'Reprocessamento',
      message: `Deseja reenviar E-Mail dos registros selecionados?`,
      confirm: () => this.processaReenvio(this.itensSelecionados),
      cancel: () => {}
    });
  }

  processaReenvio(regSelec: Array<any>) {
    this.regsReenvio = {
      'registros' : regSelec }
    this.escondeTimer = false
    this.service.postReenv(this.regsReenvio).subscribe(
      resposta => {
        this.retornoReenv = resposta
        if (this.retornoReenv.erro = 'false') {
          this.poNotification.success(`${resposta.mensagem}`)
        }
        else {
          this.poNotification.error(`${resposta.mensagem}`)
        }
        
      },
      erro => {
        console.error('Erro ao enviar dados:', erro);
      }
    )  
    this.regsReenvio = ""
    this.itensSelecionados = []
    this.atualizarDados() 
      
  }

}
