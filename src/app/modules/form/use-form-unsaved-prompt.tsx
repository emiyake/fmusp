import * as React from 'react';
import { useBeforeUnload, useBlocker } from 'react-router';

type Options = {
  /** true quando a página está "suja" (há dados não salvos) */
  when: boolean;
  /** chamada quando o usuário confirma sair (opcional) */
  onConfirmLeave?: () => void;
  /** chamada quando o usuário cancela a saída (opcional) */
  onCancelLeave?: () => void;
};

/**
 * Bloqueia navegação interna (SPA) e alerta em fechar/atualizar a aba
 * quando `when` for true.
 */
export function useUnsavedChangesPrompt({ when, onConfirmLeave, onCancelLeave }: Options) {
  // 1) Fechar/atualizar a aba (fora do SPA)
  useBeforeUnload(
    React.useCallback(
      (e: BeforeUnloadEvent) => {
        if (!when) return;
        // browsers modernos exigem setar returnValue (texto customizado é ignorado)
        e.preventDefault();
        e.returnValue = '';
      },
      [when],
    ),
  );

  // 2) Navegação interna (SPA) com confirmação
  const blocker = useBlocker(when);

  React.useEffect(() => {
    if (blocker.state !== 'blocked') return;

    // Você pode trocar por um modal customizado do seu design system
    const ok = window.confirm('Você tem alterações não salvas. Deseja realmente sair desta página?');

    if (ok) {
      onConfirmLeave?.();
      blocker.proceed(); // segue a navegação
    } else {
      onCancelLeave?.();
      blocker.reset(); // permanece na página
    }
  }, [blocker, onConfirmLeave, onCancelLeave]);
}
