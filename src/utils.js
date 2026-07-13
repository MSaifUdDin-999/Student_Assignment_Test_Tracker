const SUBJECT_COLORS = ['#3B82F6','#8B5CF6','#10B981','#F59E0B','#EF4444','#06B6D4','#F97316','#84CC16','#EC4899','#6366F1'];
const subjectColorMap = {};
let colorIdx = 0;

export function getSubjectColor(subj) {
  if (!subjectColorMap[subj]) {
    subjectColorMap[subj] = SUBJECT_COLORS[colorIdx % SUBJECT_COLORS.length];
    colorIdx++;
  }
  return subjectColorMap[subj];
}