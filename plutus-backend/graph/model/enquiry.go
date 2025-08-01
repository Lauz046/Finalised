package model

import (
	"encoding/json"
	"strconv"
)

type Enquiry struct {
	Name            string
	Email           string
	Phone           *string
	Message         string
	ProductID       *string
	ProductName     *string
	ProductCategory *string
}

// Custom unmarshal to handle both string and number for price
func (v *PerfumeVariant) UnmarshalJSON(data []byte) error {
	type Alias PerfumeVariant
	aux := &struct {
		Price interface{} `json:"price"`
		*Alias
	}{
		Alias: (*Alias)(v),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	switch val := aux.Price.(type) {
	case float64:
		v.Price = &val
	case string:
		if val == "" {
			v.Price = nil
		} else {
			f, err := strconv.ParseFloat(val, 64)
			if err != nil {
				v.Price = nil
			} else {
				v.Price = &f
			}
		}
	default:
		v.Price = nil
	}
	return nil
}
