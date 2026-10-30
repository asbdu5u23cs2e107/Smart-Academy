import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, BookOpen, Star, CheckSquare, Square, X, RotateCcw, Zap } from 'lucide-react';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [selectedLevels, setSelectedLevels] = useState([]);

  const coursesList = [
    {
      id: 'fsd',
      title: 'Full Stack Development',
      desc: 'Learn HTML, CSS, JavaScript, React, Node.js & MongoDB in depth.',
      category: 'Web Development',
      level: 'Advanced',
      duration: '6 Months',
      price: 30000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'python-fs',
      title: 'Python Full Stack',
      desc: 'Master object-oriented python coding, Django framework, and data queries.',
      category: 'Python',
      level: 'Advanced',
      duration: '4 Months',
      price: 25000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'java-dev',
      title: 'Java Developer Bootcamp',
      desc: 'Understand JDBC integrations, enterprise application setups, and Spring Boot.',
      category: 'Java',
      level: 'Advanced',
      duration: '5 Months',
      price: 28000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'python-basics',
      title: 'Python Basics for Beginners',
      desc: 'Kickstart your journey. Variables, lists, loops, conditions, and core syntax.',
      category: 'Python',
      level: 'Beginner',
      duration: '2 Months',
      price: 8000,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'web-design',
      title: 'Responsive Web Design',
      desc: 'Craft mobile-friendly responsive websites with modern HTML, CSS, Flexbox & Grid.',
      category: 'Web Development',
      level: 'Beginner',
      duration: '3 Months',
      price: 10000,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'sql-db',
      title: 'SQL Database Masterclass',
      desc: 'Build efficient databases, perform complex joins, and optimize query speeds.',
      category: 'Data Science',
      level: 'Beginner',
      duration: '2 Months',
      price: 9000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence ',
      desc: 'Learn AI fundamentals, Machine Learning, Deep Learning, Generative AI, and build real-world AI applications.',
      category: 'AI',
      level: 'Beginner',
      duration: '3 Months',
      price: 12000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing ',
      desc: 'Master SEO, Social Media Marketing, Google Ads, Email Marketing, Content Marketing, and Analytics.',
      category: 'Digital Marketing',
      level: 'Beginner',
      duration: '2 Months',
      price: 8500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'uiux-design',
      title: 'UI/UX Design Masterclass',
      desc: 'Learn user research, wireframing, prototyping, Figma, design systems, and create modern user experiences.',
      category: 'UI/UX',
      level: 'Beginner',
      duration: '3 Months',
      price: 10000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleCategoryToggle = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleLevelToggle = (lvl) => {
    if (selectedLevels.includes(lvl)) {
      setSelectedLevels(selectedLevels.filter(l => l !== lvl));
    } else {
      setSelectedLevels([...selectedLevels, lvl]);
    }
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSearchQuery('');
  };

  // Filter logic
  const filteredCourses = useMemo(() => {
    return coursesList.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.desc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      const matchesLevel = selectedLevels.length === 0 ||
        selectedLevels.includes(course.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategories, selectedLevels]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedLevels.length > 0 || searchQuery !== '';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">COURSES</h1>
              <p className="text-sm text-gray-600 mt-2">Explore our courses and find the right learning path for you.</p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-white border border-gray-300 py-3 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm h-fit sticky top-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-purple-600" />
                  <h2 className="font-bold text-gray-900 text-base">FILTERS</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div className="space-y-4 mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category</h3>
                <div className="flex flex-col gap-3">
                  {['Web Development', 'Python', 'Java', 'Data Science', 'AI', 'UI/UX', 'Digital Marketing'].map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategoryToggle(cat)}
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-purple-600 transition-colors text-left font-medium"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Level Filters */}
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">LEVEL</h3>
                <div className="flex flex-col gap-3">
                  {['Beginner', 'Advanced'].map((lvl) => {
                    const isChecked = selectedLevels.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        onClick={() => handleLevelToggle(lvl)}
                        className="flex items-center gap-3 text-sm text-gray-700 hover:text-purple-600 transition-colors text-left font-medium"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span>{lvl}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="space-y-3 pt-6">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Filters</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <span key={cat} className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                        {cat}
                        <X className="w-3 h-3 cursor-pointer hover:text-purple-900" onClick={() => handleCategoryToggle(cat)} />
                      </span>
                    ))}
                    {selectedLevels.map(lvl => (
                      <span key={lvl} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                        {lvl}
                        <X className="w-3 h-3 cursor-pointer hover:text-gray-900" onClick={() => handleLevelToggle(lvl)} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-gray-300 border-dashed rounded-lg gap-4">
                <BookOpen className="w-16 h-16 text-gray-300 animate-pulse" />
                <div className="space-y-2">
                  <p className="font-semibold text-gray-700 text-lg">No courses match your filters</p>
                  <p className="text-sm text-gray-600">Try adjusting your selections or searching for another keyword.</p>
                </div>
                <button
                  onClick={handleClearAll}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                  >
                    {/* Image Section */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Star Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="text-yellow-400 text-2xl"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col gap-4">
                      {/* Title with Badge */}
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-purple-600 transition-colors leading-tight flex-1">
                            {course.title}
                          </h3>
                        </div>
                        {/* Category Badge */}
                        <div className="inline-block">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-purple-700 bg-purple-100">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Info Text */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>{Math.floor(Math.random() * 400 + 100)}+ Students</span>
                          <span className="text-purple-600 font-semibold">{course.level}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>⏱ {course.duration}</span>
                          <span className="font-bold text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="pt-4 mt-auto">
                        <Link
                          to={`/course/${course.id}`}
                          className="w-full rounded-lg py-2 text-sm font-bold flex justify-center items-center text-white
               bg-gradient-to-r from-[#9333ea] to-[#7e22ce]
               hover:from-[#a855f7] hover:to-[#9333ea]
               transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                        >
                          [ View Details ]
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Courses;