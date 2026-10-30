import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  X,
  Mail,
  BookOpen,
  User,
  Save,
  Phone,
} from 'lucide-react';

const Trainers = () => {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    coursesAssigned: 0,
    students: 0,
    status: 'Active',
    lastLogin: 'Never',
  });

  // =====================================================
  // LOAD TRAINERS FROM FIREBASE
  // =====================================================

  const loadTrainers = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, 'trainers')
      );

      const trainerData = snapshot.docs.map((trainerDoc) => ({
        id: trainerDoc.id,
        ...trainerDoc.data(),
      }));

      setTrainers(trainerData);
    } catch (error) {
      console.error('Error loading trainers:', error);
      alert('Unable to load trainers from Firebase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  // =====================================================
  // SEARCH + FILTER
  // =====================================================

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const haystack = `
        ${trainer.name || ''}
        ${trainer.email || ''}
        ${trainer.phone || ''}
        ${trainer.specialization || ''}
      `.toLowerCase();

      const matchesSearch = haystack.includes(
        searchTerm.toLowerCase()
      );

      const matchesStatus =
        statusFilter === 'All Status' ||
        trainer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, trainers]);

  // =====================================================
  // STATS
  // =====================================================

  const totalTrainers = trainers.length;

  const activeTrainers = trainers.filter(
    (trainer) => trainer.status === 'Active'
  ).length;

  const inactiveTrainers = trainers.filter(
    (trainer) => trainer.status === 'Inactive'
  ).length;

  const stats = [
    {
      label: 'Total Trainers',
      value: totalTrainers,
      change: '+6%',
      icon: Users,
    },
    {
      label: 'Active Trainers',
      value: activeTrainers,
      change: '+5%',
      icon: GraduationCap,
    },
    {
      label: 'Inactive Trainers',
      value: inactiveTrainers,
      change: '-1%',
      icon: Users,
    },
    {
      label: 'New Trainers',
      value: totalTrainers,
      change: '+10%',
      icon: TrendingUp,
    },
  ];

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // VIEW TRAINER
  // =====================================================

  const openViewModal = (trainer) => {
    setSelectedTrainer(trainer);
    setShowViewModal(true);
  };

  // =====================================================
  // EDIT TRAINER
  // =====================================================

  const openEditModal = (trainer) => {
    setSelectedTrainer(trainer);

    setFormData({
      name: trainer.name || '',
      email: trainer.email || '',
      phone: trainer.phone || '',
      specialization: trainer.specialization || '',
      coursesAssigned: trainer.coursesAssigned || 0,
      students: trainer.students || 0,
      status: trainer.status || 'Active',
      lastLogin: trainer.lastLogin || 'Never',
    });

    setShowEditModal(true);
  };

  // =====================================================
  // CLOSE MODALS
  // =====================================================

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedTrainer(null);

    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      coursesAssigned: 0,
      students: 0,
      status: 'Active',
      lastLogin: 'Never',
    });
  };

  // =====================================================
  // UPDATE TRAINER
  // =====================================================

  const handleUpdateTrainer = async (e) => {
    e.preventDefault();

    if (!selectedTrainer) return;

    if (!formData.name.trim()) {
      alert('Please enter trainer name.');
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter trainer email.');
      return;
    }

    if (!formData.specialization.trim()) {
      alert('Please enter specialization.');
      return;
    }

    try {
      setSaving(true);

      const trainerRef = doc(
        db,
        'trainers',
        selectedTrainer.id
      );

      await updateDoc(trainerRef, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        specialization: formData.specialization.trim(),
        coursesAssigned:
          Number(formData.coursesAssigned) || 0,
        students: Number(formData.students) || 0,
        status: formData.status,
        lastLogin: formData.lastLogin || 'Never',
      });

      alert('Trainer updated successfully.');

      closeModals();

      await loadTrainers();
    } catch (error) {
      console.error('Error updating trainer:', error);
      alert('Failed to update trainer.');
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE TRAINER
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this trainer?'
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, 'trainers', id)
      );

      setTrainers((prev) =>
        prev.filter(
          (trainer) => trainer.id !== id
        )
      );

      alert('Trainer deleted successfully.');
    } catch (error) {
      console.error('Error deleting trainer:', error);
      alert('Failed to delete trainer.');
    }
  };

  // =====================================================
  // EXPORT CSV
  // =====================================================

  const handleExport = () => {
    if (filteredTrainers.length === 0) {
      alert('No trainer data available to export.');
      return;
    }

    const headers = [
      'Trainer Name',
      'Email',
      'Phone',
      'Specialization',
      'Courses Assigned',
      'Students',
      'Status',
      'Last Login',
    ];

    const rows = filteredTrainers.map((trainer) => [
      trainer.name || '',
      trainer.email || '',
      trainer.phone || '',
      trainer.specialization || '',
      trainer.coursesAssigned || 0,
      trainer.students || 0,
      trainer.status || '',
      trainer.lastLogin || '',
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(',')
      )
      .join('\n');

    const blob = new Blob(
      [csvContent],
      {
        type: 'text/csv;charset=utf-8;',
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'trainers.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-slate-900">
      <div className="space-y-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-end justify-between flex-wrap gap-4">

          <div>
            <h2 className="text-[28px] font-extrabold tracking-tight">
              Trainer Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage instructors, classes, and learning delivery teams.
            </p>
          </div>

          {/* =================================================
              ADD TRAINER
              IMPORTANT:
              This will NOT open a modal.
              It will navigate to existing AddTrainer page.
          ================================================= */}

          <button
            type="button"
            onClick={() => navigate('/admin/AddTrainer')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-purple-600/40 hover:shadow-purple-600/50 transition-shadow"
          >
            <UserPlus className="w-4 h-4" />
            Add Trainer
          </button>

        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {stats.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white border border-slate-100 rounded-2xl p-4"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className="w-[38px] h-[38px] rounded-xl bg-purple-100 flex items-center justify-center">
                    <StatIcon className="w-[19px] h-[19px] text-purple-600" />
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">

                    <TrendingUp className="w-[11px] h-[11px]" />

                    {stat.change}

                  </div>

                </div>

                <div className="text-[13px] text-slate-500 font-semibold mb-1">
                  {stat.label}
                </div>

                <div className="text-2xl font-extrabold tracking-tight">
                  {stat.value}
                </div>

              </div>
            );
          })}

        </div>

        {/* =====================================================
            TABLE SECTION
        ===================================================== */}

        <section className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6">

          {/* SEARCH / FILTER */}

          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">

            <div className="flex flex-wrap gap-3">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
              >
                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100 min-w-[230px]"
                  placeholder="Search trainers"
                />

              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

            </div>

          </div>

          {/* =====================================================
              TABLE
          ===================================================== */}

          <div className="overflow-x-auto">

            <table className="min-w-full text-left">

              <thead>

                <tr className="text-[11px] uppercase tracking-wide text-slate-400 font-bold border-b border-slate-100">

                  <th className="pb-3 px-2">
                    Trainer Name
                  </th>

                  <th className="pb-3 px-2">
                    Email
                  </th>

                  <th className="pb-3 px-2">
                    Specialization
                  </th>

                  <th className="pb-3 px-2">
                    Courses Assigned
                  </th>

                  <th className="pb-3 px-2">
                    Students
                  </th>

                  <th className="pb-3 px-2">
                    Status
                  </th>

                  <th className="pb-3 px-2">
                    Last Login
                  </th>

                  <th className="pb-3 px-2 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-10 text-center text-sm font-semibold text-slate-500"
                    >
                      Loading trainers...
                    </td>

                  </tr>

                ) : filteredTrainers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="py-10 text-center text-sm font-semibold text-slate-500"
                    >
                      No trainers found.
                    </td>

                  </tr>

                ) : (

                  filteredTrainers.map((trainer) => (

                    <tr
                      key={trainer.id}
                      className="border-t border-slate-100 hover:bg-slate-50/50"
                    >

                      <td className="py-4 px-2 text-[13px] font-extrabold text-slate-900">
                        {trainer.name || '-'}
                      </td>

                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">
                        {trainer.email || '-'}
                      </td>

                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {trainer.specialization || '-'}
                      </td>

                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {trainer.coursesAssigned || 0}
                      </td>

                      <td className="py-4 px-2 text-[13px] font-bold text-slate-600">
                        {trainer.students || 0}
                      </td>

                      <td className="py-4 px-2">

                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            trainer.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {trainer.status || 'Inactive'}
                        </span>

                      </td>

                      <td className="py-4 px-2 text-[13px] font-semibold text-slate-500">
                        {trainer.lastLogin || 'Never'}
                      </td>

                      <td className="py-4 px-2 text-right">

                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              openViewModal(trainer)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                            title="View Trainer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(trainer)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-purple-50 hover:text-purple-600 transition"
                            title="Edit Trainer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(trainer.id)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition"
                            title="Delete Trainer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* =====================================================
              PAGINATION
          ===================================================== */}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5">

            <div className="text-[12px] font-semibold text-slate-500">

              Showing{' '}
              {filteredTrainers.length === 0
                ? 0
                : 1}{' '}
              to{' '}
              {filteredTrainers.length}{' '}
              of{' '}
              {filteredTrainers.length}{' '}
              entries

            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"
              >
                <span className="inline-flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </span>
              </button>

              <button
                type="button"
                className="h-8 min-w-8 rounded-xl px-3 text-sm font-bold bg-purple-600 text-white"
              >
                1
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600"
              >
                <span className="inline-flex items-center gap-1">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>

            </div>

          </div>

        </section>

      </div>

      {/* =====================================================
          VIEW TRAINER MODAL
      ===================================================== */}

      {showViewModal && selectedTrainer && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

              <div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  Trainer Details
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Complete trainer information
                </p>

              </div>

              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* CONTENT */}

            <div className="p-6">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">

                  <User className="w-8 h-8 text-purple-600" />

                </div>

                <div>

                  <h4 className="text-lg font-extrabold text-slate-900">
                    {selectedTrainer.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {selectedTrainer.specialization}
                  </p>

                </div>

              </div>

              <div className="space-y-1">

                <DetailRow
                  label="Email"
                  value={selectedTrainer.email}
                />

                <DetailRow
                  label="Phone"
                  value={selectedTrainer.phone}
                />

                <DetailRow
                  label="Specialization"
                  value={selectedTrainer.specialization}
                />

                <DetailRow
                  label="Courses Assigned"
                  value={selectedTrainer.coursesAssigned}
                />

                <DetailRow
                  label="Students"
                  value={selectedTrainer.students}
                />

                <DetailRow
                  label="Last Login"
                  value={selectedTrainer.lastLogin}
                />

                <div className="flex items-center justify-between py-3 border-b border-slate-100">

                  <span className="text-sm font-semibold text-slate-500">
                    Status
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      selectedTrainer.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {selectedTrainer.status}
                  </span>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-5">

                <button
                  type="button"
                  onClick={() => {
                    setShowViewModal(false);
                    openEditModal(selectedTrainer);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          EDIT TRAINER MODAL
      ===================================================== */}

      {showEditModal && selectedTrainer && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

              <div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  Edit Trainer
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Update trainer information.
                </p>

              </div>

              <button
                type="button"
                onClick={closeModals}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleUpdateTrainer}
              className="p-6 space-y-5"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormInput
                  label="Trainer Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter trainer name"
                  icon={<User className="w-4 h-4" />}
                  required
                />

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />

                <FormInput
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  icon={<Phone className="w-4 h-4" />}
                />

                <FormInput
                  label="Specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  placeholder="e.g. Java Full Stack"
                  icon={<BookOpen className="w-4 h-4" />}
                  required
                />

                <FormInput
                  label="Courses Assigned"
                  name="coursesAssigned"
                  type="number"
                  min="0"
                  value={formData.coursesAssigned}
                  onChange={handleInputChange}
                  placeholder="0"
                />

                <FormInput
                  label="Students"
                  name="students"
                  type="number"
                  min="0"
                  value={formData.students}
                  onChange={handleInputChange}
                  placeholder="0"
                />

                {/* STATUS */}

                <div>

                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-100"
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                <FormInput
                  label="Last Login"
                  name="lastLogin"
                  value={formData.lastLogin}
                  onChange={handleInputChange}
                  placeholder="Today"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">

                <button
                  type="button"
                  onClick={closeModals}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-700 disabled:opacity-50"
                >

                  <Save className="w-4 h-4" />

                  {saving
                    ? 'Updating...'
                    : 'Update Trainer'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

// =====================================================
// FORM INPUT
// =====================================================

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
  required = false,
  min,
}) => {
  return (
    <div>

      <label className="block text-sm font-bold text-slate-700 mb-2">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className={`w-full rounded-xl border border-slate-200 py-3 ${
            icon ? 'pl-10' : 'pl-4'
          } pr-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-100`}
        />

      </div>

    </div>
  );
};

// =====================================================
// DETAIL ROW
// =====================================================

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-100">

      <span className="text-sm font-semibold text-slate-500">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-800 text-right break-all">
        {value || '-'}
      </span>

    </div>
  );
};

export default Trainers;