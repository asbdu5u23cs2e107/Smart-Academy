import React, { useEffect, useRef, useState } from 'react';
import { Award, Download, ArrowLeft, ShieldCheck, Printer, CheckCircle2, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../context/AuthContext';
import {
  getCertificatesForStudent,
  checkAndAutoGenerateAllEligible,
  subscribeCertificates,
} from '../services/certificateService';

const Certificate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const certCardRef = useRef(null);

  const loadStudentCertificates = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // Auto-generate certificates for any completed enrolled courses
      await checkAndAutoGenerateAllEligible(user);
      const studentCerts = await getCertificatesForStudent(user);
      // Only show valid (issued or pending) certificates, or all
      setCertificates(studentCerts.filter((c) => c.status !== 'Revoked'));
    } catch (err) {
      console.error('Error loading student certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentCertificates();
    const unsub = subscribeCertificates(() => {
      loadStudentCertificates();
    });
    return () => unsub();
  }, [user]);

  const activeCert = certificates[selectedCertIndex] || certificates[0] || null;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!activeCert) return;

    try {
      setDownloading(true);

      const element = document.createElement('div');
      element.style.width = '1100px';
      element.style.background = 'white';
      element.style.padding = '30px';
      element.style.position = 'absolute';
      element.style.left = '-99999px';
      element.style.top = '0';

      element.innerHTML = `
        <div style="border: 12px solid #ede9fe; padding: 15px; background: white;">
          <div style="border: 3px solid #7c3aed; padding: 60px 40px; text-align: center; font-family: Arial, sans-serif;">
            <div style="font-size: 55px; color: #7c3aed; margin-bottom: 15px;">🏆</div>
            <div style="font-size: 16px; letter-spacing: 5px; font-weight: bold; color: #64748b; text-transform: uppercase;">
              SWORDNEX ACADEMY
            </div>
            <div style="font-size: 14px; letter-spacing: 4px; font-weight: 600; color: #7c3aed; text-transform: uppercase; margin-top: 5px;">
              CERTIFICATE OF COMPLETION
            </div>
            <h1 style="font-size: 42px; color: #6d28d9; margin: 25px 0 15px;">Official Certificate</h1>
            <p style="font-size: 17px; color: #64748b; margin: 0;">This certificate is proudly presented to</p>
            <h2 style="font-size: 38px; color: #0f172a; margin: 15px 0; text-transform: uppercase;">
              ${activeCert.studentName || user?.name || 'Student'}
            </h2>
            <p style="font-size: 17px; color: #64748b; margin: 0;">for successfully completing the course</p>
            <h3 style="font-size: 28px; color: #7c3aed; margin: 15px 0 30px;">
              ${activeCert.course || 'Course'}
            </h3>
            <div style="display: flex; justify-content: space-around; margin-top: 35px; font-size: 15px;">
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Certificate ID</div>
                <strong>${activeCert.certificateId || ''}</strong>
              </div>
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Completion Date</div>
                <strong>${formatDate(activeCert.completionDate)}</strong>
              </div>
              <div>
                <div style="color: #94a3b8; margin-bottom: 6px;">Issued By</div>
                <strong>SwordNex Academy</strong>
              </div>
            </div>
            <div style="margin-top: 40px; padding: 8px 24px; display: inline-block; border-radius: 30px; background: #dcfce7; color: #15803d; font-weight: bold;">
              ${activeCert.status || 'Issued'}
            </div>
            <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; color: #94a3b8; font-size: 13px;">
              <span>SwordNex Academy Credentials System</span>
              <span>Official Verified Certificate</span>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(element);

      const options = {
        margin: 0,
        filename: `${activeCert.certificateId || 'SwordNex_Certificate'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };

      await html2pdf().set(options).from(element).save();
      document.body.removeChild(element);
    } catch (err) {
      console.error('PDF download error:', err);
      alert('Certificate download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] text-purple-650 font-bold uppercase tracking-wider">Credentials Center</span>
          <h1 className="text-xl font-bold text-slate-900 uppercase mt-1">CERTIFICATE</h1>
          <p className="text-xs text-slate-500">View and download your course graduation certificates</p>
        </div>
        <button
          onClick={() => navigate('/student-dashboard')}
          className="text-slate-650 hover:text-purple-600 text-xs font-semibold"
        >
          ← Back to Dashboard
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-slate-500">
          Loading certificate records...
        </div>
      ) : certificates.length === 0 ? (
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-slate-200 bg-white shadow-sm text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No Certificates Available Yet</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
            Certificates are automatically generated when you complete 100% of the lessons in an enrolled course. Complete your lessons to earn your official SwordNex Academy certificate.
          </p>
          <div className="pt-2">
            <Link
              to="/student-dashboard/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Go to My Courses</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Certificate Selector if multiple */}
          {certificates.length > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 mr-2">Select Certificate:</span>
              {certificates.map((cert, idx) => (
                <button
                  key={cert.id || cert.certificateId || idx}
                  onClick={() => setSelectedCertIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCertIndex === idx
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cert.course}
                </button>
              ))}
            </div>
          )}

          {/* The Certificate card */}
          <div
            ref={certCardRef}
            className="p-8 md:p-12 rounded-3xl border border-purple-200 bg-white shadow-2xl relative overflow-hidden select-none print:bg-white print:text-slate-950 print:border-slate-300"
          >
            {/* Decorative geometric outlines */}
            <div className="absolute top-0 right-0 h-40 w-40 border-r-8 border-t-8 border-purple-500/10 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 h-40 w-40 border-l-8 border-b-8 border-purple-500/10 rounded-bl-3xl"></div>
            <div className="absolute inset-4 border border-purple-500/10 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Seal Icon */}
              <div className="h-16 w-16 rounded-full bg-purple-50 border-2 border-purple-500/30 flex items-center justify-center text-purple-600 shadow-xl shadow-purple-500/5">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-widest text-slate-900 uppercase font-sans print:text-slate-950">
                  SwordNex Academy
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600">
                  Certificate of Completion
                </span>
              </div>

              <p className="text-slate-600 text-xs italic max-w-md leading-relaxed">
                🎉 Congratulations! This document validates that the candidate has successfully completed all necessary coursework, proctored examinations, and projects as prescribed by the faculty.
              </p>

              {/* Student Name */}
              <div className="space-y-1 pt-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Student Name:</span>
                <span className="text-3xl font-extrabold text-slate-900 uppercase font-sans tracking-wide border-b border-slate-200 pb-2 px-8 inline-block print:text-slate-950 print:border-slate-300">
                  {activeCert?.studentName || user?.name || 'Student'}
                </span>
              </div>

              {/* Course Title */}
              <div className="space-y-1">
                <p className="text-slate-600 text-xs">Has successfully completed the training path for</p>
                <h3 className="text-lg font-black text-purple-600 uppercase tracking-wide">
                  {activeCert?.course || 'Course'}
                </h3>
              </div>

              {/* Certificate ID, Date & Provider Row */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-lg pt-10 text-[10px] text-slate-500 border-t border-slate-200/60 print:border-slate-200 print:text-slate-600">
                <div className="space-y-1 text-left">
                  <span className="uppercase tracking-widest block">Certificate ID:</span>
                  <span className="font-bold text-slate-900 font-mono text-xs">
                    {activeCert?.certificateId || '-'}
                  </span>
                </div>

                <div className="space-y-1 text-center">
                  <span className="uppercase tracking-widest block">Date:</span>
                  <span className="font-bold text-slate-900 font-mono text-xs">
                    {formatDate(activeCert?.completionDate)}
                  </span>
                </div>

                <div className="space-y-1 text-right">
                  <span className="uppercase tracking-widest block">Provider:</span>
                  <span className="font-semibold text-purple-600 italic text-xs">
                    SwordNex Academy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-700 bg-white text-xs font-bold text-slate-700 hover:text-slate-900 transition-all transform hover:-translate-y-0.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-6 text-xs transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Downloading...' : 'Download Certificate'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
