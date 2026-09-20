import React from 'react';
import { ShiftType, FontSizeSetting } from '../types';
import { GauchaoLogo } from './GauchaoLogo';
import { 
  Printer, Edit3, Eye, Users, RefreshCw, 
  Type, CheckSquare
} from 'lucide-react';

interface HeaderNavigationProps {
  currentShift: ShiftType;
  onChangeShift: (shift: ShiftType) => void;
  viewMode: 'edit' | 'preview';
  onChangeViewMode: (mode: 'edit' | 'preview') => void;
  fontSize: FontSizeSetting;
  onChangeFontSize: (size: FontSizeSetting) => void;
  printBlankCheckboxes: boolean;
  onTogglePrintBlankCheckboxes: () => void;
  onPrint: () => void;
  onClearChecks: () => void;
  onOpenCollaborators: () => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentShift,
  onChangeShift,
  viewMode,
  onChangeViewMode,
  fontSize,
  onChangeFontSize,
  printBlankCheckboxes,
  onTogglePrintBlankCheckboxes,
  onPrint,
  onClearChecks,
  onOpenCollaborators,
}) => {
  const shifts: { id: ShiftType; label: string }[] = [
    { id: 'madrugada', label: 'Madrugada' },
    { id: 'almoco', label: 'Almoço' },
    { id: 'jantar', label: 'Jantar' },
  ];

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs no-print">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <GauchaoLogo variant="full" size={38} className="shrink-0" />
          <div>
            <span className="text-base font-black text-neutral-900 tracking-tight leading-none block">
              Gauchão Restaurante
            </span>
            <p className="text-xs text-neutral-500 font-bold mt-0.5">
              Ordem de Produção
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Print Blank Checkboxes Toggle */}
          <button
            type="button"
            onClick={onTogglePrintBlankCheckboxes}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
              printBlankCheckboxes
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
            title="Imprimir com quadradinhos em branco para marcação à caneta na cozinha"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Checkboxes:</span> {printBlankCheckboxes ? 'Em Branco' : 'Marcados'}
          </button>

          {/* Collaborators */}
          <button
            type="button"
            onClick={onOpenCollaborators}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Colaboradoras</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-black text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg shadow-sm transition-all cursor-pointer hover:shadow"
          >
            <Printer className="w-4 h-4" />
            Imprimir Ordem (A4)
          </button>
        </div>
      </div>

      {/* Secondary Controls Bar */}
      <div className="bg-neutral-50 border-t border-neutral-200 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Shift Selection Pills */}
          <div className="flex items-center gap-1.5 bg-neutral-200/70 p-1 rounded-xl">
            {shifts.map(s => {
              const active = currentShift === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChangeShift(s.id)}
                  className={`flex items-center px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer uppercase ${
                    active
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* View Mode & Font Size */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* View Mode */}
            <div className="flex items-center bg-white border border-neutral-300 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => onChangeViewMode('edit')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'edit'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editar Dados
              </button>
              <button
                type="button"
                onClick={() => onChangeViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'preview'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Visualizar A4
              </button>
            </div>

            {/* Font Size Selector (Crucial for older staff!) */}
            <div className="flex items-center gap-1 bg-white border border-neutral-300 rounded-lg px-2 py-1">
              <Type className="w-3.5 h-3.5 text-neutral-500 mr-1" />
              <span className="text-[11px] font-bold text-neutral-600 uppercase mr-1 hidden sm:inline">
                Tamanho da Fonte:
              </span>
              {(['compact', 'normal', 'large', 'extra'] as FontSizeSetting[]).map(sz => {
                const labels: Record<FontSizeSetting, string> = {
                  compact: 'Compacta',
                  normal: 'Normal',
                  large: 'Grande',
                  extra: 'Extra',
                };
                const active = fontSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => onChangeFontSize(sz)}
                    className={`px-2 py-0.5 text-[11px] font-extrabold rounded transition-colors cursor-pointer ${
                      active
                        ? 'bg-neutral-900 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                    title={`Ajustar tamanho da fonte para ${labels[sz]}`}
                  >
                    {labels[sz]}
                  </button>
                );
              })}
            </div>

            {/* Clear checkmarks button */}
            <button
              type="button"
              onClick={onClearChecks}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              title="Limpar todas as marcações de conclusão do turno"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
