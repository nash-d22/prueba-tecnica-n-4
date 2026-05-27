import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getIssues, createIssue, updateIssue, deleteIssue } from '../services/issueService';
import IssueCard from '../components/IssueCard';
import IssueForm from '../components/IssueForm';
import { Plus, LogOut, LayoutDashboard, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const data = await getIssues();
      setIssues(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las incidencias', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingIssue) {
        const updated = await updateIssue(editingIssue.id, formData);
        setIssues(issues.map((i) => (i.id === editingIssue.id ? updated : i)));
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Incidencia actualizada correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const created = await createIssue(formData);
        setIssues([...issues, created]);
        Swal.fire({
          icon: 'success',
          title: 'Creado',
          text: 'Nueva incidencia registrada',
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setIsModalOpen(false);
      setEditingIssue(null);
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al procesar la solicitud', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteIssue(id);
        setIssues(issues.filter((i) => i.id !== id));
        Swal.fire('Eliminado', 'La incidencia ha sido eliminada', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la incidencia', 'error');
      }
    }
  };

  const openEditModal = (issue) => {
    setEditingIssue(issue);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-600" size={28} />
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Issue Tracker</h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
              <span className="text-xs text-gray-500">{user?.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Panel de Incidencias</h2>
            <p className="text-gray-600 mt-1">Gestiona y haz seguimiento de los errores reportados.</p>
          </div>
          <button
            onClick={() => {
              setEditingIssue(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm shadow-indigo-200"
          >
            <Plus size={20} />
            Nueva Incidencia
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-gray-500 font-medium">Cargando incidencias...</p>
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No hay incidencias registradas.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Crea la primera ahora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <IssueForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIssue(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingIssue}
      />
    </div>
  );
};

export default Dashboard;
