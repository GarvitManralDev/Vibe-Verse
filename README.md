# Vibe Verse Documentation

![image.png](attachment:9af6d498-b808-42a2-8757-1d67c4150ae3:image.png)

### **What is Vibe Verse?**

**Vibe Verse** is a playful and competitive quiz-based web app designed to explore a user’s personality and preferences through engaging questions. It blends entertainment with social discovery, letting users **compete, earn points, and connect with like-minded people**.

**For best user experience**, kindly open the live link on a laptop or computer.

**Project Link (Live):** https://vibe-verse-delta.vercel.app/

**GitHub Repository:** https://github.com/GarvitManralDev/Vibe-Verse

### **How It Works:**

- There are **15 total contests**.
- Each contest has **7 multiple-choice questions**.
- Each option you pick contributes to two scores:
    - **Vibe Score**: How socially positive or harmonious the choice is.
    - **Crazy Score**: How unconventional, bold, or spontaneous it is.
- After completing quizzes, you earn a **Vibe Profile** based on your total scores.

### **Quiz Categories:**

### **10 Regular Categories (Decent Vibes):**

1. **Music Maestros** – Artists, genres, lyrics, and trivia.
2. **Sports Fanatics** – Athletes, iconic moments, and team trivia.
3. **Weekend Warriors** – Hobbies, adventures, and leisure fun.
4. **Movie Buffs** – Films, actors, quotes, and secrets.
5. **Foodie Frenzy** – Food culture, recipes, and cravings.
6. **Travel Tales** – Destinations, culture, and wanderlust.
7. **Tech Titans** – Gadgets, apps, and tech trends.
8. **Pop Culture Pulse** – Memes, trends, and viral chaos.
9. **Brain Teasers** – Riddles, logic, and puzzle questions.
10. **History Happened** – Fascinating facts from the past.

### **5 Edgy Categories (Spicy, NSFW-ish):**

1. **Between the Sheets** – Intimate facts, myths, and taboos.
2. **Dirty Little Secrets** – Bold personal revelations.
3. **Party Confessions** – Chaotic stories and nightlife chaos.
4. **Innuendo Bingo** – Saucy double-meaning questions.
5. **Truth or Drink** – Daring questions or imaginary sips.

### **Scoring System:**

Each option in a question contributes to:

- **Vibe Score (1-10)**: Social enjoyment and positivity.
    - 8–10: Super fun and universally liked
    - 5–7: Pleasant and neutral
    - 1–4: Awkward, boring, or low-energy
- **Crazy Score (1–10)**: Boldness, spontaneity, or weirdness.
    - 8–10: Wild or unusual picks
    - 5–7: Adventurous but still tame
    - 1–4: Predictable or safe
    

### **Leaderboards & Social Discovery:**

After playing:

- Users earn a rank based on total **vibe and crazy points**.
- **Leaderboard** shows top-scoring players per category.
- You can see others with similar quiz results.

### **Finding Similar Users: `getSimilarUsers` Logic**

The system recommends people like you based on:

1. **Same contest type** (e.g., both love movies or edgy quizzes).
2. **Similar vibe score** (±1).
3. **Similar crazy score** (±1).

You’re considered similar even if you match **just one** of these factors — making it easier to discover potential friends or matches.

**Note:**

*Vibe Verse was developed as part of an Internship assignment over a span of 48 hours. This current version serves as a trial prototype and may contain minor bugs. Further improvements in terms of user experience and security and optimizations are planned in future iterations.*

---

## Current Features

1. **Leaderboard**
    
    Track top-performing users across all quiz categories. The leaderboard highlights high scorers, encouraging friendly competition and repeat engagement.
    
    ![image.png](attachment:124300f8-ba99-4d90-a701-9d4e31b70d6a:image.png)
    
2. **Contests**
    
    Participate in themed quiz contests categorized under *Regular* and *Edgy (18+)*. Each category features curated questions, difficulty tags, and a ranked competition format.
    
    ![image.png](attachment:280be61b-703b-46eb-ba82-6d02ad3ff006:image.png)
    
    ![image.png](attachment:35de1a98-fd08-4ef6-8606-e51ee71ec983:image.png)
    
3. **Meeting New People (View Profiles)**
    
    Explore profiles of other users who’ve participated in quizzes. Get a glimpse of their vibe type, scores, and quiz themes— helping users connect over shared interests.
    
    ![image.png](attachment:153d3372-31c6-4674-90ad-9991b4606178:image.png)
    
4. **Change Profile**
    
    Users can personalize their profile adding a personal touch to their quiz journey and helps others recognize them.
    
    ![image.png](attachment:1a2a6f1c-bd6d-4042-8719-a169922fe20f:image.png)
    

---

## Future Scope

1. **User Profiles & Authentication**
    - Google/GitHub sign-in
    - Personal stats, vibe history, and badges
2. **Leaderboard System**
    - Global and category-specific leaderboards
    - Weekly winners and seasonal contests
3. **Quiz Creation Tool**
    - Admin panel for submitting new questions/quizzes
    - Community-generated quiz submissions (under moderation)
4. **Live Vibe Battles**
    - Real-time multiplayer mode with ranking system
5. **Custom Vibe Avatars**
    - Based on quiz results and achievements
6. **Analytics Dashboard (Admin)**
    - Track question performance, completion rate, etc.

---

## Tech Stack

### Frontend

- **React.js (Vite)** – Fast and lightweight setup using Vite for optimized development and build speed.
- **Tailwind CSS** – Utility-first CSS framework for rapid and responsive UI design.

### Backend

- **Express (Node.js)** – Minimal and flexible backend framework for building APIs and handling routing.
- **MongoDB** – NoSQL database for storing user profiles, quiz data, scores, and more.

### Hosting & DevOps

- **Vercel** – Deploys and hosts the frontend with automatic CI/CD for every push.
- **Railway** – Hosts the backend server and database, providing environment management and deployment pipelines.

---

## API Endpoints
![image](https://github.com/user-attachments/assets/ae5fb808-27f7-42ff-83fa-d564a730f767)
