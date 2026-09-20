import React from 'react';
import { ProductionOrder, FontSizeSetting } from '../types';
import { GauchaoLogo } from './GauchaoLogo';
import { Check, Moon, Sun, Utensils } from 'lucide-react';

interface PrintableSheetProps {
  order: ProductionOrder;
  fontSize: FontSizeSetting;
  tonerSaveMode?: boolean;
  printBlankCheckboxes?: boolean;
  onToggleTask?: (sectionId: string, taskId: string) => void;
  onToggleClosingCheck?: (checkId: string) => void;
  isInteractive?: boolean;
}

export const PrintableSheet: React.FC<PrintableSheetProps> = ({
  order,
  fontSize,
  tonerSaveMode = true,
  printBlankCheckboxes = false,
  onToggleTask,
  onToggleClosingCheck,
  isInteractive = true,
}) => {
  // Balanced font scale classes designed strictly to stay within 1 A4 page
  const fontSizes = {
    compact: {
      title: 'text-sm font-black',
      headerMeta: 'text-[10px] font-bold',
      headerValue: 'text-xs font-bold leading-tight',
      sectionTitle: 'text-xs font-black',
      tableTh: 'text-[10px] font-black',
      taskNum: 'text-[11px] font-bold',
      taskText: 'text-[11px] font-bold leading-tight',
      taskResp: 'text-[11px] font-bold leading-tight',
      taskNotes: 'text-[10px] font-medium leading-tight',
      closingText: 'text-[10.5px] font-bold leading-tight',
      footer: 'text-xs font-bold',
      rowPadding: 'py-1 px-1.5',
    },
    normal: {
      title: 'text-base font-black',
      headerMeta: 'text-[10.5px] font-bold',
      headerValue: 'text-xs sm:text-[13px] font-black leading-tight',
      sectionTitle: 'text-xs sm:text-[13px] font-black',
      tableTh: 'text-[10.5px] sm:text-[11px] font-black',
      taskNum: 'text-xs font-black',
      taskText: 'text-xs sm:text-[12.5px] font-bold leading-tight',
      taskResp: 'text-xs sm:text-[12px] font-black leading-tight',
      taskNotes: 'text-[11px] font-medium leading-tight',
      closingText: 'text-[11px] sm:text-xs font-bold leading-tight',
      footer: 'text-xs font-bold',
      rowPadding: 'py-1.5 px-2',
    },
    large: {
      title: 'text-base sm:text-lg font-black',
      headerMeta: 'text-[11px] font-bold',
      headerValue: 'text-xs sm:text-sm font-black leading-tight',
      sectionTitle: 'text-xs sm:text-sm font-black',
      tableTh: 'text-[11px] sm:text-xs font-black',
      taskNum: 'text-xs sm:text-sm font-black',
      taskText: 'text-[13px] sm:text-[13.5px] font-bold leading-tight',
      taskResp: 'text-xs sm:text-[12.5px] font-black leading-tight',
      taskNotes: 'text-[11.5px] sm:text-xs font-semibold leading-tight',
      closingText: 'text-[11.5px] sm:text-xs font-bold leading-tight',
      footer: 'text-xs sm:text-sm font-bold',
      rowPadding: 'py-1.5 px-2',
    },
    extra: {
      title: 'text-lg sm:text-xl font-black',
      headerMeta: 'text-xs font-bold',
      headerValue: 'text-sm sm:text-[15px] font-black leading-tight',
      sectionTitle: 'text-sm font-black',
      tableTh: 'text-[11.5px] sm:text-xs font-black',
      taskNum: 'text-sm font-black',
      taskText: 'text-[14px] sm:text-[14.5px] font-extrabold leading-tight',
      taskResp: 'text-[12.5px] sm:text-[13px] font-black leading-tight',
      taskNotes: 'text-xs sm:text-[12.5px] font-bold leading-tight',
      closingText: 'text-xs sm:text-[12.5px] font-extrabold leading-tight',
      footer: 'text-xs sm:text-sm font-black',
      rowPadding: 'py-1.5 px-2',
    },
  }[fontSize];

  // Toner-saving palette: minimal toner usage with sharp contrast
  const borderColor = 'border-neutral-900';
  const subHeaderBg = 'bg-neutral-100 text-neutral-900';
  const alertBg = 'bg-white text-neutral-900 border-y-2 border-neutral-900';

  // Helper for Shift Icon displayed strictly next to the word "TURNO"
  const renderShiftIcon = (shift: string) => {
    switch (shift.toLowerCase()) {
      case 'madrugada':
        return <Moon className="w-3.5 h-3.5 text-neutral-800 shrink-0 inline" />;
      case 'almoco':
      case 'almoço':
        return <Sun className="w-3.5 h-3.5 text-neutral-800 shrink-0 inline" />;
      case 'jantar':
        return <Utensils className="w-3.5 h-3.5 text-neutral-800 shrink-0 inline" />;
      default:
        return null;
    }
  };

  return (
    <div
      id="printable-a4-order"
      className={`print-page a4-sheet bg-white text-neutral-950 font-sans mx-auto shadow-xl print:shadow-none transition-all ${borderColor} border-2 print:border-2`}
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '292mm',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. TOP TITLE HEADER - Brand identity matching edition & preview */}
      <div
        className="w-full py-2.5 px-4 border-b-2 border-neutral-900 bg-white flex items-center justify-center gap-3.5"
      >
        <GauchaoLogo
          variant="full"
          size={38}
          className="shrink-0"
        />
        <div className="flex flex-col justify-center">
          <span className="text-lg sm:text-xl font-black text-neutral-950 tracking-tight leading-none uppercase">
            Gauchão Restaurante
          </span>
          <p className="text-xs sm:text-[13px] font-bold text-neutral-600 uppercase tracking-wide mt-0.5 leading-none">
            Ordem de Produção
          </p>
        </div>
      </div>

      {/* 2. METADATA HEADER GRID (DATA | TURNO | CARDÁPIO DO DIA | RESPONSÁVEIS) */}
      <div className={`grid grid-cols-12 border-b-2 ${borderColor} text-center divide-x-2 ${borderColor}`}>
        {/* Col 1: DATA (2 cols) */}
        <div className="col-span-2 flex flex-col justify-between py-1.5 px-1 bg-white">
          <span className={`${fontSizes.headerMeta} text-neutral-600 font-bold uppercase tracking-wider`}>
            DATA
          </span>
          <div className="my-auto py-1">
            <span className={`${fontSizes.headerValue} text-neutral-950 tracking-tight font-mono`}>
              {order.date || '___/___/______'}
            </span>
          </div>
        </div>

        {/* Col 2: TURNO (2 cols) - Icon sits beside the label "TURNO", only name below */}
        <div className="col-span-2 flex flex-col justify-between py-1.5 px-1 bg-white">
          <span className={`${fontSizes.headerMeta} text-neutral-600 font-bold uppercase tracking-wider flex items-center justify-center gap-1`}>
            TURNO {renderShiftIcon(order.shift)}
          </span>
          <div className="my-auto py-1 text-center">
            <span className={`${fontSizes.headerValue} text-neutral-950 uppercase`}>
              {order.shift}
            </span>
          </div>
        </div>

        {/* Col 3: CARDÁPIO DO DIA (5 cols) */}
        <div className="col-span-5 flex flex-col justify-between py-1.5 px-2 bg-white">
          <span className={`${fontSizes.headerMeta} text-neutral-600 font-bold uppercase tracking-wider`}>
            CARDÁPIO DO DIA
          </span>
          <div className="my-auto py-1">
            <span className={`${fontSizes.headerValue} text-neutral-950 leading-tight block uppercase break-words`}>
              {order.menu || 'CARDÁPIO NÃO INFORMADO'}
            </span>
          </div>
        </div>

        {/* Col 4: RESPONSÁVEIS PELA ELABORAÇÃO (3 cols) */}
        <div className="col-span-3 flex flex-col justify-between py-1.5 px-2 bg-white">
          <span className={`${fontSizes.headerMeta} text-neutral-600 font-bold uppercase tracking-tight leading-none`}>
            RESPONSÁVEIS PELA ELABORAÇÃO:
          </span>
          <div className="my-auto py-1">
            <span className={`${fontSizes.headerValue} text-neutral-950 leading-tight block uppercase font-mono break-words`}>
              {order.elaboratedBy || '_________________'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. SAFETY & INSTRUCTION BANNER */}
      <div className={`py-1 px-3 text-center ${alertBg}`}>
        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-950">
          SIGA A ORDEM DAS ETAPAS — MARQUE ✓ QUANDO CONCLUIR — SE FICAR PENDENTE, REGISTRE O MOTIVO
        </p>
      </div>

      {/* 4. TASK SECTIONS TABLE */}
      <div className="w-full">
        {order.sections.map((section) => (
          <div key={section.id} className="w-full border-b-2 border-neutral-900">
            {/* Section Banner */}
            <div
              className={`w-full py-1 px-3 text-center border-b border-neutral-900 ${subHeaderBg}`}
            >
              <h2 className={`${fontSizes.sectionTitle} uppercase tracking-widest text-neutral-950`}>
                {section.title}
              </h2>
            </div>

            {/* Table Header Columns with fixed widths & expanded Observação / Pendência */}
            <table className="print-table w-full border-collapse table-fixed">
              <thead>
                <tr className="border-b-2 border-neutral-900 bg-neutral-100 text-neutral-900">
                  <th style={{ width: '5%' }} className={`border-r border-neutral-900 text-center ${fontSizes.tableTh} py-1`}>
                    Nº
                  </th>
                  <th style={{ width: '39%' }} className={`border-r border-neutral-900 text-left px-2 ${fontSizes.tableTh} py-1`}>
                    O QUE FAZER
                  </th>
                  <th style={{ width: '17%' }} className={`border-r border-neutral-900 text-center px-1 ${fontSizes.tableTh} py-1`}>
                    RESPONSÁVEL
                  </th>
                  <th style={{ width: '5%' }} className={`border-r border-neutral-900 text-center ${fontSizes.tableTh} py-1`}>
                    ✓
                  </th>
                  <th style={{ width: '34%' }} className={`text-left px-2 ${fontSizes.tableTh} py-1`}>
                    OBSERVAÇÃO / PENDÊNCIA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {section.items.map((item, itemIdx) => {
                  const isChecked = item.completed && !printBlankCheckboxes;
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-neutral-50/70 transition-colors ${
                        isChecked ? 'bg-neutral-100/40' : ''
                      }`}
                    >
                      {/* Nº */}
                      <td
                        className={`border-r border-neutral-900 text-center ${fontSizes.taskNum} ${fontSizes.rowPadding} text-neutral-950`}
                      >
                        {item.num ?? itemIdx + 1}
                      </td>

                      {/* O QUE FAZER */}
                      <td
                        className={`border-r border-neutral-900 text-left ${fontSizes.taskText} ${fontSizes.rowPadding} text-neutral-950 uppercase break-words`}
                      >
                        {item.description || (
                          <span className="text-neutral-300 italic">—</span>
                        )}
                      </td>

                      {/* RESPONSÁVEL */}
                      <td
                        className={`border-r border-neutral-900 text-center ${fontSizes.taskResp} ${fontSizes.rowPadding} text-neutral-950 uppercase break-words`}
                      >
                        {item.responsible || '—'}
                      </td>

                      {/* ✓ CHECKBOX BOX */}
                      <td
                        className={`border-r border-neutral-900 text-center ${fontSizes.rowPadding} align-middle`}
                      >
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            disabled={!isInteractive}
                            onClick={() => onToggleTask && onToggleTask(section.id, item.id)}
                            className={`w-4.5 h-4.5 sm:w-5 sm:h-5 border-2 border-neutral-950 rounded-xs flex items-center justify-center transition-colors ${
                              isInteractive ? 'cursor-pointer hover:bg-neutral-100' : ''
                            } ${isChecked ? 'bg-neutral-950 text-white print:bg-neutral-950' : 'bg-white'}`}
                            title={isInteractive ? 'Marcar / Desmarcar como concluído' : ''}
                          >
                            {isChecked && (
                              <Check className="w-3.5 h-3.5 stroke-[3.5] text-white print:text-white" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* OBSERVAÇÃO / PENDÊNCIA (Spacious 34% width for clear handwriting or notes) */}
                      <td
                        className={`text-left ${fontSizes.taskNotes} ${fontSizes.rowPadding} text-neutral-900 uppercase break-words`}
                      >
                        {item.notes || ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* 5. FECHAMENTO DO TURNO CHECKLIST GRID */}
      <div className={`w-full border-b-2 ${borderColor}`}>
        <div className={`w-full py-1 px-3 text-center border-b border-neutral-900 ${subHeaderBg}`}>
          <h2 className={`${fontSizes.sectionTitle} uppercase tracking-widest`}>
            FECHAMENTO DO TURNO
          </h2>
        </div>

        {/* 3x3 Grid Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-neutral-900 text-neutral-950">
          {[0, 1, 2].map(colIdx => {
            const colChecks = order.closingChecks.slice(colIdx * 3, colIdx * 3 + 3);
            return (
              <div key={colIdx} className="divide-y divide-neutral-900">
                {colChecks.map(check => {
                  const isChecked = check.checked && !printBlankCheckboxes;
                  return (
                    <div
                      key={check.id}
                      onClick={() => isInteractive && onToggleClosingCheck && onToggleClosingCheck(check.id)}
                      className={`flex items-center justify-between gap-2 px-2 py-1.5 hover:bg-neutral-50 transition-colors ${
                        isInteractive ? 'cursor-pointer' : ''
                      } ${isChecked ? 'bg-neutral-100/50' : ''}`}
                    >
                      <span className={`${fontSizes.closingText} text-neutral-950 uppercase leading-tight flex-1 break-words`}>
                        {check.label}
                      </span>
                      <div className="shrink-0 flex items-center justify-center">
                        <div
                          className={`w-4.5 h-4.5 border-2 border-neutral-950 rounded-xs flex items-center justify-center ${
                            isChecked ? 'bg-neutral-950 text-white' : 'bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3.5] text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. PENDÊNCIA / RECADO PARA O PRÓXIMO TURNO */}
      <div className={`w-full border-b-2 ${borderColor}`}>
        <div className="w-full py-1 px-3 text-center border-b border-neutral-900 bg-neutral-100">
          <h3 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-neutral-950">
            PENDÊNCIA / RECADO PARA O PRÓXIMO TURNO
          </h3>
        </div>
        <div className="p-2 min-h-[56px] sm:min-h-[64px] bg-white flex flex-col justify-start">
          {order.pendingNotes ? (
            <p className="text-xs sm:text-[13px] font-bold uppercase text-neutral-900 whitespace-pre-line leading-relaxed break-words">
              {order.pendingNotes}
            </p>
          ) : (
            <div className="w-full h-full flex flex-col justify-around gap-2.5 py-1">
              <div className="border-b border-dashed border-neutral-400 w-full h-3"></div>
              <div className="border-b border-dashed border-neutral-400 w-full h-3"></div>
              <div className="border-b border-dashed border-neutral-400 w-full h-3"></div>
            </div>
          )}
        </div>
      </div>

      {/* 7. BOTTOM SIGNATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-2 border-neutral-900 py-2 px-4 bg-white">
        <div className="py-1 sm:pr-4 flex items-baseline gap-2">
          <span className={`${fontSizes.footer} text-neutral-950 uppercase shrink-0`}>
            RESPONSÁVEL PELO TURNO:
          </span>
          <span className="flex-1 border-b-2 border-neutral-950 pb-0.5 text-xs font-mono font-bold uppercase text-neutral-900 break-words">
            {order.shiftSupervisor || ''}
          </span>
        </div>
        <div className="py-1 sm:pl-4 flex items-baseline gap-2">
          <span className={`${fontSizes.footer} text-neutral-950 uppercase shrink-0`}>
            QUEM RECEBEU:
          </span>
          <span className="flex-1 border-b-2 border-neutral-950 pb-0.5 text-xs font-mono font-bold uppercase text-neutral-900 break-words">
            {order.receivedBy || ''}
          </span>
        </div>
      </div>
    </div>
  );
};
