package main

import (
	"github.com/gin-gonic/gin"
)
type User struct{
	ID string `json:"id"`
	Name string `json:"name"`	
}
func getUsers(c *gin.Context){
	user :=[]User{{ID:"1",Name:"Chayanon"}}

	c.JSON(200,user)
}

func main(){
	r:=gin.Default()

	r.GET("/Users",getUsers)
	r.Run(":8080")

}