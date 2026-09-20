import React, { useState } from 'react';
import { ProductionOrder, ProductionSection, TaskItem, Collaborator, ShiftType } from '../types';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Users, 
  Calendar, Utensils, UserCheck, MessageSquare, ClipboardCheck,
  CheckCircle2, Sparkles, Copy, FileText
} from 'lucide-react';

interface EditorViewProps {
  order: ProductionOrder;
  collaborators: Collaborator[];
  onUpdateOrder: (updated: ProductionOrder) => void;
  onOpenCollaborators: () => void;
  onResetToTemplate: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  order,
  collaborators,
  onUpdateOrder,
  onOpenCollaborators,
  onResetToTemplate,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(order.sections[0]?.id || '');

  // Header updates
  const handleDateChange = (val: string) => {
    onUpdateOrder({ ...order, date: val, lastUpdated: new Date().toISOString() });
  };

  const handleMenuChange = (val: string) => {
    onUpdateOrder({ ...order, menu: val.toUpperCase(), lastUpdated: new Date().toISOString() });
  };

  const handleElaboratedByChange = (val: string) => {
    onUpdateOrder({ ...order, elaboratedBy: val.toUpperCase(), lastUpdated: new Date().toISOString() });
  };

  const handlePendingNotesChange = (val: string) => {
    onUpdateOrder({ ...order, pendingNotes: val.toUpperCase(), lastUpdated: new Date().toISOString() });
  };

  const handleSupervisorChange = (val: string) => {
    onUpdateOrder({ ...order, shiftSupervisor: val.toUpperCase(), lastUpdated: new Date().toISOString() });
  };

  const handleReceivedByChange = (val: string) => {
    onUpdateOrder({ ...order, receivedBy: val.toUpperCase(), lastUpdated: new Date().toISOString() });
  };

  // Task manipulations
  const handleUpdateTask = (sectionId: string, taskId: string, field: keyof TaskItem, value: any) => {
    const updatedSections = order.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      const updatedItems = sec.items.map(item => {
        if (item.id !== taskId) return item;
        return {
          ...item,
          [field]: typeof value === 'string' ? value.toUpperCase() : value,
        };
      });
      return { ...sec, items: updatedItems };
    });

    onUpdateOrder({ ...order, sections: updatedSections, lastUpdated: new Date().toISOString() });
  };

  const handleAddTask = (sectionId: string) => {
    const section = order.sections.find(s => s.id === sectionId);
    if (!section) return;

    const nextNum = section.items.length + 1;
    const newTask: TaskItem = {
      id: 'task_' + Date.now(),
      num: nextNum,
      description: '',
      responsible: collaborators[0]?.name || 'COZINHEIRA',
      completed: false,
      notes: '',
    };

    const updatedSections = order.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, items: [...sec.items, newTask] };
    });

    onUpdateOrder({ ...order, sections: updatedSections, lastUpdated: new Date().toISOString() });
  };

  const handleDeleteTask = (sectionId: string, taskId: string) => {
    const updatedSections = order.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      const filtered = sec.items.filter(item => item.id !== taskId);
      // Recalculate sequential numbers
      const renumbered = filtered.map((item, idx) => ({ ...item, num: idx + 1 }));
      return { ...sec, items: renumbered };
    });

    onUpdateOrder({ ...order, sections: updatedSections, lastUpdated: new Date().toISOString() });
  };

  const handleMoveTask = (sectionId: string, taskIdx: number, direction: 'up' | 'down') => {
    const section = order.sections.find(s => s.id === sectionId);
    if (!section) return;

    const targetIdx = direction === 'up' ? taskIdx - 1 : taskIdx + 1;
    if (targetIdx < 0 || targetIdx >= section.items.length) return;

    const items = [...section.items];
    const temp = items[taskIdx];
    items[taskIdx] = items[targetIdx];
    items[targetIdx] = temp;

    // renumber
    const renumbered = items.map((item, idx) => ({ ...item, num: idx + 1 }));

    const updatedSections = order.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, items: renumbered };
    });

    onUpdateOrder({ ...order, sections: updatedSections, lastUpdated: new Date().toISOString() });
  };

  // Filter collaborators who usually work in this shift
  const shiftCollabs = collaborators.filter(
    c => !c.preferredShift || c.preferredShift.includes(order.shift)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. HEADER INFO CARD */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-neutral-900 text-white rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                Dados Gerais da Ordem de Produção ({order.shift.toUpperCase()})
              </h2>
              <p className="text-xs text-neutral-500">
                Preencha data, cardápio e supervisores responsáveis deste turno
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetToTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
              title="Restaurar tarefas padrão deste turno da foto original"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Restaurar Modelo Original
            </button>
            <button
              type="button"
              onClick={onOpenCollaborators}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              Equipe & Colaboradoras ({collaborators.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Data */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-600" />
              Data
            </label>
            <input
              type="text"
              value={order.date}
              onChange={e => handleDateChange(e.target.value)}
              placeholder="DD/MM/AAAA"
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-mono font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
            />
          </div>

          {/* Elaboradores */}
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-neutral-600" />
              Responsáveis pela Elaboração
            </label>
            <input
              type="text"
              value={order.elaboratedBy}
              onChange={e => handleElaboratedByChange(e.target.value)}
              placeholder="Ex: MARIA FERNANDA, FABIO"
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
            />
          </div>

          {/* Cardápio do dia */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-neutral-600" />
              Cardápio do Dia
            </label>
            <input
              type="text"
              value={order.menu}
              onChange={e => handleMenuChange(e.target.value)}
              placeholder="Ex: CARNE DE PANELA, BIFE SUÍNO E FAROFA DE BATATA PALHA"
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. SECTIONS & TASKS */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Etapas e Atribuições de Colaboradoras
            </h3>
            <p className="text-xs text-neutral-500">
              Gerencie cada etapa do processo produtivo do turno
            </p>
          </div>

          {/* Section tabs */}
          <div className="flex flex-wrap gap-1.5">
            {order.sections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSectionId(sec.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  activeSectionId === sec.id
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {sec.title} ({sec.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* Active Section Editor */}
        {order.sections.map(section => {
          if (section.id !== activeSectionId) return null;

          return (
            <div key={section.id} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-neutral-900 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Defina o que fazer, qual colaboradora é a responsável e observações pertinentes
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddTask(section.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Nova Tarefa Nesta Etapa
                </button>
              </div>

              {section.items.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-neutral-200 rounded-lg text-neutral-400">
                  <p className="text-sm font-medium">Nenhuma tarefa cadastrada nesta etapa.</p>
                  <button
                    type="button"
                    onClick={() => handleAddTask(section.id)}
                    className="mt-2 text-xs font-bold text-neutral-900 hover:underline cursor-pointer"
                  >
                    + Adicionar a primeira tarefa
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {section.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-neutral-900 text-white rounded-full text-xs font-black font-mono">
                            {item.num}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                            Tarefa #{idx + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveTask(section.id, idx, 'up')}
                            className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 cursor-pointer"
                            title="Mover para cima"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === section.items.length - 1}
                            onClick={() => handleMoveTask(section.id, idx, 'down')}
                            className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 cursor-pointer"
                            title="Mover para baixo"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTask(section.id, item.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer ml-1"
                            title="Remover tarefa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main Input Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        {/* O QUE FAZER */}
                        <div className="md:col-span-6">
                          <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                            O Que Fazer (Descrição da Tarefa) *
                          </label>
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={e => handleUpdateTask(section.id, item.id, 'description', e.target.value)}
                            placeholder="Ex: REGENERAR CARNE DE PANELA CONFORME DEMANDAS DO SEU ENVASE"
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-md font-bold text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
                          />
                        </div>

                        {/* RESPONSÁVEL */}
                        <div className="md:col-span-3">
                          <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                            Responsável *
                          </label>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={item.responsible}
                              onChange={e => handleUpdateTask(section.id, item.id, 'responsible', e.target.value)}
                              placeholder="Nome da colaboradora"
                              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-neutral-300 rounded-md font-black text-neutral-900 focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
                            />
                            {/* Quick Select pills */}
                            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                              {collaborators.slice(0, 8).map(c => (
                                <button
                                  type="button"
                                  key={c.id}
                                  onClick={() => handleUpdateTask(section.id, item.id, 'responsible', c.name)}
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                                    item.responsible === c.name
                                      ? 'bg-neutral-900 text-white border-neutral-900'
                                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                                  }`}
                                >
                                  {c.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* OBSERVAÇÃO / PENDÊNCIA */}
                        <div className="md:col-span-3">
                          <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1">
                            Observação / Pendência
                          </label>
                          <textarea
                            rows={2}
                            value={item.notes}
                            onChange={e => handleUpdateTask(section.id, item.id, 'notes', e.target.value)}
                            placeholder="Ex: Instruções de forno, gramatura, etc."
                            className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-md text-neutral-800 focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. RECADO / PENDÊNCIA E ASSINATURAS */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs p-5 space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-neutral-700" />
          Pendência / Recado para o Próximo Turno e Assinaturas
        </h3>

        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
            Recado / Pendência Escrita (Deixe em branco para preenchimento manual na folha impressa)
          </label>
          <textarea
            rows={2}
            value={order.pendingNotes}
            onChange={e => handlePendingNotesChange(e.target.value)}
            placeholder="Ex: Deixamos carne temperada na câmara 2 / Atenção ao forno..."
            className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Responsável pelo Turno (Nome do Supervisor que Entrega)
            </label>
            <input
              type="text"
              value={order.shiftSupervisor}
              onChange={e => handleSupervisorChange(e.target.value)}
              placeholder="Ex: LAURA / COZINHEIRA"
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Quem Recebeu (Nome do Supervisor do Próximo Turno)
            </label>
            <input
              type="text"
              value={order.receivedBy}
              onChange={e => handleReceivedByChange(e.target.value)}
              placeholder="Ex: ANE / LUCIENE"
              className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-neutral-900 focus:bg-white focus:ring-2 focus:ring-neutral-900 focus:outline-none uppercase"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
