package graph

import (
	"database/sql"
	"strings"
)

type Resolver struct {
	DB *sql.DB
}

// normalizeAccents removes accents from characters for better brand matching
func normalizeAccents(s string) string {
	var result strings.Builder
	for _, r := range s {
		switch r {
		case 'é', 'è', 'ê', 'ë':
			result.WriteRune('e')
		case 'à', 'â', 'ä':
			result.WriteRune('a')
		case 'î', 'ï':
			result.WriteRune('i')
		case 'ô', 'ö':
			result.WriteRune('o')
		case 'ù', 'û', 'ü':
			result.WriteRune('u')
		case 'ç':
			result.WriteRune('c')
		case 'ñ':
			result.WriteRune('n')
		default:
			result.WriteRune(r)
		}
	}
	return result.String()
}
