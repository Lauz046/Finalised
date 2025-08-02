package main

import (
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/joho/godotenv"
	"github.com/rs/cors" // ✅ Make sure this is imported

	"plutus-backend/graph"
	"plutus-backend/graph/generated"

	"encoding/json"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/lib/pq"
)

const defaultPort = "8090"

var (
	menuCache      []byte
	menuCacheMutex sync.RWMutex
	menuCacheTime  time.Time
	menuCacheTTL   = 10 * time.Minute

	// Search cache
	searchCache      map[string][]byte
	searchCacheMutex sync.RWMutex
	searchCacheTime  time.Time
	searchCacheTTL   = 5 * time.Minute

	// Rate limiting
	rateLimitMap   = make(map[string][]time.Time)
	rateLimitMutex sync.RWMutex
)

func getAllBrands(db *sql.DB, table string) []string {
	rows, err := db.Query("SELECT DISTINCT brand FROM " + table)
	if err != nil {
		return nil
	}
	defer rows.Close()
	var brands []string
	for rows.Next() {
		var brand string
		if err := rows.Scan(&brand); err == nil {
			brands = append(brands, brand)
		}
	}
	return brands
}

func getAllSubcategories(db *sql.DB, table string) []string {
	rows, err := db.Query("SELECT DISTINCT subcategory FROM " + table)
	if err != nil {
		return nil
	}
	defer rows.Close()
	var subcats []string
	for rows.Next() {
		var subcat string
		if err := rows.Scan(&subcat); err == nil {
			subcats = append(subcats, subcat)
		}
	}
	return subcats
}

func getAllGenders(db *sql.DB, table string) []string {
	rows, err := db.Query("SELECT DISTINCT gender FROM " + table)
	if err != nil {
		return nil
	}
	defer rows.Close()
	var genders []string
	for rows.Next() {
		var gender string
		if err := rows.Scan(&gender); err == nil {
			genders = append(genders, gender)
		}
	}
	return genders
}

func getAllFragranceFamilies(db *sql.DB) []string {
	rows, err := db.Query("SELECT DISTINCT fragrance_family FROM perfumes")
	if err != nil {
		return nil
	}
	defer rows.Close()
	var fams []string
	for rows.Next() {
		var fam sql.NullString
		if err := rows.Scan(&fam); err == nil && fam.Valid {
			fams = append(fams, fam.String)
		}
	}
	return fams
}

func getProducts(db *sql.DB, table string, fields string, limit int) []map[string]interface{} {
	query := "SELECT " + fields + " FROM " + table + " LIMIT $1"
	rows, err := db.Query(query, limit)
	if err != nil {
		return nil
	}
	defer rows.Close()
	cols, _ := rows.Columns()
	var products []map[string]interface{}
	for rows.Next() {
		vals := make([]interface{}, len(cols))
		valPtrs := make([]interface{}, len(cols))
		for i := range vals {
			valPtrs[i] = &vals[i]
		}
		if err := rows.Scan(valPtrs...); err == nil {
			prod := map[string]interface{}{}
			for i, col := range cols {
				v := vals[i]
				if col == "images" {
					if arr, ok := v.([]string); ok {
						prod[col] = arr
					} else if s, ok := v.(string); ok {
						prod[col] = parsePgArrayString(s)
					} else if b, ok := v.([]byte); ok {
						prod[col] = parsePgArrayString(string(b))
					} else {
						prod[col] = []string{}
					}
				} else {
					b, ok := v.([]byte)
					if ok {
						prod[col] = string(b)
					} else {
						prod[col] = v
					}
				}
			}
			products = append(products, prod)
		}
	}
	return products
}

func getProductsByIndexes(db *sql.DB, table string, fields string, indexes []int) []map[string]interface{} {
	query := "SELECT " + fields + " FROM " + table
	rows, err := db.Query(query)
	if err != nil {
		return nil
	}
	defer rows.Close()
	cols, _ := rows.Columns()
	var allProducts []map[string]interface{}
	for rows.Next() {
		vals := make([]interface{}, len(cols))
		valPtrs := make([]interface{}, len(cols))
		for i := range vals {
			valPtrs[i] = &vals[i]
		}
		if err := rows.Scan(valPtrs...); err == nil {
			prod := map[string]interface{}{}
			for i, col := range cols {
				v := vals[i]
				if col == "images" {
					if arr, ok := v.([]string); ok {
						prod[col] = arr
					} else if s, ok := v.(string); ok {
						prod[col] = parsePgArrayString(s)
					} else if b, ok := v.([]byte); ok {
						prod[col] = parsePgArrayString(string(b))
					} else {
						prod[col] = []string{}
					}
				} else {
					b, ok := v.([]byte)
					if ok {
						prod[col] = string(b)
					} else {
						prod[col] = v
					}
				}
			}
			allProducts = append(allProducts, prod)
		}
	}
	var fixed []map[string]interface{}
	for _, idx := range indexes {
		if idx >= 0 && idx < len(allProducts) {
			fixed = append(fixed, allProducts[idx])
		}
	}
	return fixed
}

func menuHandler(w http.ResponseWriter, r *http.Request) {
	menuCacheMutex.RLock()
	if time.Since(menuCacheTime) < menuCacheTTL && menuCache != nil {
		defer menuCacheMutex.RUnlock()
		w.Header().Set("Content-Type", "application/json")
		w.Write(menuCache)
		return
	}
	menuCacheMutex.RUnlock()

	db := globalDB // use the global DB connection

	menuData := map[string]interface{}{
		"sneaker": map[string]interface{}{
			"brands":   getAllBrands(db, "sneakers"),
			"products": getProductsByIndexes(db, "sneakers", "id, brand, product_name, images, product_link", []int{2, 4, 6, 8, 10, 13, 15, 16, 20}),
		},
		"apparel": map[string]interface{}{
			"brands":        getAllBrands(db, "apparel"),
			"subcategories": getAllSubcategories(db, "apparel"),
			"genders":       getAllGenders(db, "apparel"),
			"products":      getProductsByIndexes(db, "apparel", "id, brand, product_name, images, product_link, gender, subcategory", []int{1, 2, 3, 4, 5, 6}),
		},
		"watch": map[string]interface{}{
			"brands":   getAllBrands(db, "watches"),
			"genders":  getAllGenders(db, "watches"),
			"products": getProductsByIndexes(db, "watches", "id, brand, name, images, link, gender", []int{1, 2, 3, 4, 5, 6}),
		},
		"perfume": map[string]interface{}{
			"brands":            getAllBrands(db, "perfumes"),
			"subcategories":     getAllSubcategories(db, "perfumes"),
			"fragranceFamilies": getAllFragranceFamilies(db),
			"products":          getProductsByIndexes(db, "perfumes", "id, brand, title, images, url, fragrance_family, subcategory", []int{1, 2, 3, 4, 5, 6}),
		},
		"accessories": map[string]interface{}{
			"brands":        getAllBrands(db, "accessories"),
			"subcategories": getAllSubcategories(db, "accessories"),
			"genders":       getAllGenders(db, "accessories"),
			"products":      getProductsByIndexes(db, "accessories", "id, brand, product_name, images, product_link, gender, subcategory", []int{1, 2, 3, 4, 5, 6}),
		},
	}
	b, err := json.Marshal(menuData)
	if err != nil {
		http.Error(w, "Failed to marshal menu", http.StatusInternalServerError)
		return
	}
	menuCacheMutex.Lock()
	menuCache = b
	menuCacheTime = time.Now()
	menuCacheMutex.Unlock()
	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

// Rate limiting middleware
func rateLimitMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		clientIP := r.RemoteAddr
		if forwarded := r.Header.Get("X-Forwarded-For"); forwarded != "" {
			clientIP = forwarded
		}

		rateLimitMutex.Lock()
		now := time.Now()
		window := now.Add(-1 * time.Minute) // 1 minute window

		// Clean old requests
		if requests, exists := rateLimitMap[clientIP]; exists {
			var validRequests []time.Time
			for _, reqTime := range requests {
				if reqTime.After(window) {
					validRequests = append(validRequests, reqTime)
				}
			}
			rateLimitMap[clientIP] = validRequests
		}

		// Check rate limit (100 requests per minute)
		requests := rateLimitMap[clientIP]
		if len(requests) >= 100 {
			rateLimitMutex.Unlock()
			http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			return
		}

		// Add current request
		rateLimitMap[clientIP] = append(rateLimitMap[clientIP], now)
		rateLimitMutex.Unlock()

		next(w, r)
	}
}

func corsHandlerFunc(h http.HandlerFunc) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("CORS_ORIGIN"), "http://localhost:3000", "https://localhost:3000"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With"},
		MaxAge:           86400, // 24 hours
	}).Handler(http.HandlerFunc(h))
}

var globalDB *sql.DB

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Set default JWT secret for development
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		if os.Getenv("NODE_ENV") == "development" || os.Getenv("NODE_ENV") == "" {
			log.Println("⚠️ JWT_SECRET not set, using default development secret")
			jwtSecret = "dev-secret-key-change-in-production"
		} else {
			log.Fatal("❌ JWT_SECRET is not set in .env")
		}
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		// Use a default SQLite database for development if no DATABASE_URL is set
		if os.Getenv("NODE_ENV") == "development" || os.Getenv("NODE_ENV") == "" {
			log.Println("⚠️ DATABASE_URL not set, using default development database")
			dbURL = "postgresql://postgres:password@localhost:5432/plutus_dev"
		} else {
			log.Fatal("❌ DATABASE_URL is not set in .env")
		}
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("❌ Failed to connect to DB: %v", err)
	}

	// Configure connection pool with better settings for prepared statements
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(10)
	db.SetConnMaxLifetime(10 * time.Minute)
	db.SetConnMaxIdleTime(5 * time.Minute)

	// Test the connection
	if err := db.Ping(); err != nil {
		log.Fatalf("❌ Failed to ping DB: %v", err)
	}

	defer db.Close()

	// Create indexes for faster queries
	createIndexes(db)

	// Create auth tables
	createAuthTables(db)

	globalDB = db // set global DB for menuHandler

	resolver := &graph.Resolver{DB: db}
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))

	// ✅ Add CORS here with multiple origins for deployment
	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:3000"
	}

	// Parse multiple origins if comma-separated
	allowedOrigins := []string{
		"http://localhost:3000",
		"https://localhost:3000",
		"https://plutus-frontend.onrender.com",
		"https://plutus-frontend.vercel.app",
		"https://plutus-frontend-git-main-lauz046.vercel.app",
		"https://plutus-frontend-git-develop-lauz046.vercel.app",
	}

	// Add custom origin if provided
	if corsOrigin != "" {
		allowedOrigins = append(allowedOrigins, corsOrigin)
	}

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   allowedOrigins,
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept"},
		MaxAge:           86400, // 24 hours
	}).Handler(srv)

	http.Handle("/query", corsHandler)                                                           // ✅ CORS applied here
	http.Handle("/api/menu", corsHandlerFunc(rateLimitMiddleware(menuHandler)))                  // CORS + Rate limit for menu
	http.Handle("/api/search", corsHandlerFunc(rateLimitMiddleware(searchHandler)))              // CORS + Rate limit for search
	http.Handle("/api/auth/register", corsHandlerFunc(rateLimitMiddleware(authRegisterHandler))) // Auth register
	http.Handle("/api/auth/login", corsHandlerFunc(rateLimitMiddleware(authLoginHandler)))       // Auth login
	http.Handle("/api/enquiry", corsHandlerFunc(rateLimitMiddleware(enquiryHandler)))            // Enquiry
	http.Handle("/", playground.Handler("GraphQL Playground", "/query"))

	log.Printf("🚀 Server running at http://localhost:%s/", port)
	log.Printf("📊 Database connection pool configured")
	log.Printf("🔒 Rate limiting enabled (100 req/min)")
	log.Printf("🌐 CORS configured for production")
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func createIndexes(db *sql.DB) {
	indexes := []string{
		"CREATE INDEX IF NOT EXISTS idx_sneakers_brand ON sneakers(LOWER(brand))",
		"CREATE INDEX IF NOT EXISTS idx_sneakers_brand_product_name ON sneakers(LOWER(brand), LOWER(product_name))",
		"CREATE INDEX IF NOT EXISTS idx_watches_brand ON watches(LOWER(brand))",
		"CREATE INDEX IF NOT EXISTS idx_perfumes_brand ON perfumes(LOWER(brand))",
		"CREATE INDEX IF NOT EXISTS idx_accessories_brand ON accessories(LOWER(brand))",
		"CREATE INDEX IF NOT EXISTS idx_apparel_brand ON apparel(LOWER(brand))",
	}

	for _, index := range indexes {
		_, err := db.Exec(index)
		if err != nil {
			log.Printf("⚠️ Warning: Failed to create index: %v", err)
		} else {
			log.Printf("✅ Created index for faster queries")
		}
	}
}

func createAuthTables(db *sql.DB) {
	tables := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			user_id VARCHAR(50) UNIQUE NOT NULL,
			full_name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			phone VARCHAR(20),
			password_hash VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS enquiries (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			phone VARCHAR(20),
			message TEXT NOT NULL,
			product_id VARCHAR(100),
			product_name VARCHAR(255),
			product_category VARCHAR(100),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
	}

	indexes := []string{
		"CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)",
		"CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id)",
		"CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email)",
		"CREATE INDEX IF NOT EXISTS idx_enquiries_product_id ON enquiries(product_id)",
		"CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at)",
	}

	for _, table := range tables {
		_, err := db.Exec(table)
		if err != nil {
			log.Printf("⚠️ Warning: Failed to create table: %v", err)
		} else {
			log.Printf("✅ Created auth tables")
		}
	}

	for _, index := range indexes {
		_, err := db.Exec(index)
		if err != nil {
			log.Printf("⚠️ Warning: Failed to create auth index: %v", err)
		} else {
			log.Printf("✅ Created auth indexes")
		}
	}
}

// Helper to parse Postgres array string (e.g. {url1,url2}) into []string
func parsePgArrayString(s string) []string {
	s = strings.Trim(s, "{}")
	if s == "" {
		return []string{}
	}
	parts := strings.Split(s, ",")
	for i := range parts {
		parts[i] = strings.TrimSpace(parts[i])
	}
	return parts
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	category := r.URL.Query().Get("category")

	if query == "" && category == "" {
		// Return default products
		db := globalDB
		menuData := map[string]interface{}{
			"products": []map[string]interface{}{
				// Get first 10 products from each category
			},
			"categoryCounts": map[string]int{
				"sneakers":    getProductCount(db, "sneakers"),
				"apparel":     getProductCount(db, "apparel"),
				"accessories": getProductCount(db, "accessories"),
				"perfumes":    getProductCount(db, "perfumes"),
				"watches":     getProductCount(db, "watches"),
			},
		}

		b, err := json.Marshal(menuData)
		if err != nil {
			http.Error(w, "Failed to marshal search results", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(b)
		return
	}

	// Check cache first
	cacheKey := query + ":" + category
	searchCacheMutex.RLock()
	if time.Since(searchCacheTime) < searchCacheTTL && searchCache != nil {
		if cached, exists := searchCache[cacheKey]; exists {
			defer searchCacheMutex.RUnlock()
			w.Header().Set("Content-Type", "application/json")
			w.Write(cached)
			return
		}
	}
	searchCacheMutex.RUnlock()

	db := globalDB
	var results []map[string]interface{}

	if category != "" {
		// Search within specific category
		results = searchInCategory(db, category, query)
	} else {
		// Search across all categories
		results = searchAllCategories(db, query)
	}

	response := map[string]interface{}{
		"products": results,
	}

	b, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal search results", http.StatusInternalServerError)
		return
	}

	// Cache the results
	searchCacheMutex.Lock()
	if searchCache == nil {
		searchCache = make(map[string][]byte)
	}
	searchCache[cacheKey] = b
	searchCacheTime = time.Now()
	searchCacheMutex.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.Write(b)
}

func searchInCategory(db *sql.DB, category, query string) []map[string]interface{} {
	table := category
	fields := "id, brand, product_name, images, product_link"

	if category == "watches" {
		fields = "id, brand, name, images, link"
	} else if category == "perfumes" {
		fields = "id, brand, title, images, url"
	}

	// Use ILIKE for case-insensitive search
	sqlQuery := "SELECT " + fields + " FROM " + table + " WHERE brand ILIKE $1 OR product_name ILIKE $1 OR name ILIKE $1 OR title ILIKE $1 LIMIT 50"

	rows, err := db.Query(sqlQuery, "%"+query+"%")
	if err != nil {
		return nil
	}
	defer rows.Close()

	var results []map[string]interface{}
	for rows.Next() {
		// Scan based on category
		var result map[string]interface{}
		// Implementation depends on the specific fields for each category
		results = append(results, result)
	}

	return results
}

func searchAllCategories(db *sql.DB, query string) []map[string]interface{} {
	// Search across all categories and combine results
	allResults := []map[string]interface{}{}

	categories := []string{"sneakers", "apparel", "accessories", "perfumes", "watches"}
	for _, category := range categories {
		results := searchInCategory(db, category, query)
		allResults = append(allResults, results...)
	}

	// Limit total results
	if len(allResults) > 50 {
		allResults = allResults[:50]
	}

	return allResults
}

func getProductCount(db *sql.DB, table string) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM " + table).Scan(&count)
	if err != nil {
		return 0
	}
	return count
}

// Generate random user ID
func generateUserID() string {
	bytes := make([]byte, 16)
	rand.Read(bytes)
	return "user_" + hex.EncodeToString(bytes)
}

// Hash password
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// Check password
func checkPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Auth Register Handler
func authRegisterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		FullName string `json:"fullName"`
		Email    string `json:"email"`
		Phone    string `json:"phone"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.Email == "" || req.Password == "" {
		http.Error(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Hash password
	hashedPassword, err := hashPassword(req.Password)
	if err != nil {
		http.Error(w, "Failed to process password", http.StatusInternalServerError)
		return
	}

	// Check if user already exists
	var existingID int
	err = globalDB.QueryRow("SELECT id FROM users WHERE email = $1", req.Email).Scan(&existingID)
	if err == nil {
		// User exists
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "You are already registered with this email.",
		})
		return
	}

	// Create new user
	userID := generateUserID()
	_, err = globalDB.Exec(`
		INSERT INTO users (user_id, full_name, email, phone, password_hash)
		VALUES ($1, $2, $3, $4, $5)
	`, userID, req.FullName, req.Email, req.Phone, hashedPassword)

	if err != nil {
		log.Printf("Failed to create user: %v", err)
		http.Error(w, "Failed to create account", http.StatusInternalServerError)
		return
	}

	// Return success
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Account created successfully",
		"user": map[string]interface{}{
			"id":       userID,
			"fullName": req.FullName,
			"email":    req.Email,
			"phone":    req.Phone,
		},
	})
}

// Auth Login Handler
func authLoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.Email == "" || req.Password == "" {
		http.Error(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Find user and check password
	var userID, fullName, email, phone, passwordHash string
	err := globalDB.QueryRow(`
		SELECT user_id, full_name, email, phone, password_hash 
		FROM users WHERE email = $1
	`, req.Email).Scan(&userID, &fullName, &email, &phone, &passwordHash)

	if err != nil {
		// User not found
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid email or password",
		})
		return
	}

	// Check password
	if !checkPassword(req.Password, passwordHash) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"message": "Invalid email or password",
		})
		return
	}

	// Return success
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Successfully signed in",
		"user": map[string]interface{}{
			"id":       userID,
			"fullName": fullName,
			"email":    email,
			"phone":    phone,
		},
	})
}

// Enquiry Handler
func enquiryHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Name            string `json:"name"`
		Email           string `json:"email"`
		Phone           string `json:"phone"`
		Message         string `json:"message"`
		ProductID       string `json:"productId"`
		ProductName     string `json:"productName"`
		ProductCategory string `json:"productCategory"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate required fields
	if req.Name == "" || req.Email == "" || req.Message == "" {
		http.Error(w, "Name, email and message are required", http.StatusBadRequest)
		return
	}

	// Save enquiry to database
	_, err := globalDB.Exec(`
		INSERT INTO enquiries (name, email, phone, message, product_id, product_name, product_category)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
	`, req.Name, req.Email, req.Phone, req.Message, req.ProductID, req.ProductName, req.ProductCategory)

	if err != nil {
		log.Printf("Failed to save enquiry: %v", err)
		http.Error(w, "Failed to save enquiry", http.StatusInternalServerError)
		return
	}

	// Return success
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Enquiry submitted successfully",
	})
}
