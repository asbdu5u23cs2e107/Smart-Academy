import { isCourseMatch } from '../src/services/resourceRepository.js';

console.log("1. 'Artificial Intelligence & Machine Learning' vs 'AI / Machine Learning':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'AI / Machine Learning'));

console.log("2. 'Artificial Intelligence & Machine Learning' vs 'Artificial Intelligence & Machine Learning':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'Artificial Intelligence & Machine Learning'));

console.log("3. 'Artificial Intelligence & Machine Learning' vs 'ai':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'ai'));

console.log("4. 'Artificial Intelligence & Machine Learning' vs 'All Courses':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'All Courses'));

console.log("5. 'Artificial Intelligence & Machine Learning' vs 'Python Programming':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'Python Programming'));

console.log("6. 'Artificial Intelligence & Machine Learning' vs 'Full Stack Development':", 
  isCourseMatch('Artificial Intelligence & Machine Learning', 'Full Stack Development'));
