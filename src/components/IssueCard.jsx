import { Trash2, Edit2, AlertCircle } from 'lucide-react';

const IssueCard = ({ issue, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'En Progreso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resuelto':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta':
        return 'text-red-600';
      case 'Media':
        return 'text-orange-600';
      case 'Baja':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(issue.estado)}`}>
            {issue.estado}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{issue.titulo}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(issue)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(issue.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.descripcion}</p>
      <div className="flex items-center gap-2 text-sm">
        <AlertCircle size={16} className={getPriorityColor(issue.prioridad)} />
        <span className={`font-medium ${getPriorityColor(issue.prioridad)}`}>
          Prioridad {issue.prioridad}
        </span>
      </div>
    </div>
  );
};

export default IssueCard;
