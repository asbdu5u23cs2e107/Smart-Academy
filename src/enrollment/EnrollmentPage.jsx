import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { courses } from '../data/courses';

// Components
import StepProgress from './components/StepProgress';
import CourseSummaryCard from './components/CourseSummaryCard';
import EnrollmentSummaryCard from './components/EnrollmentSummaryCard';
import PersonalDetailsForm from './components/PersonalDetailsForm';
import AddressDetailsForm from './components/AddressDetailsForm';
import EducationDetailsForm from './components/EducationDetailsForm';
import ProfessionalDetailsForm from './components/ProfessionalDetailsForm';
import CourseDetailsForm from './components/CourseDetailsForm';
import IdentityUploadForm from './components/IdentityUploadForm';
import CouponCard from './components/CouponCard';
import PaymentSummary from './components/PaymentSummary';
import PaymentMethod from './components/PaymentMethod';
import TermsConditions from './components/TermsConditions';

const INITIAL_FORM = {
  // Step 1 — Personal
  fullName: '',
  email: '',
  mobile: '',
  alternateMobile: '',
  dob: '',
  gender: '',
  profilePhoto: null,
  // Step 1 — Address
  addressLine1: '',
  addressLine2: '',
  city: '',
  district: '',
  state: '',
  country: 'India',
  pincode: '',
  // Step 2 — Education
  qualification: '',
  collegeName: '',
  department: '',
  yearOfPassing: '',
  percentage: '',
  // Step 2 — Professional
  currentStatus: '',
  company: '',
  experience: '',
  designation: '',
  // Step 3 — Course
  batch: '',
  learningMode: 'Online Live',
  language: '',
  // Step 3 — Identity
  passportPhoto: null,
  collegeId: null,
  aadhaar: null,
  // Step 4 — Payment
  paymentMethod: '',
  agreeTerms: false,
  agreeUpdates: false,
};

const STEP_LABELS = ['Personal Details', 'Education', 'Course Details', 'Payment'];

const EnrollmentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const slug = searchParams.get('slug') || 'react-js';
  const course = courses.find((c) => c.slug === slug) || courses[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [error, setError] = useState('');

  // Universal field updater
  const updateField = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError('');
  }, []);

  // Step validation
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) return 'Please enter your full name.';
      if (!formData.email.trim()) return 'Please enter your email address.';
      if (!formData.mobile.trim()) return 'Please enter your mobile number.';
      if (!formData.dob) return 'Please select your date of birth.';
      if (!formData.gender) return 'Please select your gender.';
      if (!formData.addressLine1.trim()) return 'Please enter your address.';
      if (!formData.city.trim()) return 'Please enter your city.';
      if (!formData.pincode.trim()) return 'Please enter your pincode.';
    }
    if (currentStep === 2) {
      if (!formData.qualification) return 'Please select your highest qualification.';
      if (!formData.collegeName.trim()) return 'Please enter your college name.';
      if (!formData.currentStatus) return 'Please select your current status.';
    }
    if (currentStep === 3) {
      if (!formData.batch) return 'Please select a preferred batch.';
      if (!formData.language) return 'Please select a preferred language.';
    }
    if (currentStep === 4) {
      if (!formData.paymentMethod) return 'Please select a payment method.';
      if (!formData.agreeTerms) return 'You must agree to the Terms & Conditions to proceed.';
    }
    return '';
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setError('');
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Simulate payment processing → navigate to success
      navigate('/enrollment/success', {
        state: {
          courseName: course.courseName,
          batch: formData.batch,
          email: formData.email,
          mobile: formData.mobile,
          trainerName: course.mentorName,
        },
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepButtonLabel = () => {
    if (currentStep < 4) return `Continue to ${STEP_LABELS[currentStep]}`;
    return 'Complete Enrollment';
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200/60 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Your Enrollment
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            You are one step away from starting your learning journey with{' '}
            <span className="text-purple-650 font-semibold">SwordNex</span>.
          </p>

          {/* Step Progress */}
          <div className="max-w-lg mx-auto mt-4">
            <StepProgress currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Left: Form Content ── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Course Summary — visible on all steps */}
            <CourseSummaryCard course={course} />

            {/* ── STEP 1: Personal + Address ── */}
            {currentStep === 1 && (
              <>
                <PersonalDetailsForm data={formData} onChange={updateField} />
                <AddressDetailsForm data={formData} onChange={updateField} />
              </>
            )}

            {/* ── STEP 2: Education + Professional ── */}
            {currentStep === 2 && (
              <>
                <EducationDetailsForm data={formData} onChange={updateField} />
                <ProfessionalDetailsForm data={formData} onChange={updateField} />
              </>
            )}

            {/* ── STEP 3: Course Details + Identity ── */}
            {currentStep === 3 && (
              <>
                <CourseDetailsForm data={formData} onChange={updateField} course={course} />
                <IdentityUploadForm data={formData} onChange={updateField} />
              </>
            )}

            {/* ── STEP 4: Coupon + Summary + Payment + Terms ── */}
            {currentStep === 4 && (
              <>
                <CouponCard
                  offerPrice={course?.offerPrice || 9999}
                  couponDiscount={couponDiscount}
                  onCouponApply={setCouponDiscount}
                />
                <PaymentSummary course={course} couponDiscount={couponDiscount} />
                <PaymentMethod
                  selected={formData.paymentMethod}
                  onSelect={(val) => updateField('paymentMethod', val)}
                />
                <TermsConditions data={formData} onChange={updateField} />
              </>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-purple-650 hover:bg-purple-700 text-white text-sm font-bold shadow-lg shadow-purple-650/25 transition-all active:scale-95"
              >
                {stepButtonLabel()}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Right: Sticky Enrollment Summary Sidebar ── */}
          <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 lg:sticky lg:top-24 self-start space-y-4">
            <EnrollmentSummaryCard
              course={course}
              couponDiscount={couponDiscount}
              currentStep={currentStep}
              onProceed={handleNext}
            />

            {/* Security info */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Secure & Encrypted
              </div>
              <p>Your payment and personal data is protected by 256-bit SSL encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;
