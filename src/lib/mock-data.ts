export type ContractStatus = "ativo" | "vencendo" | "encerrado" | "pendente";

export type Contract = {
  id: string;
  numero: string;
  contraparte: string;
  tipo: "Compra" | "Venda";
  commodity: string;
  volume: number;
  unidade: string;
  preco: number;
  moeda: "BRL" | "USD";
  status: ContractStatus;
  inicio: string;
  vencimento: string;
  assinatura: string;
  local: string;
  incoterm: string;
  pagamento: string;
  observacoes: string;
  eventos: { data: string; titulo: string; descricao: string }[];
};

export const statusLabel: Record<ContractStatus, string> = {
  ativo: "Ativo",
  vencendo: "Vencendo",
  encerrado: "Encerrado",
  pendente: "Pendente",
};

export const contracts: Contract[] = [
  {
    id: "CT-2041",
    numero: "CT-2041/26",
    contraparte: "Agropecuária Vale Verde",
    tipo: "Compra",
    commodity: "Soja",
    volume: 12500,
    unidade: "ton",
    preco: 138.4,
    moeda: "BRL",
    status: "ativo",
    inicio: "2026-03-02",
    vencimento: "2026-11-30",
    assinatura: "2026-02-24",
    local: "Sorriso / MT",
    incoterm: "FOB",
    pagamento: "30 dias após embarque",
    observacoes:
      "Contrato com cláusula de reajuste trimestral atrelada ao indicador CEPEA. Entrega parcelada em 4 lotes.",
    eventos: [
      { data: "2026-08-04", titulo: "Lote 3 embarcado", descricao: "3.125 ton embarcadas no terminal de Rondonópolis." },
      { data: "2026-06-12", titulo: "Reajuste aplicado", descricao: "Preço ajustado de R$ 135,10 para R$ 138,40 por saca." },
      { data: "2026-03-02", titulo: "Contrato iniciado", descricao: "Vigência iniciada após assinatura das duas partes." },
    ],
  },
  {
    id: "CT-2038",
    numero: "CT-2038/26",
    contraparte: "Trading Norte Grãos",
    tipo: "Venda",
    commodity: "Milho",
    volume: 8400,
    unidade: "ton",
    preco: 62.9,
    moeda: "BRL",
    status: "vencendo",
    inicio: "2026-01-15",
    vencimento: "2026-09-05",
    assinatura: "2026-01-08",
    local: "Rio Verde / GO",
    incoterm: "CIF",
    pagamento: "À vista contra entrega",
    observacoes: "Renovação em negociação. Contraparte solicitou extensão de 90 dias para o saldo remanescente.",
    eventos: [
      { data: "2026-08-10", titulo: "Alerta de vencimento", descricao: "Faltam menos de 30 dias para o encerramento." },
      { data: "2026-05-20", titulo: "Aditivo assinado", descricao: "Volume ampliado em 900 ton." },
    ],
  },
  {
    id: "CT-2029",
    numero: "CT-2029/26",
    contraparte: "Café Serra Alta Ltda.",
    tipo: "Compra",
    commodity: "Café Arábica",
    volume: 1800,
    unidade: "sc",
    preco: 1245.0,
    moeda: "BRL",
    status: "ativo",
    inicio: "2026-04-10",
    vencimento: "2027-01-20",
    assinatura: "2026-04-01",
    local: "Patrocínio / MG",
    incoterm: "FOB",
    pagamento: "50% antecipado / 50% na entrega",
    observacoes: "Padrão de qualidade bebida dura, peneira 16 acima. Amostragem obrigatória por lote.",
    eventos: [
      { data: "2026-07-28", titulo: "Amostra aprovada", descricao: "Lote 2 aprovado pelo laboratório interno." },
      { data: "2026-04-10", titulo: "Contrato iniciado", descricao: "Primeiro pagamento antecipado liquidado." },
    ],
  },
  {
    id: "CT-2017",
    numero: "CT-2017/25",
    contraparte: "Usina Canavial S.A.",
    tipo: "Venda",
    commodity: "Açúcar VHP",
    volume: 22000,
    unidade: "ton",
    preco: 92.15,
    moeda: "USD",
    status: "ativo",
    inicio: "2025-12-01",
    vencimento: "2026-12-01",
    assinatura: "2025-11-18",
    local: "Santos / SP",
    incoterm: "FOB Santos",
    pagamento: "Carta de crédito irrevogável",
    observacoes: "Preço referenciado ao contrato NY nº 11 com prêmio fixo de USD 1,20/ton.",
    eventos: [
      { data: "2026-07-02", titulo: "Embarque parcial", descricao: "6.000 ton embarcadas no porto de Santos." },
      { data: "2026-02-15", titulo: "Hedge registrado", descricao: "Cobertura de 60% do volume em bolsa." },
    ],
  },
  {
    id: "CT-2008",
    numero: "CT-2008/25",
    contraparte: "Fazenda Boa Safra",
    tipo: "Compra",
    commodity: "Algodão",
    volume: 3400,
    unidade: "ton",
    preco: 8.95,
    moeda: "BRL",
    status: "vencendo",
    inicio: "2025-10-05",
    vencimento: "2026-09-18",
    assinatura: "2025-09-28",
    local: "Luís Eduardo Magalhães / BA",
    incoterm: "CIF",
    pagamento: "45 dias",
    observacoes: "Classificação HVI obrigatória. Saldo pendente de 420 ton.",
    eventos: [{ data: "2026-08-01", titulo: "Saldo pendente", descricao: "420 ton ainda não entregues." }],
  },
  {
    id: "CT-1994",
    numero: "CT-1994/25",
    contraparte: "Cooperativa Sul Cereais",
    tipo: "Venda",
    commodity: "Trigo",
    volume: 5200,
    unidade: "ton",
    preco: 1420.0,
    moeda: "BRL",
    status: "encerrado",
    inicio: "2025-06-01",
    vencimento: "2026-05-30",
    assinatura: "2025-05-22",
    local: "Passo Fundo / RS",
    incoterm: "FOB",
    pagamento: "30 dias",
    observacoes: "Contrato liquidado integralmente sem pendências.",
    eventos: [{ data: "2026-05-30", titulo: "Contrato encerrado", descricao: "Última parcela liquidada." }],
  },
  {
    id: "CT-2052",
    numero: "CT-2052/26",
    contraparte: "Global Feed Import",
    tipo: "Venda",
    commodity: "Soja",
    volume: 15000,
    unidade: "ton",
    preco: 141.2,
    moeda: "USD",
    status: "pendente",
    inicio: "2026-09-01",
    vencimento: "2027-04-30",
    assinatura: "2026-08-12",
    local: "Paranaguá / PR",
    incoterm: "FOB Paranaguá",
    pagamento: "Carta de crédito",
    observacoes: "Aguardando aprovação de crédito da contraparte para início da vigência.",
    eventos: [{ data: "2026-08-12", titulo: "Assinatura registrada", descricao: "Documentação em análise pelo jurídico." }],
  },
  {
    id: "CT-2044",
    numero: "CT-2044/26",
    contraparte: "Moageira Central",
    tipo: "Compra",
    commodity: "Milho",
    volume: 9600,
    unidade: "ton",
    preco: 61.4,
    moeda: "BRL",
    status: "ativo",
    inicio: "2026-05-18",
    vencimento: "2027-02-28",
    assinatura: "2026-05-09",
    local: "Uberlândia / MG",
    incoterm: "CIF",
    pagamento: "21 dias",
    observacoes: "Entrega mensal programada de 1.200 ton.",
    eventos: [{ data: "2026-08-05", titulo: "Entrega mensal", descricao: "1.200 ton recebidas conforme cronograma." }],
  },
];

export type Commodity = {
  id: string;
  nome: string;
  unidade: string;
  moeda: string;
  preco: number;
  variacaoDia: number;
  variacaoMes: number;
  bolsa: string;
  serie: { data: string; valor: number }[];
};

function serie(base: number, drift: number, seed: number) {
  const meses = ["Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan"];
  return meses.map((m, i) => {
    const wave = Math.sin((i + seed) * 0.9) * base * 0.035;
    const valor = base + drift * i + wave;
    return { data: m, valor: Number(valor.toFixed(2)) };
  });
}

export const commodities: Commodity[] = [
  {
    id: "soja",
    nome: "Soja",
    unidade: "sc 60kg",
    moeda: "BRL",
    preco: 138.4,
    variacaoDia: 0.86,
    variacaoMes: 4.2,
    bolsa: "CEPEA / ESALQ",
    serie: serie(128, 0.95, 1),
  },
  {
    id: "milho",
    nome: "Milho",
    unidade: "sc 60kg",
    moeda: "BRL",
    preco: 62.9,
    variacaoDia: -0.42,
    variacaoMes: -1.8,
    bolsa: "CEPEA / ESALQ",
    serie: serie(66, -0.32, 3),
  },
  {
    id: "cafe",
    nome: "Café Arábica",
    unidade: "sc 60kg",
    moeda: "BRL",
    preco: 1245.0,
    variacaoDia: 1.74,
    variacaoMes: 7.6,
    bolsa: "CEPEA / ESALQ",
    serie: serie(1120, 11.5, 2),
  },
  {
    id: "acucar",
    nome: "Açúcar VHP",
    unidade: "ton",
    moeda: "USD",
    preco: 92.15,
    variacaoDia: 0.24,
    variacaoMes: -0.9,
    bolsa: "ICE NY nº 11",
    serie: serie(95, -0.28, 5),
  },
  {
    id: "algodao",
    nome: "Algodão",
    unidade: "@",
    moeda: "BRL",
    preco: 8.95,
    variacaoDia: -1.12,
    variacaoMes: 2.4,
    bolsa: "CEPEA / ESALQ",
    serie: serie(8.4, 0.05, 4),
  },
  {
    id: "trigo",
    nome: "Trigo",
    unidade: "ton",
    moeda: "BRL",
    preco: 1420.0,
    variacaoDia: 0.35,
    variacaoMes: 1.1,
    bolsa: "CEPEA / ESALQ",
    serie: serie(1380, 4.2, 6),
  },
];

export const alertas = [
  {
    tipo: "warning" as const,
    titulo: "2 contratos vencem em até 30 dias",
    descricao: "CT-2038/26 e CT-2008/25 precisam de renovação ou encerramento.",
  },
  {
    tipo: "info" as const,
    titulo: "Café acumula alta de 7,6% no mês",
    descricao: "Preço contratado do CT-2029/26 está 4,1% abaixo do mercado.",
  },
  {
    tipo: "success" as const,
    titulo: "Hedge de açúcar em 60%",
    descricao: "Cobertura dentro da política de risco definida para o trimestre.",
  },
];

export const currency = (value: number, moeda = "BRL") =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: moeda, maximumFractionDigits: 2 }).format(value);

export const compact = (value: number) =>
  new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const dateBR = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("pt-BR");

export const contractValue = (c: Contract) => c.volume * c.preco;

export const kpis = () => {
  const ativos = contracts.filter((c) => c.status === "ativo").length;
  const vencendo = contracts.filter((c) => c.status === "vencendo").length;
  const valorTotal = contracts
    .filter((c) => c.status !== "encerrado")
    .reduce((sum, c) => sum + contractValue(c) * (c.moeda === "USD" ? 5.4 : 1), 0);
  const volumeTotal = contracts
    .filter((c) => c.status !== "encerrado" && c.unidade === "ton")
    .reduce((sum, c) => sum + c.volume, 0);
  return { total: contracts.length, ativos, vencendo, valorTotal, volumeTotal };
};
