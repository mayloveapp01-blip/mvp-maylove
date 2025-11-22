import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          nome: string;
          email: string;
          idade: number | null;
          cidade: string | null;
          momento: 'tentante' | 'gestante' | 'pos_parto' | 'bebe' | 'papai';
          semanas_gestacao: number | null;
          idade_bebe_meses: number | null;
          data_criacao: string;
          preferencias_notificacoes: boolean;
          ritmo_emocional: string | null;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'data_criacao'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      diario: {
        Row: {
          id: string;
          user_id: string;
          humor: string;
          sintomas: string | null;
          sono_horas: number | null;
          anotacoes: string | null;
          data: string;
        };
        Insert: Omit<Database['public']['Tables']['diario']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['diario']['Insert']>;
      };
      agenda: {
        Row: {
          id: string;
          user_id: string;
          tipo: 'consulta' | 'vacina' | 'exame';
          data: string;
          descricao: string;
          concluido: boolean;
        };
        Insert: Omit<Database['public']['Tables']['agenda']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['agenda']['Insert']>;
      };
      videos: {
        Row: {
          id: string;
          titulo: string;
          url: string;
          semana_recomendada: number | null;
          categoria: string;
          duracao: number;
        };
        Insert: Omit<Database['public']['Tables']['videos']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['videos']['Insert']>;
      };
    };
  };
};
