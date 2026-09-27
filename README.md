# 🏋️‍♂️ FitLog — Workout Library & Gym Companion

FitLog is a dark, no-nonsense gym companion app built to help fitness enthusiasts browse exercises, organize daily workout routines, and track their fitness goals with precision.


## 📝 Description

FitLog provides a comprehensive library of exercises covering all major muscle groups. Users can easily explore detailed specs for each exercise, add workouts to their daily plan (up to a 5-lift cap), bookmark items for later, and track metrics like total workout duration and calorie burn—all in an intuitive, high-performance interface.


## 🛠️ Technologies Used

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons & UI Utilities:** Lucide React / React Icons, Canvas Confetti
* **Toast Notifications:** React Hot Toast / Sonner
* **Deployment:** Vercel


## ✨ Key Features

1. **🏋️ Comprehensive Exercise Library & Filtering/Sorting:** 
   Browse exercises with full details (equipment, difficulty, duration, calories, rating, and step-by-step instructions). Sort workouts easily by Duration, Calories, or Rating.

2. **📋 Daily Plan & Saved Manager:** 
   Add up to 5 workouts to your daily plan, save exercises for later, and monitor real-time metrics (total exercises, duration, and calories burned) on the `/my-plan` page.

3. **📊 Real-time Navbar Counter Badges:** 
   Interactive "Plan" and "Saved" status badges in the navbar that automatically update as items are added or removed.

4. **⚡ Complete Interactive Workflow & Persistence:** 
   Mark exercises as "Done", remove them from plans, and receive feedback via dynamic toast notifications. All plan and saved data persist seamlessly across reloads using `localStorage`.

5. **📱 Fully Responsive Dark UI & Custom 404:** 
   Tailored for mobile, tablet, and desktop screens with a sleek dark theme, dynamic loading animations during API fetches, and a dedicated 404 error page.


## 🚀 API References

* **All Workouts Data:** `https://api.abcz.workers.dev/api/fitlog`
* **Single Workout Details:** `https://api.abcz.workers.dev/api/fitlog/:id`
* **Alternative API:** `https://api.api-store.workers.dev/api/fitlog`