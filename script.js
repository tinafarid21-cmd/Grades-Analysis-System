// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(name, id, grades) {
    this.name = name;
    this.id = id;
    this.grades = grades; // مصفوفة درجات
  }

  // 2. دالة درجات الرأفة باستخدام map والدوال السهمية
  applyGraceMarks() {
    this.grades = this.grades.map(grade => (grade === 48 || grade === 49 ? 50 : grade));
  }

  // دالة تحليل الدرجات باستخدام reduce و Math.max/min
  analyzeGrades() {
    const total = this.grades.reduce((acc, curr) => acc + curr, 0);
    const maxGrade = this.grades.reduce((max, curr) => Math.max(max, curr), this.grades[0]);
    const minGrade = this.grades.reduce((min, curr) => Math.min(min, curr), this.grades[0]);

    return {
      totalGrades: total,
      highestGrade: maxGrade,
      lowestGrade: minGrade
    };
  }
}

// 3. تشغيل النظام (Objects & forEach)
const universitySystem = [];

// تخليق 3 طلاب ببيانات ودرجات مختلفة (أحدهم يستحق الرأفة، وآخر لديه مادة أقل من 50)
const student1 = new Student("أحمد علي", 101, [85, 48, 90, 78]); // يستحق الرأفة في 48 لتصبح 50
const student2 = new Student("سارة محمد", 102, [95, 92, 88, 90]); // ناجح تماماً
const student3 = new Student("محمود خالد", 103, [40, 65, 70, 80]); // راسب في مادة (40)

const rawStudents = [student1, student2, student3];

// المرور على الطلاب باستخدام forEach، تطبيق الرأفة، ثم الإضافة إلى universitySystem
rawStudents.forEach(student => {
  student.applyGraceMarks();
  universitySystem.push(student);
});

// 4. الفرز المتقدم (Advanced Filtering)
// الطلاب الناجحون: كل المواد درجتها 50 فأكثر
const passedStudents = universitySystem.filter(student => {
  const failedMaterials = student.grades.filter(grade => grade < 50);
  return failedMaterials.length === 0;
});

// الطلاب الراسبون: لديهم مادة واحدة على الأقل درجتها أقل من 50
const failedStudents = universitySystem.filter(student => {
  const failedMaterials = student.grades.filter(grade => grade < 50);
  return failedMaterials.length > 0;
});

// 5. المخرجات (Console Logging)
console.log("=== المصفوفة الشاملة للنظام (universitySystem) ===");
console.log(universitySystem);

console.log("\n=== قائمة الطلاب الناجحين ===");
console.log(passedStudents);

console.log("\n=== قائمة الطلاب الراسبين ===");
console.log(failedStudents);

// (اختياري) طباعة تفاصيل تحليل درجات كل طالب للمعاينة الواضحة
console.log("\n=== تفاصيل تحليلات الدرجات ===");
universitySystem.forEach(student => {
  const analysis = student.analyzeGrades();
  console.log(`الطالب: ${student.name} | المجموع: ${analysis.totalGrades} | أعلى درجة: ${analysis.highestGrade} | أقل درجة: ${analysis.lowestGrade}`);
});