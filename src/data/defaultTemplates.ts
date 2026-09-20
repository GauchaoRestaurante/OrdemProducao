import { ProductionOrder, Collaborator } from '../types';

export const INITIAL_COLLABORATORS: Collaborator[] = [
  { id: 'c1', name: 'LAURA', role: 'Cozinheira / Envase', preferredShift: ['madrugada'] },
  { id: 'c2', name: 'KEMILLY', role: 'Self no Campo / Controle', preferredShift: ['madrugada'] },
  { id: 'c3', name: 'ANA PAULA', role: 'Envase / Registros', preferredShift: ['madrugada'] },
  { id: 'c4', name: 'LIBIA', role: 'Envase / Auxiliar', preferredShift: ['madrugada'] },
  { id: 'c5', name: 'COZINHEIRA', role: 'Cozinheira Chefe', preferredShift: ['madrugada', 'almoco', 'jantar'] },
  { id: 'c6', name: 'LUCIA', role: 'Envase / Amostras', preferredShift: ['almoco'] },
  { id: 'c7', name: 'ELOA', role: 'Buffet / Amostras', preferredShift: ['almoco'] },
  { id: 'c8', name: 'ANE', role: 'Envase / Regeneração', preferredShift: ['jantar'] },
  { id: 'c9', name: 'LUCIENE', role: 'Produção / Pré-preparo', preferredShift: ['jantar'] },
  { id: 'c10', name: 'AUXILIARES', role: 'Apoio e Produção Geral', preferredShift: ['madrugada', 'almoco', 'jantar'] },
  { id: 'c11', name: 'COZINHA GERAL', role: 'Equipe de Fechamento / Higienização', preferredShift: ['madrugada', 'almoco', 'jantar'] },
  { id: 'c12', name: 'MARIA FERNANDA', role: 'Supervisão / Elaboração', preferredShift: ['almoco', 'jantar'] },
  { id: 'c13', name: 'FABIO', role: 'Supervisão / Elaboração', preferredShift: ['almoco', 'jantar'] },
];

export const DEFAULT_CLOSING_CHECKS = [
  { id: 'chk1', label: 'OP conferida e preenchida', checked: false },
  { id: 'chk2', label: 'Pendências comunicadas ao próximo turno', checked: false },
  { id: 'chk3', label: 'Área organizada', checked: false },
  { id: 'chk4', label: 'VERIFICAR SE DEVOLVEU O ISQUEIRO NA COZINHA', checked: false },
  { id: 'chk5', label: 'Item devidamente devolvido', checked: false },
  { id: 'chk6', label: 'Finalização do turno', checked: false },
  { id: 'chk7', label: 'Registros/fotos enviados', checked: false },
  { id: 'chk8', label: 'Produtos identificados e armazenados', checked: false },
  { id: 'chk9', label: 'Equipamentos verificados', checked: false },
];

export const TEMPLATE_MADRUGADA: ProductionOrder = {
  id: 'template_madrugada',
  shift: 'madrugada',
  date: '21/09/2026',
  menu: 'CARNE DE PANELA, BIFE SUÍNO E FAROFA DE BATATA PALHA',
  elaboratedBy: 'MARIA FERNANDA / FABIO',
  sections: [
    {
      id: 'sec_servico',
      title: 'SERVIÇO / ENVASE',
      items: [
        { id: 'm_s1', num: 1, description: 'REGENERAR CARNE DE PANELA CONFORME DEMANDAS DO SEU ENVASE', responsible: 'LAURA', completed: false, notes: '' },
        { id: 'm_s2', num: 2, description: 'REGENERAR FEIJÃO PARA ENVASE', responsible: 'LAURA', completed: false, notes: '' },
        { id: 'm_s3', num: 3, description: 'REGENERAR ARROZ PARA ENVASE', responsible: 'LAURA', completed: false, notes: '' },
        { id: 'm_s4', num: 4, description: 'ATENDER DEMANDAS DO SELF NO CAMPO', responsible: 'KEMILLY', completed: false, notes: '' },
        { id: 'm_s5', num: 5, description: 'ATENDER AS DEMANDAS DO ENVASE', responsible: 'ANA PAULA E LIBIA', completed: false, notes: '' },
        { id: 'm_s6', num: 6, description: 'REGENERAR BIFE SUÍNO CONFORME DEMANDAS DO SEU ENVASE', responsible: 'LAURA', completed: false, notes: '' },
        { id: 'm_s7', num: 7, description: 'PRODUÇÃO DE FAROFA DE BATATA PALHA - 30 KG', responsible: 'LAURA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_controle',
      title: 'CONTROLE E REGISTRO',
      items: [
        { id: 'm_c1', num: 5, description: 'RETIRAR AMOSTRAS E TEMPERATURAS DO SEU ENVASE, ANOTANDO TUDO NAS PLANILHAS', responsible: 'ANA PAULA', completed: false, notes: '' },
        { id: 'm_c2', num: 6, description: 'RETIRAR AMOSTRAS E TEMPERATURAS DO SELF EM CAMPO', responsible: 'KEMILLY', completed: false, notes: '' },
        { id: 'm_c3', num: 7, description: 'RESFRIAR NO IRINOX, ENVASAR E ETIQUETAR TODA A PRODUÇÃO E ARMAZENAR NA CÂMARA 3', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'm_c4', num: 8, description: 'PREENCHER COMPLETAMENTE O CHECKLIST DO SELF EM CAMPO', responsible: 'KEMILLY', completed: false, notes: '' },
        { id: 'm_c5', num: 9, description: 'MANDAR FOTO DAS ETIQUETAS, PESOS E TEMPERATURAS DO SELF EM CAMPO', responsible: 'KEMILLY', completed: false, notes: '' },
        { id: 'm_c6', num: 10, description: 'ANOTAR QUANTIDADE DE MARMITAS', responsible: 'ANA PAULA', completed: false, notes: 'QUANTITATIVO DE MARMITAS.' },
      ]
    },
    {
      id: 'sec_producao',
      title: 'PRODUÇÃO / PRÉ-PREPARO',
      items: [
        { id: 'm_p1', num: 1, description: 'PRODUZIR UMA GUILLER DE ARROZ -> ESFRIAR, ENVASAR, ETIQUETAR E ARMAZENAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'm_p2', num: 2, description: 'PRODUZIR UMA GUILLER DE FEIJÃO -> ESFRIAR, ENVASAR, ETIQUETAR E ARMAZENAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'm_p3', num: 3, description: 'PRODUZIR CHÁ E CAFÉ DE ROTINA LEMBRANDO DA REGRA DE NÃO LIGAR SEM ANTES ABRIR A VÁLVULA DE ÁGUA', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'm_p4', num: 4, description: 'PRODUZIR BOLO PARA BOLO DO ANIVERSARIANTE DO MÊS SUZANO - 4 FORMAS', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_finalizacao',
      title: 'FINALIZAÇÃO E ORGANIZAÇÃO',
      items: [
        { id: 'm_f1', num: 1, description: 'HIGIENIZAÇÃO DA COZINHA E ENVASE', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'm_f2', num: 2, description: 'MANDAR FOTO DA OP PREENCHIDA NO GRUPO', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'm_f3', num: 3, description: 'VERIFICAR SE DEVOLVEU O ISQUEIRO NA COZINHA', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    }
  ],
  closingChecks: [...DEFAULT_CLOSING_CHECKS],
  pendingNotes: '',
  shiftSupervisor: '',
  receivedBy: '',
  lastUpdated: new Date().toISOString()
};

export const TEMPLATE_ALMOCO: ProductionOrder = {
  id: 'template_almoco',
  shift: 'almoco',
  date: '21/09/2026',
  menu: 'CARNE DE PANELA, BIFE SUÍNO E FAROFA DE BATATA PALHA',
  elaboratedBy: 'MARIA FERNANDA / FABIO',
  sections: [
    {
      id: 'sec_servico',
      title: 'SERVIÇO / ENVASE',
      items: [
        { id: 'a_s1', num: 1, description: 'REGENERAR CARNE DE PANELA PARA ATENDER SEU ENVASE', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_s2', num: 2, description: 'REGENERAR ARROZ PARA SEU ENVASE', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_s3', num: 3, description: 'REGENERAR FEIJÃO PARA SEU ENVASE', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_s4', num: 4, description: 'PRODUZIR 30 KG DE FAROFA PARA ATENDER SEU ENVASE', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_s5', num: 5, description: 'REGENERAR BIFE SUÍNO PARA ATENDER DEMANDAS DO SEU ENVASE', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_controle',
      title: 'CONTROLE E REGISTRO',
      items: [
        { id: 'a_c1', num: 1, description: 'UTILIZAR AS PROTEÍNAS DA CÂMARA 2 PARA MONTAR O BUFFET', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_c2', num: 2, description: 'RETIRAR AMOSTRAS E TEMPERATURAS DO ENVASE', responsible: 'LUCIA / ELOA', completed: false, notes: '' },
        { id: 'a_c3', num: 3, description: 'RETIRAR AMOSTRAS E TEMPERATURAS DO BUFFET', responsible: 'ELOA', completed: false, notes: '' },
        { id: 'a_c4', num: 4, description: 'MANDAR FOTO NO GRUPO DAS PREPARAÇÕES DO BUFFET', responsible: 'ELOA', completed: false, notes: '' },
        { id: 'a_c5', num: 5, description: 'REVISAR NO DEGELO SE TODA PROTEÍNA VERMELHA DE HOJE FOI PRODUZIDA. CASO NÃO TENHA, FINALIZAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_c6', num: 6, description: 'NÃO DEIXAR ALIMENTOS DO BUFFET NO PASTRU, AO FINAL DO TURNO VERIFICAR SE TODOS FORAM PASSADOS NO IRINOX E DEVIDAMENTE ARMAZENADOS NA CÂMARA 2', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_c7', num: 7, description: 'ATENDER DEMANDAS DO BUFFET', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_producao',
      title: 'PRODUÇÃO / PRÉ-PREPARO',
      items: [
        { id: 'a_p1', num: 1, description: 'PRODUZIR DUAS GUILLER DE ARROZ -> ESFRIAR, ENVASAR, ETIQUETAR E ARMAZENAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_p2', num: 2, description: 'PRODUÇÃO DA CARNE MOÍDA -> ESFRIAR, ETIQUETAR E ARMAZENAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_p3', num: 3, description: 'PRODUÇÃO DE CAFÉ PARA EXPEDIÇÃO, LEMBRANDO DA REGRA DE NÃO LIGAR SEM ANTES ABRIR A VÁLVULA DE ÁGUA', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_p4', num: 4, description: '', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'a_p5', num: 5, description: '', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_finalizacao',
      title: 'FINALIZAÇÃO E ORGANIZAÇÃO',
      items: [
        { id: 'a_f1', num: 1, description: 'HIGIENIZAÇÃO DA COZINHA E ENVASE', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'a_f2', num: 2, description: 'MANDAR FOTO DA OP PREENCHIDA NO GRUPO', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'a_f3', num: 3, description: 'VERIFICAR SE DEVOLVEU O ISQUEIRO NA COZINHA', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    }
  ],
  closingChecks: [...DEFAULT_CLOSING_CHECKS],
  pendingNotes: '',
  shiftSupervisor: '',
  receivedBy: '',
  lastUpdated: new Date().toISOString()
};

export const TEMPLATE_JANTAR: ProductionOrder = {
  id: 'template_jantar',
  shift: 'jantar',
  date: '21/09/2026',
  menu: 'CARNE DE PANELA, BIFE SUÍNO E FAROFA DE BATATA PALHA',
  elaboratedBy: 'MARIA FERNANDA / FABIO',
  sections: [
    {
      id: 'sec_servico',
      title: 'SERVIÇO / ENVASE',
      items: [
        { id: 'j_s1', num: 1, description: 'REGENERAR CARNE DE PANELA PARA SEU ENVASE', responsible: 'ANE', completed: false, notes: '' },
        { id: 'j_s2', num: 2, description: 'REGENERAR ARROZ PARA SEU ENVASE', responsible: 'ANE', completed: false, notes: '' },
        { id: 'j_s3', num: 3, description: 'REGENERAR FEIJÃO PARA ATENDER SEU ENVASE', responsible: 'ANE', completed: false, notes: '' },
        { id: 'j_s4', num: 4, description: 'REGENERAR BIFE SUÍNO PARA ATENDER SEU ENVASE', responsible: 'ANE', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_controle',
      title: 'CONTROLE E REGISTRO',
      items: [
        { id: 'j_c1', num: 1, description: 'RETIRAR AMOSTRAS E TEMPERATURAS DO ENVASE', responsible: 'ANE', completed: false, notes: '' },
        { id: 'j_c2', num: 2, description: 'REALIZAR A LIMPEZA DIÁRIA DO FORNO COM UMA PASTILHA DE CADA ATÉ AS 19:00', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'j_c3', num: 3, description: 'RESFRIAR TODA A PRODUÇÃO NO IRINOX, ENVASAR, ETIQUETAR E ARMAZENAR', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'j_c4', num: 4, description: 'NÃO DEIXAR ALIMENTOS DO BUFFET NO PASTRU, AO FINAL DO TURNO VERIFICAR SE TODOS FORAM PASSADOS NO IRINOX E DEVIDAMENTE ARMAZENADOS NA CÂMARA 2', responsible: 'COZINHEIRA', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_producao',
      title: 'PRODUÇÃO / PRÉ-PREPARO',
      items: [
        { id: 'j_p1', num: 1, description: 'PRODUZIR UMA GUILLER DE FEIJÃO -> ESFRIAR, ENVASAR, ETIQUETAR E ARMAZENAR', responsible: 'LUCIENE', completed: false, notes: '' },
        { id: 'j_p2', num: 2, description: 'PRODUZIR O FILÉ DE FRANGO PARA MADRUGADA', responsible: 'LUCIENE', completed: false, notes: 'FAZER NO FORNO, UNTAR UMA FORMA QUADRADA FINA/PEQUENA COM ÓLEO, ESTEIRAR O FRANGO E BORRIFAR ÓLEO NELE ANTES DE LEVAR AO FORNO' },
        { id: 'j_p3', num: 3, description: 'COZINHAR 20 PACOTES DE MACARRÃO PARA MADRUGADA', responsible: 'AUXILIARES', completed: false, notes: '' },
        { id: 'j_p4', num: 4, description: 'AO FINAL DO TURNO REGENERAR CARNE MOÍDA PRA MADRUGADA', responsible: 'LUCIENE', completed: false, notes: '' },
        { id: 'j_p5', num: 5, description: 'ATENDER DEMANDAS DO BUFFET', responsible: 'LUCIENE', completed: false, notes: '' },
      ]
    },
    {
      id: 'sec_finalizacao',
      title: 'FINALIZAÇÃO E ORGANIZAÇÃO',
      items: [
        { id: 'j_f1', num: 1, description: 'HIGIENIZAÇÃO DA COZINHA E ENVASE', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'j_f2', num: 2, description: 'MANDAR FOTO DA OP PREENCHIDA NO GRUPO', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'j_f3', num: 3, description: 'VERIFICAR SE DEVOLVEU O ISQUEIRO NA COZINHA', responsible: 'COZINHEIRA', completed: false, notes: '' },
        { id: 'j_f4', num: 4, description: 'Revisar a Câmara 3: itens fora do cardápio devem ir para a Câmara 2 com nova etiqueta', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'j_f5', num: 5, description: 'Armazenar arroz e feijão na Câmara 3 após passar no Irinox', responsible: 'COZINHA GERAL', completed: false, notes: '' },
        { id: 'j_f6', num: 6, description: 'Colocar as proteínas de hoje na câmara 2 e mudar as etiquetas', responsible: 'COZINHA GERAL', completed: false, notes: '' },
      ]
    }
  ],
  closingChecks: [...DEFAULT_CLOSING_CHECKS],
  pendingNotes: '',
  shiftSupervisor: '',
  receivedBy: '',
  lastUpdated: new Date().toISOString()
};

export const INITIAL_ORDERS: Record<string, ProductionOrder> = {
  madrugada: TEMPLATE_MADRUGADA,
  almoco: TEMPLATE_ALMOCO,
  jantar: TEMPLATE_JANTAR,
};
