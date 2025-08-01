//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/99designs/gqlgen/api"
	_ "github.com/99designs/gqlgen/codegen"
	_ "github.com/99designs/gqlgen/codegen/config"
	_ "github.com/99designs/gqlgen/internal/imports"
	_ "github.com/urfave/cli/v2"
	_ "golang.org/x/text/cases"
	_ "golang.org/x/text/language"
	_ "golang.org/x/tools/go/ast/astutil"
	_ "golang.org/x/tools/go/packages"
	_ "golang.org/x/tools/imports"
)
