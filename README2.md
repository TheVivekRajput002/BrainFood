# SCS FoodPlatform

Role-based food discovery platform where food partners publish short video reels and users browse, like, and bookmark content.

## 1) Features
- Dual auth flows for `User` and `Food Partner`
- Food partner reel upload with media storage integration
- User feed for browsing food reels
- Like/unlike reels
- Bookmark/unsave reels
- Protected frontend routes
- User profile and food partner profile views
- Basic messaging UI flow (mock-data powered)

## 2) Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS v4, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB + Mongoose |
| Auth | JWT (cookie-based) + bcrypt |
| AI/APIs | ImageKit API (media upload) |
| Hosting | Not configured yet |

## 3) Quick Start
### Prerequisites
- Node.js `18+`
- npm `9+`
- MongoDB instance (local or Atlas)
- ImageKit account (public/private keys + URL endpoint)

### Install
```bash
git clone <your-repo-url>
cd "SCS FoodPlatform"

cd backend
npm install

cd ../frontend
npm install
```

### .env Setup
Create `backend/.env`:
```env
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### Run
Start backend:
```bash
cd backend
node server.js
```

Start frontend:
```bash
cd frontend
npm run dev
```

Open the Vite URL shown in terminal (usually `http://localhost:5173`).

## 4) Repository Structure
```txt
SCS FoodPlatform/
+- backend/
¦  +- src/
¦  ¦  +- controllers/
¦  ¦  +- db/
¦  ¦  +- middleware/
¦  ¦  +- models/
¦  ¦  +- routes/
¦  ¦  +- services/
¦  +- .env.example
¦  +- package.json
¦  +- server.js
+- frontend/
¦  +- src/
¦  ¦  +- components/
¦  ¦  +- hooks/
¦  ¦  +- mock/
¦  ¦  +- pages/
¦  ¦  +- routes/
¦  ¦  +- styles/
¦  +- package.json
¦  +- index.html
+- README2.md
```

## 5) Architecture Overview
- Frontend (React) calls backend APIs via `VITE_API_URL` using Axios with `withCredentials: true`.
- Backend (Express) exposes REST routes under `/api/*`.
- JWT token is stored in secure HTTP-only cookie (`token`).
- Route protection uses auth middleware for user-only and food-partner-only endpoints.
- Food video uploads are processed by `multer` (memory storage) and uploaded to ImageKit.
- MongoDB stores users, food partners, food items, likes, and saves.

## 6) API Endpoints
Base URL: `http://localhost:3000`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/user/register` | Public | Register normal user |
| POST | `/api/auth/user/login` | Public | Login normal user |
| GET | `/api/auth/user/logout` | User | Logout user |
| GET | `/api/auth/user/profile` | User | Get logged-in user profile |
| POST | `/api/auth/food-partner/register` | Public | Register food partner |
| POST | `/api/auth/food-partner/login` | Public | Login food partner |
| GET | `/api/auth/food-partner/logout` | Food Partner | Logout food partner |
| POST | `/api/food` | Food Partner | Create food reel with `video` upload |
| GET | `/api/food` | User | Fetch food feed |
| POST | `/api/food/like` | User | Toggle like on food reel |
| POST | `/api/food/bookmark` | User | Toggle bookmark on food reel |
| GET | `/api/food-partner/:id` | User | Get food partner profile by id |

### Example Request: User Login
```bash
curl -X POST http://localhost:3000/api/auth/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Example Response: User Login
```json
{
  "message": "logged in successfully",
  "user": {
    "_id": "665f3f6f0d8b6a0012ab34cd",
    "email": "user@example.com"
  }
}
```

### Example Request: Like a Reel
```bash
curl -X POST http://localhost:3000/api/food/like \
  -H "Content-Type: application/json" \
  -d '{"foodId":"665f40020d8b6a0012ab34ef"}'
```

### Example Response: Like a Reel
```json
{
  "message": "reel liked successfully",
  "like": true
}
```

## 7) Environment Variables
### Backend (`backend/.env`)
| Key | Required | Description | Example |
|---|---|---|---|
| `JWT_SECRET` | Yes | Secret used to sign JWT tokens | `super-secret-key` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb+srv://...` |
| `IMAGEKIT_PUBLIC_KEY` | Yes | ImageKit public key | `public_xxx` |
| `IMAGEKIT_PRIVATE_KEY` | Yes | ImageKit private key | `private_xxx` |
| `IMAGEKIT_URL_ENDPOINT` | Yes | ImageKit URL endpoint | `https://ik.imagekit.io/your_id` |
| `PORT` | Recommended | Backend port | `3000` |
| `ALLOWED_ORIGINS` | Yes | Comma-separated CORS allowlist | `http://localhost:5173` |

### Frontend (`frontend/.env`)
| Key | Required | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | Yes | Base URL for backend API calls | `http://localhost:3000` |

## 8) Testing
Current status:
- Frontend linting available via ESLint.
- Backend test script is a placeholder and no automated API tests are configured yet.

Run frontend lint:
```bash
cd frontend
npm run lint
```

Backend test script (currently placeholder):
```bash
cd backend
npm test
```

## 9) CI/CD
Not configured yet.

Suggested next step:
- Add GitHub Actions workflow for lint + test on pull requests.

## 10) Deployment
| Component | Status | Suggested Platform |
|---|---|---|
| Frontend | Not deployed | Vercel / Netlify |
| Backend | Not deployed | Render / Railway / Fly.io |
| Database | External service | MongoDB Atlas |
| Media Storage | Configurable | ImageKit |

## 11) Contributing
1. Fork or create a branch from `main`.
2. Keep PRs small and focused.
3. Run lint locally before opening PR.
4. Document any new env vars or endpoints in this README.

## 12) License
Backend package metadata currently uses `ISC`.

If you want a repo-wide license, add a root `LICENSE` file and update this section.
