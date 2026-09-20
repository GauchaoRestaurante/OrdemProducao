import React, { useState } from 'react';
import { Collaborator, ShiftType, ProductionOrder } from '../types';
import { UserCheck, Plus, Trash2, Edit2, X, Check, Clock, Award, Users } from 'lucide-react';

interface CollaboratorsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborators: Collaborator[];
  onSaveCollaborators: (updated: Collaborator[]) => void;
  currentOrder: ProductionOrder;
}

export const CollaboratorsModal: React.FC<CollaboratorsModalProps> = ({
  isOpen,
  onClose,
  collaborators,
  onSaveCollaborators,
  currentOrder,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [selectedShifts, setSelectedShifts] = useState<ShiftType[]>(['madrugada', 'almoco', 'jantar']);

  if (!isOpen) return null;

  // Calculate workload in current order
  const taskCounts: Record<string, number> = {};
  currentOrder.sections.forEach(sec => {
    sec.items.forEach(item => {
      const resp = item.responsible.trim().toUpperCase();
      if (resp) {
        taskCounts[resp] = (taskCounts[resp] || 0) + 1;
      }
    });
  });

  const handleStartAdd = () => {
    setEditingId('new');
    setName('');
    setRole('');
    setSelectedShifts(['madrugada', 'almoco', 'jantar']);
  };

  const handleStartEdit = (collab: Collaborator) => {
    setEditingId(collab.id);
    setName(collab.name);
    setRole(collab.role);
    setSelectedShifts(collab.preferredShift || ['madrugada', 'almoco', 'jantar']);
  };

  const handleToggleShift = (shift: ShiftType) => {
    if (selectedShifts.includes(shift)) {
      if (selectedShifts.length > 1) {
        setSelectedShifts(selectedShifts.filter(s => s !== shift));
      }
    } else {
      setSelectedShifts([...selectedShifts, shift]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId === 'new') {
      const newCollab: Collaborator = {
        id: 'c_' + Date.now(),
        name: name.trim().toUpperCase(),
        role: role.trim() || 'Equipe de Cozinha',
        preferredShift: selectedShifts,
      };
      onSaveCollaborators([...collaborators, newCollab]);
    } else if (editingId) {
      const updated = collaborators.map(c => 
        c.id === editingId
          ? { ...c, name: name.trim().toUpperCase(), role: role.trim() || 'Equipe de Cozinha', preferredShift: selectedShifts }
          : c
      );
      onSaveCollaborators(updated);
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja remover esta colaboradora da lista?')) {
      onSaveCollaborators(collaborators.filter(c => c.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 text-white rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Cadastro de Colaboradoras e Funções
              </h2>
              <p className="text-xs text-neutral-500">
                Organize as colaboradoras, suas atribuições e turnos de trabalho no Gauchão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Workload for current shift */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-700" />
                Carga de Tarefas no Turno Atual ({currentOrder.shift.toUpperCase()})
              </span>
              <span className="text-[11px] text-neutral-500">Total de seções: {currentOrder.sections.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(taskCounts).length === 0 ? (
                <span className="text-xs text-neutral-500 italic">Nenhum responsável vinculado às tarefas deste turno.</span>
              ) : (
                Object.entries(taskCounts).map(([name, count]) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-neutral-300 rounded-md text-xs font-semibold text-neutral-800 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-neutral-800"></span>
                    <span className="font-bold">{name}</span>
                    <span className="text-neutral-500 font-mono text-[11px]">({count} {count === 1 ? 'tarefa' : 'tarefas'})</span>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Form or Add button */}
          {editingId ? (
            <form onSubmit={handleSave} className="p-4 bg-neutral-100 rounded-lg border border-neutral-300 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900">
                  {editingId === 'new' ? 'Nova Colaboradora / Função' : 'Editar Colaboradora'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="text-xs text-neutral-500 hover:text-neutral-700 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Nome / Identificação *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex: LAURA, KEMILLY, COZINHEIRA CHEFE"
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Função Principal / Setor
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="Ex: Envase, Cozinheira, Self no Campo, Auxiliar"
                    className="w-full px-3 py-2 text-sm bg-white border border-neutral-300 rounded-md focus:ring-2 focus:ring-neutral-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Turnos de Atuação
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['madrugada', 'almoco', 'jantar'] as ShiftType[]).map(st => {
                    const active = selectedShifts.includes(st);
                    const labels: Record<ShiftType, string> = {
                      madrugada: 'Madrugada',
                      almoco: 'Almoço',
                      jantar: 'Jantar',
                    };
                    return (
                      <button
                        type="button"
                        key={st}
                        onClick={() => handleToggleShift(st)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          active
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                        {labels[st]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 text-xs font-bold text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Salvar Colaboradora
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-neutral-800">
                Colaboradoras Cadastradas ({collaborators.length})
              </span>
              <button
                type="button"
                onClick={handleStartAdd}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar Colaboradora
              </button>
            </div>
          )}

          {/* List of collaborators */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden divide-y divide-neutral-200">
            {collaborators.map(c => (
              <div
                key={c.id}
                className="p-3.5 bg-white hover:bg-neutral-50 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-neutral-900">{c.name}</span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                      {c.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-neutral-400">Turnos:</span>
                    <div className="flex gap-1">
                      {(c.preferredShift || ['madrugada', 'almoco', 'jantar']).map(sh => (
                        <span
                          key={sh}
                          className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded border border-neutral-200"
                        >
                          {sh}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(c)}
                    title="Editar"
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    title="Excluir"
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md shadow-xs cursor-pointer"
          >
            Concluir e Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
