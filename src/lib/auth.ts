import { supabase } from './supabase';
import type { OnboardingData } from '@/types';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function createUserProfile(userId: string, profileData: OnboardingData) {
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      nome: profileData.nome,
      email: '', // será preenchido pelo trigger
      idade: profileData.idade,
      cidade: profileData.cidade,
      momento: profileData.momento,
      semanas_gestacao: profileData.semanas_gestacao,
      idade_bebe_meses: profileData.idade_bebe_meses,
      preferencias_notificacoes: profileData.preferencias_notificacoes,
      ritmo_emocional: profileData.ritmo_emocional,
    });
  
  return { data, error };
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
}

export async function updateUserProfile(userId: string, updates: Partial<OnboardingData>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);
  
  return { data, error };
}
