'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Heart, Loader2, Baby, Users, Sparkles } from 'lucide-react';
import { createUserProfile, getCurrentUser } from '@/lib/auth';
import type { MomentoType, OnboardingData } from '@/types';
import { toast } from 'sonner';

const momentos = [
  { value: 'tentante', label: 'Tentando engravidar', icon: Heart },
  { value: 'gestante', label: 'Gestante', icon: Baby },
  { value: 'pos_parto', label: 'Pós-parto', icon: Sparkles },
  { value: 'bebe', label: 'Bebê 0-24 meses', icon: Baby },
  { value: 'papai', label: 'Papai/Família', icon: Users },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    nome: '',
    idade: 0,
    cidade: '',
    momento: 'gestante',
    semanas_gestacao: undefined,
    idade_bebe_meses: undefined,
    preferencias_notificacoes: true,
    ritmo_emocional: 'moderado',
  });

  const handleNext = () => {
    if (step === 1 && (!formData.nome || !formData.idade || !formData.cidade)) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (step === 2 && formData.momento === 'gestante' && !formData.semanas_gestacao) {
      toast.error('Informe as semanas de gestação');
      return;
    }
    if (step === 2 && (formData.momento === 'bebe' || formData.momento === 'pos_parto') && !formData.idade_bebe_meses) {
      toast.error('Informe a idade do bebê');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await createUserProfile(user.id, formData);
      if (error) throw error;

      toast.success('Perfil criado com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl rounded-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 shadow-lg">
              <Heart className="h-9 w-9 text-white" fill="white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {step === 1 && 'Vamos nos conhecer'}
              {step === 2 && 'Qual é o seu momento?'}
              {step === 3 && 'Últimos ajustes'}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Passo {step} de 3
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Dados Pessoais */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Como você gostaria de ser chamada?"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    placeholder="25"
                    value={formData.idade || ''}
                    onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) })}
                    className="h-12 rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    placeholder="São Paulo"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="h-12 rounded-2xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Momento */}
          {step === 2 && (
            <div className="space-y-6">
              <RadioGroup
                value={formData.momento}
                onValueChange={(value) => setFormData({ ...formData, momento: value as MomentoType })}
                className="space-y-3"
              >
                {momentos.map((momento) => {
                  const Icon = momento.icon;
                  return (
                    <div key={momento.value} className="flex items-center space-x-3 rounded-2xl border-2 p-4 hover:border-pink-300 transition-colors cursor-pointer">
                      <RadioGroupItem value={momento.value} id={momento.value} />
                      <Label htmlFor={momento.value} className="flex items-center gap-3 cursor-pointer flex-1">
                        <Icon className="h-5 w-5 text-pink-500" />
                        <span className="font-medium">{momento.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {formData.momento === 'gestante' && (
                <div className="space-y-2">
                  <Label htmlFor="semanas">Semanas de gestação</Label>
                  <Input
                    id="semanas"
                    type="number"
                    placeholder="12"
                    min="1"
                    max="42"
                    value={formData.semanas_gestacao || ''}
                    onChange={(e) => setFormData({ ...formData, semanas_gestacao: parseInt(e.target.value) })}
                    className="h-12 rounded-2xl"
                  />
                </div>
              )}

              {(formData.momento === 'bebe' || formData.momento === 'pos_parto') && (
                <div className="space-y-2">
                  <Label htmlFor="idade_bebe">Idade do bebê (meses)</Label>
                  <Input
                    id="idade_bebe"
                    type="number"
                    placeholder="3"
                    min="0"
                    max="24"
                    value={formData.idade_bebe_meses || ''}
                    onChange={(e) => setFormData({ ...formData, idade_bebe_meses: parseInt(e.target.value) })}
                    className="h-12 rounded-2xl"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Preferências */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-2xl border-2 p-4">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Notificações</Label>
                  <p className="text-sm text-gray-500">Receber lembretes e dicas diárias</p>
                </div>
                <Switch
                  checked={formData.preferencias_notificacoes}
                  onCheckedChange={(checked) => setFormData({ ...formData, preferencias_notificacoes: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Ritmo emocional</Label>
                <RadioGroup
                  value={formData.ritmo_emocional}
                  onValueChange={(value) => setFormData({ ...formData, ritmo_emocional: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3 rounded-2xl border-2 p-3">
                    <RadioGroupItem value="calmo" id="calmo" />
                    <Label htmlFor="calmo" className="cursor-pointer flex-1">Calmo - Conteúdo mais espaçado</Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-2xl border-2 p-3">
                    <RadioGroupItem value="moderado" id="moderado" />
                    <Label htmlFor="moderado" className="cursor-pointer flex-1">Moderado - Equilíbrio</Label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-2xl border-2 p-3">
                    <RadioGroupItem value="intenso" id="intenso" />
                    <Label htmlFor="intenso" className="cursor-pointer flex-1">Intenso - Máximo de informações</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 h-12 rounded-2xl"
              >
                Voltar
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
              >
                Continuar
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Começar'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
