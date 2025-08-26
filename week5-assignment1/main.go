package main

import (
	"fmt"
	"net/http"
	
	"github.com/gin-gonic/gin"
)

type Notebook struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Type  string `json:"type"`
	Price int    `json:"price"`
}
type Employees struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Position string `json:"position"`
	Salary   int    `json:"salary"`
}

var notebook = []Notebook{
	{ID: "01", Name: "Gigabyte GAMING A16", Type: "Gigabyte", Price: 36990},
	{ID: "02", Name: "Lenovo LOQ", Type: "Lenovo", Price: 35990},
	{ID: "03", Name: "Acer Nitro V 15", Type: "Acer", Price: 28990},
	{ID: "04", Name: "Asus V16", Type: "Asus", Price: 27990},
	{ID: "05", Name: "MSI Katana 15 HX", Type: "MSI", Price: 51990},
	{ID: "06", Name: "MSI Katana A17", Type: "MSI", Price: 37990},
	{ID: "07", Name: "Acer Nitro Lite 16", Type: "Acer", Price: 27990},
	{ID: "08", Name: "MSI Thin 15", Type: "MSI", Price: 22990},
	{ID: "09", Name: "HP Victus 16", Type: "HP", Price: 40990},
	{ID: "10", Name: "MSI Katana 17 HX", Type: "MSI", Price: 55990},
	{ID: "11", Name: "HP Victus 15", Type: "HP", Price: 20990},
}
var employees = []Employees{
	{
		ID:       "A01",
		Name:     "Ethan Smith",
		Position: "Store Manager",
		Salary:   45000,
	},
	{
		ID:       "A02",
		Name:     "Lucas Williams",
		Position: "Cashier",
		Salary:   25000,
	},
	{
		ID:       "A03",
		Name:     "Emily Davis",
		Position: "Sales Assistant",
		Salary:   22000,
	},
	{
		ID:       "A04",
		Name:     "Grace Miller",
		Position: "Inventory Staff",
		Salary:   24000,
	},
	{
		ID:       "A05",
		Name:     "Michael Brown",
		Position: "notebook Curator",
		Salary:   30000,
	},
}

func getNotebook(c *gin.Context) {
	notebookID := c.Query("id")
	if notebookID != "" {
		filter := []Notebook{}
		for _, nb := range notebook {
			if fmt.Sprint(nb.ID) == notebookID {
				filter = append(filter, nb)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, notebook)
}

func getEmployee(c *gin.Context) {
	employeeID := c.Query("id")
	if employeeID != "" {
		filter := []Employees{}
		for _, employee := range employees {
			if fmt.Sprint(employee.ID) == employeeID {
				filter = append(filter, employee)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, employees)
}

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/notebook", getNotebook)
		api.GET("/employees", getEmployee)
	}

	r.Run(":8080")
}
