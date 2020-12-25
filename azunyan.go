package main

import (
	"flag"
	"fmt"
	"io"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	"github.com/callummance/azunyan/db"
	"github.com/callummance/azunyan/manager"
	"github.com/callummance/azunyan/webserver"
)

const (
	configLoc = "./azunyan.conf"
)

func main() {
	//Get the conf file location from command line flags
	var confFileLoc string
	flag.StringVar(&confFileLoc, "c", configLoc, "location of the config file")
	flag.Parse()
	fmt.Printf("Starting azunyan with config file %q\n", confFileLoc)
	//Load the config file
	env := manager.Initialize(confFileLoc)

	db.InitialiseState(&env)
	db.ClearUpcomingSongs(&env)

	//Start listening for web requests
	router := webserver.Route(env)

	// Allows snowpack development server to send requests to backend server
	// Only necessary during development as in production the frontend is served on
	// the same domain as the backend
	if (env.Config.GeneralConfig.Env == "development") {
		router.Use(cors.Default())
	}

	// Logging to a file.
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f)

	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil || port == 0 {
		port = env.Config.WebConfig.Port
	}
	router.Run(fmt.Sprintf(":%d", port))
}
