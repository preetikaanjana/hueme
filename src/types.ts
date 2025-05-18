export interface Mood {
  label: string;
  emoji: string;
  color: string;
}

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
} 