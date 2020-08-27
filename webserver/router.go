package webserver

import (
	"net/http"

	"github.com/callummance/azunyan/manager"
	"github.com/callummance/azunyan/webserver/middlewares"
	"github.com/gin-gonic/gin"
)

//Route sets up and returns a router for the webserver
func Route(man manager.KaraokeManager) *gin.Engine {
	router := gin.Default()

	//Attach environment struct
	router.Use(func(context *gin.Context) { middlewares.AttachEnvironment(&man, context) })

	//Static Files
	router.StaticFile("/", "./static/index.html")
	router.StaticFile("index.html", "./static/index.html")
	router.StaticFile("favicon.ico", "./static/favicon.ico")
	router.StaticFile("robots.txt", "./static/robots.txt")
	router.StaticFS("/_dist_", http.Dir("./static/_dist_"))
	router.StaticFS("/__snowpack__", http.Dir("./static/__snowpack__"))
	router.StaticFS("/web_modules", http.Dir("./static/web_modules"))

	//Forward root
	router.GET("/", ForwardRoot)

	//API group
	apig := router.Group("/api")
	RouteApi(apig)

	//Image Group
	imgg := router.Group("/i")
	RouteMedia(imgg)

	//Admin group
	adming := router.Group("/admin", gin.BasicAuth(gin.Accounts{
		"admin": man.Config.KaraokeConfig.AdminPass,
	}))
	RouteAdmin(adming)

	return router
}
