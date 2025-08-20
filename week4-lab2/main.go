package main

import (
	"fmt"
)

//  var email string ="Sukain_s@su.ac.th"

func main() {
	// var name string = "Chayanon"
	var age int = 21

	email := "Sukain_s@su.ac.th"
	gpa := 3.99

	firstname, lastname := "Chayanon", "Sukain"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email, gpa)

}
