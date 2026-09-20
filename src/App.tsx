import React, { useState, useEffect } from 'react';
import { ShiftType, ProductionOrder, Collaborator, FontSizeSetting } from './types';
import { 
  INITIAL_ORDERS, 
  INITIAL_COLLABORATORS, 
  TEMPLATE_MADRUGADA, 
  TEMPLATE_ALMOCO, 
  TEMPLATE_JANTAR 
} from './data/defaultTemplates';
import { HeaderNavigation } from './components/HeaderNavigation';
import { PrintableSheet } from './components/PrintableSheet';
import { EditorView } from './components/EditorView';
import { CollaboratorsModal } from './components/CollaboratorsModal';
import { 
  Printer, CheckCircle2, Info
} from 'lucide-react';

const STORAGE_KEY_ORDERS = 'gauchao_op_orders_v1';
const STORAGE_KEY_COLLABS = 'gauchao_op_collabs_v1';
const STORAGE_KEY_SETTINGS = 'gauchao_op_settings_v1';

export default function App() {
  // Load saved state or default
  const [orders, setOrders] = useState<Record<ShiftType, ProductionOrder>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved orders:', e);
    }
    return INITIAL_ORDERS;
  });

  const [collaborators, setCollaborators] = useState<Collaborator[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLABS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading collaborators:', e);
    }
    return INITIAL_COLLABORATORS;
  });

  const [currentShift, setCurrentShift] = useState<ShiftType>('madrugada');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('preview');
  const [fontSize, setFontSize] = useState<FontSizeSetting>('normal');
  const [printBlankCheckboxes, setPrintBlankCheckboxes] = useState<boolean>(true); // Blank boxes for kitchen pen filling
  const [isCollabModalOpen, setIsCollabModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLABS, JSON.stringify(collaborators));
    } catch (e) {
      console.error('Failed to save collaborators to localStorage', e);
    }
  }, [collaborators]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentOrder = orders[currentShift] || INITIAL_ORDERS[currentShift];

  const handleUpdateOrder = (updated: ProductionOrder) => {
    setOrders(prev => ({
      ...prev,
      [updated.shift]: updated,
    }));
  };

  const handleToggleTask = (sectionId: string, taskId: string) => {
    const updatedSections = currentOrder.sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      const updatedItems = sec.items.map(item => {
        if (item.id !== taskId) return item;
        return { ...item, completed: !item.completed };
      });
      return { ...sec, items: updatedItems };
    });

    handleUpdateOrder({ ...currentOrder, sections: updatedSections });
  };

  const handleToggleClosingCheck = (checkId: string) => {
    const updatedChecks = currentOrder.closingChecks.map(chk => {
      if (chk.id !== checkId) return chk;
      return { ...chk, checked: !chk.checked };
    });

    handleUpdateOrder({ ...currentOrder, closingChecks: updatedChecks });
  };

  const handleClearChecks = () => {
    if (confirm(`Deseja desmarcar todos os checklists do turno ${currentShift.toUpperCase()}? As tarefas e colaboradoras serão mantidas.`)) {
      const updatedSections = currentOrder.sections.map(sec => ({
        ...sec,
        items: sec.items.map(i => ({ ...i, completed: false })),
      }));
      const updatedChecks = currentOrder.closingChecks.map(c => ({ ...c, checked: false }));
      handleUpdateOrder({ ...currentOrder, sections: updatedSections, closingChecks: updatedChecks });
      showToast('Marcações desmarcadas com sucesso.');
    }
  };

  const handleResetToTemplate = () => {
    const templates: Record<ShiftType, ProductionOrder> = {
      madrugada: TEMPLATE_MADRUGADA,
      almoco: TEMPLATE_ALMOCO,
      jantar: TEMPLATE_JANTAR,
    };
    if (confirm(`Deseja restaurar as tarefas padrão do turno ${currentShift.toUpperCase()} com base no modelo original da cozinha?`)) {
      handleUpdateOrder(JSON.parse(JSON.stringify(templates[currentShift])));
      showToast('Modelo padrão restaurado!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col antialiased">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-950 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-bold flex items-center gap-2 border border-neutral-700 animate-in fade-in no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Top Header Navigation */}
      <HeaderNavigation
        currentShift={currentShift}
        onChangeShift={setCurrentShift}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        printBlankCheckboxes={printBlankCheckboxes}
        onTogglePrintBlankCheckboxes={() => setPrintBlankCheckboxes(!printBlankCheckboxes)}
        onPrint={handlePrint}
        onClearChecks={handleClearChecks}
        onOpenCollaborators={() => setIsCollabModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6">
        {/* Banner with helpful tips for printing & elderly font readability */}
        <div className="no-print mb-4 bg-white border border-neutral-200 rounded-lg p-3.5 flex items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-neutral-700 shrink-0" />
            <span className="text-neutral-700 font-medium">
              <strong className="text-neutral-900 font-bold">Otimizado para Folha A4:</strong> Fonte ampliada para leitura confortável de colaboradoras mais experientes e economia máxima de toner.
            </span>
          </div>
        </div>

        {/* View Selection: Edit Mode or A4 Preview Mode */}
        {viewMode === 'edit' ? (
          <div className="no-print">
            <EditorView
              order={currentOrder}
              collaborators={collaborators}
              onUpdateOrder={handleUpdateOrder}
              onOpenCollaborators={() => setIsCollabModalOpen(true)}
              onResetToTemplate={handleResetToTemplate}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Quick print helper bar */}
            <div className="no-print w-full max-w-[210mm] flex items-center justify-between mb-3 bg-neutral-900 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs">
              <span>Pré-visualização da Folha A4 — Pronto para Impressora</span>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-white text-neutral-900 px-3 py-1 rounded hover:bg-neutral-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir Agora
              </button>
            </div>

            {/* Printable A4 Sheet */}
            <PrintableSheet
              order={currentOrder}
              fontSize={fontSize}
              printBlankCheckboxes={printBlankCheckboxes}
              onToggleTask={handleToggleTask}
              onToggleClosingCheck={handleToggleClosingCheck}
              isInteractive={true}
            />
          </div>
        )}
      </main>

      {/* Collaborators Modal */}
      <CollaboratorsModal
        isOpen={isCollabModalOpen}
        onClose={() => setIsCollabModalOpen(false)}
        collaborators={collaborators}
        onSaveCollaborators={setCollaborators}
        currentOrder={currentOrder}
      />
    </div>
  );
}
