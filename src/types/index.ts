export type MomentoType = 'tentante' | 'gestante' | 'pos_parto' | 'bebe' | 'papai';

export interface User {
  id: string;
  nome: string;
  email: string;
  idade?: number;
  cidade?: string;
  momento: MomentoType;
  semanas_gestacao?: number;
  idade_bebe_meses?: number;
  data_criacao: string;
  preferencias_notificacoes: boolean;
  ritmo_emocional?: string;
}

export interface DiarioEntry {
  id: string;
  user_id: string;
  humor: string;
  sintomas?: string;
  sono_horas?: number;
  anotacoes?: string;
  data: string;
}

export interface AgendaItem {
  id: string;
  user_id: string;
  tipo: 'consulta' | 'vacina' | 'exame';
  data: string;
  descricao: string;
  concluido: boolean;
}

export interface Video {
  id: string;
  titulo: string;
  url: string;
  semana_recomendada?: number;
  categoria: string;
  duracao: number;
}

export interface OnboardingData {
  nome: string;
  idade: number;
  cidade: string;
  momento: MomentoType;
  semanas_gestacao?: number;
  idade_bebe_meses?: number;
  preferencias_notificacoes: boolean;
  ritmo_emocional?: string;
}

export interface BabySize {
  semana: number;
  tamanho_cm: number;
  peso_g: number;
  comparacao: string;
  marco_desenvolvimento: string;
  cuidados_mae: string[];
  exames_importantes: string[];
}
