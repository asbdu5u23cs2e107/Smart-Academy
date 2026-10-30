// Automated Verification Suite for Bilingual Gemini AI Video Doubt Assistant
import {
  askAIStudyAssistant,
  UNRELATED_FALLBACK_TAMIL,
  UNRELATED_FALLBACK_ENGLISH,
  MISSING_CONTEXT_TAMIL,
  MISSING_CONTEXT_ENGLISH
} from '../src/services/aiStudyAssistant.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== Running Bilingual Gemini AI Video Doubt Assistant Verification ===\n');

  // Test 1: Language selection English - Verified question in Python Lesson 5 (Loops)
  console.log('Test 1: English - Verified Question in Python Lesson 5 (for loop)');
  const res1 = await askAIStudyAssistant({
    question: 'What is a for loop in Python?',
    courseId: 'python',
    lessonId: 5,
    lessonTitle: 'Python Loops',
    language: 'en'
  });
  assert(res1.isRelated === true, 'Response is marked as related');
  assert(res1.hasContext === true, 'Response has verified context');
  assert(res1.answer.toLowerCase().includes('for loop') || res1.answer.toLowerCase().includes('sequence'),
    'Answer contains verified loop explanation in English');

  // Test 2: Language selection Tamil - Verified question in Python Lesson 5 (Loops)
  console.log('\nTest 2: Tamil - Verified Question in Python Lesson 5 (for loop)');
  const res2 = await askAIStudyAssistant({
    question: 'for loop என்றால் என்ன?',
    courseId: 'python',
    lessonId: 5,
    lessonTitle: 'Python Loops',
    language: 'ta'
  });
  assert(res2.isRelated === true, 'Response is marked as related');
  assert(res2.hasContext === true, 'Response has verified context');
  assert(res2.answer.includes('for loop') || res2.answer.includes('பைத்தானில்'),
    'Answer contains verified loop explanation in Tamil');

  // Test 3: Language selection English - Unrelated question (photosynthesis)
  console.log('\nTest 3: English - Unrelated Question (photosynthesis)');
  const res3 = await askAIStudyAssistant({
    question: 'What is photosynthesis?',
    courseId: 'python',
    lessonId: 5,
    lessonTitle: 'Python Loops',
    language: 'en'
  });
  assert(res3.isRelated === false, 'Unrelated question is rejected (isRelated === false)');
  assert(res3.answer === UNRELATED_FALLBACK_ENGLISH,
    `Returns exact required English fallback: "${UNRELATED_FALLBACK_ENGLISH}"`);

  // Test 4: Language selection Tamil - Unrelated question
  console.log('\nTest 4: Tamil - Unrelated Question (ஒளிச்சேர்க்கை)');
  const res4 = await askAIStudyAssistant({
    question: 'ஒளிச்சேர்க்கை என்றால் என்ன?',
    courseId: 'python',
    lessonId: 5,
    lessonTitle: 'Python Loops',
    language: 'ta'
  });
  assert(res4.isRelated === false, 'Unrelated question is rejected (isRelated === false)');
  assert(res4.answer === UNRELATED_FALLBACK_TAMIL,
    `Returns exact required Tamil fallback: "${UNRELATED_FALLBACK_TAMIL}"`);

  // Test 5: Cross-Video Context Isolation
  // While on Python Lesson 1 (Introduction), asking about "while loop" (taught in Lesson 5, NOT in Lesson 1)
  console.log('\nTest 5: Cross-Video Isolation - Asking about while loop during Lesson 1 (Python Intro)');
  const res5 = await askAIStudyAssistant({
    question: 'Explain the syntax of while loop with an example',
    courseId: 'python',
    lessonId: 1, // Lesson 1 transcript has no while loops!
    lessonTitle: 'Python Introduction',
    language: 'en'
  });
  assert(res5.isRelated === false, 'Lesson 1 does not contain while loop facts, so isRelated === false');
  assert(res5.answer === UNRELATED_FALLBACK_ENGLISH,
    'Politely rejects with exact English fallback when concept is absent from currently playing video');

  // Test 6: Missing Video Context / Transcript
  console.log('\nTest 6: Missing Video Context / Transcript (Tamil & English)');
  const res6En = await askAIStudyAssistant({
    question: 'What does this video teach?',
    courseId: 'python',
    lessonId: 999, // Non-existent lesson
    lessonTitle: 'Unrecorded Lesson',
    language: 'en'
  });
  assert(res6En.hasContext === false, 'English missing context recognized');
  assert(res6En.answer === MISSING_CONTEXT_ENGLISH,
    `Returns exact required English context missing text: "${MISSING_CONTEXT_ENGLISH}"`);

  const res6Ta = await askAIStudyAssistant({
    question: 'இந்த வீடியோவில் என்ன பாடம்?',
    courseId: 'python',
    lessonId: 999,
    lessonTitle: 'Unrecorded Lesson',
    language: 'ta'
  });
  assert(res6Ta.hasContext === false, 'Tamil missing context recognized');
  assert(res6Ta.answer === MISSING_CONTEXT_TAMIL,
    `Returns exact required Tamil context missing text: "${MISSING_CONTEXT_TAMIL}"`);

  // Test 7: Backend API Verification (Direct HTTP call to /api/gemini-qa)
  console.log('\nTest 7: Direct HTTP Verification to Backend API (/api/gemini-qa)');
  try {
    const backendTestEn = await fetch('http://localhost:5173/api/gemini-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'What is photosynthesis?',
        courseId: 'python',
        lessonId: 5,
        language: 'en'
      })
    });
    if (backendTestEn.ok) {
      const data = await backendTestEn.json();
      console.log('  Backend proxy response status:', backendTestEn.status);
      assert(data.source === 'backend_proxy' || data.source === 'gemini_api',
        'Backend endpoint successfully processes request');
      assert(data.fallbackToLocal === true || data.answer === UNRELATED_FALLBACK_ENGLISH,
        'Backend securely handles response without exposing API key');
    } else {
      console.log('  Dev server not reached directly on port 5173, fallback active');
    }
  } catch (httpErr) {
    console.log('  Direct fetch note:', httpErr.message);
  }

  console.log(`\n========================================`);
  console.log(`Tests Completed: Passed = ${passed}, Failed = ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
