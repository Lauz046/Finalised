package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

type SizePrice struct {
	Size  string  `json:"size"`
	Price float64 `json:"price"`
}

type Seller struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

type Accessory struct {
	Brand       string      `json:"brand"`
	ProductName string      `json:"productName"`
	Subcategory string      `json:"subcategory"`
	Gender      string      `json:"gender"`
	SizePrices  []SizePrice `json:"sizePrices"`
	Images      []string    `json:"images"`
	InStock     bool        `json:"inStock"`
	ProductLink string      `json:"productLink"`
	Seller      Seller      `json:"seller"`
}

type Apparel struct {
	Brand       string      `json:"brand"`
	ProductName string      `json:"productName"`
	Subcategory string      `json:"subcategory"`
	Gender      string      `json:"gender"`
	SizePrices  []SizePrice `json:"sizePrices"`
	Images      []string    `json:"images"`
	InStock     bool        `json:"inStock"`
	ProductLink string      `json:"productLink"`
	Seller      Seller      `json:"seller"`
}

func loadJSONFile[T any](path string, target *[]T) {
	file, err := os.ReadFile(path)
	if err != nil {
		log.Fatalf("❌ Failed to read file %s: %v", path, err)
	}
	err = json.Unmarshal(file, target)
	if err != nil {
		log.Fatalf("❌ Failed to parse JSON from %s: %v", path, err)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Error loading .env file")
	}

	connStr := os.Getenv("NEON_DB_URL")
	if connStr == "" {
		log.Fatal("❌ NEON_DB_URL is not set in .env file")
	}

	fmt.Println("✅ Connecting to:", connStr)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}
	defer db.Close()

	// Drop and recreate accessories table
	_, err = db.Exec(`DROP TABLE IF EXISTS accessories;`)
	if err != nil {
		log.Fatal("❌ Failed to drop accessories table:", err)
	}
	_, err = db.Exec(`CREATE TABLE accessories (
		id SERIAL PRIMARY KEY,
		brand TEXT NOT NULL,
		product_name TEXT NOT NULL,
		subcategory TEXT NOT NULL,
		gender TEXT NOT NULL,
		size_prices JSONB NOT NULL,
		images TEXT[] NOT NULL,
		in_stock BOOLEAN NOT NULL,
		product_link TEXT NOT NULL,
		seller_name TEXT,
		seller_url TEXT
	);`)
	if err != nil {
		log.Fatal("❌ Failed to create accessories table:", err)
	}

	// Drop and recreate apparel table
	_, err = db.Exec(`DROP TABLE IF EXISTS apparel;`)
	if err != nil {
		log.Fatal("❌ Failed to drop apparel table:", err)
	}
	_, err = db.Exec(`CREATE TABLE apparel (
		id SERIAL PRIMARY KEY,
		brand TEXT NOT NULL,
		product_name TEXT NOT NULL,
		subcategory TEXT NOT NULL,
		gender TEXT NOT NULL,
		size_prices JSONB NOT NULL,
		images TEXT[] NOT NULL,
		in_stock BOOLEAN NOT NULL,
		product_link TEXT NOT NULL,
		seller_name TEXT,
		seller_url TEXT
	);`)
	if err != nil {
		log.Fatal("❌ Failed to create apparel table:", err)
	}

	// Seed accessories
	var accessories []Accessory
	loadJSONFile("seeding/data/cleaned_accessories.json", &accessories)
	fmt.Printf("Loaded %d accessories from JSON\n", len(accessories))
	for _, a := range accessories {
		sizePricesJSON, _ := json.Marshal(a.SizePrices)
		_, err := db.Exec(`INSERT INTO accessories (brand, product_name, subcategory, gender, size_prices, images, in_stock, product_link, seller_name, seller_url)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
			a.Brand, a.ProductName, a.Subcategory, a.Gender, sizePricesJSON, pq.Array(a.Images), a.InStock, a.ProductLink, a.Seller.Name, a.Seller.URL)
		if err != nil {
			fmt.Println("⚠️ Accessory insert error:", err)
		}
	}
	fmt.Println("✅ All accessories seeded.")

	// Seed apparel
	var apparel []Apparel
	loadJSONFile("seeding/data/cleaned_apparel.json", &apparel)
	fmt.Printf("Loaded %d apparel from JSON\n", len(apparel))
	for _, a := range apparel {
		sizePricesJSON, _ := json.Marshal(a.SizePrices)
		_, err := db.Exec(`INSERT INTO apparel (brand, product_name, subcategory, gender, size_prices, images, in_stock, product_link, seller_name, seller_url)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
			a.Brand, a.ProductName, a.Subcategory, a.Gender, sizePricesJSON, pq.Array(a.Images), a.InStock, a.ProductLink, a.Seller.Name, a.Seller.URL)
		if err != nil {
			fmt.Println("⚠️ Apparel insert error:", err)
		}
	}
	fmt.Println("✅ All apparel seeded.")

	fmt.Println("✅ All data seeded successfully!")
}
